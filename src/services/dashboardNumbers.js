import axios from "axios"



// getLastmonthLogin response
export const getLastmonthReg = async (month, year) => {
  let userResponse
  const headerData = {
    headers: {
      'month': month,
      'year': year
    }
  }
  await axios.get(`regDetails`, headerData)
    .then(res => {
      userResponse = res
    })
    .catch(err => console.log(err));
  return userResponse;
}

// getLastmonthLogin response
export const getLastmonthLogin = async (month, year) => {
  let userResponse
  const headerData = {
    headers: {
      'month': month,
      'year': year
    }
  }
  await axios.get(`logDetails`, headerData)
    .then(res => {
      userResponse = res
    })
    .catch(err => console.log(err));
  return userResponse;
}

// totalLikes response
export const getTotalLikes = async () => {
  let userResponse
  await axios.get(`totalLikeEn`)
    .then(res => {
      userResponse = res
    })
    .catch(err => console.log(err));
  return userResponse;
}
// totalSave response
export const getTotalSaves = async () => {
  let userResponse
  await axios.get(`totalSave`)
    .then(res => {
      userResponse = res
    })
    .catch(err => console.log(err));
  return userResponse;
}