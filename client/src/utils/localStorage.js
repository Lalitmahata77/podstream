// Add a product to a localStorage
export const addFavoriteToLocalStorage = (podcast) => {
    const favorites = getFavoritesFromLocalStorage();
    if (!favorites.some((p) => p._id === podcast._id)) {
      favorites.push(podcast);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };
  
  // Remove  product from a localStorage
  export const removeFavoriteFromLocalStorage = (podcastId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter(
      (podcast) => podcast._id !== podcastId
    );
  
    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
  };
  
  // Retrive favorites from a localStorage
  export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
  };