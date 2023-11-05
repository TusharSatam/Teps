import axios from "axios";

export const postResourceCard = async (data) => {
    console.log(data);
    await axios.post(`card/create`,data)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err))
  }
  export const getAllResource = async () => {
    let Response;
    await axios.get(`card/getall`)
      .then(res => {
        Response=res
      })
      .catch(err => console.log(err))
return Response
  }

  