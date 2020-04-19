import Prando from "prando";
import { randomColor } from "./randomColor";

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface Circle {
  readonly color: string;
  readonly angularSpeed: number;
  readonly phaseShift: number;
  readonly subcircles: Circle[];
}

export const generateCircles = (rng: Prando, depth: number): Circle => ({
  color: randomColor(rng),
  angularSpeed: rng.next(-1, 1),
  phaseShift: rng.next(0, 2 * Math.PI),
  subcircles: depth > 1 ?
    [generateCircles(rng, depth - 1), generateCircles(rng, depth - 1)] :
    [],
});

export const circleOffset = (time: number, angularSpeed: number, phaseShift: number): Point => {
  const angle = angularSpeed * 2 * Math.PI * time / 1000 + phaseShift;
  return {
    x: (1 + Math.sin(angle)) * 50,
    y: (1 + Math.cos(angle)) * 50,
  }
};