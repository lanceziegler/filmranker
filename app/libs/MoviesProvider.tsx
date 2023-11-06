'use client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type ContextType = {
  array: any[];
  setArray: Dispatch<SetStateAction<any[]>>;
  watchListArray: any[];
  setWatchListArray: Dispatch<SetStateAction<any[]>>;
  tierListObject: {};
  setTierListObject: Dispatch<SetStateAction<any>>;
};

export const SavedMoviesContext = createContext<ContextType | undefined>(
  undefined
);

const MoviesProvider = ({ children }: { children: ReactNode }) => {
  const [array, setArray] = useState<any>([]);
  const [watchListArray, setWatchListArray] = useState<any>([]);
  const [tierListObject, setTierListObject] = useState<any>({
    s: [],
    a: [],
    b: [],
    c: [],
    d: [],
    f: [],
  });

  useEffect(() => {
    //@ts-ignore
    const parsedArray = JSON.parse(localStorage.getItem('myArray2')) || [];
    setArray(parsedArray);
    console.log('array: ', parsedArray);
    //@ts-ignore
    const parsedLocalWatchListArray =
      //@ts-ignore
      JSON.parse(localStorage.getItem('localStorageWatchList1')) || [];
    setWatchListArray(parsedLocalWatchListArray);
    console.log('watchListArray: ', watchListArray);
    //@ts-ignore
    const parsedLocalTierListObject =
      //@ts-ignore
      JSON.parse(localStorage.getItem('localStorageTierList1')) || [];
    setTierListObject(parsedLocalTierListObject);
    console.log('tierListObject: ', tierListObject);
  }, []);

  return (
    <SavedMoviesContext.Provider
      value={{
        array,
        setArray,
        watchListArray,
        setWatchListArray,
        tierListObject,
        setTierListObject,
      }}
    >
      {children}
    </SavedMoviesContext.Provider>
  );
};

export default MoviesProvider;
