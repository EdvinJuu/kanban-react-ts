import express from "express";
import cors from "cors";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const app = express();

const PORT = 5000;

const usersUrl = new URL("./static/data/users.json", import.meta.url);
const tasksDirUrl = new URL("./static/data/tasks/", import.meta.url);

app.use(cors());

app.use(express.json());

const taskFileUrl = (userId) => new URL(`${userId}.json`, tasksDirUrl);

const loadTasks = async (userId) =>
  JSON.parse(await readFile(taskFileUrl(userId), "utf8"));

const saveTasks = (userId, tasks) =>
  writeFile(taskFileUrl(userId), JSON.stringify(tasks, null, 2));

// -------USERS AND AUTHENTICATION------------------
const scryptAsync = promisify(scrypt); // Scrypt uses callbacks so promisify lets you use await. Not sure what this means so read up on this.

// This takes the password and scrambles it with salt?
async function hashPassword(password) {
  // salt, a bunch of random characters, that is being turned to "hex" string?
  const salt = randomBytes(16).toString("hex");

  // I assume this is the function that scrambles the password with the salt?
  const hash = (await scryptAsync(password, salt, 64)).toString("hex"); // what does scrypt do? why convert to hex? await is not needed?
  return { salt, hash };
}

//  I believe this takes the salt and password, runs the same scramble and then compares it with the hash to verify?
async function verifyPassword(password, salt, storedHash) {
  // same password scrambler
  const hash = await scryptAsync(password, salt, 64);

  // I guess this function is what reconstructs the stored password somehow, from the Buffer? Would that be reaching into the local caching or sometihng?
  return timingSafeEqual(hash, Buffer.from(storedHash, "hex"));
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  const userId = token && sessions.get(token);

  if (!userId) {
    return res.status(401).json({ error: "Not logged in." });
  }

  req.userId = userId; // later handlers can now ask "who is this?"
  next();
}

app.use("/api/tasks", requireAuth);

app.get("/api/tasks", async (req, res) => {
  res.status(200).json(await loadTasks(req.userId));
});

// read the current users stored on server
let users = JSON.parse(await readFile(usersUrl, "utf8"));

// I don't understand the use of sessions
const sessions = new Map(); // token -> userId, lives in memory only. Not fully understanding this either

// Register user the the user directory
app.post("/api/register", async (req, res) => {
  // fetch props from frontend
  const { username, password } = req.body;

  // validate both username and password
  if (typeof username !== "string" || !username.trim()) {
    return res.status(400).json({ error: "Username is required." });
  }
  if (typeof password !== "string" || password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be atleast 8 characters." });
  }

  // remove unnecessary characters from username
  const name = username.trim();

  // validate that the username is unique in the user directory
  if (users.some((u) => u.username.toLowerCase() === name.toLowerCase())) {
    // 409 error = this clashes with what already exists
    return res.status(409).json({ error: "Username is taken." });
  }

  // I guess here the password becomes these two variables that are the scrambled version of password?
  const { salt, hash } = await hashPassword(password);

  // create user and store the salt and hash with the user? Why? is that what we will later
  // validate the input password against?
  const user = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    username: name,
    salt,
    hash,
  };

  // add user to user directory list
  users.push(user);

  // write the user list to directory file
  await writeFile(usersUrl, JSON.stringify(users, null, 2));

  // give the user an empty task list
  await mkdir(tasksDirUrl, { recursive: true }); // what does mkdir do? why is there an option for recursive?

  // create tasks json for created user? Is that what mkdir helps with? selecting the right folder?
  await writeFile(new URL(`${user.id}.json`, tasksDirUrl), "[]");

  // send created user back to frontend
  res.status(201).json({ id: user.id, username: user.username }); // never send salt/hash back
});

// create route for logging in
app.post("/api/login", async (req, res) => {
  // fetch props from frontend
  const { username, password } = req.body;

  // does .find here go through user directory and see if the username exists, if it does give us the user?
  // is the type check beforehand there to avoid it having to search if the username isn't a string?
  const user =
    typeof username == "string" &&
    users.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase(),
    );

  // Check if password is a string, then run password validation function
  // Same message for "user doesn't exist" and "wrong password"
  // how come we don't flip the if upside down and only let you continue if it DOES match? to avoid
  // the if letting through something that shouldn't?
  if (
    !user ||
    typeof password !== "string" ||
    !(await verifyPassword(password, user.salt, user.hash))
  ) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  // create a token? what will the token be used for? also using hex again. I have to understand what it does
  const token = randomBytes(32).toString("hex");

  // Add the token and connected id to the sessions map, don't understand the sessions map though
  sessions.set(token, user.id);

  // return the token and user to the frontend when validated
  res
    .status(200)
    .json({ token, user: { id: user.id, username: user.username } });
});
//---------------------------------------------

app.get("/", (req, res) => {
  res.send("TESTING WOHOO!");
});

// When browser sends "/api/tasks" it runs the function which displays tasks
app.get("/api/tasks", async (req, res) => {
  const tasks = await loadTasks(req.userId);
  res.status(200).json(tasks);
});
// here is an example of it retrieving a single function
app.get("/api/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);

  const tasks = await loadTasks(req.userId);

  res.status(200).json(tasks.find((t) => t.id === id));
});

// Define a POST route to create a new task and add it to our list.
// Endpoint: POST /api/tasks
// make route handler async here in order to let readFile and writeFile
// use await
app.post("/api/tasks", async (req, res) => {
  // Extract the "title" property from the parsed incoming JSON
  // request body ---- parentId = null means null is default if no other input
  const { description, parentId = null } = req.body;

  // Validation check: Ensure a title was provided and isn't empty
  if (typeof description !== "string" || !description.trim()) {
    // if validation fails we return early with an HTTP 400
    // (Bad Request) status and an error message
    return res.status(400).json({ error: "Description is required." });
  }

  const tasks = await loadTasks(req.userId);

  // if parentId is Null (top level) or task already exists in tasks give 400
  if (parentId !== null && !tasks.some((t) => t.id === parentId)) {
    return res.status(400).json({ error: "Parent task does not exist." });
  }

  // Create new task object
  const newTask = {
    // if task exists, find the max id out of the tasks and add 1
    id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    parentId,
    // Remove any accidental leading/trailing spaces from the title
    description: description.trim(),
    isCompleted: false,
    isEditing: false,
  };

  // Add the new task to our in-memory array
  tasks.push(newTask);
  await saveTasks(req.userId, tasks);

  // Respond with an HTTP 201 (Created) status code
  // and return the new task object so the frontend
  // can immediately use it
  res.status(201).json(newTask);
});

app.delete("/api/tasks/:id", async (req, res) => {
  const id = Number(req.params.id); // works as useParams, comes as a string and needs to be converted
  
  const tasks = await loadTasks(req.userId);

  // Check if task id matches any id in tasks, else error
  if (!tasks.some((t) => t.id === id)) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Collect the task and any descendast of this task
  const idsToDelete = new Set([id]);
  const collect = (parentId) => {
    // go through tasks and add task ID to idsToDelete
    for (const t of tasks) {
      if (t.parentId === parentId) {
        idsToDelete.add(t.id);
        console.log(t.id);
        collect(t.id); // !!Figure out a way to avoid having to loop through whole list for each child
      }
    }
  };
  collect(id);

  const remaining = tasks.filter((t) => !idsToDelete.has(t.id));
  await saveTasks(req.userId, remaining);

  res.status(200).json({ deletedIds: [...idsToDelete] });
});

app.patch("/api/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  const tasks = await loadTasks(req.userId);

  // find the reference of the task that will be mutated
  const task = tasks.find((t) => t.id === id);

  // Validate that task exists before continuing
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  // collect information sent from frontend
  const { description, isCompleted } = req.body;

  // Full validation:
  // validate that description is a non-empty string
  if (
    description !== undefined &&
    (typeof description !== "string" || !description.trim())
  ) {
    return res
      .status(400)
      .json({ error: "Description must be a non-empty string." });
  }
  // validate that isCompleted is a boolean
  if (isCompleted !== undefined && typeof isCompleted !== "boolean") {
    return res.status(400).json({ error: "isCompleted must be a boolean." });
  }

  // checks again that data exists before mutating task
  if (description !== undefined) task.description = description.trim();
  if (isCompleted !== undefined) task.isCompleted = isCompleted;

  await saveTasks(req.userId, tasks);

  res.status(200).json(task);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
