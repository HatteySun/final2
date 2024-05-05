// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from "d3";

// function Bars({ data, width, height }) {
//     const innerWidth = 30;
//     const innerHeight = 30;

//     const xScale = d3
//         .scaleTime()
//         .range([innerWidth, width - innerWidth])
//         .domain([d3.min(data, (d) => new Date(d.year - 1, 0, 1)), d3.max(data, (d) => new Date(d.year + 1, 0, 1))])
//         .nice();

//     const gdpScale = d3
//         .scaleLinear()
//         .range([height, innerHeight])
//         .domain([d3.min(data, (d) => d.gdp) - 0.1, d3.max(data, (d) => d.gdp) + 0.1]);

//     const ladderScale = d3
//         .scaleLinear()
//         .range([height, innerHeight])
//         .domain([d3.min(data, (d) => d.ladder) - 1, d3.max(data, (d) => d.ladder) + 1]);

//     const gdpLine = d3
//         .line()
//         .x((d) => xScale(new Date(d.year, 0, 1)))
//         .y((d) => gdpScale(d.gdp));

//     const ladderLine = d3
//         .line()
//         .x((d) => xScale(new Date(d.year, 0, 1)))
//         .y((d) => ladderScale(d.ladder));

//     const gx = useRef();
//     const gGDP = useRef();
//     const gLadder = useRef();
//     useEffect(() => {
//         let axis = d3.axisBottom(xScale);
//         d3.select(gx.current).call(axis);

//         let gdpAxis = d3.axisRight(gdpScale);
//         d3.select(gGDP.current).call(gdpAxis);

//         let ladderAxis = d3.axisLeft(ladderScale);
//         d3.select(gLadder.current).call(ladderAxis);
//     });

//     return (
//         <svg width={width} height={height}>
//             <g ref={gx} transform={`translate(0, ${height - innerHeight})`}></g>
//             <g ref={gGDP} transform={`translate(${width - innerWidth}, ${-innerHeight})`}></g>
//             <g ref={gLadder} transform={`translate(${innerWidth}, ${-innerHeight})`}></g>

//             <path
//                 fill={"#000"}
//                 fillOpacity={0}
//                 strokeWidth={1.5}
//                 stroke={"blue"}
//                 d={gdpLine(data)} />
//             <text
//                 x={xScale(new Date(data[data.length - 1].year, 0, 1))}
//                 y={gdpScale(data[data.length - 1].gdp)}
//                 dx={-10}
//                 style={{ fill: 'blue' }}>
//                 GDP
//             </text>
//             <path
//                 fill={"#000"}
//                 fillOpacity={0}
//                 strokeWidth={1.5}
//                 stroke={"red"}
//                 d={ladderLine(data)} />
//             <text
//                 x={xScale(new Date(data[data.length - 1].year, 0, 1))}
//                 y={ladderScale(data[data.length - 1].ladder)}
//                 dx={-10}
//                 style={{ fill: 'red' }}>
//                 Ladder
//             </text>
//         </svg>
//     );
// }

// export default Bars;

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Bars({ data, width, height }) {
    const margin = { top: 20, right: 50, bottom: 30, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Define scales
    const xScale = d3.scaleTime()
        .range([0, innerWidth])
        .domain([new Date(2013, 0, 1), new Date(2023, 11, 31)]);

    const gdpScale = d3.scaleLinear()
        .range([innerHeight, 0])
        .domain([d3.min(data, d => d.gdp), d3.max(data, d => d.gdp)])
        .nice();

    const ladderScale = d3.scaleLinear()
        .range([innerHeight, 0])
        .domain([d3.min(data, d => d.ladder), d3.max(data, d => d.ladder)])
        .nice();

    // Filtering data to only include years 2013 to 2023
    const filteredData = data.filter(d => d.year >= 2013 && d.year <= 2023);

    // Define line generators with filtered data
    const gdpLine = d3.line()
        .x(d => xScale(new Date(d.year, 0, 1)))
        .y(d => gdpScale(d.gdp));

    const ladderLine = d3.line()
        .x(d => xScale(new Date(d.year, 0, 1)))
        .y(d => ladderScale(d.ladder));

    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();  // Clear previous SVG contents

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        g.append('path')
            .datum(filteredData)
            .attr('fill', 'none')
            .attr('stroke', 'blue')
            .attr('stroke-width', 2)
            .attr('d', gdpLine);

        g.append('path')
            .datum(filteredData)
            .attr('fill', 'none')
            .attr('stroke', 'red')
            .attr('stroke-width', 2)
            .attr('d', ladderLine);

        const xAxis = d3.axisBottom(xScale).ticks(d3.timeYear.every(1));
        g.append('g')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis);

        const gdpAxis = d3.axisRight(gdpScale);
        // g.append('g')
        //     .attr('transform', `translate(${innerWidth}, 0)`)
        //     .call(gdpAxis);
        g.append('g')
            .attr('transform', `translate(${innerWidth}, 0)`)
            .call(gdpAxis)
            .append('text')
            .attr('fill', 'blue')
            .attr('text-anchor', 'start')
            .attr('x', 6)
            .attr('y', -15)
            .attr('dy', '.71em')
            .text('Log GDP');

        const ladderAxis = d3.axisLeft(ladderScale);
        // g.append('g')
        //     .call(ladderAxis);
        g.append('g')
            .call(ladderAxis)
            .append('text')
            .attr('fill', 'red')
            .attr('text-anchor', 'end')
            .attr('x', -6)
            .attr('y', -15)
            .attr('dy', '.32em')
            .text('Ladder');
    }, [data, height, width]); 

    return <svg ref={svgRef} width={width} height={height}></svg>;
}

export default Bars;
