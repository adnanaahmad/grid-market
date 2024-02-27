import React from 'react';
import { Grid } from '@mui/material';

export default function BuildingRecommendations({ icons, nowrap }) {
  return (
    <Grid item xs={12} lg={2}>
      <Grid container wrap={nowrap ? 'nowrap' : 'wrap'} spacing={2}>
        <Grid className="building--energy" item xs={6} lg={12}>
          <div title="Energy Star Score" className="icon">
            <div className="energy-star-icon" />
            <p className={icons.energystar === 'n/a' ? 'none' : ''}>
              {icons.energystar}
              <span>of 100</span>
            </p>
          </div>
        </Grid>
        <Grid className="building--energy" item xs={6} lg={12}>
          <div title="EUI" className="icon">
            <div className="der-icon" />
            <p className={icons.eui === 'n/a' ? 'none' : ''}>
              {icons.eui}
              <span>kBtu / ft2</span>
            </p>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
