import { useEffect } from "react";
import { FaHeart, FaRegHeart, FaVaadin } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";


// const HeartIcon = ({ podcast }) => {
//   const dispatch = useDispatch();
//   const favorites = useSelector((state) => state.favorites) || [];
//   const isFavorite = favorites.some((p) => p._id === podcast._id);

//   useEffect(() => {
//     const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
//     dispatch(setFavorites(favoritesFromLocalStorage));
//   }, []);

//   const toggleFavorites = () => {
//     if (isFavorite) {
//       dispatch(removeFromFavorites(podcast));
//       // remove the product from the localStorage as well
//       removeFavoriteFromLocalStorage(podcast._id);
//     } else {
//       dispatch(addToFavorites(podcast));
//       // add the product to localStorage as well
//       addFavoriteToLocalStorage(podcast)
//     }
//   };

//   return (
//     <div
//       className="absolute top-2 right-5 cursor-pointer"
//       onClick={toggleFavorites}
//     >
//       {isFavorite ? (
//         <FaHeart className="text-pink-500" />
//       ) : (
//         <FaRegHeart className="text-white" />
//       )}
//     </div>
//   );
// };

// export default HeartIcon;





const HeartIcon = ({ podcast }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === podcast._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(podcast));
      // remove the product from the localStorage as well
      removeFavoriteFromLocalStorage(podcast._id);
    } else {
      dispatch(addToFavorites(podcast));
      // add the product to localStorage as well
      addFavoriteToLocalStorage(podcast);
    }
  };

  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
};

export default HeartIcon;