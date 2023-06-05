import { Schema, model } from 'mongoose';
import { handleSchemaValidationErrors } from '../helpers/handleSchemaValidationErrors.js';
import { productSchema } from './productSchema.js';

const shopSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 100,
      unique: true,
      required: [
        true,
        'Please provide a shop name with a minimum length of 2 characters.',
      ],
    },
    address: {
      type: String,
      maxLength: 200,
      required: [true, 'Please provide a shop address.'],
    },
    products: {
      type: [productSchema],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: 'Please provide at least one product.',
      },
    },
  },
  { versionKey: false }
);

shopSchema.post('save', handleSchemaValidationErrors);

export const Shop = model('shop', shopSchema);
