import { useEffect, useState } from 'react';
import './App.css';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { usePromise } from './hooks/usePromise';
import { getSynonyms } from './services/get-synonyms';

function App() {
  const [inputBoxValue, setInputBoxValue] = useState<string>('');
  const debouncedInputBoxValue = useDebouncedValue(inputBoxValue);

  const {
    isLoading,
    hasErrorOccurred,
    data: synonyms = [],
    executePromise: startSearchingForSynonyms,
  } = usePromise({
    promiseFn: () => getSynonyms({ keyToSearch: debouncedInputBoxValue }),
  });

  const handleInputBoxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedInputBoxValue = e.target.value;
    setInputBoxValue(updatedInputBoxValue);
  };

  useEffect(() => {
    if (!debouncedInputBoxValue) return;

    startSearchingForSynonyms();
  }, [debouncedInputBoxValue]);

  return (
    <>
      <input
        type='text'
        value={inputBoxValue}
        placeholder='Get synonyms...'
        onChange={handleInputBoxChange}
      />

      {isLoading ? (
        <div>Loading...</div>
      ) : hasErrorOccurred ? (
        <div>An error occurred! Try it again later.</div>
      ) : synonyms.length > 0 ? (
        synonyms.map((s) => <p key={s}>{s}</p>)
      ) : null}
    </>
  );
}

export default App;
