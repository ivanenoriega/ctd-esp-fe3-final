import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputText } from "./input/input";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { deliveryInfoSchema as schema } from "./rules/verification";
import { DeliveryInfo } from "dh-marvel/interfaces/types";
import useOrderContext from "context/context";

interface Props {
  prevStep: () => void;
  nextStep: () => void;
}

const DeliveryInfo = ({ prevStep, nextStep }: Props) => {
  const {
    order: { buyer },
    setOrder,
  } = useOrderContext();
  type DataForm = yup.InferType<typeof schema>;

  const { control, handleSubmit, setValue } = useForm<DataForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    if (buyer && buyer.deliveryInfo) {
      const deliveryInfoData = buyer.deliveryInfo;

      setValue("address", deliveryInfoData.address);
      setValue("address2", deliveryInfoData.address2);
      setValue("city", deliveryInfoData.city);
      setValue("province", deliveryInfoData.province);
      setValue("zip", deliveryInfoData.zip);
    }
  }, [buyer, setValue]);

  const onSubmit = (data: DeliveryInfo) => {
    setOrder((prevOrder) => {
      return {
        ...prevOrder,
        buyer: { ...prevOrder.buyer, deliveryInfo: data },
      };
    });

    nextStep();
  };

  return (
    <>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputText
          control={control}
          name="address"
          label="Dirección"
          type="text"
          defaultValue=""
        />

        <FormInputText
          control={control}
          name="address2"
          label="Departamento, piso, etc..."
          type="text"
          defaultValue=""
        />

        <FormInputText
          control={control}
          name="city"
          label="Ciudad"
          type="text"
          defaultValue=""
        />

        <FormInputText
          control={control}
          name="province"
          label="Provincia"
          type="text"
          defaultValue=""
        />

        <FormInputText
          control={control}
          name="zip"
          label="Código Postal"
          type="text"
          defaultValue=""
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <Button onClick={() => prevStep()}>Anterior</Button>
          <Button type="submit">Siguiente</Button>
        </Box>
      </form>
    </>
  );
};

export default DeliveryInfo;
