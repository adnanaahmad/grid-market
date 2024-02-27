import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
    borderRadius: 0,
    border: '1px solid #F0F0F0'
  },
  content: {
    paddingTop: 0
  },
  title: {
    fontSize: '1rem',
    fontWeight: 700
  },
  text: {
    margin: 0
  }
}));

export default function Place({ name, website, phone, opening_hours }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          title: classes.title
        }}
        title={name}
      />
      {(website || phone) && (
        <CardContent className={classes.content}>
          {website && (
            <Typography variant="body2">{`Website: ${website}`}</Typography>
          )}
          {phone && (
            <Typography variant="body2">{`Phone: ${phone}`}</Typography>
          )}
        </CardContent>
      )}
      {opening_hours && (
        <List disablePadding dense>
          {opening_hours.map(hour => {
            return (
              <ListItem key={hour} dense>
                <ListItemText className={classes.text} primary={hour} />
              </ListItem>
            );
          })}
        </List>
      )}
      {(website || phone) && (
        <CardActions>
          {website && (
            <Button
              component="a"
              href={website}
              target="_blank"
              size="small"
              color="primary"
            >
              Visit website
            </Button>
          )}
          {phone && (
            <Button
              component="a"
              href={`tel:${phone}`}
              size="small"
              color="primary"
            >{`Call ${phone}`}</Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}
