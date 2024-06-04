import express from "express";

const app = new express();

app.get("/api/:params", (req: express.Request, res: express.Response) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ message: req.params.params, ponis: "poinus" });
});

app.get("/", (req, res) => {
  res.json({ mesasge: "kill yourself" });
});

app.listen(5000, () => {
  console.log("listening on 5000");
});
