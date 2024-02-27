import React from 'react';
import { Box, Button, FormControl, MenuItem, Select, Stack, Typography as MuiTypography, useMediaQuery, useTheme} from "@mui/material";
import { howToSectionStyle as style } from '../../core/style';
import stepOneImage from '../../assets/step1.svg';
import stepTwoImage from '../../assets/step2.svg';
import stepThreeImage from '../../assets/step3.svg';

export const Typography = ({ children, ...props }) => {
  return <MuiTypography {...props} sx={style.text}>{children}</MuiTypography>;
};

function HowToSectionComponent(){
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));
    const steps = [
        {step: 'Step 1', img: stepOneImage, title: `Add your property or claim an existing profile`},
        {step: 'Step 2', img: stepTwoImage, title: `Complete survey with property information`},
        {step: 'Step 3', img: stepThreeImage, title: `Authorize vendors to access and bid on your project`}
    ]
    return(
        <Box sx={style.container}>
            <Stack spacing={5} sx={style.contentContainer}>
                <Stack direction={matchesMobile ? 'column' : 'row'} alignItems={'center'} spacing={matchesMobile ? 0 : 1}>
                    <Typography variant='h5' fontWeight={600}>Joining GridMarket as a</Typography>
                    <SelectRole/>
                </Stack>
                <Stack direction={matchesMobile ? 'column' : 'row'} justifyContent='space-between' alignItems={matchesMobile ? 'center':'start'} spacing={2}>
                    {
                        steps.map((node, index) => (
                            <Stack key={index} sx={style.stepContainer} spacing={4}>
                                <Box component="img" sx={style.img} src={node.img}/>
                                <Stack spacing={1}>
                                    <Typography variant='h5' fontWeight='600' textAlign={'center'}>{node.step}</Typography>
                                    <Typography textAlign={'center'}>{node.title}</Typography>
                                </Stack>
                            </Stack>
                        ))
                    }
                </Stack>
                <Button variant="contained" sx={style.button}>
                    List your property
                </Button>
            </Stack>
        </Box>
    )
}

function SelectRole() {
    const [role, setRole] = React.useState('propertyOwner');
    const handleChange = (event) => {
      setRole(event.target.value);
    };
    return (
        <div>
          <FormControl variant="standard" sx={style.formWrapper}>
            <Select
              id="select-role"
              value={role}
              onChange={handleChange}
              sx={style.select}
            >
              <MenuItem value={'propertyOwner'}>Property Owner</MenuItem>
              <MenuItem value={'vendor'}>Vendor</MenuItem>
            </Select>
          </FormControl>
        </div>
    );
}

export default React.memo(HowToSectionComponent);