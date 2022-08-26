import { VolumeInfo } from "./volume-info.model";

export interface BookItemGoogleResponse {

    accessInfo: any[];
    etag: string;
    id: string;
    kind: string;
    saleInfo: any[];
    searchInfo: any[];
    volumeInfo: VolumeInfo;    

}
