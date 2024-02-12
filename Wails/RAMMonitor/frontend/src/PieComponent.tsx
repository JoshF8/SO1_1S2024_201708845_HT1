import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, LabelList } from "recharts";
import './style.css'
import { RAMData, windowSize } from "./types";
import { GetWindowSize } from '../wailsjs/go/main/App'

//el valor, no se calcula aqui
const data = [
    { name: 'RAM', value: 1 },
];
const COLORS = ['#4CAF50', '#FFEB3B', '#FF9800', '#F44336'];

const PieComponent: React.FC<RAMData> = (ramData) => {
    
    //Para usar el window size exacto de la aplicacion
    const [windowSize, setWindowSize] = useState<windowSize>({width: 0, height: 0})
    useEffect(() => {
        GetWindowSize().then((result) => {
            console.log(result);
            setWindowSize(result);
        });
    }, []);

    return (
        
        <PieChart width={windowSize.width} height={windowSize.height} className="PieChart">
            <Pie
                data={data}
                startAngle={0}
                endAngle={(ramData.usedRAM * 360)}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                cx="50%"
                cy="50%"
                dataKey='value'
                label={(entry) => `${ramData.usedRAM * 100} %`}
            >
                {data.map((entry, index) => (
                    //se le pondra el index dependiendo de que tanto se esta usando (to do)
                    <Cell key={`cell-${index}`} fill={COLORS[ramData.state]} />
                ))}
                <LabelList dataKey='name' position={"center"} />
            </Pie>
        </PieChart>
    );
}

export default PieComponent;
