export const topGenres = [
  "Action",
  "Comedy",
  "Animation",
  "Drama",
  "Mystery",
  "Adventure",
];
export const petalColors = [
  "#ff5733", // Aksiyon: Kırmızı - Hız ve heyecanı simgeler
  "#ffab3b", // Komedi: Sarı - Neşeli ve eğlenceli atmosferi yansıtır
  "#4caf50", // Animasyon: Yeşil - Yaratıcılığı ve doğallığı temsil eder
  "#3f51b5", // Drama: Mavi - Derinlik ve duygusallığı simgeler
  "#9c27b0", // Gizem: Mor - Gizemli ve keşfedilmeyi bekleyen unsurları ifade eder
  "#00bcd4", // Macera: Turkuaz - Hareket ve keşif duygusunu çağrıştırır
];
export const colors = {
  Action: "#ffc8f0",
  Comedy: "#cbf2bd",
  Animation: "#afe9ff",
  Drama: "#ffb09e",
  Mystery: "#f2b6ff",
  Adventure: "#ff9c9c",
  Other: "#fff",
};
export const petalPaths = [
  "M-35 0 C-25 25 25 25 35 0 C50 25 25 75 0 100 C-25 75 -50 25 -35 0",
  "M0 0 C50 50 50 100 0 100 C-50 100 -50 50 0 0 z",
  "M0,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 0,0 Z",
  "M0,0 C10,10 25,15 35,50 L50,40 C50,70 45,95 0,100 C-45,95 -50,70 -50,40 L-35,50 C-25,15 -10,10 0,0 Z",
  "M0,0 L10,40 L20,15 L25,55 L40,40 C40,70 35,95 0,100 C-35,95 -40,70 -40,40 L-25,55 L-20,15 L-10,40 L0,0 Z",
  "M-35 0 C-25 25 25 25 35 0 C50 25 25 75 0 100 C-25 75 -50 25 -35 0",
  "M0 0 C50 25 50 75 0 100 C-50 75 -50 25 0 0 z",
  "M0 0 C50 50 50 100 0 100 C-50 100 -50 50 0 0 z",
];
export const petalPathsObj = {
  PG: petalPaths[1],
  R: petalPaths[2],
  "PG-13": petalPaths[3],
  G: petalPaths[5],
};
