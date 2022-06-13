const { json } = require('express/lib/response');
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../model/tourModel.js');
const User = require('../../model/userModel.js');

mongoose.connect('mongodb+srv://mamur7191:mamur7191@cluster0.xnk6v.mongodb.net/TOURALL?retryWrites=true&w=majority',{} )
  .then(() => console.log('DB connected'))
  .catch((err) => {
    console.log(err);
  });

const data = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
const dataUser = JSON.parse( fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const addInfo = async () => {
  try {
    const addData = await Tour.create(data);
    const addDataUser = await User.create(dataUser);
    console.log('All files already added');
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    const deleteD = await Tour.deleteMany();
    const deleteB = await User.deleteMany();
    console.log('All data has been deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--add') {
  addInfo();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);

// const addDataUser = User.create(dataUser)
// .then(() => {
//   console.log('userga malumotlar qoshildi');
// });
