import React from "react";
import InputCustom from "../InputCustom/InputCustom";
import { Container, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

const PersonalInfoForm = () => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  return (
    <>
      <Typography variant="h5" mb={2} textAlign={"center"}>
        Datos personales
      </Typography>

      <Container>
        <InputCustom
          name="firstName"
          label="Nombre"
          type="text"
          control={control}
          defaultValue=""
          placeholder="eg: Laura"
          error={!!errors.firstName}
          messageError={errors.firstName?.message as string}
          onChange={async () => {
            trigger("firstName");
          }}
        />

        <InputCustom
          name="lastName"
          label="Apellido"
          type="text"
          control={control}
          defaultValue=""
          placeholder="eg: Martinez"
          error={!!errors.lastName}
          messageError={errors.lastName?.message as string}
          onChange={async () => {
            trigger("lastName");
          }}
        />

        <InputCustom
          name="email"
          label="Correo"
          type="email"
          control={control}
          defaultValue=""
          placeholder="eg: lauramartinez@gmail.com"
          error={!!errors.email}
          messageError={errors.email?.message as string}
          onChange={async () => {
            trigger("email");
          }}
        />
      </Container>
    </>
  );
};

export default PersonalInfoForm;
