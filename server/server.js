import express from "express";
import cors from "cors";


const app = express();

const PORT = 5000;

app.use(cors());

app.use(express.json());

let tasks = [{
    description: "1. YSEYEYSE!",
    id: 1,
    parentId: null,
    isCompleted: true,
    isEditing: false,
  },
  {
    description: "2. bebop",
    id: 2,
    parentId: null,
    isCompleted: true,
    isEditing: true,
  },]

app.get("/", (req, res) => {
    res.send("TESTING WOHOO!")
});

// I believe this one makes it so "api/tasks" runs this?
app.get("/api/tasks", (req, res) => {
    res.status(200).json(tasks)
})



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})