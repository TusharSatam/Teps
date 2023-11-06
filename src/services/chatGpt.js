import axios from "axios";

export const generateChatGPTResponse = async (data) => {
    let loginResponse
    await axios.post(`openai/generate-response`, data)
      .then(res => {
        loginResponse = res;
      })
    return loginResponse
  }