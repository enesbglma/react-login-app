import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import WatchList from "../components/WatchList";

export default function UserWatchlist() {
  const { watchlist, removeFromWatchList } = useContext(UserContext);

  return (
    <WatchList
      movies={watchlist}
      title="WatchList"
      removeFromWatchList={removeFromWatchList}
    />
  );
}
