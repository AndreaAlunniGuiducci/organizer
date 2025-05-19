declare interface BoxContent {
  id: number;
  objectName: string;
  objectType: string;
  objectCustomType: string;
  objectImage: File | null;
  objectImageUrl: string;
}

declare interface FilterObj {
  name: string;
  type: string;
  customType: string;
}

declare interface Box {
  box_name: string;
  box_content: BoxContent[];
}

declare interface Place {
  place: string;
  boxes: Box[];
}
