import axios from "axios";

export const getUserDeviceAndBrowser = async () => {
  let stratigyResponse
  await axios.get(`userDeviceAndBrowser`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;

}