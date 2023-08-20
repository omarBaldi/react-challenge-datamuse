import { useEffect, useState } from 'react';

const defaultMsToWait = 1000;

export const useDebouncedValue = <T>(value: T, msToWait = defaultMsToWait) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(() => {
    return value;
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, msToWait);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, msToWait]);

  return debouncedValue;
};
