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
  let text = "Are you sure you want to delete?";
  if (window.confirm(text) === true) {
    await axios.delete(`hindstrategies/${id}`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Strategy saved!")
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


// delet multi Stratigy
export const multidelHiStratigys = async (ids) => {
  let stratigyResponse
  let text = "Are you sure you want to delete?";
  if (window.confirm(text) === true) {
    await axios.delete(`hindstrategies/ch/${ids}`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Strategy saved!")
  }
  return stratigyResponse;
}

// get multi stratigy
export const getMultitHiStr = async (ids) => {
  let stratigyResponse
  await axios.get(`hindstrategies/multi/${ids}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))

  return stratigyResponse;
}

// reqDelet Stratigy
export const reqDeletHiStr = async (data, ids) => {
  let stratigyResponse
  let text = "Are you sure you want to delete?";
  if (window.confirm(text) === true) {
    const allId = {
      "reqDelId": ids,
      "reqDel": data
    }
    await axios.post(`supdelHi/reqDelet`, allId)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Strategy saved!")
  }
  return stratigyResponse;

}
// reqDelet Stratigy
export const getreqDeletHiStr = async () => {
  let stratigyResponse
  await axios.get(`supdelHi/reqDelet`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))

  return stratigyResponse;

}
// reqDelet get single Stratigy
export const getSingleDelStrHi = async (id) => {
  let stratigyResponse
  await axios.get(`supdelHi/reqDelet/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))

  return stratigyResponse;
}
// All delet Stratigy
export const deletRequestArrayidHi = async (id) => {
  let stratigyResponse
  await axios.delete(`supdelHi/reqDelet/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}