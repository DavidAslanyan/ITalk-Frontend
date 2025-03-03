import { API_URLS } from "@/app/utilities/constants/api-endpoints";
import axios from "axios";

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URLS.AUTH}/023a62e2-f89d-4954-9861-56466d8679c4`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data:", error);
    throw error; 
  }
}

