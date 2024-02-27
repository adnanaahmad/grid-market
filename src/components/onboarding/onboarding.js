import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useCallback } from "react";
import backgroundImage from '../../assets/map.svg';
import WestIcon from '@mui/icons-material/West';
import { onboardingStyle as style } from "../../core/style";
import useDebounce from "../../core/debounce";
import { gridmarketApi as axios, gridmarketStagingApi as stagingApi } from "../../core/interceptor";
import { apiRoute, gridmarketKey, gridmarketStagingKey, httpMethod, onboardingComponents as components } from "../../core/constants";
import { LoadingButton } from "@mui/lab";
import { formatter } from "../../core/helper";

function OnboardingComponent() {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [component, setComponent] = React.useState(components.discoverSavings);
    const [estimates, setEstimates] = React.useState({co2: '', revenue: '', address: ''});

    const navigateTo = useCallback((value) => {
      setComponent(value);
    }, []);
    const setEstimatesFromDiscoverSavings = useCallback((value) => {
      setEstimates(value);
    }, [])
    return(
        <Box sx={{...style.container, ...(matchesMobile && style.containerHeightMobile)}}>
            <Box component="img" sx={style.img} src={backgroundImage}/>
            <Box>
                <Box sx={matchesMobile ? style.contentWrapperSmall : style.contentWrapper}>
                    <Stack spacing={3} sx={style.contentContainer}>
                      {
                        component === components.discoverSavings &&
                        <DiscoverSavings matchesMobile={matchesMobile} navigateTo={navigateTo} setEstimatesFromDiscoverSavings={setEstimatesFromDiscoverSavings} />
                      }
                      {
                        component === components.getStarted &&
                        <GetStarted matchesMobile={matchesMobile} data={estimates} navigateTo={navigateTo}/>
                      }                      
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}
export default React.memo(OnboardingComponent);

function DiscoverSavings(props) {
  let matchesMobile = props.matchesMobile;
  const [address, setAddress] = React.useState('');
  const [buildingType, setBuildingType] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChangeAddress = useCallback((event, value) => {
    if(event.target.value) setAddress(event.target.value);
    if(value) setAddress(value);
  }, []);
  
  const handleChangeBuildingType = useCallback((event) => {
    setBuildingType(event.target.value);
  }, []);

  const discoverSavings = async() => {
    try {
      setLoading(true);
      const res = await stagingApi({
        method: httpMethod.get,
        url: apiRoute.estimates +`?address=${address}&type=${buildingType}&key=${gridmarketStagingKey}`,
      });
      let data = {
        co2: res.data.data.emissions_annual_co2_kg_reduced,
        revenue: res.data.data.total_1st_year_net_revenue,
        address: address
      };
      props.setEstimatesFromDiscoverSavings(data);
      props.navigateTo(components.getStarted);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return(
    <React.Fragment>
      <Typography variant='h4' color='white' textAlign='center'>How much could you save?</Typography>
      <Stack direction={matchesMobile ? 'column':'row'} spacing={2}>
        <PropertyAddress value={address} onChange={handleChangeAddress}/>
        <PropertyBuildingType value={buildingType} onChange={handleChangeBuildingType}/>
        <div style={style.butttonWrapper}>
          <LoadingButton variant="contained" loading={loading} size='small' sx={style.button} disabled={!address || !buildingType} onClick={discoverSavings}>
              Discover your savings
          </LoadingButton>
        </div>
      </Stack>
    </React.Fragment>
  )
}

function GetStarted(props) {
  let matchesMobile = props.matchesMobile;
  const estimates = props.data;
  const [emailSent, setEmailSent] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const submit = async() => {
    try {
      setLoading(true);
      await stagingApi({
        method: httpMethod.post,
        url: apiRoute.submit +`?key=${gridmarketStagingKey}`,
        data: {
          "address": estimates.address,
          "email": email,
          "emissions_annual_co2_kg_reduced": estimates.co2,
          "total_1st_year_net_revenue": estimates.revenue,
        }
      });
      setEmailSent(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error); 
    }
  }

  return(
    <React.Fragment>
      <Button variant="text" startIcon={<WestIcon />} sx={style.backButton} onClick={() => props.navigateTo(components.discoverSavings)}>
        Check another property
      </Button>
      <Typography component={'div'} variant="h5" fontWeight={600} color='white'>
        We think you could save around <span style={style.blueText}>${formatter(estimates.revenue)}</span> a year and reduce your C02 footprint by <span style={style.blueText}>{formatter(estimates.co2)} kg/year</span>.
      </Typography>
      {
        !emailSent &&
        <Stack spacing={1}>
          <Typography variant='h6' color='white' fontWeight={600}>Enter your email address to learn more and start your RFP process</Typography>
          <Stack direction={matchesMobile ? 'column':'row'} spacing={2}>
            <Box sx={style.fieldWrapper}>
              <TextField id="email" label="Email" variant="filled" fullWidth size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Box>
            <div style={style.butttonWrapper}>
              <LoadingButton variant="contained" size='small' loading={loading} sx={style.button} disabled={!email} onClick={submit}>
                Get Started
              </LoadingButton>
            </div>
          </Stack>
        </Stack>
      }
      {
        emailSent &&
        <Typography variant="h5" fontWeight={600} sx={style.blueText} textAlign={'center'}>We’ve sent you an email with a login link to get started.</Typography>
      }
    </React.Fragment>
  )
}

function PropertyAddress({value, onChange}) {
  //const [search, setSearch] = React.useState('');
  const debounce = useDebounce(value, 600);
  const [suggestion, setSuggestion] = React.useState([]);
  React.useEffect(() => {
    if (!debounce) return;
    let searchApi = async () => {
      const res = await axios({
          method: httpMethod.get,
          url: apiRoute.autocomplete +`?q=${debounce}&key=${gridmarketKey}`,
      });
      setSuggestion(res.data.data);
    };
    searchApi();
  }, [debounce]);
    return (
        <Box sx={style.fieldWrapper}>
            <Autocomplete
            freeSolo
            fullWidth
            size="small"
            id="property-address"
            disableClearable
            options={suggestion}
            onChange={onChange}
            renderInput={(params) => (
                <TextField
                {...params}
                value={value}
                onChange={onChange}
                variant="filled"
                label="Property Address"
                InputProps={{
                    ...params.InputProps,
                    type: 'search',
                }}
                />
            )}
        />
        </Box>
    );
  }

  function PropertyBuildingType({value, onChange}) {
    return (
      <Box sx={style.fieldWrapper}>
        <FormControl variant="filled" size="small" fullWidth>
          <InputLabel id="pbt-label">Property Building Type</InputLabel>
          <Select
            labelId="pbt-label"
            id="property-building-type"
            value={value}
            label="Property Building Type"
            onChange={onChange}
          >
            <MenuItem value={'Residential'}>Residential</MenuItem>
            <MenuItem value={'Commercial'}>Commercial</MenuItem>
            <MenuItem value={'Industrial'}>Industrial</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }