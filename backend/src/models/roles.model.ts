import { model, Schema, Document } from 'mongoose';
import { DefaultPermissions, Role } from '@interfaces/roles.interface';

// List of modules to set permissions
const modules = {
  account: 'Account Module',
  adminUser: 'Admin Users',
  changePassword: 'Change Password',
  createAdmin: 'Create Admin',
  profile: 'User Profile',
  resetPassword: 'Reset Password',
  role: 'Roles and Permissions',
  setUserRole: 'Set User Role',
  siteMaintenance: 'Site Maintenance',
  settings: 'Site Maintenance',
  users: 'Users',
};

// Default Permissions
const defaultPermissions = (): DefaultPermissions => ({
  label: { type: String },
  create: { type: Boolean, default: true },
  read: { type: Boolean, default: true },
  update: { type: Boolean, default: true },
  remove: { type: Boolean, default: true },
  enabled: { type: Boolean, default: true },
  isDeleted: { type: Number, default: 0 },
});

// Custom Permissions
const customPermissions = {
  profile: {
    create: true,
    read: true,
    update: true,
  },
  resetPassword: {
    create: true,
    update: true,
  },
};

// Permissions
const permissions: object = Object.entries(modules).reduce((permissions, [key, label]) => {
  const setPermissions = defaultPermissions();

  // Permission Label
  setPermissions.label.default = label;

  // Overwrite permission defaults
  if (customPermissions[key]) {
    Object.entries(customPermissions[key]).forEach(([prop, value]) => {
      setPermissions[prop].default = value;
    });
  }

  return {
    ...permissions,
    [key]: setPermissions,
  };
}, {});

// Roles Schema
const roleSchema: Schema<Role> = new Schema(
  {
    name: {
      type: String,
    },
    label: {
      type: String,
    },
    isDeleted: {
      type: Number,
    },
    permissions,
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

const roleModel = model<Role & Document>('Roles', roleSchema);

export default roleModel;
