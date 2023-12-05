import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { IComic } from "contracts/comics.contract";
import React from "react";

interface PropsComicDetail {
  comic: IComic;
}

const BuyingComicDetail = ({ comic }: PropsComicDetail) => {
  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          alt={comic.title}
          height="200"
          image={comic.image}
          title={comic.title}
        />

        <Box mb={2}>
          <Typography
            variant="h5"
            color="secondary"
            sx={{
              "@media (max-width: 768px)": {
                fontSize: "24px",
              },
            }}
          >
            {comic.title}
          </Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="h6" color="success">
            Precio:
          </Typography>
          <Typography variant="h4">${comic.price}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BuyingComicDetail;
