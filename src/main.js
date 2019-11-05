const root_path = '.'

const Db = require(root_path + '/mockup-db')
const Api = require(root_path + '/api')
const MainMiddleware = require(root_path + '/main-middleware')


Api(Db).then((Api) => {

  const app = MainMiddleware(Api)

  const port = 8000

  app.listen(port, () => {
    console.log('app listening on port '+port)
  })

})



