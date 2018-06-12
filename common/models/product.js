'use strict';
 /***********************************
 * Module exports.
 ************************************/
module.exports = function(Product) { 
    /***********************************
     * Enable-disable API exposed methods
     ************************************/    
    Product.disableRemoteMethodByName("create", false);
    Product.disableRemoteMethodByName("replaceOrCreate", false);
    Product.disableRemoteMethodByName("patchOrCreate", false);
    Product.disableRemoteMethodByName("exists", false);
    //Product.disableRemoteMethodByName("find", true);
    Product.disableRemoteMethodByName("findById", false);
    Product.disableRemoteMethodByName("findOne", false);
    Product.disableRemoteMethodByName("deleteById", false);
    Product.disableRemoteMethodByName("count", false);
    Product.disableRemoteMethodByName("replaceById", false);
    Product.disableRemoteMethodByName("prototype.patchAttributes", false);
    Product.disableRemoteMethodByName("createChangeStream", false);
    Product.disableRemoteMethodByName("updateAll", false);
    Product.disableRemoteMethodByName("replaceOrCreate", false);
    Product.disableRemoteMethodByName("upsertWithWhere", false);  
};
