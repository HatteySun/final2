// // src/components/legend.js
// import React from 'react';

// const Legend = ({ legendData, onHover, onHoverEnd }) => {
//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
//             {legendData.map((item, index) => (
//                 <div key={index} 
//                      onMouseEnter={() => onHover(item.label)} 
//                      onMouseLeave={onHoverEnd}
//                      style={{ display: 'flex', alignItems: 'center', margin: '2px' }}>
//                     <div style={{ width: '20px', height: '20px', backgroundColor: item.color }}></div>
//                     <div style={{ marginLeft: '5px' }}>{item.label}</div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Legend;

import React from 'react';

const Legend = ({ legendData, onHover, onHoverEnd }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Title for the color legend */}
            <div style={{ marginBottom: '10px' }}>
                <h4>Ladder (Happiness Index) range</h4>
            </div>
            {legendData.map((item, index) => (
                <div key={index} 
                     onMouseEnter={() => onHover(item.label)} 
                     onMouseLeave={onHoverEnd}
                     style={{ display: 'flex', alignItems: 'center', margin: '2px' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: item.color }}></div>
                    <div style={{ marginLeft: '5px' }}>{item.label}</div>
                </div>
            ))}
        </div>
    );
};

export default Legend;
