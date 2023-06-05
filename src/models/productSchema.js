import { Schema } from 'mongoose';

const urlValidator = {
  validator: url => {
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  },
  message: 'Please provide a valid picture URL.',
};

export const productSchema = new Schema({
  name: {
    type: String,
    minLength: 2,
    required: [
      true,
      'Please provide a product name with a minimum length of 2 characters.',
    ],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price.'],
  },
  pictureUrl: {
    type: String,
    validate: urlValidator,
    default: 'https://cdn-icons-png.flaticon.com/512/1144/1144364.png',
  },
});
