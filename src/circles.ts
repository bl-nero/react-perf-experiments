import Prando from "prando";
import { randomColor } from "./randomColor";

export interface Point {
  x: number;
  y: number;
}

export interface Circle {
  color: string;
  phaseShift: number;
  angularSpeed: number;
  subcircles: Circle[];
}

export const generateCircles = (rng: Prando, depth: number, angularSpeed = 0, phaseShift = 0): Circle => {
  const subcircles = [];
  if (depth > 1) {
    const phaseShift2 = rng.next(0, 2 * Math.PI);
    const angularSpeed2 = rng.next(0, 0.1);
    subcircles.push(generateCircles(rng, depth - 1, angularSpeed2, phaseShift2));
    subcircles.push(generateCircles(rng, depth - 1, angularSpeed2, phaseShift2 - Math.PI));
  }
  return {
    color: randomColor(rng),
    angularSpeed,
    phaseShift,
    subcircles,
  };
};

export const circleOffset = (time: number, angularSpeed: number, phaseShift: number): Point => {
  const angle = angularSpeed * 2 * Math.PI * time / 1000 + phaseShift;
  return {
    x: (1 + Math.sin(angle)) * 50,
    y: (1 + Math.cos(angle)) * 50,
  }
};