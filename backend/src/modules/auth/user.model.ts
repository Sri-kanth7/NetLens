import { Schema, model, type HydratedDocument } from 'mongoose';
import { z } from 'zod';

export const userRoles = ['owner', 'admin', 'technician', 'viewer', 'guest'] as const;

export const userRoleSchema = z.enum(userRoles);

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      required: true,
      enum: userRoles,
      default: 'viewer'
    },
    avatar: {
      type: String,
      default: ''
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    refreshToken: {
      type: String,
      default: null,
      index: true,
      select: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ refreshToken: 1 });

export type UserDocument = HydratedDocument<{
  fullName: string;
  email: string;
  password: string;
  role: (typeof userRoles)[number];
  avatar: string;
  emailVerified: boolean;
  refreshToken: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

export const UserModel = model('User', userSchema);
