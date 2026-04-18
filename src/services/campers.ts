import { CampersResponse, FilterState,  } from "@/types/types";

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
      return { campers: [], total: 0, page: 1, perPage: 4, totalPages: 0 };
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const fetchCamperById = async (id: string) => {
  const [camperRes, reviewsRes] = await Promise.all([
    fetch(`${BASE_URL}/campers/${id}`),
    fetch(`${BASE_URL}/campers/${id}/reviews`)
  ]);

  if (!camperRes.ok) throw new Error("Failed to fetch camper details");
  if (!reviewsRes.ok) throw new Error("Failed to fetch camper reviews");

  const camperData = await camperRes.json();
  const reviewsData = await reviewsRes.json();

  return {
    ...camperData,
    reviews: reviewsData,
  };
};

export const sendBookingRequest = async (
  camperId: string, 
  data: { name: string; email: string; date: string; comment?: string }
) => {
  const response = await fetch(`${BASE_URL}/campers/${camperId}/booking-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      bookingDate: data.date, 
      comment: data.comment,
    }),
  });

  if (!response.ok) {
    throw new Error(`Помилка бронювання: ${response.status}`);
  }

  return response.json();
};