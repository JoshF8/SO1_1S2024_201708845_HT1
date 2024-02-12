import { useState } from 'react';

import './App.css';
import PieComponent from './PieComponent'
import { RAMData } from './types';

const App: React.FC = () => {
    const totalRAM: number = 16000000
    const freeRAM: number = 11000000
    const usedRAMPercentage: number = 1 - (freeRAM / totalRAM)

    console.log(usedRAMPercentage);
    var state: number;
    if (usedRAMPercentage <= 0.5) {
        state = 0
    } else if (usedRAMPercentage <= 0.25) {
        state = 1
    } else if (usedRAMPercentage <= 0.10) {
        state = 2
    } else {
        state = 3
    }

    var ramDataVar: RAMData = {
        usedRAM: usedRAMPercentage,
        state: state
    }

    return (
        <div id="App">
            <PieComponent {...ramDataVar} />
        </div>
    )
}

export default App
