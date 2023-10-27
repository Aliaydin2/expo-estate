import { object, string, ref } from "yup";
const messages = {
  required: "Bu alan zorunludur.",
  email: "Geçerli bir email girin.",
  min: "En az 8 karakterli parola girin.",
  confirm: "Parolalar eşleşmiyor."
};
const Validations = object({
  username: string().required(messages.required),
  email: string().email(messages.email).required(messages.required),
  password: string().min(8, messages.min).required(messages.required),
  passwordconfirm: string()
    .oneOf([ref("password")],messages.confirm)
    .required(messages.required),
});
export default Validations;
