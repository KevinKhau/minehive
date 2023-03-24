import React from 'react';
import './App.css';
import Board from "./components/Board/Board";

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <h2>Minehive</h2>
                <Board height={14} width={18}></Board>
            </header>
        </div>
    );
}

export default App;
