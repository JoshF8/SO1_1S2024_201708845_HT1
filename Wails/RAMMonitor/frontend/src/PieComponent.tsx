import React, { JSXElementConstructor } from "react";
import { PieChart, Pie, Sector, Cell, LabelList } from "recharts";
import './style.css'
import { RAMData } from "./types";

//el valor, no se calcula aqui
const data = [
    { name: 'RAM', value: 1 },
];
const COLORS = ['#4CAF50', '#FFEB3B', '#FF9800', '#F44336'];

function PieComponent(ramData: RAMData) {
    return (
        <PieChart width={800} height={400}>
            <Pie
                data={data}
                startAngle={0}
                endAngle={360 - (ramData.freeRAM * 360)}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey='value'
                label={(entry) => `${ramData.freeRAM * 100} %`}
            >
                {data.map((entry, index) => (
                    //se le pondra el index dependiendo de que tanto se esta usando (to do)
                    <Cell key={`cell-${index}`} fill={COLORS[ramData.state]} />
                ))}
                <LabelList dataKey='name' position={"center"} display={"hola"}/>
            </Pie>
        </PieChart>
    );
}

export default PieComponent;
