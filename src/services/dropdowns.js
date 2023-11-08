import axios from "axios";

export const getAllGrades = async () => {
    let Response;
    await axios
      .get(`distinct/grades`)
      .then((res) => {
        Response = res;
      })
      .catch((err) => console.log(err));
    return Response;
  };
export const getAllSubjects = async (item) => {
  let Response;
  await axios
    .get(`distinct/subjects/${item}`)
    .then((res) => {
      Response = res;
    })
    .catch((err) => console.log(err));
  return Response;
};
  

export const getAllSuperTopics = async (grade,subject) => {
    let Response;
    await axios
      .get(`distinct/super-topic/${grade}/${subject}`)
      .then((res) => {
        Response = res;
      })
      .catch((err) => console.log(err));
    return Response;
  };

  export const getAllTopics = async (grade,subject,superTopic) => {
    let Response;
    await axios
      .get(`distinct/topics/${grade}/${subject}/${superTopic}`)
      .then((res) => {
        Response = res;
      })
      .catch((err) => console.log(err));
    return Response;
  };
  export const getAllSubTopics = async (grade,subject,superTopic,topic) => {
    let Response;
    await axios
      .get(`distinct/subtopics/${grade}/${subject}/${superTopic}/${topic}`)
      .then((res) => {
        Response = res;
      })
      .catch((err) => console.log(err));
    return Response;
  };
  export const getAllSubSubTopics = async (grade,subject,superTopic,topic,subtopic) => {
    let Response;
    await axios
      .get(`distinct/subsubtopics/${grade}/${subject}/${superTopic}/${topic}/${subtopic}`)
      .then((res) => {
        Response = res;
      })
      .catch((err) => console.log(err));
    return Response;
  };