import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export interface PropsCard {
  id: number;
  title: string;
  image: string;
}

export const ComicCard = ({ id, title, image }: PropsCard) => {
  const router = useRouter();

  const handleClickDetail = () => {
    router.push(`/comics/${id}`);
  };

  const handleClickComprar = () => {
    router.push({ pathname: `/checkout/`, query: { comicId: id } });
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <CardMedia component="img" alt={title} height="140" image={image} />
        <CardContent sx={{ height: "100%" }}>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button variant="outlined" size="small" onClick={handleClickDetail}>
            Ver detalles
          </Button>
          <Button variant="contained" size="small" onClick={handleClickComprar}>
            comprar
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
