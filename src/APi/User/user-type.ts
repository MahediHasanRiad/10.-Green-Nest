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
  role: 'USER' | 'VENDOR' | 'ADMIN',
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
}

export interface decodedType {
  id: string;
  name: string;
  role: 'USER' | 'VENDOR' | 'ADMIN',
}

export interface ChangePassType {
  oldPassword: string;
  newPassword: string;
}