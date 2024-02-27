import React from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Stack, useMediaQuery, useTheme } from "@mui/material";
import gridmarket from "../../assets/gridmarket.svg";
import { navStyle as style } from '../../core/style';
import MenuIcon from '@mui/icons-material/Menu';

function NavComponent(){
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return(
        <Stack direction={'row'} justifyContent='space-between' alignItems={'center'} sx={style.container}>
            <Box component="img" sx={matchesMobile ? style.imgSmall : style.img} src={gridmarket}/>
            {
                !matchesMobile &&
                <Stack direction={'row'} spacing={2}>
                    <Button onClick={() => window.open(`https://gridmarket.com/`, '_blank')} variant="text" sx={style.button}>
                        Main Website
                    </Button>
                    <Button onClick={() => window.open(`https://gridmarket.com/contact/`, '_blank')} variant="text" sx={style.button}>
                        Contact us
                    </Button>
                    <Button onClick={() => window.open(`https://platform.gridmarket.com/login`, '_blank')} variant="contained" sx={style.button}>
                        Login or Register
                    </Button>
                </Stack>
            }
            {
                matchesMobile &&
                <GridmarketMenu/>
            }
        </Stack>
    )
}

function GridmarketMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => window.open(`https://gridmarket.com/`, '_blank')}>Main Website</MenuItem>
          <MenuItem onClick={() => window.open(`https://gridmarket.com/contact/`, '_blank')}>Contact us</MenuItem>
          <MenuItem onClick={() => window.open(`https://platform.gridmarket.com/login`, '_blank')}>Login or Register</MenuItem>
        </Menu>
      </div>
    );
  }

export default React.memo(NavComponent);