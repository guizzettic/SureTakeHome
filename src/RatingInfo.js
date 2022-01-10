import { useState } from 'react';

const RatingInfo = ({}) => {
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    line_1: '',
    line_2: '',
    city: '',
    region: '',
    postal: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
        <button onClick={handleSubmit}>Request Quotes</button>
      </form>
    </div>
  );
};

export default RatingInfo;
