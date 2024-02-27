const buttonStyle = {
    textTransform: 'none',
    fontSize: 'medium',
    width: 'fit-content'
}

export const navStyle = {
    container: {
        background: '#F3F7F7',
        p: '13px 16px'
    },
    img: {
        height: '30px',
        width: '292px'
    },
    imgSmall: {
        height: '30px',
        width: '225px'
    },
    button: buttonStyle,

}

export const headerStyle = {
    container: {
        //border: '1px solid blue',
        position: 'relative',
        width: '100%',
    },
    img: {
        minHeight: '241px',
        height: '100%',
        width: '100%',
        opacity: .5,
        objectFit: 'cover',
        display: 'block'
    },
    button: buttonStyle,
    contentWrapper: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100%',
        //border: '1px solid green'
    },
    contentWrapperSmall: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100%',
        //border: '1px solid green'
    },
    contentContainer: {
        width: '100%',
        maxWidth: '1024px', 
        marginX: 'auto',
        paddingX: 2
        //border: '1px solid yellow'
    }
}

export const testimonialsStyle = {
    container: {
        //border: "1px solid orange", 
        width: '100%',
        maxWidth: '1024px', 
        marginX: 'auto', 
        paddingX: 2,
        marginBottom: 4,
    },
    contentWrapper: {
        display: 'flex !important'
    },
    contentContainer: {
        marginY: 'auto'
    },
    img: {
        width: '421px', 
        height: '421px'
    }
}

export const howToSectionStyle = {
    container: {
        background: '#E7EEEE',
        //border: '1px solid yellow',
        paddingY: 4
    },
    contentContainer: {
        width: '100%',
        maxWidth: '1024px',
        marginX: 'auto', 
        paddingX: 2,
        //border: '1px solid blue',
        alignItems: 'center',
    },
    stepContainer: {
        flexGrow: 1,
        flexBasis: 0,
        alignItems: 'center'
    },
    formWrapper: {
        marginTop: .3
    },
    select: {
        fontSize: 22,
        color: '#2C546A',
        fontWeight: 700
    },
    img: {
        width: '123.1px',
        height: '134.29px'
    },
    text: {
        color: '#2C546A'
    }
}

export const footerStyle = {
    container: {
        //border: '1px soild purple',
        paddingY: 5
    },
    contentContainer: {
        width: '100%',
        maxWidth: '1024px',
        marginX: 'auto', 
        paddingX: 2,
        //border: '1px solid blue',
    },
    img: {
        height: '30px',
        width: '160px'
    },
    facebook: {
        height: '50px',
        width: '50px'
    },
    twitter: {
        height: '50px',
        width: '50px'
    },
    linkedin: {
        height: '50px',
        width: '50px'
    }
}

export const listingGallery = {
    container: {
        //border: '1px solid pink',
        paddingY: 2,
        mb: 2
    },
    contentWrapper: {
        maxWidth: '1024px',
        marginX: 'auto', 
        width: '100%', 
        //border: '1px solid blue', 
        paddingX: 2
    },
    filterWrapper: {
        flexGrow: 1, 
        flexBasis: 0
    },
    galleryWrapper: {
        flexWrap: 'wrap'
    },
    galleryImage: {
        width: '100%',
        height: 228,
        objectFit: 'cover'
    },
    galleryContentWrapper: {
        width: 228, 
        height: 'fit-content', 
        //border: '1px solid red', 
        m: 1
    },
    butttonWrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        textTransform: 'none', 
        width: 'fit-content', 
        marginX: 'auto'
    },
    formControl: {
        maxWidth: 160
    }
}

export const onboardingStyle = {
    container: {
        //border: '1px solid blue',
        position: 'relative',
        width: '100%',
        height: 'fit-content'
    },
    img: {
        minHeight: '300px',
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        display: 'block'
    },
    button: {...buttonStyle, height: '100%'},
    butttonWrapper: {
        background: 'white',
        borderRadius: 4,
        width: 'fit-content'
    },
    contentWrapper: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100%',
        //border: '1px solid green',
    },
    contentWrapperSmall: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100%',
        //border: '1px solid green'
    },
    contentContainer: {
        width: '100%',
        maxWidth: '1024px', 
        marginX: 'auto',
        paddingX: 2,
        //border: '1px solid yellow'
    },
    fieldWrapper: {
        flexGrow: 1, 
        flexBasis: 0,
        background: 'white',
        borderRadius: 1
    },
    blueText: {
        color: '#5FC6FD'
    },
    backButton: {
        width: 'fit-content',
        color: 'white',
        textTransform: 'none'
    },
    containerHeightMobile: {
        height: 490
    }
}