import { Container } from "@mui/material";
import { ICharacter } from "contracts/character.contract";
import CharacterDetail from "dh-marvel/components/character/CharacterDetail";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { getCharacter } from "dh-marvel/services/marvel/marvel.service";
import { toFrontCharacter } from "mappers/character.mapper";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

interface PropsCharacter {
  character: ICharacter;
}

const CharacterPage: NextPage<PropsCharacter> = ({ character }) => {
  const router = useRouter();

  const handleClickGoBack = () => {
    router.back();
  };

  return (
    <LayoutGeneral>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <CharacterDetail
          character={character}
          onGoBackClick={handleClickGoBack}
        />
      </Container>
    </LayoutGeneral>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.params?.id);
  const characterApi = await getCharacter(id);
  const character = toFrontCharacter(characterApi);

  return {
    props: {
      character,
    },
  };
};

export default CharacterPage;
