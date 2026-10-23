# Recursive Kanban!

### Create your own task list. And then create a task list for your task!

## Quick Start

#### Prerequisites

#### How to setup frontend:

1. npm install
2. npm run dev
3. The frontend should show up in browser at http://localhost:5173

#### How to setup server:

1. cd server
2. npm install
3. npm start
4. The console should return "Server running on http://localhost:5000"

## Features

### Tasks as recursive objects:

Tasks are built from an array where they are built into a tree inside a map. It is then read and displayed with a hard depth limit set in code.

### CRUD for tasks:

Tasks are stored in the backend and talks to the frontend which lets the tasks be manipulated with standard operations.

### Login and Register with Token Authentication:

A simple login and registering system which lets you create an account and log in. Security is limited to making sure you have and inputting the correct details.

The password is protected with salt and hash.

### Themes:

Pick your favorite theme from the navbar. Depending on theme, each task depth gradually shifts the hue and darkness giving a gradient effect.

### Accessability with semantic keyboard focusing inside tasks:

Website is designed to work with screen readers and be accessible. There is a system for each task card that makes sure the keyboard focus lands on the correct place after entering/exiting edit mode on each task.

## Tech Stack

* React 19 + Typescript + Vite
* Tailwind CSS v4 + React Router + Axios

* Express backend with JSON file storage

## Project Structure

Root/

server/

src/

Server has it's own package.json with express and CORS. This way there won't be any unnecessary packages installed in the backend.

added vite ignore for server to avoid page reloading when tasks updates.

This is because data file lives inside of the project that Vite is watching (kanban-react-ts). This problem fixes itself when the DB lives outside of the project in future and bigger projects.

Checkbox has optimistic updating, which means updating the task before it reaches the server and
reverting the update if it fails

fonts installed with Fontsource
npm install @fontsource-variable/roboto
import added in main.tsx

added minimum-scale=1 to index.html to stop browser uncontrolled scaling behaviour

QUESTIONS TO ANSWER:
Why server has it's own package.json?

Why not add createTask and deleteTask handlers to context instead of prop drilling?
