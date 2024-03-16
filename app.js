const path = require("path");
const express = require("express");
const app = express();
const morgan = require('morgan')
const authRouter = require("./routes/auth");
const skillRouter = require('./routes/skill')
const educationRouter = require('./routes/education')
const heroRouter = require('./routes/hero')
const workRouter = require('./routes/work')
const aboutRouter = require('./routes/about')
const AppError = require("./utils/appError")
const globalErrorHandler = require("./utils/globalErrorHandler");

// app.get('/', (req, res) => res.send("running"))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get('/', (req, res) => res.send('server is running'))
app.use("/", authRouter);
app.use("/skill", skillRouter);
app.use("/education", educationRouter);
app.use("/hero", heroRouter);
app.use("/work", workRouter);
app.use("/about", aboutRouter);


app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.resolve(__dirname, "frontend", "build")));
//   app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
// }

app.all("*", (req, res, next) => {
  //   const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  //   err.status = 'fail'
  //   err.statusCode = 600
  //   next(err);
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
