import { ApiCharacter, ICharacter } from "contracts/character.contract";

export const toFrontCharacter = (character: ApiCharacter): ICharacter => {
  return {
    id: character.id,
    name: character.name,
    image: character.thumbnail.path + "." + character.thumbnail.extension,
    description: character.description || "No description available",
    resourceURI: character.resourceURI,
  };
};
