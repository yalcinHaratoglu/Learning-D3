const pathWidth = 120;
const perRow = 9;

export const calculateGridPos = (i: any) => {
  return [
    ((i % perRow) + 0.5) * pathWidth,
    (Math.floor(i / perRow) + 0.5) * pathWidth,
  ];
};
