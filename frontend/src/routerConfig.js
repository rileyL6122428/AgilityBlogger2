import signUpTemplate from './submodules/authentication/templates/sign-up.html';
import loginTemplate from './submodules/authentication/templates/login.html';
import dashboardTemplate from './submodules/blogger/templates/dashboard.html';

import { RootReducer } from './redux/reducers/rootReducer.js';

function routesConfig($stateProvider, $urlRouterProvider, $ngReduxProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/sign-up');
  $stateProvider
    .state('home', {
      url: '/',
      template: "<div>THIS IS THE HOME TEMPLATE</div>",
    })

    .state('SignUp', {
        url: "/sign-up",
        template: signUpTemplate,
        controller: "signUpController as vm",
    })

    .state('Login', {
      url: "/login",
      template: loginTemplate,
      controller: "loginController as vm",
    })

    .state('dashboard', {
        url: "/dashboard",
        template: dashboardTemplate,
        controller: "dashboardController as vm"
    });

    $ngReduxProvider.createStoreWith(RootReducer);
}

export default routesConfig;
