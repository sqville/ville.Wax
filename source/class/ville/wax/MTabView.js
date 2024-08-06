qx.Mixin.define("ville.wax.MTabView",
{  

  events: {
    /** Fires before the selection was modified */
    beforeChangeSelection: "qx.event.type.Data"
  },
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
 
  properties :
  {
    dynamicMarkEnabled :
    {
      check : "Boolean",
      init : false,
      themeable : true,
      apply : "_applyDynamicMarkEnabled"
    },
    
    dynamicMark :
    {
      check : "qx.ui.core.Widget",
      apply : "_applyDynamicMark"
    },

    dynamicMarkAnimationDuration :
    {
      check : "Integer",
      init : 300
    },

    dynamicMarkAnimationTiming :
    {
      check : "String",
      init : "ease"
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
    _applyDynamicMarkEnabled : function(value, old) {
      if (value) {
        var tabviewbarline = new qx.ui.core.Widget().set({
          height: 0, width: 0, backgroundColor: "black", zIndex: 5
        });
        //this.setDynamicMarkAnimationDuration(300); 
        //this.setDynamicMarkAnimationTiming("ease");
        this.setDynamicMark(tabviewbarline);
      }
    },
    
    // property apply
    _applyDynamicMark : function(value, old) {
      if (value) {
        this.getChildControl("bar").addAt(value, 0); 

        this.addListener("changeSelection", (e) => {
          //var oldbounds = e.getOldData()[0].getButton().getBounds();
          var newbounds = e.getData()[0].getButton().getBounds();
          var tbvmarkdom = value.getContentElement().getDomElement();
          //var oldtop = oldbounds.top + oldbounds.height - value.getHeight();
          //var newtop = newbounds.top + newbounds.height - value.getHeight();
          var tabmarkwidth = parseInt(this.getUserData("tabmarkwidth"));
          var scalefactor = newbounds.width / tabmarkwidth;
          var widthdiffhalf = Math.round((newbounds.width - tabmarkwidth) / 2);
          var transscaledleft = newbounds.left + widthdiffhalf;
          var tabviewbarmarkmove = {
            duration: this.getDynamicMarkAnimationDuration(),
            timing: this.getDynamicMarkAnimationTiming(),
            keyFrames : {
              100: {translate: [transscaledleft + "px", "36px"], scale: [scalefactor, 1]}
            },
            keep : 100
          };
          //console.log(scalefactor);
          qx.bom.element.AnimationCss.animate(tbvmarkdom, tabviewbarmarkmove);
          //qx.bom.element.Transform.translate(tbvmarkdom, [newbounds.left + "px", "36px"]);
        }); 
  
        this.addListenerOnce("appear", function() {
          var movetobounds = this.getSelection()[0].getButton().getBounds();
          var newtop = movetobounds.height - 4;
          value.getContentElement().setStyles({
            transform: "translate(" + movetobounds.left + "px, " + newtop + "px)",
            width: movetobounds.width + "px", 
            height: "4px"
          });
          this.setUserData("tabmarkwidth", movetobounds.width);
          //value.getContentElement().setStyles({transform: "translate(" + movetobounds.left + "px)"});
          //left: movetobounds.left + "px", 
           // "top": movetobounds.top + movetobounds.height - value.getHeight() + "px",
        }, this);
      }
    }
  }
});