'use strict';

module.exports = function(BadHabit) { 
    /***********************************
     * Enable-disable API exposed methods
     ************************************/    
    BadHabit.disableRemoteMethodByName("create", false);
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
    //get habits
   /* BadHabit.get=function(source, callback){
        var response='Imported from' + source;
        callback(null,response);
    }
    BadHabit.remoteMethod(
        'get', {
            http:{
                path:'/get',
                verb:'post'                
            },
            description:'Get user spending bad habits for a specific category and product',
            accepts:{ arg:'category', type:'string', default:'bars-restaurants'}
        }
    );  */  
};
