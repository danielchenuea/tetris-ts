const NothingColor = "#000000";
export const I_ShapeColor = "#00FFFF";
export const J_ShapeColor = "#0000FF";
export const L_ShapeColor = "#FF8000";
export const O_ShapeColor = "#FFFF00";
export const S_ShapeColor = "#00FF00";
export const Z_ShapeColor = "#FF0000";
export const T_ShapeColor = "#FF00FF";
export const colorDictionary = {
    0: NothingColor,
    1: I_ShapeColor,
    2: J_ShapeColor,
    3: L_ShapeColor,
    4: O_ShapeColor,
    5: S_ShapeColor,
    6: Z_ShapeColor,
    7: T_ShapeColor,
    8: "#999999",
    9: "#FFFFFF",
};
export const I_ShapeMatrix = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
];
export const J_ShapeMatrix = [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
];
export const L_ShapeMatrix = [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
];
export const O_ShapeMatrix = [
    [1, 1],
    [1, 1],
];
export const S_ShapeMatrix = [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
];
export const Z_ShapeMatrix = [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
];
export const T_ShapeMatrix = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
];
