import express, { Request, Response, Application } from "express";
import cookieparser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/error.middleware";
import dotenv from "dotenv";
import path from "path";
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

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to simple-auth server");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
