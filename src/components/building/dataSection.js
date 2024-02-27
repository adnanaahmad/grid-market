import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Spinner from './loadingSpinner';
import './dataSection.sass';

export default function DataSection({
  children,
  className,
  id,
  isActive,
  loading = false,
  setQuickMenuAnchor,
  title,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (isActive && ref?.current) {
      ref.current.scrollIntoView();
    }
  }, [isActive, ref]);

  return (
    <section
      ref={ref}
      id={id}
      className={`data-section ${className || ''}`}
      {...rest}
    >
      {title && (
        <Box
          bgcolor="background.default"
          color="text.secondary"
          className="data-section-header"
        >
          <Typography
            style={{
              cursor: 'pointer'
            }}
            onClick={event => setQuickMenuAnchor(event.target)}
            variant="body2"
          >
            <strong>{title}</strong>
          </Typography>
        </Box>
      )}
      <div
        style={{
          height: ['wind_speed', 'temperature', 'load_curve'].includes(id)
            ? 280
            : 'auto'
        }}
        className="data-section-content"
      >
        {loading ? <Spinner /> : children}
      </div>
    </section>
  );
}
