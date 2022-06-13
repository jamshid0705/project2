const express = require('express');
const tourController = require('../controller/tourController');

const tourRouter = express.Router();


// tourRouter.route('/stats').get(tourController.stats)
// tourRouter.route('/best-3-tours').get(tourController.getToursAll);


// tourRouter.param('id', tourController.checkId);

tourRouter
  .route('/')
  .get(tourController.getToursAll)
  .post(tourController.addTour);

tourRouter
  .route('/:id')
  .delete(tourController.deleteTour)
  .get(tourController.getTourItem)
  .patch(tourController.updateTour);

module.exports = tourRouter;
