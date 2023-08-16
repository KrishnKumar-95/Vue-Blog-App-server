const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const path = require("path");
const userRouter = require('./router')

// Middlewares
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use("/",userRouter)

const port = 3001;

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
