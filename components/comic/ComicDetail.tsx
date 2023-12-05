import React from "react";
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { Button } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { IComic } from "contracts/comics.contract";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CharacterList from "./CharacterList";

interface PropsDetail {
  comic: IComic;
  onBuyClick: () => void;
  onGoBackClick: () => void;
}

const ComicDetail = ({ comic, onBuyClick, onGoBackClick }: PropsDetail) => {
  const isOutOfStock = comic?.stock === 0;

  return (
    <Card>
      <CardContent
        sx={{
          position: "relative",
        }}
      >
        <ArrowBackIcon
          fontSize="large"
          color="secondary"
          onClick={onGoBackClick}
          sx={{
            cursor: "pointer",
            position: "absolute",
            "@media (max-width: 768px)": {
              display: "none",
            },
          }}
        />

        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
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
            <CardMedia
              component="img"
              alt={comic.title}
              height="350"
              image={comic.image}
              title={comic.title}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Box mb={2}>
              <Typography variant="h6">Comic</Typography>
              <Typography
                variant="h4"
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

              {comic.oldPrice && (
                <Typography mb={2} variant="body2" color="secondary">
                  Precio anterior: ${comic.oldPrice}
                </Typography>
              )}

              <Typography variant="h6">Disponible:</Typography>
              <Typography variant="h5">
                {isOutOfStock ? "Sin stock" : comic.stock + " unidades"}
              </Typography>
            </Box>

            <Typography variant="h6">Detalles:</Typography>
            <hr
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#ccc",
                margin: "5px 0",
              }}
            />
            <Typography mb={2}>{comic.description}</Typography>

            <CharacterList characters={comic.characters} />

            <Box
              mt={2}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={onBuyClick}
                disabled={isOutOfStock}
                sx={{
                  width: "150px",
                  "@media (max-width: 768px)": {
                    width: "100%",
                  },
                }}
              >
                {isOutOfStock ? "Sin stock" : "Comprar"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ComicDetail;
