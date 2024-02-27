import React from 'react';
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import backgroundImage from "../../assets/header.svg";
import { headerStyle as style } from '../../core/style';

function HeaderComponent(){
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return(
        <Box sx={style.container}>
            <Box component="img" sx={style.img} src={backgroundImage}/>
            <Box>
                <Box sx={matchesMobile ? style.contentWrapperSmall : style.contentWrapper}>
                    <Stack spacing={1} sx={style.contentContainer}>
                        <Typography variant='h4'>GridMarket Listings</Typography>
                        <Typography>WHERE ENERGY OPPORTUNITIES BECOME OPERATIONAL PROJECTS</Typography>
                        <Button variant="contained" size='small' sx={style.button}>
                            List your project
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default React.memo(HeaderComponent);