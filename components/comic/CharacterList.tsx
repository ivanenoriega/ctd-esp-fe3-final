import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { AccordionDetails, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NextLink from "next/link";
import { ResourceCharacter } from "contracts/comics.contract";

interface PropsCharacters {
  characters: ResourceCharacter[];
}

const CharacterList = ({ characters }: PropsCharacters) => {
  const withoutCharacter = characters.length > 0;
  const [expand, setExpand] = useState(false);

  return (
    <Accordion expanded={expand} onChange={() => setExpand(!expand)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="secondary" />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ color: "text.secondary", margin: "0 auto" }}>
          {withoutCharacter
            ? "Selecciona un personaje:"
            : "Sin personajes disponibles"}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {characters.map((character) => (
          <Typography key={character.name}>
            <NextLink
              href={`/personajes/${character.resourceUri.split("/").pop()}`}
              passHref
            >
              {character.name}
            </NextLink>
          </Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default CharacterList;
