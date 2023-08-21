import { useCallback, useEffect, useReducer, useRef } from 'react';

type ApiState<T> = {
  isLoading: boolean;
  hasErrorOccurred: boolean;
  data: T | undefined;
};

export const usePromise = <T>({ promiseFn }: { promiseFn: () => Promise<T> }) => {
  const promiseFnToExecute = useRef<typeof promiseFn>(promiseFn);

  const initialState: ApiState<T> = {
    isLoading: false,
    hasErrorOccurred: false,
    data: undefined,
  };

  const [{ isLoading, hasErrorOccurred, data }, setApiState] = useReducer(
    (state: typeof initialState, newState: Partial<typeof initialState>) => {
      return {
        ...state,
        ...newState,
      };
    },
    initialState
  );

  useEffect(() => {
    promiseFnToExecute.current = promiseFn;
  }, [promiseFn]);

  const executePromise = useCallback(() => {
    setApiState({ isLoading: true });

    promiseFnToExecute
      .current()
      .then((data) => setApiState({ data }))
      .catch(() => setApiState({ hasErrorOccurred: true }))
      .finally(() => setApiState({ isLoading: false }));
  }, []);

  return {
    isLoading,
    hasErrorOccurred,
    data,
    executePromise,
  };
};
