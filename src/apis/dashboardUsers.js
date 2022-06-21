import axios from "axios"



// Users response
export const getUsers = async () => {
    let userResponse
    await axios.get(`users`)
        .then(res => {
            userResponse = res
        })
    return userResponse;
}

// SingleUser response
export const getSingleUser = async (id) => {
    let userResponse
    await axios.get(`users`,)
        .then(res => {
            userResponse = res
        })
    return userResponse;
}

// Update User response
export const updateUser = async (id) => {
    let userResponse
    await axios.put(`users`,)
        .then(res => {
            userResponse = res
        })
    return userResponse;
}