import axios from "axios";

export const postLikes = async (data) => {
  let stratigyResponse
  await axios.post(`likes`, data)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

export const getLikes = async () => {
  let stratigyResponse
  await axios.get(`likes`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;

}

export const getLikesByUserId = async (id) => {
  let stratigyResponse
  await axios.get(`likes/byUser/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;

}


export const delLikes = async (id) => {
  let stratigyResponse;
  await axios.delete(`likes/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

export const delUserLikes = async (id) => {
  let stratigyResponse;
  await axios.delete(`likes/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}


export const unLikeByStratAndUserId = async (data) => {
  let stratigyResponse;
  await axios.put(`likes/unlike`,data)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}
