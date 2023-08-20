import { useEffect, useState } from 'react';
import './App.css';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { getSynonyms } from './services/get-synonyms';

/**
 * @description
 * TODO: render results in DOM
 * TODO: create custom hook to handle API state (loading, error, data)
 */
function App() {
  const [inputBoxValue, setInputBoxValue] = useState<string>('');
  const debouncedInputBoxValue = useDebouncedValue(inputBoxValue);
  const [synonyms, setSynonyms] = useState<string[]>([]);

  const handleInputBoxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedInputBoxValue = e.target.value;
    setInputBoxValue(updatedInputBoxValue);
  };

  useEffect(() => {
    if (!debouncedInputBoxValue) return;

    getSynonyms({ keyToSearch: debouncedInputBoxValue })
      .then(setSynonyms)
      .catch(console.error);
  }, [debouncedInputBoxValue]);

  return (
    <>
      <input
        type='text'
        value={inputBoxValue}
        placeholder='Get synonyms...'
        onChange={handleInputBoxChange}
      />

      {synonyms.length > 0 &&
        synonyms.map((s) => {
          return <p key={s}>{s}</p>;
        })}
    </>
  );
}

export default App;
