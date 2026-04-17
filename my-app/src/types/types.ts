// types/camper.ts

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[];
  createdAt: string;
  updatedAt: string;
  coverImage: string; // Ось де наша картинка!
  totalReviews: number; // Ось де кількість відгуків!
}

export interface FilterState {
  location: string;
  form: string;
  engine: string;
  transmission: string;
}

export interface FetchCampersParams extends Partial<FilterState> {
  page?: number;
  limit?: number;
}

export interface CampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[]; // Масив тепер називається campers
}