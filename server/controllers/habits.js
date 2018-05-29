/***********************************
 * door controller to close and open the door
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/

/***********************************
 * Private functions
 ************************************/

/***********************************
 * rendering functions
 ************************************/

/**
 * render landing page (home screen)
 *
 * @param {req} request
 * @param {res} response
 */
function renderIndex(req,res){
  res.send("OK")
}


/***********************************
 * Module exports.
 ************************************/
module.exports={
    index :function(req, res) {
      renderIndex(req,res);
    }
};