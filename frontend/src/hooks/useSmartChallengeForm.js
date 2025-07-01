
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSmartChallengeForm = (challengeData) => {
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [similarChallenges, setSimilarChallenges] = useState([]);
  const [taskSuggestions, setTaskSuggestions] = useState([]);
  const [loadingTags, setLoadingTags] = useState(false);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);

  useEffect(() => {
    if (challengeData.description.trim().length > 20) {
    //   fetchSuggestedTags();
      fetchSimilarChallenges();
    }
  }, [challengeData.description]);

  const fetchSuggestedTags = async () => {
    setLoadingTags(true);
    try {
      const res = await axios.post("http://localhost:8000/agent/suggest-tags", {
        content: challengeData.description
      });
      setSuggestedTags(res.data.tags);
    } catch (error) {
      console.error("Tag suggestion error", error);
      setSuggestedTags([]);
    }
    setLoadingTags(false);
  };

  const fetchSimilarChallenges = async () => {
    setLoadingSimilar(true);
    try {
      const res = await axios.post("http://localhost:8000/agent/check-similarity", {
        content: challengeData.description
      });
      setSimilarChallenges(res.data.similar);
    } catch (error) {
      console.error("Similarity check error", error);
      setSimilarChallenges([]);
    }
    setLoadingSimilar(false);
  };

  const fetchTaskSuggestions = async () => {
    setLoadingTasks(true);
    try {
      const res = await axios.post("http://localhost:8000/agent/extract-tasks", {
        solution: challengeData.description
      });
      setTaskSuggestions(res.data.tasks || []);
    } catch (error) {
      console.error("Task extraction error", error);
      setTaskSuggestions([]);
    }
    setLoadingTasks(false);
  };

  return {
    suggestedTags,
    similarChallenges,
    taskSuggestions,
    fetchTaskSuggestions,
    loadingTags,
    loadingSimilar,
    loadingTasks
  };
};
