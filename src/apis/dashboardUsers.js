import axios from "axios"



// Users response
export const getUsers = async (data) => {
    let userResponse
    await axios.get(`users`, data)
        .then(res => {
            userResponse = res
        })
    return userResponse;
}