var mailchimpApiKey = process.env.MAILCHIMP_API_KEY

if(!mailchimpApiKey) {
  console.log('NO MAILCHIMP API KEY FOUND: process.env.MAILCHIMP_API_KEY')  
}

var mcapi = require('mailchimp-api'),
    mc = new mcapi.Mailchimp(mailchimpApiKey)

exports.api = function(request, reply) {
  var apiCallName = request.payload.call
  switch(apiCallName) {
    case "getbrave":
      postSubscription(request, reply)
      break;
    default:
      reply(null)
      break;
  }
}

/*
 * POST subscribe an email to a list.
 */

var postSubscription = function(request, reply) {

  if(request.payload.MC_LIST_ID) {

    var groupId
    for(var prop in request.payload.group) {
      groupId = prop
    }

    var groups = request.payload.group[groupId]
    for (var i=0;i < groups.length;i++) {
      if(groups[i] == 'false')
        groups[i] = null
    }

    var subscription =       {
        "id":request.payload.MC_LIST_ID,
        "email":{email:request.payload.MERGE0},
        "merge_vars": {
                  "NAME": request.payload.MERGE1,
                  "groupings": [{
                            "id": groupId,
                            "groups": groups
                  }]
        }
      }

    mc.lists.subscribe(
      subscription, 
      function(data) {
        reply(data)
      },
      function(error) {
        if (error.error) {
          console.log(error.code + ": " + error.error)
        } else {
          console.log('There was an error subscribing that user')
        }
        reply('error:' + error.code + ": " + error.error)
      })
  }
  else { reply(null) };

}




