import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
import { hashPassword } from '@utils/functions';

const otpSchema: Schema = new Schema(
  {
    otp: {
      type: String,
      default: null,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    validUntil: {
      type: Date,
      default: null,
    },
  },
  {
    id: false,
    _id: false,
    versionKey: false,
  },
);

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: v =>
          /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(v),
        message: () => 'Invalid email address.',
      },
      required: [true, 'Email is a required field'],
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is a required field'],
      select: false,
    },
    firstName: {
      type: String,
      trim: true,
      default: '',
    },
    lastName: {
      type: String,
      trim: true,
      default: '',
    },
    role: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Roles',
    },
    isActive: {
      type: Number,
      required: true,
      default: 0,
    },
    isBlocked: {
      type: Number,
      required: true,
      default: 0,
    },
    isDeleted: {
      type: Number,
      required: true,
      default: 0,
    },
    latestOtp: {
      type: otpSchema,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

// Hash Password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }

  return next();
});

const userModel = model<User & Document>('Users', userSchema);

export default userModel;
