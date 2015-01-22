/* routes.js
 * 
 * routes, and only routes go in this file. If the body of route is more than 5 lines, define it in
 * another file and require it in.
 */
var setupRoutes = function(server) {
    /** BEGIN fake entry points **/
    server.post('/v1/leads/fake', function(req, res, next) {
        res.end("ok\n");
    });
};

module.exports = setupRoutes;
