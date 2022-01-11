import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { capitalizeFirstLetter, numberWithCommas } from './utils';
import questionMark from '../src/questionMark.png';

import { useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  Popover,
  Typography,
} from '@mui/material';

const QuoteInfo = ({
  policyInfo,
  setPolicyInfo,
  userInfo,
  showDialog,
  setShowDialog,
}) => {
  const [open, setOpen] = useState(showDialog);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleUpdate = (e) => {
    e.preventDefault();
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
          deductible: parseInt(
            policyInfo.variable_options.deductible.values[1]
          ),
          asteroid_collision: parseInt(
            policyInfo.variable_options.asteroid_collision.values[1]
          ),
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
      <Dialog open={open}>
        <DialogTitle>
          {capitalizeFirstLetter(policyInfo.policy_holder.first_name)}'s Quote
          Information
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Below find details on different options to calculate your personal
            annaul premium for rocket insurance
          </DialogContentText>
          <div style={{ display: 'flex', marginTop: 15 }}>
            <DialogContentText>Deductible</DialogContentText>

            <img
              src={questionMark}
              aria-label="question-mark"
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
              style={{ height: 18, marginLeft: '10px' }}
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
                The amount of money you will pay in an insurance claim before
                the insurance coverage kicks in.
              </Typography>
            </Popover>

            <FormControl sx={{ m: '2px 5px', minWidth: 120 }}>
              <Select
                label="$500"
                defaultValue={500}
                onChange={handleUpdate}
                sx={{ height: 50, ml: 4, mt: -1.5 }}
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
              style={{ height: 18, marginLeft: '10px' }}
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

            <FormControl sx={{ m: '2px 5px', minWidth: 120 }}>
              <Select
                label="$100,000"
                defaultValue={100000}
                onChange={handleUpdate}
                sx={{ height: 50, ml: 4, mt: -1.5 }}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel Quote</Button>
          <Button onClick={handleUpdate}>Submit Policy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuoteInfo;
