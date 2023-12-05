export interface IComic {
    id: number;
    title: string;
    image: string;
    description: string[];
    price: number;
    oldPrice?: number;
    characters: ResourceCharacter[];
    stock: number;
    pageCount: number;
  }
  
  export interface ApiComics {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Result[];
  }
  
  export interface ApiComic extends Result {}
  
  export interface ResourceCharacter {
    resourceUri: string;
    name: string;
  }
  
  export interface IMetadata {
    offset: number;
    limit: number;
    total: number;
    count: number;
  }
  
  export interface IPaginatedComic {
    comics: IComic[];
    meta: IMetadata;
  }
  
  export interface Result {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description: string;
    modified: string;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    textObjects: TextObjet[];
    resourceURI: string;
    urls: Url[];
    series: Series;
    variants: Variant[];
    collections: any[];
    collectedIssues: any[];
    dates: Date[];
    prices: Price[];
    thumbnail: Thumbnail;
    images: any[];
    creators: Creators;
    characters: Characters;
    stories: Stories;
    events: Events;
    price?: number;
    oldPrice?: number;
    stock?: number;
  }
  
  export interface Url {
    type: string;
    url: string;
  }
  
  export interface Series {
    resourceURI: string;
    name: string;
  }
  
  export interface Variant {
    resourceURI: string;
    name: string;
  }
  
  export interface Date {
    type: string;
    date: string;
  }
  
  export interface Price {
    type: string;
    price: number;
  }
  
  export interface Thumbnail {
    path: string;
    extension: string;
  }
  
  export interface TextObjet {
    type: string;
    language: string;
    text: string;
  }
  
  export interface Creators {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
  }
  
  export interface Item {
    resourceURI: string;
    name: string;
    role: string;
  }
  
  export interface Characters {
    available: number;
    collectionURI: string;
    items: Item2[];
    returned: number;
  }
  
  export interface Stories {
    available: number;
    collectionURI: string;
    items: Item2[];
    returned: number;
  }
  
  export interface Item2 {
    resourceURI: string;
    name: string;
    type: string;
  }
  
  export interface Events {
    available: number;
    collectionURI: string;
    items: any[];
    returned: number;
  }
  