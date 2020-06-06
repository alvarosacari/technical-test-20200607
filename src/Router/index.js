import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import getUserConfirmation from './helpers/get-user-confirmation';
import Routes from './Routes';

function Router() {
  return (
    <BrowserRouter
      basename={'/'}
      forceRefresh={false}
      getUserConfirmation={(message, callback) =>
        getUserConfirmation(message, callback)
      }
      keyLength={6}
    >
      <Routes />
    </BrowserRouter>
  );
}

export default Router;
