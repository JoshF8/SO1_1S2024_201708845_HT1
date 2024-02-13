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
                setRamDataVar(getRamData(result));
            });
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    function getRamData(ramInfo: RAMInfo): RAMData {
        var ramData: RAMData = {usedRAM: 0, state: 0};
        ramData.usedRAM = 1 - (ramInfo.freeRAM / ramInfo.totalRAM);
        if (ramData.usedRAM <= 0.5) {
            ramData.state = 0
        } else if (ramData.usedRAM <= 0.25) {
            ramData.state = 1
        } else if (ramData.usedRAM <= 0.10) {
            ramData.state = 2
        } else {
            ramData.state = 3
        }
        return ramData;
    }

    return (
        <div id="App">
            <PieComponent {...ramDataVar} />
        </div>
    )
}

export default App
