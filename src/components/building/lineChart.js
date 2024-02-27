import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Paper, Box } from '@mui/material';
import { abbreviateNumber } from '../../core/utils';

export default function LineChart({ animate, data, axisBottom, unit }) {
  return (
    <ResponsiveLine
      theme={{
        grid: {
          line: {
            stroke: 'rgba(0,0,0,0.05)',
            strokeWidth: 1
          }
        },
        crosshair: {
          line: {
            stroke: '#000000',
            strokeWidth: 1,
            strokeOpacity: 0.5,
            strokeDasharray: '2 4'
          }
        }
      }}
      data={data}
      margin={{ top: 16, right: 0, bottom: 32, left: 3 * 16 }}
      xScale={{
        type: 'time',
        format: '%Y-%m-%d %H:%M:%S',
        precision: 'second'
      }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false
      }}
      defs={[
        {
          id: 'gradientC',
          type: 'linearGradient',
          colors: [
            { offset: 0, color: '#faf047' },
            { offset: 100, color: '#e4b400' }
          ]
        }
      ]}
      fill={[{ match: '*', id: 'gradientA' }]}
      // enableSlices={false}
      enableCrosshair
      crosshairType="x"
      lineWidth={2}
      animate={animate}
      axisTop={null}
      axisRight={null}
      enableSlices="x"
      sliceTooltip={({ slice }) => {
        const labels = {
          pvwatts: 'Solar',
          load_curve: 'Load'
        };

        const units = {
          pvwatts: 'kW',
          load_curve: 'kW',
          temperature: '°F',
          windspeed: ' ft/s'
        };

        return (
          <Paper>
            <Box p={1}>
              {slice.points.map(point => (
                <div key={point.serieId}>
                  {labels[point.serieId] || point.serieId}: {point.data.y}{' '}
                  {units[point.serieId]}
                </div>
              ))}
            </Box>
          </Paper>
        );
      }}
      enableGridY
      tooltip={({ point }) => {
        return (
          <div>
            {point.serieId}: {abbreviateNumber(point.data.y)}
            {unit}
          </div>
        );
      }}
      axisBottom={axisBottom}
      axisLeft={{
        orient: 'left',
        tickSize: 0,
        tickPadding: 16,
        tickRotation: 0,
        legend: null,
        legendOffset: -40,
        legendPosition: 'middle',
        format: v =>
          Math.sign(v) === -1
            ? `-${abbreviateNumber(Math.abs(v))}`
            : `${abbreviateNumber(Math.abs(v))}`
      }}
      enableGridX={false}
      colors={v => {
        return v.color;
      }}
      pointSize={0}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      // pointBorderColor={{ from: "serieColor" }}
      pointLabel="y"
      pointLabelYOffset={-12}
      enableArea={false}
      useMesh
      // legends={null}
    />
  );
}
