import axios from "axios"


// Register response
export const userRegister = async (data) => {
  let regResponse
  await axios.post(`reg`, data)
    .then(res => {
      regResponse = res;
    })
  return regResponse
}

// login response
export const userLogin = async (data) => {
  let loginResponse
  await axios.post(`signin`, data)
    .then(res => {
      loginResponse = res.data;
    })
  return loginResponse
}

export const sendOTP = async (data) => {
  console.log(data);
  let loginResponse
  await axios.post(`otp/sendOTP`, data)
    .then(res => {
      loginResponse = res.data;
    })
  return loginResponse
}

export const verifyOTP = async (data) => {
  let loginResponse
  await axios.post(`signin/otp`, data)
    .then(res => {
      loginResponse = res.data;
    })
  return loginResponse
}

// update user info
export const updateInfo = async (id, data) => {
  let updateResponse;
  await axios.put(`users/${id}`, data)
    .then(res => {
      updateResponse = res.data;
    })
    .catch(err => console.log(err));
  return updateResponse;
}

