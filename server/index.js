const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const postsRoute = require("./routes/api/postsRoute");
const authRoute = require("./routes/authRoute");
app.use("/api/posts", postsRoute);
app.use("/auth", authRoute);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const message = error.message;
  res.status(status).json({
    message: message,
  });
});

if (process.env.NODE_ENV === "production") {
  // Static Folder
  app.use(express.static(__dirname + "/public"));

  //Handle SPA
  app.use(/.*/, (req, res, next) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

const port = process.env.PORT || 5000;

mongoose
  .connect(`MONGO_DB_URL`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(port, () => {
      console.log("Listening to port 5000");
    });
  })
  .catch((err) => console.log(err));
