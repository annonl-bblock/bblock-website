export interface IRoomType {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface IRoomTypeAll {
  id: string;
  name: string;
  description: string;
  capacity: number;
  square: number;
  price: number
  images: string[];
}

export interface IRoom {
  id: string;
  number: number;
  floor: number;
  type: IRoomType;
}
