import { Paper, Typography, Grid, CardMedia, Box, Button } from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface PropsConfirmation {
  comicName: string;
  comicImage: string;
  address: string;
  price: string;
  onGoBackClick: () => void;
}

const PurchaseConfirmation = ({
  comicName,
  comicImage,
  address,
  price,
  onGoBackClick,
}: PropsConfirmation) => {
  return (
    <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "green" }} />
      <Typography
        variant="h4"
        color="green"
        gutterBottom
        mb={3}
        sx={{
          "@media (max-width: 768px)": {
            fontSize: "24px",
          },
        }}
      >
        ¡Que disfrutes tu compra!
      </Typography>

      <Grid
        container
        justifyContent="center"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12} sm={6}>
          <CardMedia
            component="img"
            alt={comicName}
            height="250"
            image={comicImage}
            title={comicName}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          <Typography variant="h6">Comic Comprado:</Typography>
          <Typography
            variant="h4"
            color="secondary"
            mb={2}
            sx={{
              "@media (max-width: 768px)": {
                fontSize: "24px",
              },
            }}
          >
            {comicName}
          </Typography>
          <Typography variant="h6">Importe abonado:</Typography>
          <Typography variant="h4">${price}</Typography>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          <Typography variant="h6">Dirección de entrega:</Typography>
          <Typography variant="h5">{address}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onGoBackClick}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "150px",
              marginTop: "30px",
              "@media (max-width: 768px)": {
                width: "100%",
              },
            }}
          >
            volver al inicio
          </Button>
        </Box>
      </Grid>
    </Paper>
  );
};

export default PurchaseConfirmation;
