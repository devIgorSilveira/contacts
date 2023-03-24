import * as yup from "yup";

export const userLoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().max(150),
});
