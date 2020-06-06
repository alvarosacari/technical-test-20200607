const getUserConfirmation = (message, callback) => {
  console.log('User confirmation message: ', message);
  // this is the default behavior
  const allowTransition = window.confirm(message);
  callback(allowTransition);
};

export default getUserConfirmation;
