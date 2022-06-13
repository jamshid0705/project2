const express = require('express');

const ejs =require('ejs')

ejs.render('view/404.ejs')

const tourRouter = require('./router/tourRouter');
const userRouter = require('./router/userRouter');

const app = express();
const morgan = require('morgan');

app.use((req,res,next)=>{
  if(req.path='/api/v1/tours/best-3-tours'){
    req.query.sort='-ratingsAverage';
    req.query.limit=3;
  }
  next()
})

app.set('view engine','ejs') // ejs shakldagi faylin

app.use(express.json()); // Middleware qorovulcha

app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestDate = new Date();
  next();
});
// App Users routing

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req,res,next)=>{
  // res.status(404).json({
  //   status:"FAIL",
  //   message:"This page is not found"
  // })
  res.render("404")
})

module.exports = app;

