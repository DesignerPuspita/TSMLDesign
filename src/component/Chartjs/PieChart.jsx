import React, { useState } from 'react';
import { Charts } from './Charts';
//import * as dayjs from "dayjs";
//import * as moment from 'moment';

export const PieChart = () => {

    const [height] = useState(350);
    const [width] = useState(350);
    const [series] = useState([44, 55, 13, 43, 22]);
    const [options] = useState({
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
            
        ],
    });

  return (
     <Charts options={options} type="pie" series={series} width={width} height={height} />
  );
}