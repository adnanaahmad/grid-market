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
  subheader: {
    fontSize: '0.875rem'
  },
  text: {
    margin: 0
  }
}));

export default function Contact({
  address,
  name,
  relationship_to_owner,
  company,
  phones,
  emails
}) {
  const classes = useStyles();
  const addressLink = `https://maps.google.com/?q=${address}`;
  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          title: classes.title,
          subheader: classes.subheader
        }}
        title={name}
        subheader={relationship_to_owner}
      />
      {(company || address) && (
        <CardContent className={classes.content}>
          {company && (
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: company }}
            />
          )}
          {address && (
            <Typography
              variant="body2"
              dangerouslySetInnerHTML={{ __html: address }}
            />
          )}
        </CardContent>
      )}
      {phones && (
        <List disablePadding dense>
          {phones.map(phone => {
            return (
              <ListItem key={phone.phone} dense>
                <ListItemText
                  className={classes.text}
                  primary={phone.phone}
                  secondary={
                    phone.year ? (
                      <time dateTime={phone.year}>{phone.year}</time>
                    ) : (
                      ''
                    )
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}
      {emails && (
        <List disablePadding dense>
          {emails.map(email => {
            return (
              <ListItem key={email.email} dense>
                <ListItemText
                  className={classes.text}
                  primary={email.email}
                  secondary={
                    email.year ? (
                      <time dateTime={email.year}>{email.year}</time>
                    ) : (
                      ''
                    )
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}
      {address && (
        <CardActions>
          <Button
            component="a"
            href={addressLink}
            target="_blank"
            size="small"
            color="primary"
          >
            View on Google maps
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
