import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { capitalizeFirstLetter } from './utils';
import DialogBody from './components/DialogBody';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  dialogBox: {
    backgroundColor: 'transparent',
  },
  bodyContent: {
    background: '#F8F0E3',
    margin: '-2px 0 2px 0 ',
  },
});

const QuoteInfo = ({
  policyInfo,
  setPolicyInfo,
  userInfo,
  showDialog,
  setShowDialog,
  setUserInfo,
}) => {
  const [policySelections, setPolicySelections] = useState({
    deductible: policyInfo.variable_options.deductible.values[0],
    asteroid_collision:
      policyInfo.variable_options.asteroid_collision.values[0],
  });
  const [policySubmitted, setPolicySubmitted] = useState(false);

  const classes = useStyles();

  const handleClose = () => {
    setShowDialog(false);
  };

  const handleUpdate = () => {
    let url = `https://fed-challenge-api.sure.now.sh/api/v1/quotes/${policyInfo.quoteId}`;

    const updatedQuoteBody = JSON.stringify({
      quote: {
        quoteId: policyInfo.quoteId,
        rating_address: {
          line_1: userInfo.line_1,
          line_2: userInfo.line_2,
          city: userInfo.city,
          region: userInfo.region,
          postal: userInfo.postal,
        },
        policy_holder: {
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
        },
        variable_selections: {
          deductible: parseInt(policySelections.deductible),
          asteroid_collision: parseInt(policySelections.asteroid_collision),
        },
      },
    });

    fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: updatedQuoteBody,
    })
      .then((res) => res.json())
      .then((data) => {
        setPolicyInfo(data.quote);
        setShowDialog(true);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmitPolicy = () => {
    setUserInfo({
      first_name: '',
      last_name: '',
      line_1: '',
      line_2: '',
      city: '',
      region: '',
      postal: '',
    });
    setPolicySubmitted(true);
  };

  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        className={classes.dialogBox}
      >
        <DialogTitle className={classes.bodyContent}>
          {capitalizeFirstLetter(policyInfo.policy_holder.first_name)}'s Quote
          Information
        </DialogTitle>

        <DialogContent className={classes.bodyContent}>
          {!policySubmitted ? (
            <DialogBody
              showDialog={showDialog}
              policyInfo={policyInfo}
              setShowDialog={setShowDialog}
              handleUpdate={handleUpdate}
              policySelections={policySelections}
              setPolicySelections={setPolicySelections}
            />
          ) : (
            <DialogContentText>
              Thank you for submitting your Rocket Insurance request, expect an
              email with more information in the next 24 hours
            </DialogContentText>
          )}
        </DialogContent>

        {!policySubmitted && (
          <DialogActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              background: '#F8F0E3',
              marginTop: -0.5,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ borderRadius: 3 }}
            >
              Go Back
            </Button>
            <Button
              variant="outlined"
              onClick={handleSubmitPolicy}
              sx={{ borderRadius: 3 }}
            >
              Submit Quote
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default QuoteInfo;
