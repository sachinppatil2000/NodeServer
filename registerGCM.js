// called to add the API-key and the Registration tokens to mongodb collection
// GCMKeysTokens
// var dataAccess = require('./dataAccess.js');
// these methods are called from BasicRestful service.

module.exports =
{
    RegisterAPIKey :function() {
                        dataAccess.insertAppID(appid);
                    },
    RegisterAppToken :function() {
                        dataAccess.insertAppToken(token);
                       }

}