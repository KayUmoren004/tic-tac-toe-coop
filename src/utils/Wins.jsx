import { LeftColumn, RightColumn, CenterColumn } from "./CellNames";

// How to win a game of Tic Tac Toe

// 1 - Diagonally
export const diagWinCase1 = [LeftColumn[0], CenterColumn[1], RightColumn[2]];
export const diagWinCase2 = [LeftColumn[2], CenterColumn[1], RightColumn[0]];

// 2 - Horizontally
export const horWinCase1 = [LeftColumn[0], CenterColumn[0], RightColumn[0]];
export const horWinCase2 = [LeftColumn[1], CenterColumn[1], RightColumn[1]];
export const horWinCase3 = [LeftColumn[2], CenterColumn[2], RightColumn[2]];

// 3 - Vertically
export const vertWinCase1 = [RightColumn[0], RightColumn[1], RightColumn[2]];
export const vertWinCase2 = [LeftColumn[0], LeftColumn[1], LeftColumn[2]];
export const vertWinCase3 = [CenterColumn[0], CenterColumn[1], CenterColumn[2]];
