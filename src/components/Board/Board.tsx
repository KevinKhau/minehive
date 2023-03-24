import React, {useState} from 'react';
import styles from './Board.module.css';
import Cell from "../Cell/Cell";
import Utils from "../../common/utils";
import {CellData} from "../../common/types";

interface BoardProps {
    width: number;
    height: number;
    mines: number;
}

const Board = ({width, height, mines}: BoardProps) => {

    const eightDirections = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

    const [data, setData] = useState<CellData[][]>(initBoard());
    const [status, setStatus] = useState('Game in progress');
    const [mineCount, setMineCount] = useState(mines)

    function initBoard() {
        const boardData: CellData[][] = [];
        initEmptyBoard();
        setMines();
        setNeighbors();
        return boardData;

        function initEmptyBoard() {
            for (let y = 0; y < height; y++) {
                const row = Utils.range(0, width).map(x => ({
                    x, y,
                    isMine: false,
                    neighbor: 0,
                    isRevealed: false,
                    isEmpty: false,
                    isFlagged: false,
                }));
                boardData.push(row);
            }
        }

        function setMines() {
            for (let i = 0; i < mines; i++) {
                const randomX = Utils.randomInt(0, width);
                const randomY = Utils.randomInt(0, height);
                if (!setMine(randomX, randomY)) i--;
            }
        }

        function setMine(x: number, y: number) {
            const cell = boardData[y][x];
            return cell.isMine ? false : cell.isMine = true;
        }

        function setNeighbors() {
            for (const row of boardData)
                for (const cell of row)
                    if (cell.isMine)
                        increaseNeighbors(cell);
        }

        function increaseNeighbors(cell: CellData) {
            for (const [x, y] of eightDirections)
                if (inRange(cell, x, y))
                    boardData[cell.y + y][cell.x + x].neighbor++;
        }

        function inRange(cell: CellData, x: number, y: number) {
            return !outOfRange(cell, x, y);
        }

        function outOfRange(cell: CellData, x: number, y: number) {
            return ((x === -1 && cell.x === 0) || (x === 1 && cell.x >= width - 1)) ||
                ((y === -1 && cell.y === 0) || (y === 1 && cell.y >= height - 1));
        }

    }

    return (
        <div className={styles.Board}>
            <div className="game-info">
                <h1 className="info">{status}</h1>
                <span className="info">Mines remaining: {mineCount}</span>
            </div>
            {renderBoard()}
        </div>
    );

    function renderBoard() {
        return data.map(row =>
            row.map(item =>
                <Cell key={item.x * row.length + item.y} value={item}/>
            ).concat(<div key={'joint' + row} className='clear'/>));
    }
}

Board.defaultProps = {
    width: 18,
    height: 14,
    mines: 50
};

export default Board;
