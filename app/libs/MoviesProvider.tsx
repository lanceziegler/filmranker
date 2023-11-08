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

type TierListObjectType = {
  s: any[]; // Define the type for each tier array
  a: any[];
  b: any[];
  c: any[];
  d: any[];
  f: any[];
};

export const SavedMoviesContext = createContext<ContextType | undefined>(
  undefined
);

//TODO: Iterate through tierListObject property arrays to see if movie exists before moving, adding, or removing element
/*
const containsElement1 = Object.values(tierListObject).some(array => array.includes(1));

if (containsElement1) {
  console.log('tierListObject contains the element 1 in one of its arrays.');
} else {
  console.log('tierListObject does not contain the element 1 in any of its arrays.');
}
*/
const MoviesProvider = ({ children }: { children: ReactNode }) => {
  const [array, setArray] = useState<any>([]);
  const [watchListArray, setWatchListArray] = useState<any>([]);
  const [tierListObject, setTierListObject] = useState<TierListObjectType>({
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
      JSON.parse(localStorage.getItem('localStorageWatchList')) || [];
    setWatchListArray(parsedLocalWatchListArray);
    console.log('watchListArray: ', watchListArray);
    //@ts-ignore
    const parsedLocalTierListObject =
      //@ts-ignore
      JSON.parse(localStorage.getItem('localStorageTierList')) || {
        s: [],
        a: [],
        b: [],
        c: [],
        d: [],
        f: [],
      };
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
