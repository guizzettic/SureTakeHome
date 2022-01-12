import { useState, useEffect } from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import { capitalizeFirstLetter, numberWithCommas } from '../utils';
import questionMark from '../questionMark.png';

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
  questionModalLimit: {
    height: 18,
    margin: '0 5px',
    paddingTop: 2,
  },
  questionModalDeductible: {
    height: 18,
    margin: '0 5px',
    paddingTop: 2,
  },
});

const DialogBody = ({
  showDialog,
  policyInfo,
  setShowDialog,
  handleUpdate,
  policySelections,
  setPolicySelections,
}) => {
  const [open, setOpen] = useState(showDialog);
  const [anchorEl, setAnchorEl] = useState({ deductible: null, limit: null });
  const classes = useStyles();

  const modalOpenDeductible = Boolean(anchorEl.deductible);
  const modalOpenLimit = Boolean(anchorEl.limit);

  const handleClose = () => {
    setShowDialog(false);
  };

  const onHover = (e, modal) => {
    console.log('modal is: ', modal === 'deductible');
    if (modal === 'deductible') {
      setAnchorEl({ ...anchorEl, deductible: e.currentTarget });
    } else setAnchorEl({ ...anchorEl, limit: e.currentTarget });
  };

  const onLeave = () => {
    setAnchorEl({ deductible: null, limit: null });
  };

  useEffect(() => {
    handleUpdate();
  }, [policySelections]);

  console.log(
    'anchorEl.deductible is: ',
    anchorEl.deductible,
    'and modalOpenDeductible is: ',
    modalOpenDeductible
  );
  console.log(
    'anchorEl.limit is: ',
    anchorEl.limit,
    'and modalOpenLimit is: ',
    modalOpenLimit
  );

  return (
    <div>
      <DialogContentText className={classes.pageDescription}>
        Below find details on different options to calculate your personal
        annual premium for rocket insurance:
      </DialogContentText>
      <div style={{ display: 'flex', marginTop: 25 }}>
        <DialogContentText>Deductible</DialogContentText>

        <img
          src={questionMark}
          aria-label="question-mark"
          onMouseEnter={(e) => onHover(e, 'deductible')}
          onMouseLeave={onLeave}
          className={classes.questionModalDeductible}
        />
        <Popover
          open={modalOpenDeductible}
          anchorEl={anchorEl.limit}
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
            The amount of money you will pay in an insurance claim before the
            insurance coverage kicks in.
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
            {policyInfo.variable_options.deductible.values.map((amt, key) => (
              <MenuItem key={key} value={amt}>
                ${numberWithCommas(amt)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div style={{ display: 'flex', marginTop: 15 }}>
        <DialogContentText>Asteroid Collision Limit</DialogContentText>
        <img
          src={questionMark}
          aria-label="question-mark"
          onMouseEnter={(e) => onHover(e, 'limit')}
          onMouseLeave={onLeave}
          className={classes.questionModalLimit}
        />

        <Popover
          open={modalOpenLimit}
          anchorEl={anchorEl.limit}
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
        <strong> ${numberWithCommas(policyInfo.premium)}</strong>
      </DialogContentText>
    </div>
  );
};

export default DialogBody;