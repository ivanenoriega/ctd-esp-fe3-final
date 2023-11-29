import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Character } from "dh-marvel/interfaces/types";
import CharacterCard from "../characterCard/characterCard";
import styles from "./characterGrid.module.css"

interface Props {
  characters: Character[];
}

const CharactersGrid = ({ characters }: Props) => {
  return (
    <>
      <Typography variant="h4" className={styles.title}>
        Personajes presentes ({characters.length})
      </Typography>
      <Grid
        container
        columns={{ xs: 4, sm: 9, md: 12, xl: 12 }}
        className={styles.grid}
      >
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </Grid>
    </>
  );
};

export default CharactersGrid;
