"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const users = [];
// GET
app.get('/', (req, res) => {
    res.send("Hello world!");
});
app.get('/users', (req, res) => {
    if (users.length == 0) {
        return res.status(404).send("User are not found.");
    }
    return res.status(200).send(users);
});
// POST
app.post('/users', (req, res) => {
    console.log(req.body);
    res.send("Posted...");
});
app.listen(3050, () => {
    console.log("App is listening!");
});
