import express, { NextFunction, Request, Response } from "express";
import { appRouter } from "./routes";
import { AppDataSource } from "./DAL/config/db";

const app = express();
const port = 3000;

app.use(express.json())

app.use('/', appRouter)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(500).json({ error });
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        // Express uygulamasını başlat
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
