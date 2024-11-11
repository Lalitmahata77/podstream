import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Podcast from "./Podcast";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        FAVORITE Podcast
      </h1>

      <div className="flex flex-wrap">
        {favorites.map((podcast) => (
          <Podcast key={podcast._id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;