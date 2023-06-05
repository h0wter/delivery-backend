import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleSchemaValidationErrors } from '../helpers/handleSchemaValidationErrors.js';
import { productSchema } from './productSchema.js';

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;
const phoneRegexp = /^\+\d+$/;

const extendedProductSchema = {
  ...productSchema.obj,
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
};

const orderSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return emailRegexp.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`,
      },
      required: [true, ['Please provide an email.']],
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return phoneRegexp.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`,
      },
      required: [true, 'User phone number required'],
    },
    shopId: {
      type: Schema.Types.ObjectId,
      ref: 'shop',
      required: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    products: {
      type: [extendedProductSchema],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: 'Please provide at least one product.',
      },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

orderSchema.post('save', handleSchemaValidationErrors);

const userDataSchema = {
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
};

export const getOrdersSchema = Joi.object({
  ...userDataSchema,
});

const productValidationSchema = Joi.object({
  name: Joi.string().min(2).required(),
  price: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
  pictureUrl: Joi.string().uri(),
});

export const postOrderSchema = Joi.object({
  ...userDataSchema,
  shopId: Joi.string().hex().length(24).required(),
  shopName: Joi.string().min(2).required(),
  products: Joi.array().items(productValidationSchema).required(),
});

export const Order = model('order', orderSchema);
