import { Box, Paper, Button } from "@mui/material";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import PersonalInfoForm from "./PersonalInfoForm";
import StepperForm from "../Stepper/Stepper";
import AdressInfoForm from "./AdressInfoForm";
import PaymentInfoForm from "./PaymentInfoForm";

const initialData = {
  personalData: {
    firstName: "",
    lastName: "",
    email: "",
  },
  addressData: {
    address: "",
    department: "",
    city: "",
    province: "",
    postalCode: "",
  },
  paymentData: {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  },
};

const Forms = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const {
    handleSubmit,
    trigger,
    getFieldState,
    clearErrors,
    getValues,
    formState,
  } = useFormContext();

  const [data, setData] = useState(initialData);

  const [currentStep, setCurrentStep] = useState(1);

  const onNextStep = async () => {
    trigger().then(() => {
      if (currentStep === 1) {
        const firstName = getFieldState("firstName");
        const lastName = getFieldState("lastName");
        const email = getFieldState("email");

        const inputs = [firstName, lastName, email];

        const hasErrors = inputs.some((input) => input.invalid);

        if (hasErrors) {
          return;
        }

        const updatedData = {
          ...data,
          personalData: {
            firstName: getValues("firstName"),
            lastName: getValues("lastName"),
            email: getValues("email"),
          },
        };
        setData(updatedData);
      }
      if (currentStep === 2) {
        const address = getFieldState("address");
        const department = getFieldState("department");
        const province = getFieldState("province");
        const city = getFieldState("city");
        const postalCode = getFieldState("postalCode");

        const inputs = [address, department, province, city, postalCode];

        const hasErrors = inputs.some((input) => input.invalid);

        if (hasErrors) {
          return;
        }

        const updatedData = {
          ...data,
          addressData: {
            address: getValues("address"),
            department: getValues("department"),
            province: getValues("province"),
            city: getValues("city"),
            postalCode: getValues("postalCode"),
          },
        };
        setData(updatedData);
      }
      if (currentStep === 3) {
        const cardNumber = getFieldState("cardNumber");
        const cardHolderName = getFieldState("cardHolderName");
        const expirationDate = getFieldState("expirationDate");
        const securityCode = getFieldState("securityCode");

        const inputs = [
          cardNumber,
          cardHolderName,
          expirationDate,
          securityCode,
        ];

        const hasErrors = inputs.some((input) => input.invalid);

        if (hasErrors) {
          return;
        }

        const updatedData = {
          ...data,
          paymentData: {
            number: getValues("number"),
            name: getValues("name"),
            expiry: getValues("expiry"),
            cvc: getValues("cvc"),
          },
        };
        setData(updatedData);
      }
      setCurrentStep(currentStep + 1);
      clearErrors();
    });
  };

  const onPreviousStep = () => {
    if (currentStep === 1) {
      return;
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Box sx={{ maxWidth: "500px" }}>
      <Paper
        elevation={1}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Box sx={{ marginTop: "20px" }}>
          <StepperForm activeStep={currentStep - 1} />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && <PersonalInfoForm />}
          {currentStep === 2 && <AdressInfoForm />}
          {currentStep === 3 && <PaymentInfoForm />}

          <Box
            sx={{
              margin: "10px 15px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              sx={{ opacity: currentStep === 1 ? 0 : 100 }}
              onClick={onPreviousStep}
            >
              Anterior
            </Button>

            <Button
              variant="outlined"
              sx={{ opacity: currentStep === 3 ? 0 : 100 }}
              onClick={onNextStep}
            >
              Siguiente
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ display: currentStep === 3 ? "block" : "none" }}
            >
              Enviar
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Forms;
