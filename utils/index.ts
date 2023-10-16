import axios from "axios";
import { useEffect } from "react";

export const getDepartments = async () => {
  const response = await axios.get(process.env.BACKEND_URL + "department/list");
  return response;
};
