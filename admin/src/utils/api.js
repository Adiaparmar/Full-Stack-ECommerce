import axios from "axios";

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get("http://localhost:4000" + url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postData = async (url, formData) => {
  try {
    const { res } = await axios.post("http://localhost:4000" + url, formData);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editData = async (url, updatedData) => {
  const { res } = await axios.put(`http://localhost:4000${url}`, updatedData);
  return res;
};

export const deleteData = async (url) => {
  const { res } = await axios.delete(`http://localhost:4000${url}`);
  return res;
};
