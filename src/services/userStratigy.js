import axios from "axios";

// get Stratigy
export const postUserStratigys = async (data) => {
  let stratigyResponse
  await axios.post(`userStratiges`, data)
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

// get Stratigy
export const getUserStratigys = async () => {
  let stratigyResponse
  await axios.get(`userStratiges/allStr`)
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}