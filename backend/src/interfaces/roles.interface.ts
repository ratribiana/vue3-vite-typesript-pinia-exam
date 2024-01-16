interface Label {
  type: any;
  default?: any;
}

export interface Role {
  _id?: string;
  name: string;
  label: Label;
  isDeleted: number;
  permissions: object;
}

export interface DefaultPermissions {
  label: Label;
  create: object;
  read: object;
  update: object;
  remove: object;
  enabled: object;
  isDeleted: object;
}
