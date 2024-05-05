// src/components/worldmap.js
import React, { useState } from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { scaleThreshold } from 'd3-scale';
import Legend from './legend';

const countryNameMapping = {
    'United States': 'United States of America',
    'Argentina': 'Argentina'
};

const determineLabelRange = (ladderValue) => {
    if (ladderValue === null) return null;  // Ensure null values are handled correctly
    if (ladderValue >= 6) return "6-8";
    if (ladderValue >= 4 && ladderValue < 6) return "4-6";
    if (ladderValue >= 2 && ladderValue < 4) return "2-4";
    if (ladderValue < 2) return "<2";
    return null; // Redundant but clarifies that undefined or unexpected values are not categorized
};

const WorldMap = ({ data, year, width, height, worldGeoJSON, setSelectCountry }) => {
    const [hoveredRange, setHoveredRange] = useState(null);
    const [selectFeature, setSelectFeature] = useState(null);

    const featureClick = (feature) => {
        if (selectFeature !== null && selectFeature === feature.properties.name) {
            setSelectFeature(null);
            setSelectCountry(null);
        } else {
            setSelectFeature(feature.properties.name);
            setSelectCountry(feature.properties.name);
        }
    };

    const correctedData = data.map(d => ({
        ...d,
        country_name: countryNameMapping[d.country_name] || d.country_name,
    }));

    const filteredData = correctedData.filter(d => d.year === year && d.ladder !== null);

    const colorScale = scaleThreshold()
        .domain([2, 4, 6, 8])
        .range(['#99ff99', '#66cc66', '#339933', '#025e02']);

    const projection = geoEqualEarth().scale(160).translate([width / 2, height / 2]);
    const pathGenerator = geoPath().projection(projection);

    const legendLabels = [
        { label: "6-8", color: "#025e02" },
        { label: "4-6", color: "#339933" },
        { label: "2-4", color: "#66cc66" },
        { label: "<2", color: "#99ff99" },
    ];

    if (!worldGeoJSON) {
        return <p>Loading map...</p>;
    }

    return (
        <>
            <svg width={width} height={height}>
                {worldGeoJSON.features.map(feature => {
                    const countryData = filteredData.find(d => d.country_name === feature.properties.name);
                    const ladderValue = countryData ? countryData.ladder : null;
                    const fillColor = ladderValue !== null ? colorScale(ladderValue) : 'white';
                    const labelRange = determineLabelRange(ladderValue);

                    // Ensure paths with null values do not get highlighted on hover
                    const shouldHighlight = (hoveredRange === labelRange && ladderValue !== null) || (selectFeature !== null && selectFeature === feature.properties.name);

                    if (feature.properties.name === "Argentina") {
                        console.log('Argentina Ladder Value:', ladderValue); // Log ladder value
                        console.log('Argentina Fill Color:', fillColor); // Log fill color
                    }
                    if (feature.properties.name === "Bermuda") {
                        return
                    }

                    return (
                        <path
                            key={feature.properties.name}
                            d={pathGenerator(feature)}
                            fill={fillColor}
                            onClick={() => featureClick(feature)}
                            stroke={shouldHighlight ? "red" : "black"}
                            strokeWidth={shouldHighlight ? "1" : "0.5"}
                        />
                    );
                })}
            </svg>
            <Legend legendData={legendLabels} onHover={setHoveredRange} onHoverEnd={() => setHoveredRange(null)} />
        </>
    );
};

export default WorldMap;
