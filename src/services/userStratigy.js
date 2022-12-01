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
export const getUserPaginationStratigys = async (quiry) => {
  let stratigyResponse
  await axios.get(`userStratiges`, { params: { page: quiry } })
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

// get Stratigy
export const singleUserEnStratigys = async (id) => {
  let stratigyResponse
  await axios.get(`userStratiges/${id}`)
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

// Update Stratigy
export const updateUserStratigys = async (id, data) => {
  let stratigyResponse
  await axios.put(`userStratiges/${id}`, data)
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}
// Update Stratigy
export const denyUserStratigys = async (id) => {
  let stratigyResponse
  await axios.delete(`userStratiges/${id}`)
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

// delet Stratigy
export const delApproveUserStratigys = async (id) => {
  let stratigyResponse
  let text = "Are you sure you want to delete?";
  if (window.confirm(text) === true) {
    await axios.delete(`userStratiges/${id}`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Strategy saved!")
  }
  return stratigyResponse;
}

// delet multi Stratigy
export const multidelUserStratigys = async (ids) => {
  let stratigyResponse
  let text = "Are you sure you want to delete?";
  if (window.confirm(text) === true) {
    await axios.delete(`userStratiges/ch/${ids}`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Strategy saved!")
  }
  return stratigyResponse;
}

// reqDelet get Stratigy
export const getMultiUsertStr = async (ids) => {
  let stratigyResponse
  await axios.get(`userStratiges/multi/${ids}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))

  return stratigyResponse;
}