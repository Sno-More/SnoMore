
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({job, open, methods}) {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <Card variant="outlined">
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {job.title}
                </Typography>
                <Typography variant="h5" component="h2">
                   {job.location}
                </Typography>
                <Typography color="textSecondary">
                    {job.pay}
                </Typography>
                <Typography variant="body2" component="p">
                    {job.description}
                </Typography>
            </CardContent>
        </Card>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={methods.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}