import axios from 'axios';
const api = axios.create({
    baseURL:'https://chatbot-rna.herokuapp.com/api/v1'
});
export default api;
