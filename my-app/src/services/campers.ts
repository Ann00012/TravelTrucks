import { CampersResponse, FilterState,Camper } from "@/types/types";

const BASE_URL = "https://campers-api.goit.study";

interface FetchParams extends Partial<FilterState> {
  page: number;
  limit: number;
}

export const fetchCampersData = async (
  paramsObj: FetchParams
): Promise<CampersResponse> => {
  const params = new URLSearchParams();

  params.append("page", paramsObj.page.toString());
  params.append("limit", paramsObj.limit.toString());

  if (paramsObj.location) params.append("location", paramsObj.location);
  if (paramsObj.form) params.append("form", paramsObj.form);
  if (paramsObj.engine) params.append("engine", paramsObj.engine);
  if (paramsObj.transmission) params.append("transmission", paramsObj.transmission);

  const response = await fetch(`${BASE_URL}/campers?${params.toString()}`);

  if (!response.ok) {
    if (response.status === 404) {
      // Обробляємо випадок, коли за фільтрами нічого не знайдено
      return { campers: [], total: 0, page: 1, perPage: 4, totalPages: 0 };
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const fetchCamperById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/campers/${id}`);
  if (!response.ok) throw new Error("Failed to fetch camper details");
  return response.json();
};
export const sendBookingRequest = async (data: { name: string; email: string; date: string; comment?: string }) => {
  console.log("Booking data sent:", data);
  return { success: true };
};