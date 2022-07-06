// get Stratigy
import axios from "axios"


export const getSubSubTopicStratigy = async () => {
    let stratigyResponse
    await axios.get(`findStrategies/sub-sub-topic`)
        .then(res => {
            stratigyResponse = res.data
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const getSingleSubSubTopicStratigy = async (id) => {
    let stratigyResponse
    await axios.get(`findStrategies/sub-sub-topic/${id}`)
        .then(res => {
            stratigyResponse = res.data
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const postSubSubTopicStratigy = async (data) => {
    let stratigyResponse
    await axios.post(`findStrategies/sub-sub-topic`, data)
        .then(res => {
            stratigyResponse = res
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const deletSubSubTopicStratigy = async (id) => {
    let stratigyResponse
    let text = "Are you sure for delete?";
    if (window.confirm(text) === true) {
        await axios.delete(`findStrategies/sub-sub-topic/${id}`)
            .then(res => {
                stratigyResponse = res
            })
            .catch(err => console.log(err))
    } else {
        alert("Stratigy save!")
    }

    return stratigyResponse;
}

export const updateSubSubTopicStratigy = async (id, data) => {
    let stratigyResponse
    await axios.put(`findStrategies/sub-sub-topic/${id}`, data)
        .then(res => {
            stratigyResponse = res
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}