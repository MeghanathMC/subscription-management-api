import { Router } from "express";

const subsRouter = Router();

subsRouter.get("/", (req, res) => {
  res.send("get all the subscriptions");
});

subsRouter.get("/:id", (req, res) => {
  res.send("get the particular subscription detail");
});


subsRouter.post("/", (req, res) => {
  res.send("create the subscription");
});

subsRouter.put("/:id", (req, res) => {
  res.send("UPDATE the particular subscription");
});


subsRouter.delete("/:id", (req, res) => {
  res.send("DELETE the subscription");
});


subsRouter.get("/users/:id", (req, res) => {
  res.send("get all the subscriptions made by the user");
});


subsRouter.put("/:id/cancel", (req, res) => {
  res.send("cancel the subscriptions");
});

subsRouter.get("/upcoming-renewals", (req, res) => {
  res.send("GET upcoming subscriptions");
});

export default subsRouter;
