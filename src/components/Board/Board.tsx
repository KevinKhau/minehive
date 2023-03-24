import React, {useState} from 'react';
import styles from './Board.module.css';
import Cell from "../Cell/Cell";
import Utils from "../../utils/utils";

interface BoardProps {
    width: number;
    height: number;
    mines: number;
}

interface BoardState {
    cells: any[][];
}

const Board = ({width, height, mines}: BoardProps) => {

    const eightDirections = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

    const [data, setData] = useState<any[][]>([]);
    const [status, setStatus] = useState('Game in progress');
    const [mineCount, setMineCount] = useState(mines)

    initBoard();

    function initBoard() {
        initEmptyBoard();
        setMines();
        setDigits();
    }

    function initEmptyBoard() {
        for (let y = 0; y < height; y++) {
            data.push(Array.from(Array(width).keys()).map(x => ({
                    x, y,
                    isMine: false,
                    neighbor: 0,
                    isRevealed: false,
                    isEmpty: false,
                    isFlagged: false,
                }))
            );
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
        const cell = data[y][x];
        if (cell.isMine) return false;
        cell.isMine = true;
        return true;
    }

    function setDigits() {
        for (const row of data)
            for (const cell of row)
                if (cell.isMine)
                    increaseNeighbors(cell);
    }

    function increaseNeighbors(cell: any) {
        for (const [x, y] of eightDirections) {
            if ((x === -1 && cell.x === 0) || (x === 1 && cell.x >= width - 1)) continue;
            if ((y === -1 && cell.y === 0) || (y === 1 && cell.y >= height - 1)) continue;
            console.log({x, y, "cell.x": cell.x, "cell.y": cell.y, neighbor: data[cell.y + y][cell.x + x].neighbor});
            // console.log(data[y][x]);
            data[cell.y + y][cell.x + x].neighbor++;
        }
    }

    const renderBoard = () => {
        return data.map(row =>
            row.map(item =>
                <Cell key={item.x * row.length + item.y} value={item}/>
            ).concat(<div key={'joint' + row} className='clear'/>));
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
}

Board.defaultProps = {
    width: 18,
    height: 14,
    mines: 50
};

export default Board;
