var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

(function () {
    'use strict';
    // this function is strict...
 }());
 
 /***********************************
 * Module exports.
 ************************************/
module.exports = function(BadHabit) { 
    /***********************************
     * Enable-disable API exposed methods
     ************************************/    
    BadHabit.disableRemoteMethodByName("create", false);
    BadHabit.disableRemoteMethodByName("replaceOrCreate", false);
    BadHabit.disableRemoteMethodByName("patchOrCreate", false);
    BadHabit.disableRemoteMethodByName("exists", false);
    BadHabit.disableRemoteMethodByName("find", true);
    BadHabit.disableRemoteMethodByName("findById", false);
    BadHabit.disableRemoteMethodByName("findOne", false);
    BadHabit.disableRemoteMethodByName("deleteById", false);
    BadHabit.disableRemoteMethodByName("count", false);
    BadHabit.disableRemoteMethodByName("replaceById", false);
    BadHabit.disableRemoteMethodByName("prototype.patchAttributes", false);
    BadHabit.disableRemoteMethodByName("createChangeStream", false);
    BadHabit.disableRemoteMethodByName("updateAll", false);
    BadHabit.disableRemoteMethodByName("replaceOrCreate", false);
    BadHabit.disableRemoteMethodByName("upsertWithWhere", false);

    /***********************************
     * Extend methods
     ************************************/ 
    //get habits overview from local file
   BadHabit.analysis= function(product,startDate,callback){
       //calcul total-spends
       var filter={where: {date: {gt: startDate}}};
       BadHabit.find(filter , 
        function(err, badHabits) { 
            var totalBadHabits=0;
            var totalSpends=0;
            var frequentLocationMap = {};
            var frequentLocationCurrentElement = null;
            var maxFrequentLocationAmount = 0;
            var maxFrequentLocationElement = null;
            var totalNumberOfBadHabits=0;
            for (var key in badHabits) {
                totalSpends=totalSpends+Math.abs(badHabits[key].amount);
                if(badHabits[key].product==product){
                    totalBadHabits=totalBadHabits+Math.abs(badHabits[key].amount);
                    totalNumberOfBadHabits=totalNumberOfBadHabits+1;
                    frequentLocationCurrentElement = badHabits[key].location;
                    if(frequentLocationMap[frequentLocationCurrentElement] == null)
                        frequentLocationMap[frequentLocationCurrentElement] = 1;
                    else
                        frequentLocationMap[frequentLocationCurrentElement]++;  
                    if(frequentLocationMap[frequentLocationCurrentElement] > maxFrequentLocationAmount){
                        maxFrequentLocationElement = frequentLocationCurrentElement;
                        maxFrequentLocationAmount = frequentLocationMap[frequentLocationCurrentElement];
                    }
                }
            }
            callback(null,Math.round(totalBadHabits * 100) / 100,Math.round(totalSpends * 100) / 100,totalNumberOfBadHabits,maxFrequentLocationElement,maxFrequentLocationAmount);
        });      
    };

    //get habits overview from sandbox
   BadHabit.analysisFromSandbox= function(product,startDate,callback){
        var request = require('request');
        request({
                headers: { 'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2F1dGgyLXJlc291cmNlIl0sInNjb3BlIjpbInNlcnZlciIsInBheW1lbnRzIiwicHJvZmlsZXMiLCJhY2NvdW50cyIsInRyYW5zYWN0aW9ucyIsInBheW1lbnQtc3VibWlzc2lvbnMiXSwiZXhwIjozNjc3MzQ4MjE2LCJhdXRob3JpdGllcyI6WyJST0xFX1RSVVNURURfQ0xJRU5UIiwiUk9MRV9DTElFTlQiXSwianRpIjoiODdmNDRmYjYtZjY3Mi00YWQ1LTk2NzctM2NkMjQyZGNhZTkyIiwiY2xpZW50X2lkIjoidmNmSXJBMW92OEMwaTgyMUU4b3QifQ.PS0-SDcA7VSCzxiXTl5bZESX-FGaO8g_HtRIglFawXsSMpmcmkjwgWftBhQsqtl831W3Rk3ulESHFKzfWm1MFrriU42YQb-9ZcjLouOrxYUyY-Vll1rrPjGAb9t3c7CtkQEsZ2_NfQ4zmaZ6vLd9BtaIbHqv_AYOMQCpY8ht4hc`
            },url:'http://services.innofactory.io/payment/payments'},
            function (error, response, result) {
            if (!error && response.statusCode == 200) {
                var DataTransform = require("node-json-transform").DataTransform;
                var app = require('../../server/server');
                var map = {
                    item: {
                        id: "Data.PaymentId",
                        category: "Data.Initiation.RemittanceInformation.Unstructured",
                        location: "Data.Initiation.RemittanceInformation.Unstructured",
                        date: "Data.CreationDateTime",
                        amount:"Data.Initiation.InstructedAmount.Amount",
                        product:"Data.Initiation.RemittanceInformation.Unstructured"
                    },
                    operate: [
                    {   run: function(val) {    var arr=val.split("###");if(arr.length>0) return arr[0]; else return "";}, on: "category"  },
                    {   run: function(val) {  var arr=val.split("###"); if(arr.length>1) return arr[1]; else return "";}, on: "location"  },
                    {   run: function(val) {  var arr=val.split("###"); if(arr.length>2) return arr[2]; else return "";}, on: "product"  }
                ]
                };
                var dataTransform = DataTransform(JSON.parse(result), map);
                var badHabits = dataTransform.transform();
                var totalBadHabits=0;
                var totalSpends=0;
                var frequentLocationMap = {};
                var frequentLocationCurrentElement = null;
                var maxFrequentLocationAmount = 0;
                var maxFrequentLocationElement = null;
                var totalNumberOfBadHabits=0;
                for (var key in badHabits) {
                    totalSpends=totalSpends+Math.abs(badHabits[key].amount);
                    if(badHabits[key].product==product){
                        totalBadHabits=totalBadHabits+Math.abs(badHabits[key].amount);
                        totalNumberOfBadHabits=totalNumberOfBadHabits+1;
                        frequentLocationCurrentElement = badHabits[key].location;
                        if(frequentLocationMap[frequentLocationCurrentElement] == null)
                            frequentLocationMap[frequentLocationCurrentElement] = 1;
                        else
                            frequentLocationMap[frequentLocationCurrentElement]++;  
                        if(frequentLocationMap[frequentLocationCurrentElement] > maxFrequentLocationAmount){
                            maxFrequentLocationElement = frequentLocationCurrentElement;
                            maxFrequentLocationAmount = frequentLocationMap[frequentLocationCurrentElement];
                        }
                    }
                }
                callback(null,Math.round(totalBadHabits * 100) / 100,Math.round(totalSpends * 100) / 100,totalNumberOfBadHabits,maxFrequentLocationElement,maxFrequentLocationAmount);

            }
        });   
    };

    //confirm user want to be notify when badhabit happens
    BadHabit.notify= function(product,callback){
        io.emit('bad_habits_notification', product);
        callback(null,"Notifications activated for product: "+product);
    };

    
    BadHabit.remoteMethod(
        'analysisFromSandbox', {
            http:{
                path:'/analysis',
                verb:'get'                
            },
            description:'Get user spending bad habits analysis summary for a specific product',
            accepts: [
                {arg: 'product', description: 'product linked to to the badhabit', type: 'string',default:'coffee'},
                {arg: 'start-date', description: 'Start analysis after this date', type: 'date',default:'Jan 18, 2018 06:52:00'}
              ],
              returns: [
                  {arg: 'total-amount-bad-habits', type: 'number'},
                  {arg: 'total-amount-spends', type: 'number'},
                  {arg: 'total-frequency-bad-habits', type: 'number'},
                  {arg: 'frequent-location-bad-habits', type: 'string'},
                  {arg: 'total-frequency-bad-habits-at-this-location', type: 'number'}
            ]
        }
    );  

    


    BadHabit.remoteMethod(
        'notify', {
            http:{
                path:'/notify',
                verb:'post'                
            },
            description:'Confirm user want to be notified when bad habit will happen',
            accepts: [
                {arg: 'product', description: 'product linked to to the badhabit', type: 'string',default:'coffee'},
            ],
            returns: [
                {arg: 'message', type: 'string'},
          ]
        }
        
    ); 
};
