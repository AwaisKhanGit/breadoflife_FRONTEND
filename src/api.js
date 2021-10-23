import axios from "axios";

export const BASE_URL = "http://localhost:3001/";

export const END_POINTS = {
  GET_EVENTS: "events",
};

export const authAxois = axios.create({
  BASE_URL: BASE_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("L_T"),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  },
});

export const createApiEndPoints = (endPoint) => {
  let url = BASE_URL + endPoint;
  return {
    fetch: () => authAxois.get(url),
    create: (newRecord) => authAxois.post(url, newRecord),
    delete: (deletedRecord) => authAxois.delete(url, deletedRecord),
    deleteFromParams: () => authAxois.delete(url),
    update: (editedRecord) => authAxois.put(url, editedRecord),
  };
};
