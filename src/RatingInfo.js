import { useState, useEffect } from 'react';
import { fieldValidation } from './utils';
import QuoteInfo from './QuoteInfo';

const RatingInfo = () => {
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    line_1: '',
    line_2: '',
    city: '',
    region: '',
    postal: '',
  });
  const [validForm, setValidForm] = useState(true);
  const [policyInfo, setPolicyInfo] = useState(null);

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
      .then((data) => setPolicyInfo(data.quote))
      .catch((err) => console.error(err));
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
      .then((data) => console.log(data.quote.premium))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    let status = fieldValidation(userInfo);
    setValidForm(status);
  }, [userInfo]);

  return (
    <div>
      <form>
        <input
          placeholder="First Name.."
          value={userInfo.first_name}
          onChange={(e) =>
            setUserInfo({ ...userInfo, first_name: e.target.value })
          }
        />
        <input
          placeholder="Last Name.."
          value={userInfo.last_name}
          onChange={(e) =>
            setUserInfo({ ...userInfo, last_name: e.target.value })
          }
        />
        <div>
          <input
            placeholder="Street Address"
            value={userInfo.line_1}
            onChange={(e) =>
              setUserInfo({ ...userInfo, line_1: e.target.value })
            }
          />
          <input
            placeholder="Apartment, suite, etc."
            value={userInfo.line_2}
            onChange={(e) =>
              setUserInfo({ ...userInfo, line_2: e.target.value })
            }
          />
          <input
            placeholder="City"
            value={userInfo.city}
            onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
          />
          <input
            placeholder="State"
            value={userInfo.region}
            onChange={(e) =>
              setUserInfo({ ...userInfo, region: e.target.value })
            }
          />
          <input
            placeholder="Postal Code"
            value={userInfo.postal}
            onChange={(e) =>
              setUserInfo({ ...userInfo, postal: e.target.value })
            }
          />
        </div>
        <button
          disabled={validForm}
          onClick={policyInfo ? handleUpdate : handleSubmit}
        >
          {policyInfo ? 'Update Quotes' : 'Request Quotes'}
        </button>
      </form>
      {policyInfo && (
        <div>
          <p>premium is: {policyInfo.premium}</p>
          <QuoteInfo policyInfo={policyInfo} userInfo={userInfo} />
        </div>
      )}
    </div>
  );
};

export default RatingInfo;
