export interface QueryType {
  page?: number;
  limit?: number;
  sortBy?: 'asc' | 'desc';
  sortType?: string;
  search?: string;
}

export interface UserType {
  readonly id: string;
  name: string;
  email: string;
  role: 'User' | 'Vendor' | 'Admin',
  status: 'Pending' | 'Rejected' | 'Accepted'
}

export interface decodedType {
  id: string;
  name: string;
  role: 'User' | 'Vendor' | 'Admin'
}

export interface ChangePassType {
  oldPassword: string;
  newPassword: string;
}