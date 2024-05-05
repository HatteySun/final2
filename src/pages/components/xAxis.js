
import React from "react";
import { useRef, useEffect } from "react";
import * as d3 from "d3";

function xAxis({ xScale, height, width }) {
    //Note:
    //1. XAxis works for two cases: the xScale is linear (i.e., scatter plot) and the xScalse is discrete (i.e., bar chart)
    //2. you can use typeof(xScale.domain()[0]) to decide the return value
    //3. if typeof(xScale.domain()[0]) is a number, xScale is a linear scale; if it is a string, it is a scaleBand.

    const gx = useRef();
    useEffect(() => {
        let axis = d3.axisBottom(xScale);
        d3.select(gx.current).call(axis);
    });

    if (xScale) {
        return (
            <g ref={gx} transform={`translate(0, ${height})`}>
                {
                    xAxisType === "linear" ?
                        (<text
                            style={{ textAnchor: 'end', fontSize: '15px', fill: "black" }}
                            transform={`translate(${width - 20}, -10)`}>
                            {axisLable}
                        </text>
                        )
                        : <></>

                }
            </g>
        );
    } else {
        return <g></g>
    }
}

export default xAxis