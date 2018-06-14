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
    //BadHabit.disableRemoteMethodByName("create", false);
    BadHabit.disableRemoteMethodByName("replaceOrCreate", false);
    BadHabit.disableRemoteMethodByName("patchOrCreate", false);
    BadHabit.disableRemoteMethodByName("exists", false);
    //BadHabit.disableRemoteMethodByName("find", true);
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
    //get habits overview
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
            //if (maxFrequentLocationElement!=null)
                callback(null,Math.round(totalBadHabits * 100) / 100,Math.round(totalSpends * 100) / 100,totalNumberOfBadHabits,maxFrequentLocationElement,maxFrequentLocationAmount);
        });      
    };

    //confirm user want to be notify when badhabit happens
    BadHabit.notify= function(product,callback){
            
            callback(null,"Notifications activated for product: "+product);
    }; 
    
    BadHabit.remoteMethod(
        'analysis', {
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
