import axios from "axios";

export const totalLogins = async () => {
  let stratigyResponse
  await axios.get(`totalLogins`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;

}