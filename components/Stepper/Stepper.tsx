import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const StepperForm = ({ activeStep }: { activeStep: number }) => {
  const steps = ["personalData", "AdressData", "PaymentData"];
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperForm;
