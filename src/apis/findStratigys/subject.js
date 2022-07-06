// get Stratigy
import axios from "axios"


export const getSubStratigy = async () => {
    let stratigyResponse
    await axios.get(`findStrategies/subject`)
        .then(res => {
            stratigyResponse = res.data
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const getSingleSubStratigy = async (id) => {
    let stratigyResponse
    await axios.get(`findStrategies/subject/${id}`)
        .then(res => {
            stratigyResponse = res.data
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const postSubStratigy = async (data) => {
    let stratigyResponse
    await axios.post(`findStrategies/subject`, data)
        .then(res => {
            stratigyResponse = res
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const deletSubStratigy = async (id) => {
    let stratigyResponse
    let text = "Are you sure for delete?";
    if (window.confirm(text) === true) {
        await axios.delete(`findStrategies/subject/${id}`)
            .then(res => {
                stratigyResponse = res
            })
            .catch(err => console.log(err))
    } else {
        alert("Stratigy save!")
    }

    return stratigyResponse;
}

export const updateSubStratigy = async (id, data) => {
    let stratigyResponse
    await axios.put(`findStrategies/subject/${id}`, data)
        .then(res => {
            stratigyResponse = res
            console.log(res);
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}