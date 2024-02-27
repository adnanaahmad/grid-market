import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import customerImage from '../../assets/customer.svg';
import { testimonialsStyle as style } from "../../core/style";

function TestimonialsComponent() {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));
    const data = [
        {
            service: `FACILITIES`,
            feedback: `“GridMarket has been the key to achieving our energy goals. Their platform has made our clean energy transition quicker and easier than we ever imagined.”`,
            name: `Tologata Tile Leia Tuimalealiifano`,
            position: `General Manager, Samoa Electric Power Corporation`,
            image: customerImage
        },
        {
            service: `FACILITIES`,
            feedback: `“GridMarket has been the key to achieving our energy goals. Their platform has made our clean energy transition quicker and easier than we ever imagined.”`,
            name: `Tologata Tile Leia Tuimalealiifano`,
            position: `General Manager, Samoa Electric Power Corporation`,
            image: customerImage
        },
        {
            service: `FACILITIES`,
            feedback: `“GridMarket has been the key to achieving our energy goals. Their platform has made our clean energy transition quicker and easier than we ever imagined.”`,
            name: `Tologata Tile Leia Tuimalealiifano`,
            position: `General Manager, Samoa Electric Power Corporation`,
            image: customerImage
        }
    ]
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };
    return (
      <Box sx={style.container}>
        <Slider {...settings}>
          {data.map((node, index) => (
            <Stack spacing={2} sx={style.contentWrapper} direction={matchesMobile ? 'column' : 'row'} key={index}>
                <Stack spacing={5} sx={style.contentContainer}>
                    <Typography variant="h5" fontWeight={600}>What our customers are saying</Typography>
                    <Stack spacing={2}>
                        <Typography>{node.service}</Typography>
                        <Typography variant="body1">{node.feedback}</Typography>
                    </Stack>
                    <Stack>
                        <Typography fontStyle={'italic'}>{node.name}</Typography>
                        <Typography fontStyle={'italic'}>{node.position}</Typography>
                    </Stack>
                </Stack>
                <Box
                component="img"
                sx={style.img}
                src={node.image}
                />
            </Stack>
          ))}
        </Slider>
      </Box>
    );
}

export default React.memo(TestimonialsComponent);
