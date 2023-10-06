import axios from "axios";

export const getUserStbyID = async (id,data) => {
  let stratigyResponse
  await axios.get(`userStratiges/byUser/${id}`, data)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

export const getUserCreated= async (id) => {
  let stratigyResponse
  await axios.get(`userStratiges/freshlyCreatedByUser/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;

}


export const PostUserCreated= async (id) => {
  let stratigyResponse
  await axios.put(`userStratiges/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;

}

export const delAllUsersSt = async (id) => {
    let stratigyResponse;
    await axios.delete(`userStratiges/str/:all`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
    return stratigyResponse;
  }