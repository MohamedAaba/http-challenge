require("dotenv").config()
const http = require("http")
const url = require("url")
const { getRandom } = require("./methods/numGen")
const { rule } = require("./methods/playRule")

let PORT = process.env.port
let msg = ""
let gameRange = 10

const routes = {
   "/success": function (req, res) {
      res.end(`${msg}`)
   },
   "/failed": function (req, res) {
      res.end(`${msg}`)
   },
}

const server = http.createServer((req, res) => {
   const parsedUrl = url.parse(req.url, true)
   const method = req.method
   const endpoint = parsedUrl.pathname

   if (endpoint == "/challenge" && method == "POST") {
      req.on("data", num => {
         let number = rule(getRandom(gameRange), num)
         if (number.win) {
            msg = number.msg
            res.writeHead(302, { location: `/success` })
            return res.end()
         } else {
            msg = number.msg
            res.writeHead(302, { location: `/failed` })
            return res.end()
         }
      })
      req.on("end", () => {
         return true
      })
   }
   if (endpoint in routes) routes[endpoint](req, res)
})

server.on("error", err => console.log("ERROR", err))
server.listen(PORT, () => console.log(`SERVER ON ${PORT}`))
