import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUser);

userRouter.post("/", (req, res) => {
  res.send("create a new user");
});

userRouter.put("/:id", (req, res) => {
  res.send("UPDATE the user");
});

userRouter.delete("/:id", (req, res) => {
  res.send("DELETE the user");
});

export default userRouter;
