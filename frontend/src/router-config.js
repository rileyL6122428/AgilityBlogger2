import signUpTemplate from './templates/sign-up.html';

function routesConfig($stateProvider, $urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/sign-up');
  $stateProvider
    .state('home', {
      url: '/',
      template: "<div>THIS IS THE HOME TEMPLATE</div>",
    })

    .state('signUp', {
        url: "/sign-up",
        template: signUpTemplate,
        controller: "signUp as vm",
    });
}

export default routesConfig;
