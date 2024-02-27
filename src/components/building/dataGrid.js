import React from 'react';
import { Grid } from '@mui/material';
import './dataGrid.sass';
import DataGridItem from './dataGridItem';

const DataGrid = ({ data, compact }) => {
  const dataObj = data.reduce(
    (acc, item) => {
      if (item.position === 'left' || item.position === 'right') {
        acc[item.position].push(item);
        return acc;
      }
      acc.sequential.push(item);
      return acc;
    },
    {
      left: [],
      right: [],
      sequential: []
    }
  );
  const { left, right, sequential } = dataObj;
  let className = 'data-grid';
  if (compact) className += ' compact';

  return (
    <Grid container spacing={2}>
      {sequential.length > 0 && (
        <Grid item xs={12}>
          <Grid container spacing={2} className={className}>
            {sequential.map(item => {
              return <DataGridItem key={item.label} {...item} />;
            })}
          </Grid>
        </Grid>
      )}
      {left.length > 0 && right.length > 0 && (
        <Grid item xs={12}>
          <Grid container spacing={2} className="data-columns">
            <Grid item xs={12} md={6} className="data-col">
              <Grid container spacing={2}>
                {left.map(item => (
                  <DataGridItem
                    key={item.key || item.label}
                    md={12}
                    className="col"
                    {...item}
                  />
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} className="data-col">
              <Grid container spacing={2}>
                {right.map(item => (
                  <DataGridItem
                    key={item.label}
                    md={12}
                    className="col"
                    {...item}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default DataGrid;
