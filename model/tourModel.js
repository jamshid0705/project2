const mongoose = require('mongoose');

const tourScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Siz nameni kiritishingiz shart'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Siz durationni kiritishingiz shart'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Siz macGroupSizeni kiritishingiz shart'],
  },
  difficulty: {
    type: String,
    required: [true, 'Siz difficultyni kiritishingiz shart'],
  },
  ratingsAverage: {
    type: Number,
    required: [true, 'Siz ratingAverageni kiritishingiz shart'],
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    required: [true, 'Siz ratingQuantityni kiritishingiz shart'],
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Siz price kiritishingiz shart'],
  },
  summary: {
    type: String,
    required: [true, 'Siz summary kiritishingiz shart'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Siz description kiritishingiz shart'],
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Siz imageCover kiritishingiz shart'],
  },
  images: [String],
  startDates: [Date],
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Tour = mongoose.model('tours', tourScheme);

module.exports = Tour;
