
import axios from "axios";

export const  ccavenuePayment = async (data) => {
    console.log(data);
    let Response
    await axios.post(`/payment/request`, data)
      .then(res => {
        Response = res;
      })
      .catch(err => console.log(err))
    return Response;
  }
  