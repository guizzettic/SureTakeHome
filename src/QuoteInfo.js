import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { capitalizeFirstLetter, numberWithCommas } from './utils';

import { useState } from 'react';

const QuoteInfo = ({ policyInfo, userInfo }) => {
  const [open, setOpen] = useState(true);
  const [hover, setHover] = useState(false);

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>MUI Dialog</DialogTitle>
        <DialogContent>Quote Info</DialogContent>
        <DialogActions>
          <Button>Cancel Quote</Button>
          <Button>Submit Policy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuoteInfo;
