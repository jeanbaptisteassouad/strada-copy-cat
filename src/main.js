const root_path = '.'

const Db = require(root_path + '/3-database/mockup-db')
const Api = require(root_path + '/2-core-logic/api')
const MainMiddleware = require(root_path + '/1-web-interface/main-middleware')


Api(Db).then((Api) => {

  const app = MainMiddleware(Api)

  const port = 8000

  app.listen(port, () => {
    console.log('app listening on port '+port)
  })

})



