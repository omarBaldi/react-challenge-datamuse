import { useCallback, useEffect, useRef, useState } from 'react';

export const usePromise = <T>({ promiseFn }: { promiseFn: () => Promise<T> }) => {
  const promiseFnToExecute = useRef<typeof promiseFn>(promiseFn);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasErrorOccurred, setHasErrorOccurred] = useState<boolean>(false);
  const [data, setData] = useState<T>();

  useEffect(() => {
    promiseFnToExecute.current = promiseFn;
  }, [promiseFn]);

  const executePromise = useCallback(() => {
    setIsLoading(true);

    promiseFnToExecute
      .current()
      .then(setData)
      .catch(() => setHasErrorOccurred(true))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    hasErrorOccurred,
    data,
    executePromise,
  };
};
