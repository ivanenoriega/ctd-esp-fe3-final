import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import React from "react";
import { ComicCard, PropsCard } from "../comicCard/comicCard";

interface PropsGrid {
  comics: PropsCard[];
}

const ComicGrid = ({ comics }: PropsGrid) => {
  return (
    <Container sx={{ paddingTop: "20px", paddingBottom: "30px" }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {comics &&
          comics.map((comic) => (
            <Grid key={comic.id} item xs={12} sm={6} md={3}>
              <ComicCard
                id={comic.id}
                title={comic.title}
                image={comic.image}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ComicGrid;
