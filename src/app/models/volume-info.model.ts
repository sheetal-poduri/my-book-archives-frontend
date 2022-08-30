import { ImageLinks } from "./image-links.model";

export class VolumeInfo {

    authors: string[] = [];
    categories: string[] = [];
    description: string = "";
    imageLinks: ImageLinks = new ImageLinks();
    language: string = "";
    publisher: string = "";
    title: string = "";

}

