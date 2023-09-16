import express, { Request, Response, Application } from "express";
import cookieparser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/error.middleware";
import dotenv from "dotenv";

dotenv.config();
/// Routes

import userRoutes from "./routes/user.routes";
import connectDB from "./config/db";

connectDB();

const app: Application = express();

const port = process.env.PORT || 8000;
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to simple-auth server");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
