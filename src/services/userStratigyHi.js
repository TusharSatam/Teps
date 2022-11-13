import axios from "axios";

// get Stratigy
export const postUserStratigysHi = async (data) => {
  let stratigyResponse
  await axios.post(`userHindiStratiges`, data)
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

// get Stratigy
export const getUserStratigysHi = async () => {
  let stratigyResponse
  await axios.get(`userHindiStratiges/allStr`)
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}