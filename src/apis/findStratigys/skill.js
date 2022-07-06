// get Stratigy
import axios from "axios"


export const getSkilleStratigy = async () => {
    let stratigyResponse
    await axios.get(`findStrategies/skill`)
        .then(res => {
            stratigyResponse = res.data
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const getSingleSkillStratigy = async (id) => {
    let stratigyResponse
    await axios.get(`findStrategies/skill/${id}`)
        .then(res => {
            stratigyResponse = res.data
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const postSkillStratigy = async (data) => {
    let stratigyResponse
    await axios.post(`findStrategies/skill`, data)
        .then(res => {
            stratigyResponse = res
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const deletSkillStratigy = async (id) => {
    let stratigyResponse
    let text = "Are you sure for delete?";
    if (window.confirm(text) === true) {
        await axios.delete(`findStrategies/skill/${id}`)
            .then(res => {
                stratigyResponse = res
            })
            .catch(err => console.log(err))
    } else {
        alert("Stratigy save!")
    }

    return stratigyResponse;
}

export const updateSkillStratigy = async (id, data) => {
    let stratigyResponse
    await axios.put(`findStrategies/skill/${id}`, data)
        .then(res => {
            stratigyResponse = res
            console.log(res);
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}