// get Stratigy
import axios from "axios"


export const getGradeStratigy = async () => {
    let stratigyResponse
    await axios.get(`findStrategies/grade`)
        .then(res => {
            stratigyResponse = res.data
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const getSingleGradeStratigy = async (id) => {
    let stratigyResponse
    await axios.get(`findStrategies/grade/${id}`)
        .then(res => {
            stratigyResponse = res.data
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const postGradeStratigy = async (data) => {
    let stratigyResponse
    await axios.post(`findStrategies/grade`, data)
        .then(res => {
            stratigyResponse = res
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

export const deletGradeStratigy = async (id) => {
    let stratigyResponse
    let text = "Are you sure for delete?";
    if (window.confirm(text) === true) {
        await axios.delete(`findStrategies/grade/${id}`)
            .then(res => {
                stratigyResponse = res
            })
            .catch(err => console.log(err))
    } else {
        alert("Stratigy save!")
    }

    return stratigyResponse;
}

export const updateGradeStratigy = async (id, data) => {
    let stratigyResponse
    await axios.put(`findStrategies/grade/${id}`, data)
        .then(res => {
            stratigyResponse = res
            console.log(res);
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}