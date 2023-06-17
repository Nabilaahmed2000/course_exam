const mongoose = require('mongoose');

const Autoincrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: {
      type: Number,
    },
    name: {
      type: String,
      required: [true, 'required name'],
    },
    email: {
      type: String,
      match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, ' Invalid Email'],
      required: [true, 'required email'],
      unique: [true, 'email already exists'],
    },
    password: {
      type: String,
      required: [true, 'required password'],
    },
    image: {
      type: String,
      required: [true, 'required image'],
    },
    role: {
      type: String,
      enum: ['Teacher', 'Student'],
      default: 'Student',
    },
},
  {
    timestamps: true,
  }
);

userSchema.plugin(Autoincrement, { id: 'user_id', inc_field: '_id' });
mongoose.model('users', userSchema);
