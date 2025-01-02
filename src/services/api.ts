import axios, { AxiosError } from "axios";
import { SearchParams, ApiResponse } from "../types";

const API_BASE_URL = "https://api.dev.publinet.io";

export const fetchDisplays = async (
  params: SearchParams
): Promise<ApiResponse> => {
  try {
    console.log(
      "Sending request with params:",
      JSON.stringify(params, null, 2)
    );
    const response = await axios.get(`${API_BASE_URL}/displays/searchTest`, {
      params,
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
    });

    console.log("API Response:", JSON.stringify(response.data, null, 2));

    if (response.data.total === 0) {
      return {
        ...response.data,
        message:
          "No se encontraron resultados para la búsqueda. Por favor, intente con otros criterios.",
      };
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      console.error("API Error:", axiosError.response?.data);
      throw new Error(
        `Error en la búsqueda: ${
          axiosError.response?.data?.message || "Ocurrió un error desconocido"
        }`
      );
    }
    console.error("Unexpected error:", error);
    throw error;
  }
};
