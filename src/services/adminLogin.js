import axios from "axios";

// login response
export const adminLogin = async (data) => {
    let loginResponse
    await axios.post(`adminlog`, data)
        .then(res => {
            loginResponse = res.data;
        })
        .catch(err => console.log(err))
    return loginResponse
}