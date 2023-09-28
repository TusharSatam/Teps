import axios from "axios"


// Users response
export const getUsers = async () => {
  let userResponse
  await axios.get(`users`)
    .then(res => {
      userResponse = res
    })
    .catch(err => console.log(err));
  return userResponse;
}

// SingleUser response
export const getSingleUser = async (id) => {
  let userResponse
  await axios.get(`users/${id}`,)
    .then(res => {
      userResponse = res;
    })
  return userResponse;
}

// update user info
export const updateUser = async (id, data) => {

  let updateResponse;
  await axios.put(`users/${id}`, data)
    .then(res => {
      updateResponse = res.data;
    })
    .catch(err => console.log(err));
  return updateResponse;
}
// Delet user 
export const deletUser = async (id) => {
  let deletResponse;
  let text = "Are you sure you want to delete?";
  if (window.confirm(text) === true) {
    await axios.delete(`users/${id}`)
      .then(res => {
        deletResponse = res;
      })
      .catch(err => console.log(err));
  }
  else {
    alert("User save!")
  }
  return deletResponse;
}

// reqDelet get Stratigy
export const getMultitUser = async (ids) => {
  let stratigyResponse
  await axios.get(`users/multi/${ids}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))

  return stratigyResponse;
}