module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getServices(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM services;",
                function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.service = results;
            complete();
        });
    }

    function filterServices(res, mysql, context, category, complete){
        var sql = "SELECT * FROM services WHERE services.category = ?";
        var inserts = [category];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.service = results;
            console.log(context.service);
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getServices(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('services', context);
            }
        }
    });

    router.get('/:category', function(req, res){
        callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        console.log(req.params.category)
        filterServices(res, mysql, context, req.params.category, complete);
        function complete(){
                callbackCount++;
                if(callbackCount >= 1){
                        res.render('services', context);
                }
        }
    });


    return router;
}();
