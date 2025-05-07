declare interface BoxContent {
  id: number;
  objectName: string;
  objectType: string;
  objectCustomType: string;
  objectImage: File | null;
  objectImageUrl: string;
}

declare interface Box {
  box_name: string;
  box_content: BoxContent[];
}

declare interface Place {
  place: string;
  boxes: Box[];
}
