export const phoneNumber = (inputtxt) => {
  var phoneno = /^\d{10}$/;

  if (inputtxt) {
    if (inputtxt.value.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
