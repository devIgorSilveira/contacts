import * as yup from "yup";

export const createContactSchema = yup.object().shape({
  first_name: yup.string().required().max(127),
  last_name: yup.string().required().max(127),
  email: yup.string().required().email().max(127),
  phone: yup.string().required().min(11).max(11),
});
