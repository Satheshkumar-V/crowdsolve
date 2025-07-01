const axios = require("axios");
const Challenge = require("../models/Challenge");

const AGENT_BASE_URL = "http://localhost:8000/agent";

exports.getSuggestedTags = async (text) => {
  try {
    const res = await axios.post("http://localhost:8000/agent/suggest-tags", { content: text });
    return res.data.tags || [];
  } catch (err) {
    console.error("Tag Suggestion Error:", err.message);
    return [];
  }
};

// exports.extractTasks = async (solutionText) => {
//   try {
//     const res = await axios.post("http://localhost:8000/agent/extract-tasks", { solution: solutionText });
//     return res.data.tasks || [];
//   } catch (err) {
//     console.error("Task Extraction Error:", err.message);
//     return [];
//   }
// };

// exports.moderateContent = async (text) => {
//   try {
//     const res = await axios.post("http://localhost:8000/agent/moderate-content", { content: text });
//     return res.data.moderation_result || "safe";
//   } catch (err) {
//     console.error("Moderation Error:", err.message);
//     return "safe";
//   }
// };

exports.checkSimilarity = async (text) => {
  try {
    console.log("HERER")
    const res = await axios.post("http://localhost:8000/agent/check-similarity", { content: text });
    console.log("response:",res.data)
    return res.data.similar || [];

  } catch (err) {
    console.error("Similarity Check Error:", err.message);
    return [];
  }
};
