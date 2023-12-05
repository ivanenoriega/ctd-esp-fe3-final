import { Container } from "@mui/material";
import { IComic } from "contracts/comics.contract";
import ComicDetail from "dh-marvel/components/comic/ComicDetail";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { toFrontComic, toFrontComics } from "mappers/comic.mapper";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

interface PropsComic {
  comic: IComic;
}

const ComicsPage: NextPage<PropsComic> = ({ comic }) => {
  const router = useRouter();

  const handleClickToBy = () => {
    router.push({ pathname: `/checkout/`, query: { comicId: comic.id } });
  };

  const handleClickGoBack = () => {
    router.push("/");
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
        <ComicDetail
          comic={comic}
          onBuyClick={handleClickToBy}
          onGoBackClick={handleClickGoBack}
        />
      </Container>
    </LayoutGeneral>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = Number(params?.id);

  try {
    const comicApi = await getComic(id);

    const comic = toFrontComic(comicApi);

    return {
      props: {
        comic,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("No se pudo obtener el comic", error);
    return {
      props: {
        comic: {},
      },
    };
  }
};

export async function getStaticPaths() {
  const comicsApi = await getComics();
  const comics = toFrontComics(comicsApi.data);

  const paths = comics.comics.map((comic) => ({
    params: { id: comic.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export default ComicsPage;
