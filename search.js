module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function searchServices(res, mysql, context, input, complete){
        var sql = 'select * from services where name like concat("%",?,"%")';
        var inserts = [input];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.service = results;
            complete();
        });
}

    router.post('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        console.log(req.body.name);
        searchServices(res, mysql, context, req.body.name, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                console.log(context.service);
                res.render('search', context);
            }
        }
    });
    return router;
}
();
