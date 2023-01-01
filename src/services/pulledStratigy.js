import axios from "axios";

export const postPulledStr = async (data) => {
  let stratigyResponse
  await axios.post(`pulledStr`, data)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

export const getPulledStr = async () => {
  let stratigyResponse
  await axios.get(`pulledStr`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;

}
export const averageTime = async () => {
  let stratigyResponse
  await axios.get(`pulledStr/averageTime`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;

}