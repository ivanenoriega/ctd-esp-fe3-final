import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import {
  Alert,
  Container,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { IComic } from "contracts/comics.contract";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from "../../components/rules/index";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Forms from "dh-marvel/components/Form/Forms";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toFrontComic } from "mappers/comic.mapper";
import confetti from "canvas-confetti";
import { RawCheckoutRequest } from "contracts/checkout.contract";
import { toApiCheckout } from "mappers/checkout.mapper";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import Cookies from "js-cookie";
import Spinner from "dh-marvel/components/Spinner/Spinner";
import BuyingComicDetail from "dh-marvel/components/comicCard/BuyingComicDetail";

const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const { comicId } = router.query;
  const [comicData, setComicData] = useState<IComic | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickGoBack = () => {
    router.back();
  };

  type DataForm = yup.InferType<typeof schema>;

  const methods = useForm<DataForm>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const getComicById = async (id: number) => {
    const response = await fetch(`/api/comics/${id}`);
    const result = await response.json();
    return result;
  };

  useEffect(() => {
    const id = Number(comicId);
    if (comicId) {
      getComicById(id).then((res) => {
        const resApic = toFrontComic(res);
        setComicData(resApic);
      });
    } else {
      router.push("/");
    }
  }, [comicId, router]);

  const onSubmit = async (data: any) => {
    if (!comicData) {
      return;
    }
    const _data: RawCheckoutRequest = {
      ...data,
      comicName: comicData.title,
      comicImage: comicData.image,
      comicPrice: comicData.price,
    };
    const request = toApiCheckout(_data);

    try {
      const response = await fetch(`/api/checkout`, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const parseRes = await response.json();
      if (response.ok) {
        confetti({
          zIndex: 999,
          particleCount: 100,
          spread: 160,
          angle: -100,
          origin: {
            x: 1,
            y: 0,
          },
        });
        Cookies.set("access", "true");
        router.push(
          {
            pathname: "/confirmacion-compra",
            query: {
              comicName: parseRes.data.order.name,
              comicImage: parseRes.data.order.image,
              comicPrice: parseRes.data.order.price,
              address: parseRes.data.customer.address.address1,
            },
          },
          "/confirmacion-compra"
        );
      } else {
        setErrorMessage(parseRes.message as string);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <LayoutCheckout>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {!!comicData ? (
            <>
              <ArrowBackIcon
                fontSize="large"
                color="secondary"
                onClick={handleClickGoBack}
                sx={{
                  cursor: "pointer",
                  position: "absolute",
                  "@media (max-width: 768px)": {
                    display: "none",
                  },
                }}
              />
              <Typography variant="h4" align="center" mt={2}>
                Formulario de compra
              </Typography>

              <Grid
                container
                spacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BuyingComicDetail comic={comicData} />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={8}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  {comicData?.stock > 0 ? (
                    <FormProvider {...methods}>
                      <Forms onSubmit={onSubmit} />
                    </FormProvider>
                  ) : (
                    <Typography variant="h4" align="center" mt={2}>
                      sin stock, lo lamentamos 😣
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </>
          ) : (
            <Spinner />
          )}
        </Paper>
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage("")}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setErrorMessage("")}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </LayoutCheckout>
  );
};

export default CheckoutPage;
