import React from 'react';
import { IconButton, Menu, MenuItem, Fab } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

const ITEM_HEIGHT = 48;

export default function MoreMenu({ isFab, options, style, size = 'small' }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isFab && (
        <Fab style={style} size={size} onClick={handleClick} aria-label="add">
          <MoreVertIcon fontSize={size} />
        </Fab>
      )}

      {!isFab && (
        <IconButton style={style} size={size} onClick={handleClick}>
          <MoreVertIcon fontSize={size} />
        </IconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option.label}
            onClick={() => {
              setAnchorEl(null);
              option.onClick();
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
