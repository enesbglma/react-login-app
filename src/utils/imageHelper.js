// TMDB görsel yollarını kontrol eden merkezi fonksiyon
export const getImageUrl = (path, width = "w500") => {
  if (!path) {
    // Görsel yoksa şık bir placeholder döndürür
    return `https://via.placeholder.com/${width === "w200" ? "200x300" : "500x750"}?text=Gorsel+Yok`;
  }
  return `https://image.tmdb.org/t/p/${width}${path}`;
};
