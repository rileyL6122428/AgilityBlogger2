package agilityblogger

class UrlMappings {
  static mappings = {
    "/api/createAccount"(controller: "authentication", action: "createAccount")
    "/api/login"(controller: "authentication", action: "logIn")

    "/api/userBlogs"(controller: "blog", action: "getUserBlogs")

    "/"(view: '/staticPages/index')
    "500"(view: '/application/serverError')
    "404"(view: '/application/notFound')
  }
}
