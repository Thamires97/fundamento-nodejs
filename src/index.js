const express = require("express");
const { v4: generateUuid } = require("uuid");

const app = express();
app.use(express.json());

const users = [];

function verifyUserExists(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return response.status(400).json({ error: "User not found" });
  }

  request.user = user;
  next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const isUsernameTaken = users.some((user) => user.username === username);

  if (isUsernameTaken) {
    return response.status(400).json({ error: "Username already exists" });
  }

  const newUser = {
    id: generateUuid(),
    name,
    username,
    todos: [],
  };

  users.push(newUser);

  return response.status(201).json(newUser);
});

app.get("/todos", verifyUserExists, (request, response) => {
  const { user } = request;
  return response.status(200).json(user.todos);
});

app.post("/todos", verifyUserExists, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const newTodo = {
    id: generateUuid(),
    title,
    deadline: new Date(deadline),
    createdAt: new Date(),
    done: false,
  };

  user.todos.push(newTodo);

  return response.status(201).json(newTodo);
});

app.put("/todos/:id", verifyUserExists, (request, response) => {
  const { id } = request.params;
  const { title, deadline } = request.body;
  const { user } = request;

  const todo = user.todos.find((todo) => todo.id === id);

  if (!todo) {
    return response.status(404).json({ error: "Todo not found" });
  }

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.status(200).json(todo);
});

app.delete("/todos/:id", verifyUserExists, (request, response) => {
  const { id } = request.params;
  const { user } = request;

  const todoIndex = user.todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return response.status(404).json({ error: "Todo not found" });
  }

  user.todos.splice(todoIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log("Server running on port 3333");
});
