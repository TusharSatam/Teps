import axios from "axios"



// get Stratigy
export const getStratigys = async (quiry) => {
  let stratigyResponse
  await axios.get(`strategies`, { params: { page: quiry } })
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

// get All Stratigy
export const getAllStratigys = async () => {
  let stratigyResponse
  await axios.get(`strategies/allStr`)
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

// delet Stratigy
export const delStratigys = async (id) => {
  let stratigyResponse
  let text = "Are you sure for delete?";
  if (window.confirm(text) === true) {
    await axios.delete(`strategies/${id}`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Stratigy save!")
  }
  return stratigyResponse;

}

// get single Stratigy
export const singleStratigys = async (id, data) => {
  let stratigyResponse
  await axios.get(`strategies/${id}`, data)
    .then(res => {
      stratigyResponse = res.data;
    })
    .catch(err => console.log(err))

  return stratigyResponse;

}
// Update Stratigy
export const updateStratigys = async (id, data) => {
  let stratigyResponse
  await axios.put(`strategies/${id}`, data)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))

  return stratigyResponse;

}