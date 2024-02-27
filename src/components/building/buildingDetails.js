import React, { useCallback } from "react";
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { gridmarketKey, apiRoute, httpMethod } from "../../core/constants";
import { gridmarketPlatformApi as axios } from "../../core/interceptor";
import EnergyRatingIcons from './energyRatingIcons';
import BuildingRecommendations from "./buildingRecommendations";
import VisibilitySensor from 'react-visibility-sensor';
import DataGrid from "./dataGrid";
import DataSection from "./dataSection";
import Chart from "./chart";
//import PowerlineMap from "./powerlineMap";
import UseChart from "./useChart";
import Spinner from "./loadingSpinner";
import translations from "../../core/translations";
import './building.sass';
import './dataSection.sass';
import Place from "./place";
import Contact from "./contact";


function BuildingDetailsComponent() {
    // const [data, setData] = React.useState({});
    // const getListingProfile = useCallback(async () => {
    //     const res = await axios({
    //         method: httpMethod.get,
    //         url: `${apiRoute.listingProfile}/HodbRyVgX3?key=${gridmarketKey}&include_financials_raw=1`,
    //     });
    //     setData(res.data.data);
    // }, []);

    // React.useEffect(() => {
    //     //getListingProfile();
    // }, [getListingProfile]);

    //state
    const { descriptions } = translations;
    //const { buildingDetailStore } = useStores();
    const history = useNavigate();
    const [isLazyLoading, setIsLazyLoading] = React.useState(false);
    const [quickMenuAnchor, setQuickMenuAnchor] = React.useState(null);
  
    // const {
    //   location: { hash }
    // } = history;
    // const activeHash = !isLazyLoading && hash && hash.replace('#', '');

    // dummay data
    const building = {
        icons: {
            energystar: 'n/a',
            eui: 'n/a'
        },
        estimates: '20000',
        chp: '123',
        pv: '14440',
        fuel_cell: 'solar',
        reductions: {
            storage: {
                low: '30',
                high: '100'
            },
            solar: {
                low: '50',
                high: '120'
            },
            fuel_cell: {
                low: '75',
                high: '80'
            },
            chp: {
                low: '30',
                high: '100'
            }
        },
        solar_thermal: '900',
        storage: '2500',
        therm_production: '5000',
        buildingId: 224,
        temperature: '50',
        wind_speed: '600',
        weather_timestamp: '',
        lat: '271',
        lon: '254',
        projectId: '400',
        power_line: {
            power_line_closest_point: [21,127]
        },
        buildingData: {
            cbecs: {
                space_heating_percentage: 15,
                cooling_percentage: 50,
                ventilation_percentage: 17,
                lighting_percentage: 31,
                cooking_percentage: 67,
                refrigeration_percentage: 91,
                office_equipment_percentage: 98,
                other_percentage: 32,
                computing_percentage: 96,

            },
            metrics: {
                annual_kwh_consumption: '1.5'
            }
        },
        tariff: {
            name: "Component",
            data: ["111", "222", "333"]
        },
        places: [
            {id: 1, name: "one", website: "https://www.google.com/", phone: "+1 212-541-7515", opening_hours: ["12pm - 1am"]}, 
            {id: 2, name: "two", website: "https://www.google.com/", phone: "+1 212-541-7515", opening_hours: ["12pm - 1am"]},
            {id: 3, name: "three", website: "https://www.google.com/", phone: "+1 212-541-7515", opening_hours: ["12pm - 1am"]}
        ],
        contacts: [
            {id:1, name: 'one', address: 'address1', relationship_to_owner: "Legal ownership", company: "company 1", phones: [{phone: "+1 212-541-7515", year: '2005'}], emails: [{email: "company@gmail.com", year: "2005"}]}, 
            {id:2, name: 'two', address: 'address2', relationship_to_owner: "Possession", company: "company 2", phones: [{phone: "+1 212-541-7515", year: '2005'}], emails: [{email: "company@gmail.com", year: "2005"}]},
            {id:3, name: 'three', address: 'address3', relationship_to_owner: "Shared ownership", company: "company 3", phones: [{phone: "+1 212-541-7515", year: '2005'}], emails: [{email: "company@gmail.com", year: "2005"}]}
        ]
    }
    const detailsData = [
        { name: "item1", position: "left", value: 10, label: 'KG O2' },
        { name: "item2", position: "right", value: 20, label: 'EQUIVALENT GALLONS OF GAS' },
        { name: "item3", position: "sequential", value: 30, label: 'EQUIVALENT VEHICLES DRIVEN' },
        // { name: "item4", position: "left", value: 40, label: 4 },
        { name: "item5", position: "sequential", value: 50, label: 'EQUIVALENT SUBURBAN HOMES' },
        // { name: "item6", position: "right", value: 60, label: 6 }
    ]
    const buildingDetailStore = {
        details: {
            predictions: detailsData,
            power_line: detailsData,
            energy_use: detailsData,
            DataGrid: detailsData
        },
        sections: [{id: 'predictions', title: 'Charts Component'}, 
        {id: 'DataGrid', title: 'Data Grid Component'}, 
        //{id: 'power_line', title: 'Power Line Map'}, 
        {id: 'energy_use', title: 'Use Chart Component'}],
        isVendor: true,
        detailsContainerRef: {current: null},
        isAdmin: true
    }

    const {
        details,
        sections,
        isVendor,
        detailsContainerRef,
        isAdmin
    } = buildingDetailStore;

    const visibleSections = [...sections].filter(section => {
        if (isVendor && section.id === 'load_curve') return false;
        return true;
    });

    const onVisibilityChange = async (isVisible, id) => {
        if (isVisible) {
          //await handleLazyLoad(id);
        }
    };

    if (!building || !visibleSections.length) {
        return (
          <Spinner style={{ marginTop: '50vh', transform: 'translateY(-50%)' }} />
        );
    }

    const {
        address,
        centroid,
        chp,
        contacts,
        electric_utility_short,
        electricity_forecast,
        estimates,
        fuel_cell,
        hourly_predictions,
        icons,
        monthly_predictions,
        predictionsTrace,
        pv,
        pvwattsTrace,
        reductions,
        solar_thermal,
        storage,
        tariff,
        therm_production,
        buildingId,
        temperature,
        wind_speed,
        weather_timestamp,
        lat,
        lon,
        projectId,
        power_line,
        buildingData,
        places
      } = building;

    return (
      <React.Fragment>
        <div className="building--details">
          <div className="data-section">
            <div className="data-section-content">
              {/* <EnergyRatingIcons nowrap icons={icons} /> */}
              <BuildingRecommendations
                chp={chp}
                descriptions={descriptions}
                estimates={estimates}
                fuel_cell={fuel_cell}
                icons={icons}
                pv={pv}
                reductions={reductions}
                solar_thermal={solar_thermal}
                storage={storage}
                therm_production={therm_production}
              />
            </div>
          </div>
          {visibleSections.map((section) => {
            const { id, title } = section;
            return (
              <VisibilitySensor
                delayedCall
                containment={detailsContainerRef.current}
                partialVisibility
                offset={{ top: 200 }}
                key={id}
                active={[
                  "closest_power_plant",
                  "places",
                  "power_line",
                  "temperature",
                  "wind_speed",
                ].includes(id)}
                onChange={(isVisible) => onVisibilityChange(isVisible, id)}
              >
                <DataSection
                  id={id}
                  isActive={true}
                  loading={
                    ["closest_power_plant", "places", "power_line"].includes(
                      id
                    ) && !buildingDetailStore[id]
                  }
                  setQuickMenuAnchor={setQuickMenuAnchor}
                  title={title}
                >
                  {[
                    "predictions",
                    "load_curve",
                    "wind_speed",
                    "temperature",
                    "electricity_forecast",
                  ].includes(id) ? (
                    <Chart
                      chartType={id}
                      showMenu={isAdmin}
                      electric_utility_short={electric_utility_short}
                      electricity_forecast={electricity_forecast}
                      hourly_predictions={hourly_predictions}
                      monthly_predictions={monthly_predictions}
                      predictionsTrace={predictionsTrace}
                      pvwattsTrace={pvwattsTrace}
                      temperature={temperature}
                      wind_speed={wind_speed}
                      weather_timestamp={weather_timestamp}
                      latitude={lat}
                      longitude={lon}
                      buildingId={buildingId}
                      projectId={projectId}
                    />
                  ) : (
                    <>{id === "DataGrid" && <DataGrid data={details[id]} />}</>
                  )}
                  {/* {id === 'power_line' && (
                            <PowerlineMap
                                address={address}
                                building={building}
                                buildingId={buildingId}
                                centroid={centroid}
                                power_line={power_line}
                            />
                            )} */}
                  {id === "energy_use" && buildingData?.metrics && (
                    <UseChart
                      data={details.energy_use}
                      cbecsData={buildingData.cbecs}
                      metrics={buildingData.metrics}
                    />
                  )}
                </DataSection>
              </VisibilitySensor>
            );
          })}

          {/* {tariff && (
            <DataSection
              id="tariff"
              //isActive={activeHash === 'tariff'}
              setQuickMenuAnchor={setQuickMenuAnchor}
              title={`Tariff: ${tariff.name}`}
            >
              <table width="100%">
                <tbody>
                  {tariff.data.map((col) => (
                    <tr>
                      <td>{col[0]}</td>
                      <td>{col[1]}</td>
                      <td>{col[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataSection>
          )} */}

          {/* <VisibilitySensor
            delayedCall
            containment={detailsContainerRef.current}
            partialVisibility
            offset={{ top: 200 }}
            onChange={(isVisible) => onVisibilityChange(isVisible, "places")}
          >
            <DataSection
              id="places"
              //isActive={activeHash === "places"}
              setQuickMenuAnchor={setQuickMenuAnchor}
              title="Places"
            >
              <Grid container spacing={2}>
                {places &&
                  places.map((place) => (
                    <Grid item xs={12} md={6} lg={4} key={place.id}>
                      <Place {...place} />
                    </Grid>
                  ))}
              </Grid>
            </DataSection>
          </VisibilitySensor> */}
          {/* {contacts && !!contacts.length && (
            <DataSection
              id="contacts"
              //isActive={activeHash === "contacts"}
              setQuickMenuAnchor={setQuickMenuAnchor}
              title="Contacts"
            >
              <Grid container spacing={2}>
                {contacts.map((contact) => (
                  <Grid item xs={12} md={6} lg={4} key={contact.name}>
                    <Contact {...contact} />
                  </Grid>
                ))}
              </Grid>
            </DataSection>
          )} */}
        </div>
      </React.Fragment>
    );
}

export default React.memo(BuildingDetailsComponent);
