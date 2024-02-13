import React, { useEffect, useState } from 'react';
import PieComponent from './PieComponent'
import { RAMData, RAMInfo } from './types';
import { ReadRamInfo } from '../wailsjs/go/main/App'
import './App.css';

const App: React.FC = () => {

    //para ramInfo
    const [ramDataVar, setRamDataVar] = useState<RAMData>({ usedRAM: 0, state: 0 })
    useEffect(() => {
        const interval = setInterval(() => {
            ReadRamInfo().then((result: RAMInfo) => {
                var usedRAM: number = 1 - (result.freeRAM / result.totalRAM);
                var state: number
                if (usedRAM <= 0.5) {
                    state = 0
                } else if (usedRAM <= 0.25) {
                    state = 1
                } else if (usedRAM <= 0.10) {
                    state = 2
                } else {
                    state = 3
                }
                setRamDataVar({usedRAM:usedRAM, state: state});
            });
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="App">
            <PieComponent {...ramDataVar} />
        </div>
    )
}

export default App
