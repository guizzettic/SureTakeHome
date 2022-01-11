import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { capitalizeFirstLetter, numberWithCommas } from './utils';
import questionMark from '../src/questionMark.png';

import {
  Select,
  MenuItem,
  FormControl,
  Popover,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  dialogBox: {
    backgroundColor: 'transparent',
  },
  pageDescription: {
    paddingBottom: 4,
    marginTop: 3,
  },
  bodyContent: {
    background: '#F8F0E3',
    margin: '-2px 0 2px 0 ',
  },
  selectDropdown: {
    margin: '-2.5px 0 1px 10px',
  },
  questionModal: {
    height: 18,
    margin: '0 5px',
    paddingTop: 2,
  },
});

const QuoteInfo = ({
  policyInfo,
  setPolicyInfo,
  userInfo,
  showDialog,
  setShowDialog,
}) => {
  const [open, setOpen] = useState(showDialog);
  const [anchorEl, setAnchorEl] = useState(null);
  const [policySelections, setPolicySelections] = useState({
    deductible: policyInfo.variable_options.deductible.values[0],
    asteroid_collision:
      policyInfo.variable_options.asteroid_collision.values[0],
  });
  const [policySubmitted, setPolicySubmitted] = useState(false);

  const classes = useStyles();
  const modalOpen = Boolean(anchorEl);

  const handleClose = () => {
    setShowDialog(false);
  };

  const onHover = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onLeave = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    handleUpdate();
  }, [policySelections]);

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

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setShowDialog(false)}
        className={classes.dialogBox}
      >
        <DialogTitle className={classes.bodyContent}>
          {capitalizeFirstLetter(policyInfo.policy_holder.first_name)}'s Quote
          Information
        </DialogTitle>

        <DialogContent className={classes.bodyContent}>
          {!policySubmitted ? (
            <>
              <DialogContentText className={classes.pageDescription}>
                Below find details on different options to calculate your
                personal annual premium for rocket insurance:
              </DialogContentText>
              <div style={{ display: 'flex', marginTop: 25 }}>
                <DialogContentText>Deductible</DialogContentText>

                <img
                  src={questionMark}
                  aria-label="question-mark"
                  onMouseEnter={onHover}
                  onMouseLeave={onLeave}
                  className={classes.questionModal}
                />
                <Popover
                  open={modalOpen}
                  anchorEl={anchorEl}
                  sx={{
                    pointerEvents: 'none',
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <Typography>
                    The amount of money you will pay in an insurance claim
                    before the insurance coverage kicks in.
                  </Typography>
                </Popover>

                <FormControl sx={{ minWidth: 120, paddingBottom: 2 }}>
                  <Select
                    defaultValue={500}
                    onChange={(e) => {
                      setPolicySelections({
                        ...policySelections,
                        deductible: e.target.value,
                      });
                    }}
                    className={classes.selectDropdown}
                    sx={{ height: 30 }}
                  >
                    {policyInfo.variable_options.deductible.values.map(
                      (amt, key) => (
                        <MenuItem key={key} value={amt}>
                          ${numberWithCommas(amt)}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </div>

              <div style={{ display: 'flex', marginTop: 15 }}>
                <DialogContentText>Asteroid Collision Limit</DialogContentText>
                <img
                  src={questionMark}
                  aria-label="question-mark"
                  onMouseEnter={onHover}
                  onMouseLeave={onLeave}
                  className={classes.questionModal}
                />

                <Popover
                  open={modalOpen}
                  anchorEl={anchorEl}
                  sx={{
                    pointerEvents: 'none',
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <Typography>
                    The maximum amount covered for damages caused by asteroid
                    collisions.
                  </Typography>
                </Popover>

                <FormControl sx={{ minWidth: 120, paddingBottom: 2 }}>
                  <Select
                    defaultValue={100000}
                    onChange={(e) => {
                      setPolicySelections({
                        ...policySelections,
                        asteroid_collision: e.target.value,
                      });
                    }}
                    className={classes.selectDropdown}
                    sx={{ height: 30 }}
                  >
                    {policyInfo.variable_options.asteroid_collision.values.map(
                      (amt, key) => (
                        <MenuItem key={key} value={amt}>
                          ${numberWithCommas(amt)}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </div>
              <DialogContentText>
                Annual Premium Insurance:
                <strong>${numberWithCommas(policyInfo.premium)}</strong>
              </DialogContentText>
            </>
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
              onClick={() => setPolicySubmitted(true)}
              sx={{ borderRadius: 3 }}
            >
              Submit Policy
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default QuoteInfo;
