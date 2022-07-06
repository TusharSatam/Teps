// get Stratigy
import axios from "axios"


export const getTopicStratigy = async () => {
    let stratigyResponse
    await axios.get(`findStrategies/topic`)
        .then(res => {
            stratigyResponse = res.data
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const getSingleSTopicStratigy = async (id) => {
    let stratigyResponse
    await axios.get(`findStrategies/topic/${id}`)
        .then(res => {
            stratigyResponse = res.data
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const postTopicStratigy = async (data) => {
    let stratigyResponse
    await axios.post(`findStrategies/topic`, data)
        .then(res => {
            stratigyResponse = res
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const deletTopicStratigy = async (id) => {
    let stratigyResponse
    let text = "Are you sure for delete?";
    if (window.confirm(text) === true) {
        await axios.delete(`findStrategies/topic/${id}`)
            .then(res => {
                stratigyResponse = res
            })
            .catch(err => console.log(err))
    } else {
        alert("Stratigy save!")
    }

    return stratigyResponse;
}

export const updateTopicStratigy = async (id, data) => {
    let stratigyResponse
    await axios.put(`findStrategies/topic/${id}`, data)
        .then(res => {
            stratigyResponse = res
            console.log(res);
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}