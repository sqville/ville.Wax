/* ************************************************************************

   Copyright: 2021 sqville

   License: MIT license

   Authors: Chris Eskew (sqville) chris.eskew@sqville.com

************************************************************************ */

qx.Theme.define("ville.wax.theme.Appearance",
{
  extend : qx.theme.indigo.Appearance,

  appearances :
  {
    "header-atom" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          iconPosition: "top", 
          center: true,
          padding: [10, 6, 20, 6],
          marginBottom: 10,
          font : "headeratom"
        }
      }
    },

    "header-atom/icon" :
    {
      include : "image",

      style : function(states)
      {
        return {
          width: 120,
          height: 94
        }
      }
    },

     /*
    ---------------------------------------------------------------------------
      wax.demo.Button
    ---------------------------------------------------------------------------
    */

    "testbutton" :
    {
      include : "button",

      style : function(states)
      {
        /*var iprops;
        if (states.hovered)
          iprops = {animation:"grow"};
        else if (!states.hovered && states.abandoned)
          iprops = {animation:"shrink"};
        else
          iprops = undefined;*/
        
        return {
          padding : 16,
          gap : 16
          //iconProps : iprops
        }
      }
    },

     /*
    ---------------------------------------------------------------------------
      wax.demo.Atom
    ---------------------------------------------------------------------------
    */

   "icss-atom" :
   {
     include : "atom",

     style : function(states)
     {
       return {
        center: true, 
        padding : 16,
        gap : 16,
        iconProps : { iconAlign: "center" }
       }
     }
   },

    /*
    ---------------------------------------------------------------------------
      wax.MENUBUTTON
    ---------------------------------------------------------------------------
    */
   "mainmenubutton-frame" :
   {
     alias : "atom",

     style : function(states)
     {
       var decorator = "mainmenubutton-box";
       var padding = [14, 3, 14, 18];
       //vartextcolor = "#606060";
       var textcolor = "black";
       var opacity = .85;
       var font = "mainmenubutton";
       //var iconimg = "ville/wax/wireframe-image-sm.png"
       var iconimg = "ville/wax/wax-28-comb.png";

       if (!states.disabled) {
         if (states.hovered && !states.pressed && !states.checked) {
           decorator = "mainmenubutton-box-hovered";
           //padding = [14,3,14,20];
           opacity = 1;
         } 
         else if (states.pressed || states.checked) {
           decorator = "mainmenubutton-box-pressed";
           //padding = [14,3,14,20];
           opacity = 1;
           font = "mainmenubutton-bold";
           textcolor = "blue";
           iconimg = "ville/wax/wax-28-comb-blue.png";
         }
       }

       return {
         decorator : decorator,
         padding : padding,
         cursor: states.disabled ? undefined : "pointer",
         minWidth: 5,
         minHeight: 5,
         textColor: textcolor,
         font : "mainmenubutton",
         opacity : 1,
         textColor : textcolor,
         icon : iconimg
       };
     }
   },

   "mainmenubutton-frame/label" : {
     alias : "atom/label",

     style : function(states)
     {
       return {
         textColor : states.disabled ? "text-disabled" : undefined
       };
     }
   },

   "mainmenubutton" :
   {
     alias : "mainmenubutton-frame",
     include : "mainmenubutton-frame",

     style : function(states)
     {
       return {
         center : false,
         minWidth : 220,
         gap : 14
       };
     }
   },

   /*"mainmenubutton/icon" : {

    style : function() {
        return {
          scale: true,
          width: 32,
          height: 32
        };
      }
    },*/

    "mainmenuindicator" : {
      style : function() {
        return {
          backgroundColor : "gray",
          textColor : "white",
          height : 24,
          padding: [2,6,2,6],
          decorator : "mainmenuindicator",
          font : "mainmenuindicator"
        };
      }
    },

    "submenubutton" : {
     style : function(states)
     {
       return {
        cursor: states.disabled ? undefined : "pointer",
        textColor : states.hovered ? "black" : "#505050",
        font : "mainmenubutton",
        decorator: "mainmenubutton-box-pressed"
       };
     }
    },

    /*
    ---------------------------------------------------------------------------
      wax.MENUBUTTON - "hym" = hybrid moble (i.e. phonegap or cordova)
    ---------------------------------------------------------------------------
    */

   "mainmenubutton-frame-hym" :
   {
     alias : "atom",

     style : function(states)
     {
       var decorator = "mainmenubutton-box";
       var padding = [4,2,4,2];
       var textcolor = "black";
       var opacity = .55;

       if (!states.disabled) {
         if (states.hovered && !states.pressed && !states.checked) {
           //decorator = "mainmenubutton-box-hovered";
           //padding = [12,6,12,14];
           textcolor = "black";
           opacity = 1;
         } /*else if (states.hovered && (states.pressed || states.checked)) {
           decorator = "mainmenubutton-box-pressed-hovered";
         }*/ else if (states.pressed || states.checked) {
           //decorator = "mainmenubutton-box-pressed";
           //padding = [12,6,12,14];
           textcolor = "blue";
           opacity = 1;
         }
       }

       return {
         decorator : decorator,
         padding : padding,
         cursor: states.disabled ? undefined : "pointer",
         minWidth: 5,
         minHeight: 5,
         textColor: textcolor,
         font : "mainmenubutton-hym",
         opacity : opacity
       };
     }
   },

   "mainmenubutton-frame-hym/label" : {
     alias : "atom/label",

     style : function(states)
     {
       return {
         textColor : states.disabled ? "text-disabled" : undefined
       };
     }
   },

   "mainmenubutton-hym" :
   {
     alias : "mainmenubutton-frame-hym",
     include : "mainmenubutton-frame-hym",

     style : function(states)
     {
       return {
         center : true,
         gap : 4
       };
     }
   },

   "mainmenubutton-hym/icon" : {

    style : function() {
        return {
          scale: true,
          width: 28,
          height: 28
        };
      }
    },

   "hym-page-button" :
   {
    style : function(states)
    {
      return {
        center : false,
        gap : 12,
        padding : [8,20,8,20],
        marginRight : 30,
        decorator : "page-button-right"
      };
    }
   },

   /*
    ---------------------------------------------------------------------------
      CHECK BOX
    ---------------------------------------------------------------------------
    */
    "mobile-checkbox":
    {
      alias : "atom",

      style : function(states)
      {
        // The "disabled" icon is set to an icon **without** the -disabled
        // suffix on purpose. This is because the Image widget handles this
        // already by replacing the current image with a disabled version
        // (if available). If no disabled image is found, the opacity style
        // is used.
        var icon;

        /*
        // Checked
        if (states.checked) {
          icon = qx.theme.simple.Image.URLS["checkbox-checked"];
        // Undetermined
        } else if (states.undetermined) {
          icon = qx.theme.simple.Image.URLS["checkbox-undetermined"];
        // Unchecked
        } else {
          // empty icon
          icon = qx.theme.simple.Image.URLS["blank"];
        }
        */

        return {
          icon: qx.theme.simple.Image.URLS["blank"],
          //icon: "ville/wax/mcheckbox-knob.svg",
          gap: 6
        };
      }
    },


    "mobile-checkbox/icon" : {
      style : function(states)
      {
        var decorator = "mcheckbox";
        var bgcolor = "#e3e2e2";

        /*
        if (states.focused && !states.invalid) {
          decorator = "checkbox-focused";
        }*/

        decorator += states.invalid && !states.disabled ? "-invalid" : "";

        var padding;
        // Checked
        if (states.checked) {
          //padding = 2;
          bgcolor = "blue";
          decorator = "mcheckbox-checked"
        // Undetermin
        } 
        /*else if (states.undetermined) {
          padding = [4, 2];
        }*/

        return {
          decorator : decorator,
          scale : true,
          width: 48,
          height: 30,
          backgroundColor : bgcolor
        };
      }
    },



    /*
    ---------------------------------------------------------------------------
      WINDOW
    ---------------------------------------------------------------------------
    */

    "wax-window" : {
      alias : "window",

      include: "window",

      style : function(states)
      {
        return {
         showMaximize : false,
         showMinimize : false
        };
      }
    },
    
    "wax-window/title" : {
      alias : "window/title",

      style : function(states)
      {
        return {
         textColor : "black",
         font : "control-header"
        };
      }
     },

     "wax-window/captionbar" : {
      include : "window/captionbar",
      
      style : function(states)
      {
        return {
         decorator : "window-captionbar-default"
        };
      }
     },

     "wax-window/close-button" :
    {
      alias : "button",

      style : function(states)
      {
        return {
          marginLeft : 2,
          icon : states.hovered ? "ville/wax/close-red-24px.svg" : "ville/wax/close-24px.svg",
          padding : [ 1, 2 ],
          cursor : states.disabled ? undefined : "pointer"
        };
      }
    },

    "wax-window/close-button/icon" :
    {
      alias : "image",

      style : function(states)
      {
        return {
          width : 24,
          height : 24
        };
      }
    }

  }
});