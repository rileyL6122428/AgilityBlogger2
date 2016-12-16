package agilityblogger

class UrlMappings {
  static mappings = {
    "/api/createAccount"(controller: "authentication", action: "createAccount")

    "/"(view: 'index')
    "500"(view: '/application/serverError')
    "404"(view: '/application/notFound')
  }
}
