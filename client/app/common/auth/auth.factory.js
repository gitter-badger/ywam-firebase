/* @ngInject */
let AuthFactory = function ($firebaseAuth) {

  const auth = { };

  return $firebaseAuth()
};

export default AuthFactory;
