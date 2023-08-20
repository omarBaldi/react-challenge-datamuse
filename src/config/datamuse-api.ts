import axios from 'axios';

export const DataMuseApiClient = axios.create({
  baseURL: 'https://api.datamuse.com',
});
