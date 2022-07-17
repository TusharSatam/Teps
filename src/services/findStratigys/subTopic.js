// get Stratigy
import axios from "axios"


export const getSubTopicStratigy = async () => {
    let stratigyResponse
    await axios.get(`findStrategies/sub-topic`)
        .then(res => {
            stratigyResponse = res.data
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const getSingleSSubTopicStratigy = async (id) => {
    let stratigyResponse
    await axios.get(`findStrategies/sub-topic/${id}`)
        .then(res => {
            stratigyResponse = res.data
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const postSubTopicStratigy = async (data) => {
    let stratigyResponse
    await axios.post(`findStrategies/sub-topic`, data)
        .then(res => {
            stratigyResponse = res
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const deletSubTopicStratigy = async (id) => {
    let stratigyResponse
    let text = "Are you sure for delete?";
    if (window.confirm(text) === true) {
        await axios.delete(`findStrategies/sub-topic/${id}`)
            .then(res => {
                stratigyResponse = res
            })
            .catch(err => console.log(err))
    } else {
        alert("Stratigy save!")
    }

    return stratigyResponse;
}

export const updateSubTopicStratigy = async (id, data) => {
    let stratigyResponse
    await axios.put(`findStrategies/sub-topic/${id}`, data)
        .then(res => {
            stratigyResponse = res
            console.log(res);
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}