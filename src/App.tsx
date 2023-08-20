import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { usePromise } from './hooks/usePromise';
import { getSynonyms } from './services/get-synonyms';

function App() {
  const [inputBoxValue, setInputBoxValue] = useState<string>('');
  const debouncedInputBoxValue = useDebouncedValue(inputBoxValue);

  /**
   * @description
   * To prevent creating a new function reference on every re-render
   * we can use useCallback to only creating a new one when debounced
   * value changes and ensure a performance optimization.
   */
  const memoizedPromiseFn = useCallback(() => {
    return getSynonyms({ keyToSearch: debouncedInputBoxValue });
  }, [debouncedInputBoxValue]);

  const {
    isLoading,
    hasErrorOccurred,
    data: synonyms = [],
    executePromise: startSearchingForSynonyms,
  } = usePromise({
    promiseFn: memoizedPromiseFn,
  });

  const handleInputBoxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedInputBoxValue = e.target.value;
    setInputBoxValue(updatedInputBoxValue);
  };

  useEffect(() => {
    if (debouncedInputBoxValue) {
      startSearchingForSynonyms();
    }
  }, [debouncedInputBoxValue, startSearchingForSynonyms]);

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
