import React from 'react';
import { Grid } from '@mui/material';
import Reduction from './reduction';
import EnergyRatingIcons from './energyRatingIcons';
import Icon  from './technologyIcon';

const BuildingRecommendation = ({
  children,
  description,
  iconProps,
  label,
  value
}) => (
  <Grid className="recommendations-item" item xs={6} sm={3} lg={6}>
    <Icon {...iconProps} />
    <label title={description}>{label}</label>
    <p>{value}</p>
    {children}
  </Grid>
);

export default function BuildingRecommendations({
  chp,
  descriptions,
  estimates,
  fuel_cell,
  icons,
  pv,
  reductions,
  solar_thermal,
  storage,
  therm_production
}) {
  return (
    <Grid className="recommendations" container spacing={2}>
      <Grid item xs={12} lg>
        <Grid container spacing={2} wrap="nowrap">
          <BuildingRecommendation
            description={descriptions.storage_estimate}
            iconProps={{
              name: 'battery',
              title: descriptions.storage_recommendation,
              value: storage
            }}
            label="Storage Estimate"
            value={estimates.storage}
          >
            <Reduction
              low={reductions.storage.low}
              high={reductions.storage.high}
              label="Average Monthly Peak kW Reduction"
              unit="kW"
            />
            <Reduction
              low={reductions.storage.low}
              high={reductions.storage.high}
              label="Average Monthly Peak kWh Reduction"
              unit="kWh"
            />
          </BuildingRecommendation>
          <BuildingRecommendation
            description={descriptions.fuel_cell_estimate}
            iconProps={{
              name: 'hydrogen',
              title: descriptions.fuel_cell_recommendation,
              value: fuel_cell
            }}
            label="Fuel Cell Estimate"
            value={estimates.fuel_cell}
          >
            <Reduction
              low={reductions.solar.low}
              high={reductions.solar.high}
              unit="kWh"
            />
            <Reduction
              low={reductions.fuel_cell.low}
              high={reductions.fuel_cell.high}
              unit="kW"
            />
            <Reduction
              low={reductions.fuel_cell.low}
              high={reductions.fuel_cell.high}
              unit="kWh"
            />
          </BuildingRecommendation>
          {!!solar_thermal && (
            <BuildingRecommendation
              description={descriptions.solar_estimate}
              iconProps={{
                name: 'solar_thermal',
                value: solar_thermal
              }}
              label="Solar Thermal Estimate"
              value={estimates.solar_thermal}
            />
          )}
          <BuildingRecommendation
            description={descriptions.chp_estimate}
            iconProps={{
              name: 'bulb',
              title: descriptions.chp_recommendation,
              value: chp
            }}
            label="CHP Estimate"
            value={estimates.chp}
          >
            <Reduction
              low={reductions.chp.low}
              high={reductions.chp.high}
              unit="kW"
            />
            <Reduction
              low={reductions.chp.low}
              high={reductions.chp.high}
              unit="kWh"
            />
            <Reduction
              low={therm_production.low}
              high={therm_production.high}
              unit=" therms"
              label="Therm Production"
            />
          </BuildingRecommendation>
          <BuildingRecommendation
            description={descriptions.solar_estimate}
            iconProps={{
              name: 'sun',
              title: descriptions.solar_recommendation,
              value: pv
            }}
            label="Solar Estimate"
            value={estimates.solar}
          >
            <Reduction
              low={reductions.solar.low}
              high={reductions.solar.high}
              unit="kWh"
            />
          </BuildingRecommendation>
        </Grid>
      </Grid>
      {(icons.energystar || icons.eui) && icons.energystar !== 'n/a' && (
        <EnergyRatingIcons icons={icons} />
      )}
    </Grid>
  );
}
