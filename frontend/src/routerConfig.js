import signUpTemplate from './submodules/authentication/templates/sign-up.html';
import dashboardTemplate from './submodules/blogger/templates/dashboard.html'

function routesConfig($stateProvider, $urlRouterProvider) {
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

    .state('dashboard', {
        url: "/dashboard",
        template: dashboardTemplate,
        controller: "dashboardController as vm"
    });
}

export default routesConfig;
