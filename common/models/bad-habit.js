'use strict';

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
   /*BadHabit.analysis=function(category,product, callback){
        var response='Imported from' + category + product;
        callback(null,response);
    }
    BadHabit.remoteMethod(
        'analysis', {
            http:{
                path:'/analysis',
                verb:'get'                
            },
            description:'Get user spending bad habits analysis summary for a specific category and product',
            accepts: [
                {arg: 'category', description: 'category of the badhabit', type: 'string', default:'bars-restaurants' },
                {arg: 'product', description: 'product linked to to the badhabit', type: 'string',default:'coffee'}
              ]
        }
    );  */
};