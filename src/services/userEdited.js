import axios from "axios";

export const postEdits = async (data) => {
  let stratigyResponse
  await axios.post(`userStratiges/`, data)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

export const getEdits = async (id) => {
  let stratigyResponse
  await axios.get(`userStratiges/editedByUser/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;

}
export const getSingleByUser = async (id) => {
  let stratigyResponse
  await axios.get(`userStratiges/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;

}
