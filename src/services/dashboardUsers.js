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
        .catch(err => console.log(err));
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
    await axios.delete(`users/${id}`)
        .then(res => {
            deletResponse = res.data;
        })
        .catch(err => console.log(err));
    return deletResponse;
}