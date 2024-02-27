// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const PieChart = ({ data, enableArcLinkLabels = false }) => (
  <ResponsivePie
    theme={{
      fontFamily: 'Roboto'
    }}
    tooltip={({ datum }) => {
      return (
        <div>
          <Paper
            style={{
              padding: 16,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <Avatar
              sx={{
                bgcolor: datum.color,
                width: 24,
                height: 24
              }}
            >
              &nbsp;
            </Avatar>
            <Typography
              style={{ marginLeft: 16, fontSize: 12, textAlign: 'left' }}
              variant="body1"
            >
              <b>{datum.label}</b> {datum.value}%
            </Typography>
          </Paper>
        </div>
      );
    }}
    data={data}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    innerRadius={0.8}
    padAngle={3}
    cornerRadius={0}
    activeOuterRadiusOffset={8}
    borderWidth={0}
    arcLabelsRadiusOffset={3}
    colors={{ datum: 'data.color' }}
    // arcLinkLabel={arcLabel}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabel={null}
    enableArcLinkLabels={enableArcLinkLabels}
    arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
  />
);

export default PieChart;
