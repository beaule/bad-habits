'use strict';
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
   BadHabit.analysis= function(category,product,startDate,callback){
       //calcul total-spends
       var filter={where: {date: {gt: startDate}}};
       BadHabit.find(filter , 
        function(err, badHabits) { 
            var totalBadHabits=0;
            var totalSpends=0;
            var modeMap = {};
            var maxEl = badHabits[0].location, maxCount = 1;
            var totalNumberOfBadHabits=0;
            for (var key in badHabits) {
                totalSpends=totalSpends+Math.abs(badHabits[key].amount);
                if(badHabits[key].category==category && badHabits[key].product==product){
                    totalBadHabits=totalBadHabits+Math.abs(badHabits[key].amount);
                    totalNumberOfBadHabits=totalNumberOfBadHabits+1;
                }
                var el = badHabits[key].location;
                if(modeMap[el] == null)
                    modeMap[el] = 1;
                else
                    modeMap[el]++;  
                if(modeMap[el] > maxCount){
                    maxEl = el;
                    maxCount = modeMap[el];
                }
            }
            callback(null,Math.round(totalBadHabits * 100) / 100,Math.round(totalSpends * 100) / 100,totalNumberOfBadHabits,maxEl,modeMap[maxEl]);
        });      
    };
    
    BadHabit.remoteMethod(
        'analysis', {
            http:{
                path:'/analysis',
                verb:'get'                
            },
            description:'Get user spending bad habits analysis summary for a specific category and product',
            accepts: [
                {arg: 'category', description: 'category of the badhabit', type: 'string', default:'bars-restaurants' },
                {arg: 'product', description: 'product linked to to the badhabit', type: 'string',default:'coffee'},
                {arg: 'start-date', description: 'Start analysis after this date', type: 'date',default:'May 18, 2018 06:52:00'}
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
};
