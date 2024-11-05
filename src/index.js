const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();

const users = [];

//midwlare
function verifyExistsAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((users) => users.username === username);

  if (!user) {
    return response.status(400).json({ error: "Usar not found" });
  }
  request.user = user;

  return next();
}
app.use(express.json());

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const validateUserName = users.some((user) => user.username === username);

  if (validateUserName) {
    return response.status(400).json({ error: "Username already exists" });
  }

  const newUser = {
    id: uuidV4(),
    name,
    username,
    todos: [],
  };
  users.push(newUser);
  return response.status(201).send();
});

app.get("/todos", verifyExistsAccount, (request, response) => {
  const { todos } = request;

  return response.json(todos);
});

app.post("/todos", verifyExistsAccount, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };
  customer.statement.push(statementOperation);
  return response.status(201).send();
});

app.put("/courses/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
});

app.delete("/courses/:id", (request, response) => {
  return request.json([]);
});

app.listen(3333);
