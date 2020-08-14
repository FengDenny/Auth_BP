const CatchAsync = require('../utils/catchAsync');
// const APIFeatures = require("../utils/apiFeatures")
const AppError = require('../utils/appError');

// create a document
exports.CreateDoc = (Model) =>
  CatchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// get all documents
exports.getDoc = (Model) =>
  CatchAsync(async (req, res, next) => {
    // exclude the verison (__v) in API
    const doc = await Model.find().select('-__v');

    if (!doc)
      return next(
        new AppError(`Sorry. There is currrently no documents available!`, 404)
      );

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

// Get a single document with their id
exports.getSingleDoc = (Model) =>
  CatchAsync(async (req, res, next) => {
    let doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(
        new AppError(
          `There is no user associated with ${req.params.id}. Please try again!`,
          404
        )
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// Update documents with id EXCLUDING PASSWORDS
exports.updateDoc = (Model) =>
  CatchAsync(async (req, res, next) => {
    let doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(
        new AppError(
          ` User cannot be updated. There is no user associated with ${req.params.id}. Please try again!`,
          404
        )
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// delete documents with id

exports.deleteDoc = (Model) =>
  CatchAsync(async (req, res, next) => {
    let doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(
        new AppError(
          ` ${req.params.id}, cannot be deleted. There is no user associated with ${req.params.id}. Please try again!`,
          404
        )
      );
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
