import { Router } from "express";

const userRouter = Router();
userRouter.get("/", (req, res) => {
  res.send("GET all the users");
});

userRouter.get("/:id", (req, res) => {
  res.send("GET the individual user");
});

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
