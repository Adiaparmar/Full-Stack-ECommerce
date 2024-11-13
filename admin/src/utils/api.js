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
    const response = await axios.post("http://localhost:4000" + url, formData);
    return response.data; // Ensure this returns the uploaded image filenames
  } catch (error) {
    console.log(error);
    return null; // Return null on error to avoid undefined issues
  }
};

// export const postData = async (url, formData) => {
//   try {
//     const { res } = await axios.post("http://localhost:4000" + url, formData);
//     return res;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

export const editData = async (url, updatedData) => {
  try {
    const response = await axios.put(
      `http://localhost:4000${url}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    return error.response?.data || error.message;
  }
};

export const deleteData = async (url) => {
  const { res } = await axios.delete(`http://localhost:4000${url}`);
  return res;
};
