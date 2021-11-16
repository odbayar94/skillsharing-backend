import config from "./config";
import express from "express";
import app from "./app";

const port = config.port || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
