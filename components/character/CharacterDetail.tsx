import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ICharacter } from "contracts/character.contract";
import React from "react";

interface PropsCharacter {
  character: ICharacter;
  onGoBackClick: () => void;
}

const CharacterDetail = ({ character, onGoBackClick }: PropsCharacter) => {
  return (
    <Card>
      <CardContent>
        <ArrowBackIcon
          fontSize="large"
          color="secondary"
          onClick={onGoBackClick}
          sx={{
            cursor: "pointer",
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
              alt={character.name}
              height="250"
              image={character.image}
              title={character.name}
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
              <Typography variant="h6">Personaje</Typography>
              <Typography
                variant="h4"
                color="secondary"
                sx={{
                  "@media (max-width: 768px)": {
                    fontSize: "24px",
                  },
                }}
              >
                {character.name}
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
            <Typography mb={2}>{character.description}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CharacterDetail;
