import * as yup from "yup";

export const schema = yup.object({
  firstName: yup
    .string()
    .required("El nombre es requerido")
    .min(2, "Mínimo 3 caracteres")
    .max(10, "Máximo 10 caracteres"),
  lastName: yup
    .string()
    .required("El apellido es requerido")
    .min(2, "Mínimo 5 caracteres")
    .max(10, "Máximo 10 caracteres"),
  email: yup
    .string()
    .required("El email es requerido")
    .email("El correo no es válido")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ser un email valido"),

  address: yup
    .string()
    .required("La dirección es requerida")
    .min(5, "Mínimo 5 caracteres")
    .max(30, "Máximo 30 caracteres"),
  department: yup.string().notRequired(),
  city: yup.string().required("La ciudad es requerida"),
  province: yup.string().required("La provincia es requerida"),
  postalCode: yup.string().required("El código postal es requerido"),

  number: yup
    .string()
    .matches(/^[0-9]{16}$/, "El número de la tarjeta debe tener 16 dígitos")
    .required("El número de la tarjeta es requerido"),
  name: yup
    .string()
    .required("El nombre que figura en la tarjeta es requerido"),
  expiry: yup
    .string()
    .matches(
      /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
      "fecha de expiración inválida (MM/YY)"
    )
    .required("La fecha de expiración es requerido"),
  cvc: yup
    .string()
    .matches(/^[0-9]{3}$/, "el código de seguridad debe tener 3 dígitos")
    .required("El código de seguridad es requerido"),
});
