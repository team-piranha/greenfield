angular.module('app')
  .service('authService', function(lock, authManager) {

    var login = () => { lock.show(); };

    var registerAuthenticationListener = () => {
      lock.on('authenticated', (authResult) => {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
      });

      lock.on('authorization_error', (err) => {
        console.error(err);
      });
    };

    var logout = () => {
      localStorage.removeItem('id_token');
      authManager.unauthenticate();
    };

    return {
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    };
  });