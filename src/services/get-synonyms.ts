import { DataMuseApiClient } from '../config/datamuse-api';

interface SynonymData {
  word: string;
  score: number;
  tags: string[];
}

export const getSynonyms = ({ keyToSearch }: { keyToSearch: string }) => {
  return DataMuseApiClient<SynonymData[]>({
    method: 'GET',
    url: '/words',
    params: {
      ml: keyToSearch,
    },
  }).then(({ data: synonyms }) => synonyms.map(({ word }) => word));
};
