import express from "express";
import serveIndex from "serve-index";
import { api } from "./api";

const app = express();
const wwwDir = "../front/dist/front/browser";
const port = process.env.AGS_PORT || 3000;

app.use("/api", api);

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(3000, () => {
  console.log(`Successfully started on port ${port}`);
});
