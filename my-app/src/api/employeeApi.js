import axios from "axios";

const API_URL =
  "https://backend.jotish.in/backend_dev/gettabledata.php";

export const fetchEmployees = async () => {
  const response = await axios.post(API_URL, {
    username: "test",
    password: "123456",
  });

  return response.data.TABLE_DATA.data;
};