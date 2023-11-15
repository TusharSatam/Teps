import axios from "axios";

export const updateTemplate = async (data,name) => {
  try {
    const response = await axios.put(`template/${name}`, data);
    return response;
  } catch (error) {
    console.error('Error creating template:', error);
    return null;
  }
};

export const getAllTemplates = async () => {
  let response
  await axios.get(`template/getAll`)
    .then(res => {
      response = res;
    })
    .catch(err => console.log(err))
  return response;

}