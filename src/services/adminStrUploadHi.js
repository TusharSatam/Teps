import axios from "axios";

// get All Stratigy
export const getAllAdminStratigysHi = async () => {
  let stratigyResponse
  await axios.get(`adminStrategiesHi/allStr`)
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

// reqDelet get single Stratigy
export const getSingleAdminStratigysHi = async (id) => {
  let stratigyResponse
  await axios.get(`adminStrategiesHi/allStr/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))

  return stratigyResponse;
}


// delet Stratigy
export const delAdminStratigysHi = async (id) => {
  let stratigyResponse
  let text = "Are you sure?";
  if (window.confirm(text) === true) {
    await axios.delete(`adminStrategiesHi/${id}`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Strategy saved!")
  }
  return stratigyResponse;

}