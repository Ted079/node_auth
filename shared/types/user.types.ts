export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  // location: string;
  // favorites: string[],
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: IUser;
}

export interface IUpdateUser {
  name: string;
  email: string;
  bio: string;
}
