import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const storedTheme = localStorage.getItem("watchlist");
  const initialTheme = storedTheme ? JSON.parse(storedTheme) : [];
  const [watchlist, setWatchlist] = useState(initialTheme);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  function addToWatchList(movie) {
    const isAddedToList = watchlist.map((i) => i.id).includes(movie.id);

    if (!isAddedToList) {
      setWatchlist((movies) => [...movies, movie]);
    }
  }

  function removeFromWatchList(movie) {
    setWatchlist((movies) => movies.filter((i) => i.id !== movie.id));
  }

  return (
    <UserContext.Provider
      value={{
        watchlist,
        setWatchlist,
        addToWatchList,
        removeFromWatchList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
