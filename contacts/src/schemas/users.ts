import * as yup from "yup";

export const userLoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().max(150),
});

export const createUserSchema = yup.object().shape({
  first_name: yup.string().required().max(127),
  last_name: yup.string().required().max(127),
  email: yup.string().required().email().max(127),
  password: yup.string().required().max(150),
  phone: yup.string().required().min(11).max(11),
});
