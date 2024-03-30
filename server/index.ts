import { AppDataSource } from './src/DataSource';
import User from './src/models/User';

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))


import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());
app.listen(3001);
app.post('/api/register', (req: Request, _: Response) => {
    console.log(req.body);
});