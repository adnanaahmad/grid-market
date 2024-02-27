import React, { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Box,
  Typography,
  InputBase,
  MenuItem,
  Select,
  Button
} from '@mui/material';
import * as colors from '@mui/material/colors';
import { formatNumber } from '../../core/utils';
import PieChart from './pieChart';
import DataGrid from './dataGrid';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

const fields = [
  {
    color: colors.pink[400],
    id: 'space_heating',
    label: 'Space heating',
    description: `As an energy end use, the use of mechanical equipment (including wood stoves and active solar heating devices) to heat all, or part, of a building to at least 50°F.`
  },
  {
    id: 'cooling',
    label: 'Cooling',
    color: colors.indigo[400],
    description: `The conditioning of air in a room for human comfort by a refrigeration unit (such as an air conditioner or heat pump) or by a central cooling or district cooling system that circulates chilled water. Use of fans or blowers by themselves without chilled air or water is not included in this definition of air-conditioning.`
  },
  {
    id: 'ventilation',
    label: 'Ventilation',
    color: colors.red[400],
    ventilation: `The conditioning of air in a room for human comfort by a refrigeration unit (such as an air conditioner or heat pump) or by a central cooling or district cooling system that circulates chilled water. Use of fans or blowers by themselves without chilled air or water is not included in this definition of air-conditioning.`
  },
  {
    id: 'waterheating',
    label: 'Water Heating',
    color: colors.teal[400],
    description: `As an energy end use, the use of energy to heat water for purposes other than space heating. Also referred to as domestic hot water heating.`
  },
  {
    id: 'lighting',
    label: 'Lighting',
    color: colors.deepOrange[400],
    description: `The illumination of the interior of a building by use of artificial sources of light.`
  },
  {
    id: 'cooking',
    label: 'Cooking',
    color: colors.amber[400],
    description: `As an energy end use, the use of energy for food preparation. It does not include food preparation in areas such as employee lounges, breakrooms, or vending areas that only involve equipment such as microwaves, coffee pots, and vending machines.`
  },
  {
    id: 'refrigeration',
    label: 'Refrigeration',
    color: colors.blue[400],
    description: `Refrigeration equipment is designed to maintain the stored items below room temperature but above the freezing point of water. This category also includes commercial ice machines and freezer equipment, which are designed to keep their contents below the freezing point of water (32°F).`
  },
  {
    id: 'office_equipment',
    label: 'Office equipment',
    color: colors.orange[400],
    description: ``
  },
  {
    id: 'computing',
    label: 'Computing',
    color: colors.lime[400],
    description: ``
  },
  {
    id: 'other',
    label: 'Other',
    color: colors.blueGrey[400],
    description: ``
  }
];

const additionalUses = [
  {
    id: 'use_ev_charger_2',
    label: 'EV Charger (Level 2)',
    color: colors.orange[400],
    value: 40000
  },
  {
    id: 'use_ev_charger_3',
    label: 'EV Charger (Level 3)',
    color: colors.cyan[400],
    value: 300000
  }
];

const UseChart = ({ data, metrics, cbecsData }) => {
  const [energyUseData, setEnergyUseData] = useState(data);

  const [activeRow, setActiveRow] = useState(null);
  const annualKwhConsumption = metrics?.annual_kwh_consumption;
  // const originalOtherPercentage = parseFloat(cbecsData.other_percentage);

  const [rows, setRows] = useState(
    fields.map(({ id, label, color, description }) => {
      return {
        id,
        label,
        color,
        description
      };
    })
  );

  const sortedRows = rows.map(row => {
    let rawValue =
      typeof row.value !== 'undefined'
        ? row.value
        : annualKwhConsumption *
          (parseFloat(cbecsData[`${row.id}_percentage`]) / 100);
    if (row.use_id) {
      rawValue = parseInt(row.total_units, 10) * row.value;
    }
    if (!rawValue) rawValue = 0;
    return {
      ...row,
      value: formatNumber(rawValue),
      value_raw: rawValue,
      percentage: formatNumber((rawValue / annualKwhConsumption) * 100)
    };
  });
  // .sort((a, b) => b.value_raw - a.value_raw);

  const totalKwh = sortedRows.reduce((acc, val) => {
    return acc + parseFloat(val.value_raw);
  }, 0);

  useEffect(() => {
    const newEnergyUseData = [...energyUseData];
    const idx = newEnergyUseData.findIndex(
      item => item.id === 'annual_consumption'
    );
    if (idx !== -1) {
      newEnergyUseData[idx].value = formatNumber(totalKwh);
      setEnergyUseData(newEnergyUseData);
    }
  }, [totalKwh]);

  const normalizedRows = sortedRows.map(row => {
    return {
      ...row,
      percentage: formatNumber((row.value_raw / totalKwh) * 100)
    };
  });

  const addRow = () => {
    setRows([
      ...rows,
      {
        label: null,
        color: '#ddd',
        description: 'Select use',
        value: formatNumber(0),
        percentage: formatNumber(0),
        use_id: additionalUses[0].id,
        total_units: 1,
        ...additionalUses[0],
        suffix: 'unit'
      }
    ]);
  };

  const chartRows = normalizedRows.map(row => {
    const newRow = {
      ...row,
      value: row.percentage
    };
    if (!activeRow)
      return {
        ...newRow
        // label: ""
      };

    if (newRow.id !== activeRow.id) {
      const rgb = hexToRgb(row.color);
      return {
        ...newRow,
        color: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` : ''
        // label: ""
      };
    }

    return {
      ...newRow
      // label: "asd"
    };
  });

  return (
    <>
      <DataGrid data={energyUseData} />
      <Box mt={4} display="flex">
        <TableContainer sx={{ width: { sm: '100%', md: '100%', lg: '60%' } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Use</TableCell>
                <TableCell align="left">Percentage</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {normalizedRows.map(row => (
                <TableRow
                  hover
                  onMouseOver={() => {
                    if (!row.id.startsWith('new')) setActiveRow(row);
                  }}
                  onMouseOut={() => setActiveRow(null)}
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar sx={{ bgcolor: row.color, width: 24, height: 24 }}>
                      &nbsp;
                    </Avatar>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <span
                      style={{
                        cursor: row.description ? 'help' : 'default'
                      }}
                      title={row.description}
                    >
                      {row.id.startsWith('use') ? (
                        <Select
                          sx={{
                            padding: 0,
                            fontSize: '0.875rem'
                          }}
                          defaultValue={row.id}
                          variant="standard"
                          disableUnderline
                          fullWidth
                          // value=""
                          onChange={event => {
                            const { value } = event.target;
                            setRows(rows => {
                              const additionalUse = additionalUses.find(
                                use => use.id === value
                              );
                              const currRowIndex = rows.findIndex(
                                item => item.id === row.id
                              );

                              const newRows = [...rows];

                              newRows[currRowIndex] = {
                                ...rows[currRowIndex],
                                value: additionalUse.value,
                                // label: additionalUse.label,
                                color: additionalUse?.color,
                                suffix: value === 1 ? 'unit' : 'units',
                                use_id: additionalUse.id
                              };

                              return newRows;
                            });
                          }}
                        >
                          {additionalUses.map(use => (
                            <MenuItem key={use.id} value={use.id}>
                              {use.label}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        row.label
                      )}
                    </span>
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {row.percentage}%
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {row.id.startsWith('use') ? (
                      <Box alignItems="center" display="flex">
                        <InputBase
                          onChange={event => {
                            const { value: totalUnits } = event.target;
                            // const newOtherRow = otherRow.value_raw - value;

                            setRows(rows => {
                              const currRowIndex = rows.findIndex(
                                item => item.id === row.id
                              );

                              const additionalUse = additionalUses.find(
                                use => use.id === row.use_id
                              );

                              const newRows = [...rows];
                              // newRows[currRowIndex].value = value;

                              if (additionalUse) {
                                newRows[currRowIndex] = {
                                  ...newRows[currRowIndex],
                                  value: additionalUse.value,
                                  total_units: totalUnits,
                                  suffix: totalUnits === 1 ? 'unit' : 'units'
                                };
                              }

                              return newRows;
                            });
                          }}
                          defaultValue={1}
                          inputProps={{
                            style: {
                              textAlign: 'right'
                            },
                            min: 0,
                            step: 1
                          }}
                          type="number"
                        />
                        {row.suffix || 'kWh'}
                      </Box>
                    ) : (
                      <>
                        {row.value}
                        {row.suffix || 'kWh'}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow
                hover
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 }
                }}
              >
                <TableCell colSpan={4} component="th" scope="row">
                  <Button onClick={addRow} color="secondary">
                    Add use
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          style={{
            width: 300,
            height: 300,
            position: 'relative',
            marginLeft: 64
          }}
          sx={{ display: { sm: 'none', md: 'none', lg: 'block' } }}
        >
          {activeRow && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                whiteSpace: 'nowrap',
                textAlign: 'center'
              }}
              className="overlay"
            >
              <Typography
                style={{ fontSize: 12, textAlign: 'center' }}
                variant="body1"
              >
                <b>{activeRow.label}</b> {activeRow.value}kW (
                {activeRow.percentage}%)
              </Typography>
            </div>
          )}

          <PieChart data={chartRows} />
        </Box>
      </Box>
    </>
  );
};

export default UseChart;
