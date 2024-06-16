import { type MotionValue, useTransform } from "framer-motion";

// Exp: from: -50 to: 50
export function useParallax(value: MotionValue<number>, from: number, to: number) {
	return useTransform(value, [0, 1], [from, to]);
}

export function useParallaxSpring(value: MotionValue<number>, from: number, to: number) {
	return useTransform(value, [0, 1, 0], [from, to, from]);
}
