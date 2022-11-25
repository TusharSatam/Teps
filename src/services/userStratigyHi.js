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
export const getUserPaginationHindiStratigys = async (quiry) => {
  let stratigyResponse
  await axios.get(`userHindiStratiges`, { params: { page: quiry } })
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
// get Stratigy
export const singleUserHiStratigys = async (id) => {
  let stratigyResponse
  await axios.get(`userHindiStratiges/${id}`)
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

// Update Stratigy
export const updateUserStratigysHi = async (id, data) => {
  let stratigyResponse
  await axios.put(`userHindiStratiges/${id}`, data)
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}
// Update Stratigy
export const denyUserStratigysHi = async (id) => {
  let stratigyResponse
  await axios.delete(`userHindiStratiges/${id}`)
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

// delet Stratigy
export const delApproveUserStratigysHi = async (id) => {
  let stratigyResponse
  let text = "Are you sure you want to delete?";
  if (window.confirm(text) === true) {
    await axios.delete(`userHindiStratiges/${id}`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Stratigy save!")
  }
  return stratigyResponse;
}

// delet multi Stratigy
export const multidelUserStratigysHi = async (ids) => {
  let stratigyResponse
  let text = "Are you sure you want to delete?";
  if (window.confirm(text) === true) {
    await axios.delete(`userHindiStratiges/ch/${ids}`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Stratigy save!")
  }
  return stratigyResponse;
}