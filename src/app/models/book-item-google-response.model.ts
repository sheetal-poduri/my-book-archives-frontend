import { VolumeInfo } from "./volume-info.model";

export class BookItemGoogleResponse {

    accessInfo: any[] = [];
    etag: string = "";
    id: string = "";
    kind: string = "";
    saleInfo: any[] = [];
    searchInfo: any[] = [];
    volumeInfo: VolumeInfo = new VolumeInfo();    

}
