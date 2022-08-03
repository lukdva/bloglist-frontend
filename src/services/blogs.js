import axios from 'axios'
const baseUrl = '/api/blogs'
let auth = null;

const setToken = (token) => {
  auth = `Bearer ${token}`;
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data;
}

const createNew = async (blog) => {
  const config =  {headers: {'Authorization': auth}}
  const response = await axios.post(baseUrl, blog, config);
  return response.data;

}
export default { getAll, createNew, setToken }