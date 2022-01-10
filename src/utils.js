export const fieldValidation = (userInfo) => {
  if (
    userInfo.first_name.length > 2 &&
    userInfo.last_name.length > 2 &&
    userInfo.line_1.length > 4 &&
    userInfo.city.length > 3 &&
    userInfo.region.length > 1 &&
    userInfo.postal.length === 5
  )
    return false;
  else return true;
};
