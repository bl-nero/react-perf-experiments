import Prando from "prando";
import { randomColor } from "./randomColor";

export interface Point {
  x: number;
  y: number;
}

export interface Circle {
  color: string;
  phaseShift: number;
  subcircles: Circle[];
}

export const generateCircles = (rng: Prando, depth: number, phaseShift = 0): Circle => {
  const subcircles = [];
  if (depth > 0) {
    const phaseShift2 = rng.next(0, 2 * Math.PI);
    subcircles.push(generateCircles(rng, depth - 1, phaseShift2));
    subcircles.push(generateCircles(rng, depth - 1, phaseShift2 - 2 * Math.PI));
  }
  return {
    color: randomColor(rng),
    phaseShift,
    subcircles,
  };
};

export const circlePosition = (time: number, phaseShift: number): Point => {
  const angle = 2 * Math.PI * time / 1000 + phaseShift;
  return {
    x: 0.25 * Math.sin(angle),
    y: 0.25 * Math.cos(angle),
  }
};