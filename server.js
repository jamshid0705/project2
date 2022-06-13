// database bn ulash uchun

// glabal ozgaruvchilarni tanish uchun
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
// appni require qivoldik
const app = require('./app.js');
//bulani bilamiz 
const port = process.env.PORT;
app.listen(port, '127.0.0.1');

// console.log(app.get('env')); //-->qaysi environmentdagiligino korsatadi
// console.log(process.env); //-->glabal ozgaruvchilar royhati

//mongooseni ishlatish

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
console.log(DB);
mongoose.connect(DB, {}).then(() => { 
  console.log('DB connection succesful');
});

// sxema yaratib olish

////////////////////////////////////////////
