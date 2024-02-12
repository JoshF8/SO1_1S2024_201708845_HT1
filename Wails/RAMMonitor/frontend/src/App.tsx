import { useState } from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import { Greet } from "../wailsjs/go/main/App";
import PieComponent from './PieComponent'
import { RAMData } from './types';

function App() {
    const totalRAM: number = 16000000
    const freeRAM: number = 1500000
    const freeRAMPercentage: number = freeRAM / totalRAM
    
    var state:number;
    if (freeRAMPercentage > 0.5){
        state = 0
    }else if(freeRAMPercentage > 0.25){
        state = 1
    }else if(freeRAMPercentage > 0.10){
        state = 2
    }else{
        state = 3
    }

    var ramDataVar: RAMData = {
        freeRAM: freeRAMPercentage,
        state: state
    }

    return (
        <div id="App">
            <PieComponent {...ramDataVar} />
        </div>
    )
}

export default App
