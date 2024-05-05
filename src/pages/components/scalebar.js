// Import necessary libraries
import React from 'react';
import { Row, Col } from 'react-bootstrap';


const ScaleBar = ({ year, changeYear }) => {
  return (
    <Row className="justify-content-center my-4">
      <Col xs={12} md={8}>
        <input
          id="yearRange" // Add the id attribute to associate with the label
          type="range"
          min="2013"
          max="2023"
          value={year}
          onChange={(e) => changeYear(+e.target.value)}
          className="custom-range"
          // ... (no changes in inline styles)
        />
        <div className="text-center">
          <label htmlFor="yearRange" className="form-label">
            Year: {year}
          </label>
        </div>
      </Col>
    </Row>
  );
};

export default ScaleBar;


