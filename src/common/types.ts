export interface CellData {
    x: number;
    y: number;
    isMine: boolean;
    neighbor: number;
    isRevealed: boolean;
    isEmpty: boolean;
    isFlagged: boolean;
}
