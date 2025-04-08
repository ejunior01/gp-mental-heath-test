import axios from "axios";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const ApiEndpoints = {
  surveyApiEndpoint: "survey",
  uploadSurveyApiEndpoint: "survey-upload",
};
