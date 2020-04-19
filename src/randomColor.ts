import Prando from "prando";

export const randomColor = (rng: Prando): string => {
  return `rgb(${rng.next(0, 256)}, ${rng.next(0, 256)}, ${rng.next(0, 256)})`;
};