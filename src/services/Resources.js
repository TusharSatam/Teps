import axios from "axios";

export const postResourceCard = async (data) => {
  console.log(data);
  await axios
    .post(`card/create`, data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};
export const getAllResource = async () => {
  let Response;
  await axios
    .get(`card/getall`)
    .then((res) => {
      Response = res;
    })
    .catch((err) => console.log(err));
  return Response;
};
export const getResource = async (id) => {
    let Response;
    await axios
      .get(`card/${id}`)
      .then((res) => {
        Response = res;
      })
      .catch((err) => console.log(err));
    return Response;
  };

export const delResource = async (id) => {
    let Response;
    await axios.delete(`card/${id}`)
      .then(res => {
        Response = res;
      })
      .catch(err => console.log(err))
    return Response;
  }

  export const updateResource = async (id, data) => {
    console.log(data);
      let updateResponse;
      await axios.put(`card/${id}`, data)
        .then(res => {
          updateResponse = res.data;
        })
        .catch(err => console.log(err));
      return updateResponse;
    }
