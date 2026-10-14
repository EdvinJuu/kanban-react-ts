import express from "express";
import cors from "cors";
import { readFile } from "node:fs/promises";
import { writeFile } from "node:fs/promises";

const app = express();

const PORT = 5000;

const tasksUrl = new URL("./static/data/tasks.json", import.meta.url);

app.use(cors());

app.use(express.json());

let tasks = JSON.parse(await readFile(tasksUrl, "utf8"));

app.get("/", (req, res) => {
  res.send("TESTING WOHOO!");
});

// When browser sends "/api/tasks" it runs the function which displays tasks
app.get("/api/tasks", (req, res) => {
  res.status(200).json(tasks);
});
// here is an example of it retrieving a single function
app.get("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
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

  // if parentId is Null (top level) or task already exists in tasks give 400
  if (parentId !== null && !tasks.some((t) => t.id === parentId)) {
    return res.status(400).json({ error: "Parent task does not exist." });
  }

  // Create new task object
  const newTask = {
    // Generate a new ID: If tasks exist, take the ID of the last task
    // and add 1. If the array is empty, start at ID 1.
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    parentId,
    // Remove any accidental leading/trailing spaces from the title
    description: description.trim(),
    isCompleted: false,
    isEditing: false,
  };

  // Add the new task to our in-memory array
  tasks.push(newTask);
  await writeFile(tasksUrl, JSON.stringify(tasks, null, 2));

  // Respond with an HTTP 201 (Created) status code
  // and return the new task object so the frontend
  // can immediately use it
  res.status(201).json(newTask);
});

app.delete("/api/tasks/:id", async (req, res) => {
  const id = Number(req.params.id); // works as useParams, comes as a string and needs to be converted

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

  tasks = tasks.filter((t) => !idsToDelete.has(t.id));
  await writeFile(tasksUrl, JSON.stringify(tasks, null, 2));

  res.status(200).json({ deletedIds: [...idsToDelete] });
});

app.patch("/api/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);

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
  if (isCompleted !== undefined && typeof isCompleted !== boolean) {
    return res.status(400).json({ error: "isCompleted must be a boolean." });
  }

  // checks again that data exists before mutating task
  if (description !== undefined) task.description = description.trim();
  if (isCompleted !== undefined) task.isCompleted = isCompleted

  await writeFile(tasksUrl, JSON.stringify(tasks, null, 2))

  res.status(200).json(task)
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
