import express, {Request, Response} from 'express'

const app = express();

app.use(express.json());

const users:any[] = [];

// GET
app.get('/', (req: Request, res: Response) => {
    res.send("Hello world!")
})

app.get('/users', (req: Request, res: Response) => {
    if(users.length == 0) {
        return res.status(404).send("User are not found.");
    }

    return res.status(200).send(users)
})
// POST
app.post('/users', (req: Request, res: Response) => {
    const user = req.body;
    
    // Checks if user already in the array or not.
    const findUser = users.find((x) =>  x.id === user.id)

    if(findUser) {
        return res.status(400).send("User already found!")
    }

    users.push(user)
    res.status(201).send("Posted user...");
})
// DELETE - Remove data
app.delete('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const UserIndex = users.find((x) => x.id === id)

    if(UserIndex == -1) {
        return res.status(400).send("User not found!");
    }

    users.splice(UserIndex, 1);
    res.status(201).send("User deleted successfuly.")
})

app.listen(3050, () => {
    console.log("App is listening!")
})