import { BadRequestError } from '../errors';
import { Request, Response, NextFunction } from 'express';
import { APIFeatures } from './apiFeatures';
import mongoose, { Model, Types } from 'mongoose';
import { pusher } from './pusher';
export const deleteOne = (Model: Model<any>) => {
  return async (req: Request, res: Response) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      throw new BadRequestError('No document found with that ID');
    }

    res.status(204).send({});
  };
};

export const updateOne = (Model: Model<any>) => {
  return async (req: Request, res: Response) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
      (err, doc) => {
        pusher.trigger('my-channel', 'doc_updated', doc);
      }
    );

    if (!doc) {
      throw new BadRequestError('No document found with that ID');
    }

    res.status(200).json(doc);
  };
};

export const createOne = (Model: Model<any>) => {
  return async (req: Request, res: Response) => {
    const doc = await Model.create(req.body, () => {
      pusher.trigger('my-channel', 'doc_created', 'new doc');
    });
    res.status(201).json(doc);
  };
};

export const getOne = (Model: Model<any>, popOptions?: any) => {
  return async (req: Request, res: Response) => {
    let query: any = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      query = Model.findById(req.params.id);
    } else {
      query = Model.findOne({ slug: req.params.id });
    }

    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      throw new BadRequestError('No document found with that ID');
    }

    res.status(200).json(doc);
  };
};

export const getAll = (Model: Model<any>) => {
  return async (req: Request, res: Response) => {
    // To allow for nested GET reviews on tour (hack)

    let filter = {};
    if (req.params.tourId) {
      filter = { tour: req.params.tourId };
    } else if (req.params.userId) {
      filter = { user: req.params.userId };
    }

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;
    res.status(200).send(doc);
  };
};
