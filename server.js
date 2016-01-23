var Hapi = require('hapi')
var assets = require('./assets.js')
var mailchimp = require('./mailchimp.js') 

var server = new Hapi.Server()
server.connection({ port: process.env.PORT || 3000 })

server.register(require('inert'), err => {
  if (err) {
    throw err
  }

  server.ext('onPreResponse', function(request, reply) {
    if (request.response.statusCode === 200) {
      // send cache control headers for Fastly
      // this will cache them at the fastly edge servers for a long
      // period of time, but the browser clients will use the default
      // cache-control settings and etags
      request.response.headers['Surrogate-Control'] = 'max-age=2592000'
    }
    reply(request.response)
  })

  // API handlers
  server.route({
    method: 'POST',
    path: '/api/mailchimp',
    handler: function (request, reply) {
      mailchimp.api(request, reply)
    }
  })

  // A server redirect to our favorite band, Brave Combo.
  server.route({
    method: 'GET',
    path: '/bo/{path*}',
    handler: function (request, reply) {
      reply.redirect('http://bravecombo.com/' + (request.params.path ? request.params.path : ''))
    }
  })

  // Serves static files out of public/
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public',
        listing: false,
        index: true
      }
    },
    config: {
      state: {
        parse: false,
        failAction: 'ignore'
      }
    }
  })

  server.start(() => {
    console.log('Server running at:', server.info.uri)
  })
})
