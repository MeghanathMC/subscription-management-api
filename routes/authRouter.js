import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  res.send(201, {
    message: "Sign Up Sucessfull",
  });
});

authRouter.post("/sign-in", (req, res) => {
  res.send(201, {
    message: "Sign In Sucessfull",
  });
});

authRouter.post("/sign-out", (req, res) => {
  res.send(201, {
    message: "Sign Out Sucessfull",
  });
});

export default authRouter;
