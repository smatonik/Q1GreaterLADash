import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

const ProgramMetricsDashboard = () => {
  const chartProps = {
    width: 1200,
    height: 600,
    margin: { top: 30, right: 120, left: 200, bottom: 90 }
  };

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
    { name: ' ', threeDay: null, sevenDay: null },
    { name: 'Venice Outreach', threeDay: 79.2, sevenDay: 87.5 },
    { name: 'LAX Outreach', threeDay: 98.2, sevenDay: 98.2 },
    { name: 'Street Outreach CD5', threeDay: 94.9, sevenDay: 95.8 },
    { name: 'DHS MDT SPA 7', threeDay: 93.3, sevenDay: 94.5 },
    { name: 'SPA 7 PATH Public Spaces', threeDay: 93.5, sevenDay: 93.5 }
  ];

  const dataQualityData = [
    { name: 'Agency Overall', personal: 73.2, universal: 69.3 },
    { name: 'Outreach Overall', personal: 68.5, universal: 82.1 },
    { name: ' ', personal: null, universal: null },
    { name: 'Venice Outreach', personal: 86.3, universal: 74.5 },
    { name: 'LAX Outreach', personal: 48.5, universal: 92.6 },
    { name: 'Street Outreach CD5', personal: 83.1, universal: 83.9 },
    { name: 'DHS MDT SPA 7', personal: 62.9, universal: 57.8 },
    { name: 'SPA 7 PATH Public Spaces', personal: 50.5, universal: 59.8 }
  ];

  const incomeData = [
    { name: 'Venice Outreach', value: 0 },
    { name: 'LAX Outreach', value: 0 },
    { name: 'Street Outreach CD5', value: 0 },
    { name: 'DHS MDT SPA 7', value: 2 },
    { name: 'SPA 7 PATH Public Spaces', value: 0 }
  ];

  const participationData = [
    { name: 'Agency Overall', value: 69.8 },
    { name: 'Outreach Overall', value: 69.8 },
    { name: ' ', value: null },
    { name: 'Venice Outreach', value: 86.4 },
    { name: 'LAX Outreach', value: 93.2 },
    { name: 'Street Outreach CD5', value: 93.9 },
    { name: 'DHS MDT SPA 7', value: 96.2 },
    { name: 'SPA 7 PATH Public Spaces', value: 99.0 }
  ];

  const exitsData = [
    { name: 'Agency Overall', permanent: 14.4, nonPermPositive: 15.5, other: 50.1, homeless: 20.0 },
    { name: 'Outreach Overall', permanent: 14.4, nonPermPositive: 15.5, other: 45.2, homeless: 24.9 },
    { name: ' ', permanent: null, nonPermPositive: null, other: null, homeless: null },
    { name: 'Venice Outreach', permanent: 45.5, nonPermPositive: 18.1, other: 27.3, homeless: 9.1 },
    { name: 'LAX Outreach', permanent: 75.0, nonPermPositive: 0.0, other: 25.0, homeless: 0.0 },
    { name: 'Street Outreach CD5', permanent: 12.1, nonPermPositive: 30.3, other: 57.6, homeless: 0.0 },
    { name: 'DHS MDT SPA 7', permanent: 2.5, nonPermPositive: 7.2, other: 23.5, homeless: 66.8 },
    { name: 'SPA 7 PATH Public Spaces', permanent: 0.0, nonPermPositive: 7.4, other: 63.0, homeless: 29.6 }
  ];

  const renderCustomBarLabel = ({ x, y, width, height, value }) => {
    if (value === null || value === undefined) return null;
    return (
      <text 
        x={x + width/2} 
        y={y + height/2} 
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
        x={x + width/2}
        y={y + height/2}
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

      <Tabs>
        <TabList>
          <Tab>Housing Placements</Tab>
          <Tab>Service Response Time</Tab>
          <Tab>Data Quality</Tab>
          <Tab>Income Increases</Tab>
          <Tab>Participants Engaged</Tab>
          <Tab>Exit Destinations</Tab>
        </TabList>

        <TabPanel>
          <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Total Permanent Housing Placements</h2>
            <BarChart {...chartProps} data={housingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#86efac" label={renderCustomBarLabel} />
            </BarChart>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Service Response Time</h2>
            <BarChart {...chartProps} data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend content={<CustomLegend />} />
              <ReferenceLine y={85} stroke="#000" strokeDasharray="3 3" />
              <Bar dataKey="threeDay"
