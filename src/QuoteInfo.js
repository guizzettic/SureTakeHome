import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { capitalizeFirstLetter, numberWithCommas } from './utils';

import { useState } from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
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
          <div style={{ display: 'flex' }}>
            <DialogContentText>Deductible</DialogContentText>
            <span
              role="img"
              style={{ marginTop: '-4px' }}
              aria-label="question-mark"
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              ❓
            </span>

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

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Deductible</InputLabel>
              <Select label="$500" defaultValue={500} onChange={handleUpdate}>
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
          <div style={{ display: 'flex' }}>
            <DialogContentText>Asteroid Collision Limit</DialogContentText>
            <span
              role="img"
              aria-label="question-mark"
              style={{ marginTop: '-4px' }}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              ❓
            </span>

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

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Limit</InputLabel>
              <Select
                label="$100,000"
                defaultValue={100000}
                onChange={handleUpdate}
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
