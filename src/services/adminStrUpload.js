import axios from "axios";

// get All Stratigy
export const getAllAdminStratigys = async () => {
  let stratigyResponse
  await axios.get(`adminStrategies/allStr`)
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}


// reqDelet get single Stratigy
export const getSingleAdminStratigys = async (id) => {
  let stratigyResponse
  await axios.get(`adminStrategies/allStr/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))

  return stratigyResponse;
}


// delet Stratigy
export const delAdminStratigys = async (id) => {
  let stratigyResponse
  let text = "Are you sure?";
  if (window.confirm(text) === true) {
    await axios.delete(`adminStrategies/${id}`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Stratigy save!")
  }
  return stratigyResponse;

}