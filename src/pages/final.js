// src/pages/final.js

import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { Row, Col, Container } from 'react-bootstrap';
import WorldMap from './components/worldmap';
import ScaleBar from './components/scalebar';
import Bars from './components/bar';

// Define the CSV file URL
const csvUrl = 'https://gist.githubusercontent.com/HatteySun/72a2713ff27ce39d35d9f4d4d9535317/raw/40f7046a9088dec0fac0de1c12dbdc5a090d15b6/Happiness_data';
const mapUrl = 'https://gist.githubusercontent.com/hogwild/26558c07f9e4e89306f864412fbdba1d/raw/5458902712c01c79f36dc28db33e345ee71487eb/countries.geo.json';
// const mapUrl = 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json';

// Function to fetch GeoJSON data
function useMap(jsonPath) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch(jsonPath)
            .then(response => response.json())
            .then(geoJsonData => {
                setData(geoJsonData);
            })
            .catch(error => {
                console.error('Error fetching GeoJSON data:', error);
            });
    }, [jsonPath]);
    return data;
}

// Function to fetch CSV data
function useData(csvPath) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const countryNameMapping = {
            'United States': 'United States of America',
            'Argentina': 'Argentina'
        };
        d3.csv(csvPath, d => {
            if (d.country_name === 'United States')
                d.country_name = 'United States of America';
            return {
                country_name: d.country_name,
                year: +d.year,
                ladder: d.ladder !== "" ? +d.ladder : null, // Assuming empty cells are empty strings
                gdp: d.gdp !== "" ? +d.gdp : null
            }
        }).then(setData);
    }, [csvPath]);

    return data;
}

const FinalPage = () => {
    // const [year, setYear] = useState(new Date().getFullYear());
    const [year, setYear] = useState(2013);
    const [selectCountry, setSelectCountry] = useState(null);

    const dataAll = useData(csvUrl);
    const worldGeoJSON = useMap(mapUrl); // Fetch GeoJSON data

    const handleChangeYear = (selectedYear) => {
        setYear(selectedYear);
    };

    // Filter data based on the selected year
    const filteredData = dataAll ? dataAll.filter(d => d.year === year) : [];
    const filteredCountry = (dataAll) ? dataAll.filter(d => d.country_name === selectCountry) : [];

//     return (
//         <Container>
//             <Row>
//                 <Col>
//                     <ScaleBar year={year} changeYear={handleChangeYear} />
//                 </Col>
//             </Row>
//             <Row style={{ display: 'flex' }}>
//                 <Col>
//                     {dataAll && worldGeoJSON ? <WorldMap data={dataAll} year={year} worldGeoJSON={worldGeoJSON} width={800} height={450} setSelectCountry={setSelectCountry} /> : <p>Loading...</p>}
//                 </Col>
//                 <Col style={{ marginLeft: '1em', marginRight: '1em', marginTop: '1em' }}>
//                     {selectCountry && filteredCountry && filteredCountry.length > 0 ? <Bars width={450} height={500} data={filteredCountry}></Bars> : <p>Data for this country not available</p>
//                     }
//                 </Col>
//             </Row>
//             {/* The Legend component is rendered within the WorldMap component */}
//         </Container>
//     );
// };

return (
    // <Container>
    //     <Row>
    //         <Col>
    //             <h1 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>World Happiness 2013-2023</h1>
    //             <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Explore how the happiness levels of different countries across the globe changed from 2013 to 2023</h2>
    //         </Col>
    //     </Row>
    //     <Row>
    //         <Col>
    //             <ScaleBar year={year} changeYear={handleChangeYear} />
    //         </Col>
    //     </Row>
    //     <Row style={{ display: 'flex' }}>
    //         <Col>
    //             {dataAll && worldGeoJSON ? 
    //                 <WorldMap data={dataAll} year={year} worldGeoJSON={worldGeoJSON} width={800} height={450} setSelectCountry={setSelectCountry} /> 
    //                 : <p>Loading...</p>}
    //         </Col>
    //         <Col style={{ marginLeft: '1em', marginRight: '1em', marginTop: '1em' }}>
    //             <h3 style={{ textAlign: 'center', marginBottom: '5px' }}>Ladder (Happiness Index) and log GDP per capita</h3>
    //             {selectCountry && filteredCountry && filteredCountry.length > 0 
    //                 ? <Bars width={450} height={500} data={filteredCountry} /> 
    //                 : <p>Data for this country not available</p>}
    //         </Col>
    //     </Row>
    // </Container>
    <Container>
    <Row>
        <Col>
            <h1 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>World Happiness 2013-2023</h1>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Explore how the happiness levels of different countries across the globe changed from 2013 to 2023</h2>
        </Col>
    </Row>
    <Row>
        <Col>
            <ScaleBar year={year} changeYear={handleChangeYear} />
        </Col>
    </Row>
    <Row style={{ display: 'flex' }}>
        <Col>
            {dataAll && worldGeoJSON ? 
                <WorldMap data={dataAll} year={year} worldGeoJSON={worldGeoJSON} width={800} height={450} setSelectCountry={setSelectCountry} /> 
                : <p>Loading...</p>}
        </Col>
        <Col style={{ marginLeft: '1em', marginRight: '1em', marginTop: '1em' }}>
            <Row>
                <Col>
                    <h3 style={{ textAlign: 'center', marginBottom: '5px' }}>Ladder (Happiness Index) and log GDP per capita</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* Display the selected country name */}
                    {selectCountry && (
                        <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>
                            {selectCountry}
                        </h4>
                    )}
                    {selectCountry && filteredCountry && filteredCountry.length > 0 
                        ? <Bars width={450} height={500} data={filteredCountry} /> 
                        : <p>Data for this country not available</p>}
                </Col>
            </Row>
        </Col>
    </Row>
</Container>


);
};

export default FinalPage;
