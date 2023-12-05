import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import ComicGrid from "dh-marvel/components/ComicGrid/ComicGrid";
import { getComics } from "dh-marvel/services/marvel/marvel.service";
import { toFrontComics } from "mappers/comic.mapper";
import ComicPagination from "dh-marvel/components/Pagination/ComicPagination";
import { IPaginatedComic } from "contracts/comics.contract";
import { useRouter } from "next/router";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

interface Props {
  data: IPaginatedComic;
}

const pageSize = 12;

const Index: NextPage<Props> = ({ data }) => {
  const router = useRouter();

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    router.push(`/?page=${page}`);
  };

  return (
    <>
      <Head>
        <title>Comics online</title>
        <meta
          name="description"
          content="Explora nuestra tienda de cómics en línea y descubre una amplia gama de cómics nuevos y clásicos. Encuentra tus héroes favoritos, historias emocionantes y ediciones limitadas. ¡Compra cómics en línea con facilidad y disfruta de la aventura en cada página!"
        />
        <meta
          name="keywords"
          content="cómics, tienda de cómics, cómics en línea, cómics nuevos, cómics clásicos, héroes de cómics, ediciones limitadas, aventuras en cómics, comprar cómics"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <LayoutGeneral>
        <BodySingle title={"Comics"}>
          <ComicGrid comics={data.comics} />
          <ComicPagination
            handleChange={handlePageChange}
            count={Math.ceil(data.meta.total / pageSize)}
          />
        </BodySingle>
      </LayoutGeneral>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const page = Number(query.page ?? 1);
  const comicsApi = await getComics(page, pageSize);

  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate");

  const data = toFrontComics(comicsApi.data);

  return {
    props: {
      data,
    },
  };
};

export default Index;
