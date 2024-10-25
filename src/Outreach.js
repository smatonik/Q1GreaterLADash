
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

const ProgramMetricsDashboard = () => {
  const chartProps = {
    width: 1200,
    height: 600,
    margin: { top: 30, right: 120, left: 200, bottom: 90 }
  };

  // Data for the new Persons Served and New Enrollments chart
  const enrollmentData = [
    { name: 'Agency Overall', served: 16462, enrollments: 5441 },
    { name: 'Outreach Overall', served: 5632, enrollments: 2670 },
    { name: 'Venice Outreach', served: 59, enrollments: 20 },
    { name: 'LAX Outreach', served: 73, enrollments: 44 },
    { name: 'Street Outreach CD5', served: 132, enrollments: 32 },
    { name: 'DHS MDT SPA 7', served: 717, enrollments: 280 },
    { name: 'SPA 7 PATH Public Spaces', served: 98, enrollments: 32 }
  ];

  const housingData = [
    { name: 'Venice Outreach', value: 10 },
    { name: 'LAX Outreach', value: 18 },
    { name: 'Street Outreach CD5', value: 4 },
    { name: 'DHS MDT SPA 7', value: 0 },
    { name: 'SPA 7 PATH Public Spaces', value: 0 }
  ];

  const responseTimeData = [
    { name: 'Agency Overall', threeDay: 73.6, sevenDay: 76.7 },
    { name: 'Outreach Overall', threeDay: 87.6, sevenDay: 90.5 },
    { name: 'Venice Outreach', threeDay: 79.2, sevenDay: 87.5 },
    { name: 'LAX Outreach', threeDay: 98.2, sevenDay: 98.2 },
    { name: 'Street Outreach CD5', threeDay: 94.9, sevenDay: 95.8 },
    { name: 'DHS MDT SPA 7', threeDay: 93.3, sevenDay: 94.5 },
    { name: 'SPA 7 PATH Public Spaces', threeDay: 93.5, sevenDay: 93.5 }
  ];

  const renderCustomBarLabel = ({ x, y, width, height, value }) => {
    if (value === null || value === undefined) return null;
    return (
      <text 
        x={x + width / 2} 
        y={y + height / 2} 
        fill="#666666" 
        textAnchor="middle" 
        dominantBaseline="middle"
        style={{ fontSize: '12px', fontWeight: 'bold' }}
      >
        {typeof value === 'number' ? (Number.isInteger(value) ? value : `${value.toFixed(1)}%`) : value}
      </text>
    );
  };

  const renderExitLabel = ({ x, y, width, height, value }) => {
    if (value === null || value === undefined || value === 0) return null;
    return (
      <text 
        x={x + width / 2}
        y={y + height / 2}
        fill="#666666" 
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: '11px', fontWeight: 'bold' }}
      >
        {`${value.toFixed(1)}%`}
      </text>
    );
  };

  const CustomLegend = (props) => {
    const { payload } = props;
    return (
      <div style={{ paddingTop: "60px", display: "flex", justifyContent: "center", gap: "20px" }}>
        {payload.map((entry, index) => (
          <span key={`legend-${index}`} style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
            <span style={{ 
              display: "inline-block", 
              width: "10px", 
              height: "10px", 
              backgroundColor: entry.color,
              marginRight: "5px"
            }}></span>
            <span style={{ color: "#666666" }}>{entry.value}</span>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">SPA 5, 7, & 8 Outreach</h1>
      
      {/* New chart for Persons Served and New Enrollments */}
      <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Persons Served and New Enrollments</h2>
        <BarChart width={1200} height={400} data={enrollmentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="served" name="Persons Served" fill="#86efac" />
          <Bar dataKey="enrollments" name="New Enrollments" fill="#bbf7d0" />
        </BarChart>
      </div>

      {/* Existing charts here */}
      <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Total Permanent Housing Placements</h2>
        <BarChart {...chartProps} data={housingData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={85} stroke="#000" strokeDasharray="3 3" label={{ position: 'right', value: '85%', fill: '#666666' }} />
          <Bar dataKey="value" fill="#86efac" label={renderCustomBarLabel} />
        </BarChart>
      </div>

      <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Service Response Time</h2>
        <BarChart {...chartProps} data={responseTimeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
          <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend content={<CustomLegend />} />
          <ReferenceLine y={85} stroke="#000" strokeDasharray="3 3" label={{ position: 'right', value: '85%', fill: '#666666' }} />
          <Bar dataKey="threeDay" name="Served within 3 days" fill="#86efac" label={renderCustomBarLabel} />
          <Bar dataKey="sevenDay" name="Served within 7 days" fill="#bbf7d0" label={renderCustomBarLabel} />
        </BarChart>
      </div>
    </div>
  );
};

export default ProgramMetricsDashboard;
