import React from 'react';
import { Box, Link, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import gridmarket from "../../assets/gridmarket.svg";
import { footerStyle as style } from '../../core/style';

function FooterComponent(){
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));
    return(
        <Box sx={style.container}>
            <Stack direction={matchesMobile ? 'column' : 'row'} justifyContent='space-between' alignItems={'center'} sx={style.contentContainer}>
                <Link href="https://gridmarket.com/privacy-policy/" underline="none">
                    {'Privacy Policy'}
                </Link>
                <Link href="https://gridmarket.com/terms-of-use/" underline="none">
                    {'Terms & Conditions'}
                </Link>
                <Stack alignItems={'center'} spacing={1}>
                    <Link href="https://gridmarket.com/" underline="none">
                        <Box component="img" sx={style.img} src={gridmarket}/>
                    </Link>
                    <Typography textAlign={'center'}>Copyright 2022 GridMarket LLC, All Rights Reserved</Typography>
                </Stack>
                <Stack>
                    <Link href="mailto:info@gridmarket.com" underline="none">
                        info@gridmarket.com
                    </Link>
                    <Typography textAlign={'center'}>212.725.2550</Typography>
                </Stack>
                {/* <Stack direction={'row'}>
                    <IconButton aria-label="facebook">
                        <Box component="img" sx={style.facebook} src={facebook}/>
                    </IconButton>
                    <IconButton aria-label="linkedin">
                        <Box component="img" sx={style.linkedin} src={linkedin}/>
                    </IconButton>
                    <IconButton aria-label="twitter">
                        <Box component="img" sx={style.twitter} src={twitter}/>
                    </IconButton>
                </Stack> */}
            </Stack>
        </Box>
    )
}

export default React.memo(FooterComponent);