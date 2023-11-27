import axios from "axios";

export const generateChatGPTResponse = async (data) => {
    let loginResponse
    await axios.post(`chatgpt/generate-response`, data)
      .then(res => {
        loginResponse = res;
      })
    return loginResponse
  }