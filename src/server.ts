import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
let server: Server;
import dotenv from 'dotenv';
const PORT = 5000;

dotenv.config();

async function main() {
    try {        
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.o5v4c.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`);

        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);

        });
    } catch (error) {
        console.log(error);
    }
}

main()