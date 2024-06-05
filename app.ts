import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

type User = {
  id: string;
  name: string;
  age: number;
};

let users: User[] = [];

// GET
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.get("/users", (req: Request, res: Response) => {
  try {
    if (users.length == 0) {
      return res.status(404).send("❌ No users are found.");
    }

    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});
// POST
app.post("/users", (req: Request, res: Response) => {
  try {
    const user: User = req.body;

    // Checks if user already exists in the array or not.
    const findUser = users.find((x) => x.id === user.id);

    if (findUser) {
      return res.status(400).send("❌ User already found!");
    }

    users.push(user);
    res.status(201).send("✅ Successfully added user.");
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE - Remove data
app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userIndex: number = users.findIndex((x) => x.id === id); // Use findIndex instead of find

    if (userIndex === -1) {
      return res.status(400).send("❌ User not found!");
    }

    users.splice(userIndex, 1);
    res.status(201).send("✅ User deleted successfully.");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(3050, () => {
  console.log("App is listening!");
});
