# API Documentation

## How to build the project

To start the server, run the following command.:
`yarn run dev`

# Enpoints

### POST /users

**Body**:

```json
{
  "name": "User name",
  "username": "username123"
}

example return:
{
"id": "unique-user-id",
"name": "User name",
"username": "username123",
"todos": []
}
```

### GET /todos

**Headers**:

```json
username: username123

exemplo return:
[
{
"id": "unique-todo-id",
"title": "Read a book",
"deadline": "2024-11-06T10:00:00.000Z",
"createdAt": "2024-11-05T10:00:00.000Z",
"done": false
}
]
```

### POST /todos

**Headers**:
username: username123

**Body**:

```json
{
"title": "Study",
"deadline": "2024-11-07"
}

exemplo return:
{
"id": "unique-todo-id",
"title": "Study Node.js",
"deadline": "2024-11-07T00:00:00.000Z",
"createdAt": "2024-11-06T10:00:00.000Z",
"done": false
}
```

### PUT /todos/:id

**Headers**:
username: username123

**Body**:

```json
{
"title": "Study Express.js",
"deadline": "2024-11-08"
}

exemplo return:
{
"id": "unique-todo-id",
"title": "Study Express.js",
"deadline": "2024-11-08T00:00:00.000Z",
"createdAt": "2024-11-06T10:00:00.000Z",
"done": false
}
```

### DELETE /todos/:id

**Headers**:
username: username123

```

```
