import axios from "axios";

export const postSaves = async (data) => {
  let stratigyResponse
  await axios.post(`saves`, data)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

export const getSaves = async () => {
  let stratigyResponse
  await axios.get(`saves`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;

}


export const delSaves = async (id) => {
  let stratigyResponse;
  await axios.delete(`saves/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

export const delUserSaves = async (id) => {
  let stratigyResponse;
  await axios.delete(`saves/user/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}
