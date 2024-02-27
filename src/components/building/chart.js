import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { observer } from 'mobx-react-lite';
import { Typography, CircularProgress, Backdrop } from '@mui/material';

//import agent from '../../lib/agent';
//import useStores from '../../stores/useStores';
import MoreMenu from './moreMenu';
import LineChart from './lineChart';

function Chart({
  showMenu,
  chartType,

  latitude,
  longitude,
  buildingId,
  projectId
}) {
  const canUploadData = showMenu && projectId && chartType === 'load_curve';
  //const { buildingDetailStore } = useStores();
  //const [chartData, setChartData] = useState([]);
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [draggedOver, setDraggedOver] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const onDragOver = () => setDraggedOver(true);
  const onDragLeave = () => setDraggedOver(false);
  const onDrop = async acceptedFiles => {
    setAcceptedFiles(acceptedFiles);
  };
  // dummy data
  const buildingDetailStore = {};
  const chartData = [
    {
      "id": "japan",
      "color": "hsl(332, 70%, 50%)",
      "data": [
        {
          "x":  new Date("2022-03-10"),
          "y": 159
        },
        {
          "x":  new Date("2022-03-11"),
          "y": 235
        },
        {
          "x":  new Date("2022-03-12"),
          "y": 187
        },
        {
          "x":  new Date("2022-03-13"),
          "y": 281
        },
        {
          "x":  new Date("2022-03-14"),
          "y": 105
        },
        {
          "x":  new Date("2022-03-15"),
          "y": 207
        },
      ]
    }
  ];

  const reset = async () => {
    // await agent.Project.deleteBuildingLoadProfile(projectId, buildingId);

    // await buildingDetailStore.getPredictions(buildingId);
    //setChartData(buildingDetailStore.predictions);
  };

  // useEffect(() => {
  //   if (!acceptedFiles.length) return;
  //   setUploadProgress(0);
  //   (async () => {
  //     const { data } = await agent.Project.uploadBuildingLoadProfile(
  //       projectId,
  //       buildingId,
  //       acceptedFiles,
  //       progress => {
  //         setUploadProgress(progress);
  //       }
  //     );

  //     if (data.err) {
  //       setUploadError(data.err.msg);
  //       setUploadProgress(null);

  //       setTimeout(() => {
  //         setUploadError(null);
  //       }, 2000);
  //       return;
  //     }

  //     await buildingDetailStore.getPredictions(buildingId);
  //     setChartData(buildingDetailStore.predictions);

  //     setUploadProgress(null);
  //     setDraggedOver(false);
  //   })();
  // }, [acceptedFiles]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    onDragOver,
    onDragLeave,
    disabled: !canUploadData,
    noClick: true,
    accept: ['.csv']
  });

  let tickValues = 'every 1 days';

  // useEffect(() => {
  //   if (!buildingId) return;
  //   (async () => {
  //     if (chartType === 'temperature' || chartType === 'windspeed') {
  //       await buildingDetailStore.getWeather(longitude, latitude);
  //     }

  //     if (chartType === 'load_curve') {
  //       await buildingDetailStore.getPredictions(buildingId);
  //     }

  //     if (chartType === 'temperature') {
  //       if (buildingDetailStore.weatherData.length) {
  //         const temperatureChart = buildingDetailStore.weatherData.find(
  //           chart => chart.id === 'temperature'
  //         );
  //         setChartData([temperatureChart]);
  //       }
  //     }

  //     if (chartType === 'wind_speed') {
  //       if (buildingDetailStore.weatherData.length) {
  //         const windspeedChart = buildingDetailStore.weatherData.find(
  //           chart => chart.id === 'windspeed'
  //         );
  //         setChartData([windspeedChart]);
  //       }
  //     }

  //     if (chartType === 'load_curve') {
  //       tickValues = 'every 1 days';
  //       if (buildingDetailStore.predictions.length) {
  //         setChartData(buildingDetailStore.predictions);
  //       }
  //     }
  //   })();
  // }, [buildingId, chartType]);

  const units = {
    temperature: '°F',
    wind_speed: ' ft/s',
    load_curve: ' kW'
  };

  const unit = units[chartType];
  return (
    <div {...getRootProps()} style={{ height: 270, position: 'relative' }}>
      {projectId && showMenu && chartType === 'load_curve' && (
        <MoreMenu
          isFab
          size="small"
          style={{
            position: 'absolute',
            right: 0,
            zIndex: 1,
            top: 16
          }}
          options={[
            {
              label: 'Upload Interval Data',
              onClick: open
            },
            {
              label: 'Reset Interval Data',
              onClick: reset
            }
          ]}
        />
      )}

      <input {...getInputProps()} />
      <Backdrop className="filemanager-backdrop" open={draggedOver} />
      <Backdrop
        invisible
        style={{
          position: 'absolute',
          zIndex: 1
        }}
        open={uploadProgress !== null || uploadError}
      >
        {uploadProgress !== null && <CircularProgress color="primary" />}
        <Typography>{uploadError}</Typography>
      </Backdrop>
      <LineChart
        animate
        axisBottom={{
          type: 'time',
          format: `%-d. %b`,
          tickValues,
          legend: '',
          legendOffset: -12
        }}
        unit={unit}
        units={{
          temperature: '°F',
          windspeed: ' ft/s'
        }}
        data={chartData}
      />
    </div>
  );
}

export default observer(Chart);
