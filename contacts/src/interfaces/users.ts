export interface IUserLogin {
  email: string;
  password: string;
}

export interface ICreateUserBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUserData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: string;
}
