import React from 'react';
import FooterComponent from '../components/footer/footer';
import HeaderComponent from '../components/header/header';
import HowToSectionComponent from '../components/howToSection/howToSection';
import ListingComponent from '../components/listingGallery/listingGallery';
import NavComponent from '../components/nav/nav';
import TestimonialsComponent from '../components/testimonials/testimonials';
import Onboarding from '../components/onboarding/onboarding';
import { Stack } from '@mui/material';

function HomePage() {
    return (
        <Stack flexDirection={'column'}>
            <NavComponent/>
            <HeaderComponent/>
            <Onboarding/>
            <ListingComponent/>
            <TestimonialsComponent/>
            <HowToSectionComponent/>
            <FooterComponent/>
        </Stack>
    )
}

export default React.memo(HomePage);