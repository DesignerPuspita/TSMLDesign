import React, { useState } from 'react';
import { Charts } from './Charts';
//import * as dayjs from "dayjs";
import * as moment from 'moment';
import { useSelector } from 'react-redux';

export const BarChart = () => {
    const isToggled = useSelector((state) => state.toggle.isToggled);

    const [height] = useState(280);
    
    const [series] = useState([{
        name: "cvr",
        data: [{
            x: '2019/01/01',
            y: 400
        }, {
            x: '2019/04/01',
            y: 430
        }, {
            x: '2019/07/01',
            y: 448
        }, {
            x: '2019/10/01',
            y: 470
        }, {
            x: '2020/01/01',
            y: 540
        }, {
            x: '2020/04/01',
            y: 580
        }, {
            x: '2020/07/01',
            y: 690
        }, {
            x: '2020/10/01',
            y: 690
        }]
    }]);
    const [options] = useState({
        chart: {
            type: 'bar',
            height: 380
        },
        xaxis: {
            type: 'y',
            labels: {
                formatter: function (val) {
                    return "Q" + moment(val).quarter();
                }
            },
            group: {
                style: {
                    fontSize: '10px',
                    fontWeight: 700
                },
                groups: [
                    { title: '2019', cols: 4 },
                    { title: '2020', cols: 4 }
                ]
            }
        },
        // title: {
        //     text: 'Customer Wise CVR',
        // },
        // tooltip: {
        //     x: {
        //         formatter: function (val) {
        //             return "Q" + moment(val).quarter() + " " + moment(val).format("YYYY").toString();
        //         }
        //     }
        // },
    },
    );

  return (
    <Charts options={options} type="bar" series={series} height={height} />
  );
}