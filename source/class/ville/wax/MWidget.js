qx.Mixin.define("ville.wax.MWidget",
{
  construct : function()
  {
    this.initTouchAction();
  }, 
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
 
  properties :
  {
    touchAction :
    {
      check : ["auto", "none"],
      init : "auto",
      themeable : true,
      apply : "_applyTouchAction",
      event : "changeTouchAction"
    }
  	
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // property apply
    _applyTouchAction : function(value, old) {
      this.getContentElement().setStyles({"touch-action": value, "-ms-touch-action" : value});
    }
  }
});