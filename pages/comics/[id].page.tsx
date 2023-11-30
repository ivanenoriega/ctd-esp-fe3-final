import Box from "@mui/material/Box";
import useOrderContext from "context/context";
import LayoutGeneral from "components/layouts/layout-general";
import CharactersGrid from "components/characterGrid/characterGrid";
import ComicCard from "components/comicCard/comicCard";
import ComicDetails from "components/comicDetail/comicDetail";
import { Character } from "interfaces/types";
import { Comic } from "interfaces/types";
import { getComic, getCharacter} from "services/marvel/marvel.service";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";

interface Props {
  comic: Comic;
  characters: Character[];
}

const ComicPage = ({ comic, characters }: Props) => {
  const { resetOrder } = useOrderContext();

  useEffect(() => {
    resetOrder();
  }, []);

  return (
    <LayoutGeneral>
      <Head>
        <title>{comic.title}</title>
        <meta name="description" content="Página de detalle de cómic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          p={5}
        >
          <ComicCard {...comic} />
          <ComicDetails comic={comic} />
        </Box>
        <CharactersGrid characters={characters} />
      </Box>
    </LayoutGeneral>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = Number(params?.id);

  try {
    const comic = await getComic(id);
    const characters = await getCharacter(id);

    return {
      props: {
        comic,
        characters,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        comic: {},
      },
    };
  }
};

export default ComicPage;
