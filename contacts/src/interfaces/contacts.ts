export interface IContactData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface IContactDataProp {
  data: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    createdAt: string;
  };
}

export interface ICreateContactBody {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}
