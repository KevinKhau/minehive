import React, {useCallback, useEffect, useImperativeHandle, useState} from 'react';
import styles from './Cell.module.css';

export const enum Symbol {
    Clear = '.',
    Mine = 'x'
}

interface CellProps {
    value?: any;
}

const Cell = ({value}: CellProps) => {

    const getValue = () => {
        // if (!value.isRevealed) {
        //     return value.isFlagged ? "🚩" : null;
        // }
        if (!!value.isMine) {
            return "💣";
        }
        if (value.neighbor === 0) {
            return '';
        }
        return value.neighbor;
    }

    const className = `cell${value.isRevealed ? "" : " /*hidden*/"}${value.isMine ? " is-mine" : ""}${value.isFlagged ? " is-flag" : ""}`
    return (
        <div className={className}>
            {getValue()}
        </div>
    );

};

export default Cell;
