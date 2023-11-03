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
  array: any[]; // Specify the appropriate type for array
  setArray: Dispatch<SetStateAction<any[]>>; // Specify the appropriate type for setArray
};

export const SavedMoviesContext = createContext<ContextType | undefined>(
  undefined
);

const MoviesProvider = ({ children }: { children: ReactNode }) => {
  const [array, setArray] = useState<any>([]);
  const [watchListArray, setWatchListArray] = useState([]);
  const [tierListObject, setTierListObject] = useState({
    s: [],
    a: [],
    b: [],
    c: [],
    d: [],
    f: [],
  });

  useEffect(() => {
    //@ts-ignore
    const parsedArray = JSON.parse(localStorage.getItem('myArray1')) || [];
    setArray(parsedArray);
    console.log('THIS IS STATE: ', parsedArray);
  }, []);

  return (
    <SavedMoviesContext.Provider value={{ array, setArray }}>
      {children}
    </SavedMoviesContext.Provider>
  );
};

export default MoviesProvider;
