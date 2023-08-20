import axios from 'axios';
import { SynonymData } from './../services/get-synonyms';

export const DataMuseApiClient = axios.create({
  baseURL: 'https://api.datamuse.com',
});

/**
 * @description
 * This will store all the previous synonyms retrieved
 * from the previous requests made for specific keys.
 *
 * Map<keysSearched, synonymsList[]> -> Map<string, SynonymData[]>
 */
const cacheResults = new Map<string, SynonymData[]>();

DataMuseApiClient.interceptors.request.use((config) => {
  const keyToSearch = config.params['ml'] as string | undefined;
  const previousCachedResults = cacheResults.get(keyToSearch ?? '');

  if (typeof previousCachedResults !== 'undefined') {
    return Promise.resolve({ ...config, data: previousCachedResults });
  }

  return config;
});

DataMuseApiClient.interceptors.response.use((response) => {
  const keySearched = response.config.params['ml'] as string | undefined;

  if (keySearched) {
    cacheResults.set(keySearched, response.data);
  }

  return response;
});
