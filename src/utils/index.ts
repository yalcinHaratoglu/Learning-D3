export const calculateGridPos = (
  index: number,
  perRow: number,
  pathWidth: number
) => {
  const x = (index % perRow) * pathWidth + pathWidth / 2;
  const y = Math.floor(index / perRow) * pathWidth + pathWidth / 2;
  return `${x},${y}`;
};
