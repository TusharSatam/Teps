import axios from "axios"



// get Stratigy
export const getStratigys = async (quiry) => {
  let stratigyResponse
  await axios.get(`strategies`, { params: { page: quiry } })
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

// get All Stratigy
export const getAllStratigys = async () => {
  let stratigyResponse
  await axios.get(`strategies/allStr`)
    .then(res => {
      stratigyResponse = res
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

// delet Stratigy
export const delStratigys = async (id) => {
  let stratigyResponse
  let text = "Are you sure you want to delete?";
  if (window.confirm(text) === true) {
    await axios.delete(`strategies/${id}`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Strategy saved!")
  }
  return stratigyResponse;

}
// delet multi Stratigy
export const multidelStratigys = async (ids) => {
  let stratigyResponse
  let text = "Are you sure you want to delete?";
  if (window.confirm(text) === true) {
    await axios.delete(`strategies/ch/${ids}`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Strategy saved!")
  }
  return stratigyResponse;
}

// All delet Stratigy
export const alldelStratigys = async (all) => {
  let stratigyResponse
  let text = "Are you sure you want to delete?";
  if (window.confirm(text) === true) {
    await axios.delete(`strategies/str/${all}`)
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
export const singleStratigys = async (id, data) => {
  let stratigyResponse
  await axios.get(`strategies/${id}`, data)
    .then(res => {
      stratigyResponse = res.data;
    })
    .catch(err => console.log(err))

  return stratigyResponse;

}
// Update Stratigy
export const updateStratigys = async (id, data) => {
  let stratigyResponse
  await axios.put(`strategies/${id}`, data)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))

  return stratigyResponse;

}

// reqDelet Stratigy
export const reqDeletStr = async (data, ids) => {
  let stratigyResponse
  let text = "Are you sure you want to delete?";
  if (window.confirm(text) === true) {
    const allId = {
      "reqDelId": ids,
      "reqDel": data
    }
    await axios.post(`supdel/reqDelet`, allId)
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
export const getreqDeletStr = async () => {
  let stratigyResponse
  await axios.get(`supdel/reqDelet`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))

  return stratigyResponse;

}

// reqDelet get Stratigy
export const getMultitStr = async (ids) => {
  let stratigyResponse
  await axios.get(`strategies/multi/${ids}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))

  return stratigyResponse;
}

// reqDelet get single Stratigy
export const getSingleDelStr = async (id) => {
  let stratigyResponse
  await axios.get(`supdel/reqDelet/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))

  return stratigyResponse;
}

// reqDelet update Stratigy
export const updatestrDeletRq = async (id, data) => {
  let stratigyResponse
  const allId = {
    "reqDel": data
  }
  await axios.put(`supdel/reqDelet/${id}`, allId)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))

  return stratigyResponse;
}

// All delet Stratigy
export const deletRequestArrayid = async (id) => {
  let stratigyResponse
  await axios.delete(`supdel/reqDelet/${id}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

export const postcomment = async (data) => {
  let stratigyResponse
  await axios.post(`comments`, data)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;
}

export const getComment = async () => {
  let stratigyResponse
  await axios.get(`comments`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;

}

export const updateComment = async (ids, data) => {
  let stratigyResponse
  await axios.put(`comments/${ids}`, data)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))
  return stratigyResponse;

}

export const delComments = async (id) => {
  let stratigyResponse
  let text = "Are you sure you want to delete?";
  if (window.confirm(text) === true) {
    await axios.delete(`comments/${id}`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Strategy saved!")
  }
  return stratigyResponse;
}

// delet multi Stratigy
export const multidelStratigysReq = async (id, ids) => {
  let stratigyResponse
  let text = "Are you sure you want to delete the strategy?";
  if (window.confirm(text) === true) {
    await axios.put(`supdel/reqDelet/single/${id}/${ids}`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Strategy saved!")
  }
  return stratigyResponse;
}

// delet multi Stratigy
export const multidelStratigysReqDeny = async (id, ids) => {
  let stratigyResponse
  let text = "Are you sure you want to keep the strategy?";
  if (window.confirm(text) === true) {
    await axios.put(`supdel/reqDelet/single/${id}/${ids}`)
      .then(res => {
        stratigyResponse = res;
      })
      .catch(err => console.log(err))
  } else {
    alert("Strategy saved!")
  }
  return stratigyResponse;
}

// delet multi Stratigy
export const multidelStratigysReqby = async (ids) => {
  let stratigyResponse
  await axios.delete(`strategies/ch/${ids}`)
    .then(res => {
      stratigyResponse = res;
    })
    .catch(err => console.log(err))

  return stratigyResponse;
}


export const getRatings = async (id) => {
  try {
    const response = await axios.get(`/rating/get/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // You can choose to handle or rethrow the error as needed
  }
};

export const postRating = async (data) => {
  try {
    const response = await axios.post('/rating/add', data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error; // You can choose to handle or rethrow the error as needed
  }
};


