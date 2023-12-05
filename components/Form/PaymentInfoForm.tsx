import { Box, Container, Typography } from "@mui/material";
import React, { useState, ChangeEvent, FocusEvent } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import InputCustom from "../InputCustom/InputCustom";
import { useFormContext } from "react-hook-form";

interface cardState {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus?: string;
}

const PaymentInfoForm = () => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  const [state, setState] = useState<cardState>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  return (
    <>
      <Typography variant="h5" mb={2} textAlign={"center"}>
        Datos de pago
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          margin: "15px 0px",
        }}
      >
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus as Focused}
        />
      </Box>

      <Container>
        <InputCustom
          name="number"
          label="Número de la tarjeta"
          type="text"
          control={control}
          defaultValue=""
          placeholder="eg: 4242424242424242"
          error={!!errors.number}
          messageError={errors.number?.message as string}
          onChange={async (e) => {
            trigger("number");
            handleInputChange(e);
          }}
          onFocus={handleInputFocus}
        />

        <InputCustom
          name="name"
          label="Nombre del titular"
          type="text"
          control={control}
          defaultValue=""
          placeholder="eg: Laura Martinez"
          error={!!errors.name}
          messageError={errors.name?.message as string}
          onChange={async (e) => {
            trigger("name");
            handleInputChange(e);
          }}
          onFocus={handleInputFocus}
        />
        <InputCustom
          name="expiry"
          label="Fecha de expiración"
          type="text"
          control={control}
          defaultValue=""
          placeholder="eg: 12/26"
          error={!!errors.expiry}
          messageError={errors.expiry?.message as string}
          onChange={async (e) => {
            trigger("expiry");
            handleInputChange(e);
          }}
          onFocus={handleInputFocus}
        />

        <InputCustom
          name="cvc"
          label="código de seguridad"
          type="password"
          control={control}
          defaultValue=""
          placeholder="eg: 123"
          error={!!errors.cvc}
          messageError={errors.cvc?.message as string}
          onChange={async (e) => {
            trigger("cvc");
            handleInputChange(e);
          }}
          onFocus={handleInputFocus}
        />
      </Container>
    </>
  );
};

export default PaymentInfoForm;
