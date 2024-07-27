import React, { useState } from 'react';
import { VennDiagram } from 'reaviz';

const VennPage = () => {
  const [leftText, setLeftText] = useState(5);
  const [rightText, setRightText] = useState(10);

  const data = [
    { key: ['A'], data: leftText, label: leftText },
    { key: ['B'], data: rightText, label: rightText },
    { key: ['A', 'B'], data: 5, label: 'Intersection' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Left text"
          value={leftText}
          onChange={(e) => setLeftText(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Right text"
          value={rightText}
          onChange={(e) => setRightText(e.target.value)}
        />
      </div>
      <VennDiagram
        height={300}
        width={300}
        data={data}
      />
    </div>
  );
};

export default VennPage;
