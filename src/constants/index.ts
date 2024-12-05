export const topGenres = [
  "Action",
  "Comedy",
  "Animation",
  "Drama",
  "Mystery",
  "Adventure",
];
export const petalColors = [
  "#ff5733",
  "#ffab3b",
  "#4caf50",
  "#3f51b5",
  "#9c27b0",
  "#00bcd4",
];

interface GenresColors {
  [key: string]: string;
}

export const genresColors: GenresColors = {
  Action: "#ff5733",
  Comedy: "#ffab3b",
  Animation: "#4caf50",
  Drama: "#3f51b5",
  Mystery: "#9c27b0",
  Adventure: "#00bcd4",
  Other: "#fafafa",
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
export const parentalGuidelines = ["PG", "R", "PG-13", "G"];
