"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let users = [];
// GET
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.get("/users", (req, res) => {
    try {
        if (users.length == 0) {
            return res.status(404).send("❌ No users are found.");
        }
        res.status(200).send(users);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// POST
app.post("/users", (req, res) => {
    try {
        const user = req.body;
        // Checks if user already exists in the array or not.
        const findUser = users.find((x) => x.id === user.id);
        if (findUser) {
            return res.status(400).send("❌ User already found!");
        }
        users.push(user);
        res.status(201).send("✅ Successfully added user.");
    }
    catch (error) {
        res.status(400).send(error);
    }
});
// DELETE - Remove data
app.delete("/users/:id", (req, res) => {
    try {
        const { id } = req.params;
        const userIndex = users.findIndex((x) => x.id === id); // Use findIndex instead of find
        if (userIndex === -1) {
            return res.status(400).send("❌ User not found!");
        }
        users.splice(userIndex, 1);
        res.status(201).send("✅ User deleted successfully.");
    }
    catch (error) {
        res.status(400).send(error);
    }
});
app.listen(3050, () => {
    console.log("App is listening!");
});
