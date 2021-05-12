import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export const api = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: { "content-type": "application/json" }
})

export const restAPICalls = () => {
   
    const request = async ({ method, endpoint, body = {} }) => {
      try {
        switch (method) {
          case "GET": {
            const res = await api.get(endpoint, body);
            return res.data;
          }
          case "POST": {
            const res = await api.post(endpoint, body);
            return res.data;
          }
          case "PUT": {
            const res = await api.put(endpoint, body);
            return res.data;
          }
          case "DELETE": {
            const res = await api.delete(endpoint);
            return res.data;
          }
          default:
            return null;
        }
      } catch (error) {
        console.error(error);
      }
    };
    return { request };
  };
  