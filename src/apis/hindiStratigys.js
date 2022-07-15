import axios from "axios"



// get Stratigy
export const getHindiStratigys = async (quiry) => {
    let stratigyResponse
    await axios.get(`hindstrategies`, { params: { page: quiry } })
        .then(res => {
            stratigyResponse = res
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

// get All Stratigy
export const getAllHindiStratigys = async () => {
    let stratigyResponse
    await axios.get(`hindstrategies/allStr`)
        .then(res => {
            stratigyResponse = res
        })
        .catch(err => console.log(err))
    return stratigyResponse;
}

// delet Stratigy
export const delHindiStratigys = async (id) => {
    let stratigyResponse
    let text = "Are you sure for delete?";
    if (window.confirm(text) === true) {
        await axios.delete(`hindstrategies/${id}`)
            .then(res => {
                stratigyResponse = res;
            })
            .catch(err => console.log(err))
    } else {
        alert("Stratigy save!")
    }
    return stratigyResponse;

}

// get single Stratigy
export const singleHindiStratigys = async (id, data) => {
    let stratigyResponse
    await axios.get(`hindstrategies/${id}`, data)
        .then(res => {
            stratigyResponse = res.data;
        })
        .catch(err => console.log(err))

    return stratigyResponse;

}
// Update Stratigy
export const updateHindiStratigys = async (id, data) => {
    let stratigyResponse
    await axios.put(`hindstrategies/${id}`, data)
        .then(res => {
            stratigyResponse = res;
        })
        .catch(err => console.log(err))

    return stratigyResponse;

}