import signUpTemplate from './submodules/authentication/templates/sign-up.html';

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
    });
}

export default routesConfig;
