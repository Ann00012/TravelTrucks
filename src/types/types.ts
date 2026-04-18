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
  campers: Camper[];
}

export interface GalleryImage {
  thumb: string;
  original: string;
}

export interface Review {
  id: string; 
  camperId: string; 
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string; 
}

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
  coverImage: string;
  totalReviews: number;
  gallery?: GalleryImage[]; 
  reviews?: Review[];       
}