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

export default function SimpleModal(myJob) {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
              {/* <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {myJob.title}
                </Typography>
                <Typography variant="h5" component="h2">
                   {myJob.location}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {myJob.pay}
                </Typography>
                <Typography variant="body2" component="p">
                    {myJob.description}
                </Typography>
            </CardContent>
        </Card> */}

      <h1 id="simple-modal-title">JOB</h1>
        <p id="simple-modal-description">
          description
        </p>
        <p id="simple-modal-description">
         location
        </p>
        <p id="simple-modal-description">
          pay
        </p>
        
      <SimpleModal />
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        See More
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

