const epxress = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

//Instantiates express app
const app = epxress();

//Provides mongodb connection
mongoose.connect("mongodb://localhost:27017/ConsultantStudentProject", { useNewUrlParser: true });
var db = mongoose.connection;
db.once("open", function () {
    console.log("MongoDB connected correctly.")
});

//Sets middlewares
app.use(morgan("tiny"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Sets routers
const routes = require("./routes");
app.use(routes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Port ${PORT} listening...`));
module.exports = server;