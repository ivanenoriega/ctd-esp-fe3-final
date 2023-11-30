import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getCharacter } from "services/marvel/marvel.service";
import { getComic} from "services/marvel/marvel.service"
import { Character } from "interfaces/types";
import CharacterDetail from "components/characterDetail/characterDetail";
import LayoutGeneral from "components/layouts/layout-general";

interface Props {
  character: Character;
}

const CharacterPage = ({ character }: Props) => {
  return (
    <LayoutGeneral>
      <Head>
        <title>Detalle de personaje</title>
        <meta name="description" content="Página de descripción de personaje" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CharacterDetail character={character} />
    </LayoutGeneral>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: any = await  getComic();

  const paths = data.map((character: any) => {
    return { params: { id: character.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = parseInt(params?.id as string);
  const character = await getCharacter(id);

  return {
    props: {
      character,
    },
    revalidate: 60,
  };
};

export default CharacterPage;
