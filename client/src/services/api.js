import axios from "axios";

export const fetchUsers = async (filters) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URI}/users/`, {
      params: filters,
    });
    // console.log("RESPONSE", response);
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchEngagementScore = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URI}/users/engagement-score`
    );
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const fetchActiveUsers = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URI}/users/active-users`
    );
    // console.log("active", response.data.data);

    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchRetentionRate = async (startDate, endDate) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URI
      }/users/retention-rate?startDate=${startDate}&endDate=${endDate}`
    );

    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchChurnPrediction = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URI}/users/churn-prediction`
    );
    // console.log("RET", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchAIInsights = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URI}/users/ai-insights`
    );
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
};
