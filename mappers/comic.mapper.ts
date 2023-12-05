import {
    ApiComic,
    ApiComics,
    IComic,
    IPaginatedComic,
  } from "contracts/comics.contract";
  
  export const toFrontComics = (data: ApiComics): IPaginatedComic => {
    return {
      comics: data.results.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.thumbnail.path + "." + item.thumbnail.extension,
        description:
          item.textObjects.map((item) => item.text) ||
          "No hay descripción disponible",
        price: item.prices[0]?.price || 0,
        characters: item.characters.items.map((character) => ({
          name: character.name,
          resourceUri: character.resourceURI,
        })),
        stock: item.stock || 0,
        pageCount: item.pageCount,
      })),
      meta: { ...data },
    };
  };
  
  export const toFrontComic = (data: ApiComic): IComic => {
    return {
      id: data.id,
      title: data.title,
      image: data.thumbnail.path + "." + data.thumbnail.extension,
      description:
        data.textObjects.map((item) => item.text) ||
        "No hay descripción disponible",
      price: data.price || 0,
      oldPrice: data.oldPrice || 0,
      characters: data.characters.items.map((character) => ({
        name: character.name,
        resourceUri: character.resourceURI,
      })),
      stock: data.stock || 0,
      pageCount: data.pageCount,
    };
  };
  