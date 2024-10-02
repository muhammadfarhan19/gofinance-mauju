export interface ProductType {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export type CategoryType =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";
