import { Button, TextField, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import {
  fieldValidation,
  verifyName,
  verifyStreet,
  verifyCity,
  verifyRegion,
  verifyPostal,
} from '../utils';

const useStyles = makeStyles({
  title: {
    paddingTop: 20,
    paddingBottom: 15,
    textAlign: 'center',
  },
  formBody: {
    backgroundColor: 'beige',
    borderRadius: 18,
    width: '90%',
    margin: '0 auto',
  },
});
const UserInfoForm = ({ userInfo, setUserInfo, handleSubmit }) => {
  const [validForm, setValidForm] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    let status = fieldValidation(userInfo);
    setValidForm(status);
  }, [userInfo, setValidForm]);

  return (
    <Grid xs={12} sm={10} md={7} lg={6} className={classes.formBody}>
      <h2 className={classes.title}>
        Please enter your information below to request a quote:
      </h2>

      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        style={{ paddingBottom: 20 }}
      >
        <Grid item xs={10} md={11} container>
          <TextField
            fullWidth
            variant="standard"
            required
            value={userInfo.first_name}
            helperText={
              !verifyName(userInfo.first_name) && 'Please enter full first name'
            }
            placeholder="First name.."
            onChange={(e) =>
              setUserInfo({ ...userInfo, first_name: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={10} md={11}>
          <TextField
            variant="standard"
            required
            fullWidth
            helperText={
              !verifyName(userInfo.last_name) && 'Please enter full last name'
            }
            placeholder="Last Name.."
            value={userInfo.last_name}
            onChange={(e) =>
              setUserInfo({ ...userInfo, last_name: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={10} md={11}>
          <TextField
            variant="standard"
            required
            placeholder="Street Address"
            helperText={
              !verifyStreet(userInfo.line_1) &&
              'Please enter your street address'
            }
            value={userInfo.line_1}
            fullWidth
            onChange={(e) =>
              setUserInfo({ ...userInfo, line_1: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={10} md={11}>
          <TextField
            variant="standard"
            placeholder="Apartment, suite, etc."
            value={userInfo.line_2}
            fullWidth
            onChange={(e) =>
              setUserInfo({ ...userInfo, line_2: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={10} md={5}>
          <TextField
            variant="standard"
            required
            fullWidth
            placeholder="City"
            helperText={!verifyCity(userInfo.city) && 'Enter valid city name'}
            value={userInfo.city}
            onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
          />
        </Grid>

        <Grid item xs={10} md={3}>
          <TextField
            variant="standard"
            required
            fullWidth
            placeholder="State"
            helperText={!verifyRegion(userInfo.region) && 'State abbr.'}
            value={userInfo.region}
            onChange={(e) =>
              setUserInfo({ ...userInfo, region: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={10} md={3}>
          <TextField
            variant="standard"
            required
            fullWidth
            placeholder="Postal Code"
            type="number"
            helperText={!verifyPostal(userInfo.postal) && 'Enter postal code'}
            value={userInfo.postal}
            onChange={(e) =>
              setUserInfo({ ...userInfo, postal: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={10} md={11}>
          <Button
            disabled={validForm}
            onClick={handleSubmit}
            variant="outlined"
            fullWidth
          >
            Request Quote
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserInfoForm;
