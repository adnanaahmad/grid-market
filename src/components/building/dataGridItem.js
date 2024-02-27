/* eslint react/no-danger: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { formatNumber } from '../../core/utils';

const ItemContent = ({ format, value, suffix, prefix }) => {
  let formattedValue = value;
  if (format === 'currency') {
    formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value > 1000 ? 0 : 2,
      maximumFractionDigits: value > 1000 ? 0 : 2
    }).format(value);
  } else if (format !== false && !isNaN(value)) {
    formattedValue = formatNumber(value);
  }

  return (
    <>
      {prefix && (
        <span
          className="value-unit"
          dangerouslySetInnerHTML={{ __html: `${prefix}` }}
        />
      )}
      {formattedValue}
      {suffix && (
        <span
          className="value-unit"
          dangerouslySetInnerHTML={{ __html: ` ${suffix}` }}
        />
      )}
    </>
  );
};

const ItemLink = ({ url, children }) => {
  if (url.startsWith('http') || url.startsWith('www')) {
    const httpUrl = url.startsWith('www') ? `//${url}` : url;
    return (
      <a href={httpUrl} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return <Link to={url}>{children}</Link>;
};

const DataGridItem = ({
  className,
  format,
  Icon,
  label,
  md = 6,
  prefix,
  hideIfZero = false,
  suffix,
  url,
  value,
  valueProps = {},
  isLoading = false,
  ...rest
}) => {
  if ((value === '0' || value === 0) && hideIfZero) return null;
  if (typeof value === 'undefined' || value === null) return null;
  if (isLoading) {
    return (
      <Grid
        item
        xs={12}
        md={md}
        className={`data-grid-item ${className || ''}`}
      >
        <Skeleton
          variant="rectangular"
          width={70}
          style={{ marginRight: 10 }}
        />{' '}
        <Skeleton variant="rectangular" width={40} />
      </Grid>
    );
  }

  return (
    <Grid
      className={`data-grid-item ${className || ''}`}
      item
      md={md}
      xs={12}
      {...rest}
    >
      <Grid alignItems="center" container spacing={0}>
        {Icon && (
          <Grid item xs="auto">
            <div className="data-grid-item-icon">
              <Icon fontSize="large" />
            </div>
          </Grid>
        )}
        <Grid item xs>
          <label>{label}</label>
          <Typography variant="body2" {...valueProps}>
            {url ? (
              <ItemLink url={url}>
                <ItemContent
                  format={format}
                  prefix={prefix}
                  suffix={suffix}
                  value={value}
                />
              </ItemLink>
            ) : (
              <ItemContent
                format={format}
                prefix={prefix}
                suffix={suffix}
                value={value}
              />
            )}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DataGridItem;
