import { BookItemGoogleResponse } from "./book-item-google-response.model";

export interface BookGoogleResponse {

    kind: string;
    totalItems: number;
    items: BookItemGoogleResponse[];

}
