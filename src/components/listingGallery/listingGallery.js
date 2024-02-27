import React, { useCallback } from 'react';
import { Box, MenuItem, Select, Stack, Typography, FormControl, InputLabel, TextField, Button, useTheme, useMediaQuery } from "@mui/material";
import { listingGallery as style } from '../../core/style';
import { airtableApi as axios } from '../../core/interceptor';
import {technology, financing, country, filterLabels} from '../../core/constants';
import { titleCase } from '../../core/titleCase';
import { queryBuilder } from '../../core/queryBuilder';

function ListingComponent() {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [data, setData] = React.useState({
        featured: [],
        published: [],
    });
    const [pageOffset, setPageOffset] = React.useState(null);
    const [filters, setFilters] = React.useState({
        technology: [],
        financing: [],
        country: []
    });
    const pageSize = 9;

    const getFeaturedData = useCallback(async() => {
        const res = await axios({
            method: 'get',
            url: `?view=Featured`,
        });
        setData( previousVal => ({...previousVal, featured: res.data.records}));
      }, []);
    
    const getPublishedData = useCallback(
      async (offset = null) => {
        let filtersQuery = queryBuilder(filters);
        const res = await axios({
          method: "post",
          url: "/listRecords",
          data: {
            pageSize,
            view: "Published",
            ...(offset && { offset }),
            ...(filtersQuery && { filterByFormula: filtersQuery }),
          },
        });
        setData((previousVal) => ({
          ...previousVal,
          published: !offset
            ? res.data.records
            : [...previousVal.published, ...res.data.records],
        }));
        setPageOffset(res.data.offset || null);
      },
      [filters]
    );

    React.useEffect(() => {getFeaturedData()}, [getFeaturedData]);
    React.useEffect(() => {getPublishedData()}, [getPublishedData]);
    
    //React.useEffect(() => {console.log(filters)}, [filters]);

    const seeMore = () => {
        getPublishedData(pageOffset);
    }
    const updateFilters = useCallback((event) => {
        const filterData = {};
        filterData[event.label] = event.field;
        setFilters( prev => {
            if (JSON.stringify(prev) !== JSON.stringify({...prev, ...filterData})) {
                return {...prev, ...filterData}
            }
            return prev;
        });
        setPageOffset(null);
    }, []);

    return(
        <Box sx={style.container}>
            <Stack sx={style.contentWrapper} spacing={3}>
                <Stack spacing={1}>
                    <Typography variant='h4' color={'primary'}>Explore Project Opportunities</Typography>
                    <Typography textTransform={'uppercase'}>GridMarket organizes projects around the world</Typography>
                </Stack>
                <Stack direction={matchesMobile ? 'column' : 'row'} justifyContent='space-between' spacing={2}>
                    <Stack direction={'row'} sx={style.filterWrapper}>
                        <TextField size='small' fullWidth id="explore" label="Explore projects" variant="outlined" />
                    </Stack>
                    <Stack direction={'row'} sx={style.filterWrapper} spacing={1}>
                        <SelectField data={{id: 1, label: filterLabels.technology, dropdown: technology}} updateFilters={updateFilters}/>
                        <SelectField data={{id: 2, label: filterLabels.financing, dropdown: financing}} updateFilters={updateFilters}/>
                        <SelectField data={{id: 3, label: filterLabels.country, dropdown: country}} updateFilters={updateFilters}/>
                    </Stack>
                </Stack>
                <Gallery data={data.featured} matchesMobile={matchesMobile}/>
                <Gallery data={data.published} matchesMobile={matchesMobile}/>
                <Box sx={style.butttonWrapper}>
                    <Button onClick={seeMore} disabled={!pageOffset} variant="contained" size='medium' sx={style.button}>
                        See More
                    </Button>
                </Box>
            </Stack>
        </Box>
    )
}

function SelectField(props) {
  const [field, setField] = React.useState([]);
  const { data : {dropdown, label}, updateFilters } = props;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setField(typeof value === "string" ? value.split(",") : value);
  };

  React.useEffect(()=> {updateFilters({label, field})}, [label, field, updateFilters]);

  return (
    <FormControl size="small" sx={{...style.filterWrapper, ...style.formControl}}>
      <InputLabel id={"label-" + props.data.id}>{titleCase(label)}</InputLabel>
      <Select
        labelId={"label-" + props.data.id}
        id={"select-" + props.data.id}
        multiple
        value={field}
        label={props.data.label}
        onChange={handleChange}
      >
        {Object.keys(dropdown).map((output, index) => (
          <MenuItem key={index} value={dropdown[output]}>
            {output}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function Gallery(props) {
    const {data, matchesMobile} = props;
    return(
        <Stack direction={'row'} sx={style.galleryWrapper} justifyContent='center'>
            {
                data.map(({fields: node, id}) => (
                    <Stack key={id} justifyContent='space-between' spacing={1} sx={{...style.galleryContentWrapper, ...(matchesMobile && {width: '100%'})}}>
                        
                        <Box component={'img'} sx={style.galleryImage} src={ node['Featured Image'] ? node['Featured Image'][0].url : ''}/>
                        <Stack spacing={.3}>
                            <Typography variant='body2' fontWeight={600}>{node['Auto Name']}</Typography>
                            <Typography variant='body2' textTransform={'uppercase'}>{node['Public Location']}</Typography>
                            <Typography variant='body2' fontWeight={300}>{node['Technology Summary']}</Typography>
                        </Stack>
                    </Stack>
                ))
            }
        </Stack>
    )
}

export default React.memo(ListingComponent);