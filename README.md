How to setup server:
cd server
npm install
npm start
The console should return "Server running on http://localhost:5000"

Server has it's own package.json with express and CORS. This way there won't be any unnecessary packages installed in the backend. 


added vite ignore for server to avoid page reloading when tasks updates.

This is because data file lives inside of the project that Vite is watching (kanban-react-ts). This problem fixes itself when the DB lives outside of the project in future and bigger projects.


Checkbox has optimistic updating, which means updating the task before it reaches the server and
reverting the update if it fails

QUESTIONS TO ANSWER:
Why server has it's own package.json?

Why not add createTask and deleteTask handlers to context instead of prop drilling?