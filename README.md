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

Most of the structure follows a standard React-Vite kanban project structure.

What differs is the recursive structure. The best way to show it is to follow the task from server to display.

The task journey.

* The tasks are stored per user in a flat json object on the server.
* The json tasklist is then fetched by the frontend.
* It will then be mapped into a tree at the top-parent level (Home component) and passed down to Board
* In Board, the task Map is looped through looking for the top level tasks(depth=Null) and then each top-level task is rendered, the Task Map is passed down to each task(TaskCard).
* Inside TaskCard the same Loop-Map operation happens again but this time we are comparing the ID of the parent with the parentId prop and if it's the same it is rendered.
* This then repeats recursively until there are no more matches between Id === parentId and the recursiveness stops OR the hardcoded maxDepth limit kicks in and stops the child tasks from being rendered and stops the recursiveness.

## API Reference

Table of endpoints:

* POST /api/register/POST
* POST /api/login
* GET/POST/PUT/DELETE /api/tasks

All "api/tasks" endpoints require a bearer token which you get when logging in.

The Axios interceptor handles the login attempts and attaching the tokens.

Currently all tokens are stored in localStorage which is not secure so has to be upgraded if I want to continue developing the backend.

The tokens are also very basic in most ways.

## Architecture and Decisions

Each hook is it's own file in order to keep the structure clean and to easily control what errors to pass to the DataBoundary.

Server has it's own package.json with express and CORS. This way there won't be any unnecessary packages installed in the backend.+

Vite ignore for server is added to avoid page reloading when tasks updates.

This is because data file lives inside of the project that Vite is watching (kanban-react-ts). This problem fixes itself when the DB lives outside of the project in future and bigger projects.

vercel.json - Since we start on the login page this helps vercel reroute when refreshing page, otherwise it will 404

--

Checkbox has optimistic updating, which means updating the task before it reaches the server and reverting the update if it fails. It is one of many things learned on this project which felt very useful, but to keep within the scope i limited this only to the checkbox calls.

fonts installed with Fontsource
npm install @fontsource-variable/roboto
import added in main.tsx

added minimum-scale=1 to index.html to stop browser uncontrolled scaling behaviour.

The server has its own package.json so the backend doesn't have to install a bunch of libraries and packages it won't use, and that goes for the frontend too.

## Closing thoughts

Addressing the UI....

I put a lot of my focus of the UX in how the user navigates the app and not too much thought in the color scheme. I also decided late in the project to implement the theme system and, to be honest, had a bit too much fun implmenting features for it which ended up with maybe not so nice looking, but fun gradients that doesn't follow the contrast rules.

The idea is to take all the features I have learned about themes and with proper research implement them in a future project.

Anyway thanks for reading!
