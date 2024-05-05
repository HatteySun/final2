import React from "react";
import { useRef, useEffect } from "react";
import * as d3 from "d3";

function yAxis(props) {
    const { yScale, height, axisLable } = props;
    const gy = useRef();
    useEffect(() => {
        d3.select(gy.current).call(d3.axisLeft(yScale));
    });

    if (yScale) {
        return (
            <g ref={gy} transform={`translate(0,0)`}>
                <text
                    style={{ textAnchor: 'end', fontSize: '15px', fill: "black" }}
                    transform={`translate(20, 0)rotate(-90)`}>
                    {axisLable}
                </text>
            </g>
        )
    } else {
        return <g></g>
    }

}

export default yAxis