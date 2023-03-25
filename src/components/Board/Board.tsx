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
    const [mineCount, setMineCount] = useState(mines);
    const [mistakes, setMistakes] = useState(0);

    function initBoard() {
        const boardData: CellData[][] = [];
        initEmptyBoard();
        setMines();
        setNeighbors();
        setEmpty();

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
            for (const cell of boardData.flat())
                increaseMineNeighbors(cell);
        }

        function increaseMineNeighbors(cell: CellData) {
            if (!cell.isMine) return;
            for (const [x, y] of eightDirections)
                if (inRange(cell, x, y))
                    boardData[cell.y + y][cell.x + x].neighbor++;
        }

        function setEmpty() {
            boardData.flat()
                .filter(cell => cell.neighbor === 0 && !cell.isMine)
                .forEach(cell => cell.isEmpty = true);
        }

    }

    function inRange(cell: CellData, x: number, y: number) {
        return !outOfRange(cell, x, y);
    }

    function outOfRange(cell: CellData, x: number, y: number) {
        return ((x === -1 && cell.x === 0) || (x === 1 && cell.x >= width - 1)) ||
            ((y === -1 && cell.y === 0) || (y === 1 && cell.y >= height - 1));
    }

    function handleCellClick(cell: CellData) {
        if (cell.isRevealed || cell.isFlagged) return;
        reveal(cell);
        setEnd();
        refreshBoard();
    }

    function reveal(cell: CellData) {
        if (cell.isRevealed) return;
        cell.isRevealed = true;
        cell.isFlagged = false;
        revealEmpty(cell);
        revealMine(cell);
    }

    function revealEmpty(cell: CellData) {
        if (!cell.isRevealed || !cell.isEmpty) return;
        for (const [x, y] of eightDirections) {
            if (inRange(cell, x, y)) {
                reveal(data[cell.y + y][cell.x + x]);
            }
        }
    }

    function revealMine(cell: CellData) {
        if (!cell.isMine) return;
        setMineCount(mineCount - 1);
        setMistakes(mistakes + 1);
    }

    function setEnd() {
        const end = data.flat().filter(cell => !cell.isMine).every(cell => cell.isRevealed);
        if (!end) return;
        if (mistakes >= mines / 2)
            setStatus('You need training...');
        else
            setStatus(!mistakes ? 'Full victory, congratulations!' : 'Game finished!');
        revealBoard();
    }

    function revealBoard() {
        data.flat().forEach(cell => cell.isRevealed = true);
    }

    function handleContextMenu(event: React.MouseEvent<Element, MouseEvent>, cell: CellData) {
        event.preventDefault();
        if (cell.isRevealed) return;
        toggleFlag(cell);
        refreshBoard();
    }

    function toggleFlag(cell: CellData) {
        if (cell.isFlagged) {
            cell.isFlagged = false;
            setMineCount(mineCount + 1);
        } else {
            cell.isFlagged = true;
            setMineCount(mineCount - 1);
        }
    }

    function refreshBoard() {
        setData(data.map(row => row));
    }

    function renderBoard() {
        return data.map(row =>
            row.map(item =>
                <Cell key={item.x * row.length + item.y}
                      value={item}
                      onClick={() => handleCellClick(item)}
                      onContextMenu={(event) => handleContextMenu(event, item)}
                />
            ).concat(<div key={'joint' + row} className='clear'/>));
    }

    return (
        <div className={styles.Board}>
            <div className='game-info'>
                <h1 className='info'>{status}</h1>
                <div className='info'>Mines remaining: {mineCount}</div>
                <div className='info'>Mistakes: {mistakes}</div>
            </div>
            <div>
                {renderBoard()}
            </div>
        </div>
    );
}

Board.defaultProps = {
    width: 18,
    height: 14,
    mines: 50
};

export default Board;
