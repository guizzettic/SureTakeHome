import { Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { fieldValidation } from '../utils';

const useStyles = makeStyles({
  buttons: {
    height: '25px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: 150,
    width: 500,
    justifyContent: 'space-between',
    margin: '0 auto',
    paddingTop: 30,
  },
  city: {
    width: '52%',
  },
  state: {
    width: '15%',
  },
  postal: {
    width: '27%',
  },
  region: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  title: {
    paddingTop: 17,
    width: 500,
    paddingLeft: 20,
  },
  formBody: {
    height: 370,
    width: 550,
    backgroundColor: 'beige',
    borderRadius: 18,
  },
});

const UserInfoForm = ({ userInfo, setUserInfo, handleSubmit, policyInfo }) => {
  const [validForm, setValidForm] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    let status = fieldValidation(userInfo);
    setValidForm(status);
  }, [userInfo]);

  return (
    <div className={classes.formBody}>
      <h2 className={classes.title}>
        Please enter your information below to request a quote:
      </h2>
      <form className={classes.form}>
        <TextField
          variant="standard"
          required
          error={userInfo.first_name !== '' && userInfo.first_name.length < 3}
          // helperText={userInfo.first_name}
          placeholder="First Name.."
          value={userInfo.first_name}
          onChange={(e) =>
            setUserInfo({ ...userInfo, first_name: e.target.value })
          }
        />
        <TextField
          variant="standard"
          required
          placeholder="Last Name.."
          value={userInfo.last_name}
          onChange={(e) =>
            setUserInfo({ ...userInfo, last_name: e.target.value })
          }
        />

        <div>
          <TextField
            variant="standard"
            required
            placeholder="Street Address"
            value={userInfo.line_1}
            fullWidth
            onChange={(e) =>
              setUserInfo({ ...userInfo, line_1: e.target.value })
            }
          />
          <TextField
            variant="standard"
            placeholder="Apartment, suite, etc."
            value={userInfo.line_2}
            fullWidth
            onChange={(e) =>
              setUserInfo({ ...userInfo, line_2: e.target.value })
            }
          />
          <div className={classes.region}>
            <TextField
              variant="standard"
              required
              placeholder="City"
              value={userInfo.city}
              className={classes.city}
              onChange={(e) =>
                setUserInfo({ ...userInfo, city: e.target.value })
              }
            />
            <TextField
              variant="standard"
              required
              placeholder="State"
              value={userInfo.region}
              className={classes.state}
              onChange={(e) =>
                setUserInfo({ ...userInfo, region: e.target.value })
              }
            />
            <TextField
              variant="standard"
              required
              placeholder="Postal Code"
              value={userInfo.postal}
              className={classes.postal}
              onChange={(e) =>
                setUserInfo({ ...userInfo, postal: e.target.value })
              }
            />
          </div>
        </div>

        <Button
          variant="outlined"
          className={classes.buttons}
          disabled={validForm}
          onClick={handleSubmit}
          sx={{
            borderRadius: 3,
            height: 35,
            marginTop: 3,
          }}
        >
          Request Quotes
        </Button>
      </form>
    </div>
  );
};

export default UserInfoForm;
