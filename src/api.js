import axios from "axios";
const baseUrl = `${process.env.REACT_APP_PROJECTS_API}/api`;

export const postfiles = ( file, config ) => {
  return axios.post(`${baseUrl}/postfiles`,
  file, config )
}
