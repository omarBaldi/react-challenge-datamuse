import { useEffect, useState } from 'react';

export const useDebouncedValue = <T>(value: T) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(() => {
    return value;
  });

  useEffect(() => {
    const msToWait = 1000;
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, msToWait);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debouncedValue;
};
