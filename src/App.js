import { useState } from 'react';
import QuoteInfo from './QuoteInfo';
import { makeStyles } from '@mui/styles';
import UserInfoForm from './components/UserInfoForm';

const useStyles = makeStyles({
  container: {
    width: '85%',
    margin: '0 auto',
    paddingTop: 40,
  },
  pageTitle: {
    paddingBottom: 40,
    textAlign: 'center',
  },
  body: {
    height: '100vh',
    backgroundColor: 'lightskyblue',
  },
});

const App = () => {
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    line_1: '',
    line_2: '',
    city: '',
    region: '',
    postal: '',
  });

  const [policyInfo, setPolicyInfo] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `https://fed-challenge-api.sure.now.sh/api/v1/quotes`;

    let body = {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      address: {
        line_1: userInfo.line_1,
        line_2: userInfo.line_2,
        city: userInfo.city,
        region: userInfo.region,
        postal: userInfo.postal,
      },
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setPolicyInfo(data.quote);
        setShowDialog(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <h1 className={classes.pageTitle}>
          Welcome to Sures new state of the art Rocket Insurance 🚀
        </h1>

        <UserInfoForm
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          handleSubmit={handleSubmit}
          policyInfo={policyInfo}
        />

        {showDialog && (
          <QuoteInfo
            policyInfo={policyInfo}
            setPolicyInfo={setPolicyInfo}
            userInfo={userInfo}
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            setUserInfo={setUserInfo}
          />
        )}
      </div>
    </div>
  );
};

export default App;
