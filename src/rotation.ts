// deno-lint-ignore-file

// https://tetris.wiki/Super_Rotation_System
// On convention, X rightwards is positive, Y upwards is positive.
// Inverting (multiplying -1) is a must on Y;
export const wallkicks_JLSTZ = [
    [[ 0, 0], [-1, 0], [-1,+1], [ 0,-2], [-1,-2]],  // 0 -> R
    [[ 0, 0], [+1, 0], [+1,-1],	[ 0,+2], [+1,+2]],  // R -> 0
	[[ 0, 0], [+1, 0], [+1,-1],	[ 0,+2], [+1,+2]],  // R -> 2
	[[ 0, 0], [-1, 0], [-1,+1],	[ 0,-2], [-1,-2]],  // 2 -> R
	[[ 0, 0], [+1, 0], [+1,+1],	[ 0,-2], [+1,-2]],  // 2 -> L
	[[ 0, 0], [-1, 0], [-1,-1],	[ 0,+2], [-1,+2]],  // L -> 2
	[[ 0, 0], [-1, 0], [-1,-1],	[ 0,+2], [-1,+2]],  // L -> 0
	[[ 0, 0], [+1, 0], [+1,+1],	[ 0,-2], [+1,-2]]   // 0 -> L
]

export const wallkicks_I = [
    [[ 0, 0], [-2, 0], [+1, 0], [+1,+2], [-2,-1]],  // 0 -> R
	[[ 0, 0], [+2, 0], [-1, 0], [+2,+1], [-1,-2]],  // R -> 0
	[[ 0, 0], [-1, 0], [+2, 0], [-1,+2], [+2,-1]],  // R -> 2
	[[ 0, 0], [-2, 0], [+1, 0], [-2,+1], [+1,-1]],  // 2 -> R
	[[ 0, 0], [+2, 0], [-1, 0], [+2,+1], [-1,-1]],  // 2 -> L
	[[ 0, 0], [+1, 0], [-2, 0], [+1,+2], [-2,-1]],  // L -> 2
	[[ 0, 0], [-2, 0], [+1, 0], [-2,+1], [+1,-2]],  // L -> 0
	[[ 0, 0], [+2, 0], [-1, 0], [-1,+2], [+2,-1]]   // 0 -> L
]

// 0 -> 0
// R -> 1
// 2 -> 2
// L -> 3
// Key: 
// - First letter, the current rotation;
// - Second letter, the next rotation;
// Returns:
// - Which Wallkick will be used.
export const wallkickDictionary: { [key: string]: number } = {
    "01": 0,
    "10": 1,
    "12": 2,
    "21": 3,
    "23": 4,
    "32": 5,
    "30": 6,
    "03": 7
}