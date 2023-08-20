import { useState } from 'react';
import './App.css';

/**
 * @description
 * TODO: add input box element to the DOM
 * TODO: implement debounce logic that will be used to call API endpoint
 * TODO: create axios instance + create API service to get synonyms based on key searched
 * TODO: render results in DOM
 * TODO: create custom hook to handle API state (loading, error, data)
 */
function App() {
  const [inputBoxValue, setInputBoxValue] = useState<string>('');

  const handleInputBoxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedInputBoxValue = e.target.value;
    setInputBoxValue(updatedInputBoxValue);
  };

  return (
    <>
      <input
        type='text'
        value={inputBoxValue}
        placeholder='Get synonyms...'
        onChange={handleInputBoxChange}
      />
    </>
  );
}

export default App;
