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
    // override
    label: {
      style(states) {
        return {
          textColor: states.disabled ? undefined : undefined
        };
      }
    },

    // override
    image: {
      style(states) {
        return {
          opacity: !states.replacement && states.disabled ? undefined : undefined
        };
      }
    },
    
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

    "control-header-atom" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          iconPosition: "top", 
          center: true,
          padding: [40, 6, 4, 6],
          font : "control-headeratom"
        }
      }
    },

     /*
    ---------------------------------------------------------------------------
      wax.demo.Button
    ---------------------------------------------------------------------------
    */

    "wax-form-button" :
    {

      style : function(states)
      {        
        return {
          backgroundColor : "black",
          textColor : "white",
          padding : [3, 8],
          gap : 16,
          cursor: "pointer",
          center: true,
          decorator : "hym-box-noborder",
          font: "hym-form-button"
        }
      }
    },

    "wax-form-clearbutton" :
    {
      include:  "wax-form-button",

      style : function(states)
      {        
        return {
          backgroundColor : "transparent",
          textColor : "black",
          decorator : "hym-box-border"
        }
      }
    },

    "wax-form-clearborderlessbutton" :
    {
      include:  "wax-form-clearbutton",

      style : function(states)
      {        
        return {
          decorator : "hym-box-noborder"
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
       var iconimg = "ville/wax/wax-icon-24-outline.svg";
       //var iconimg = "ville/wax/wax-28-comb.png";

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
           iconimg = "ville/wax/wax-icon-24-filled.svg";
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
         textColor : textcolor
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
        gap : 14,
        icon : states.checked ? "ville/wax/wax-icon-24-filled.svg" : "ville/wax/wax-icon-24-outline.svg"
      };
     }
   },

   /*"mainmenubutton/icon" : {

    style : function() {
        return {
          scale: true,
          width: 28,
          height: 28
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
      wax.MENUBUTTON - "hym" = hybrid moble (i.e. cordova/capacitor)
    ---------------------------------------------------------------------------
    */

   "mainmenubutton-frame-hym" :
   {
     alias : "atom",

     style : function(states)
     {
       var padding = [4,2,4,2];
       var textcolor = "gray";
       var icon = "ville/wax/wax-icon-24-outline.svg";

       if (!states.disabled) {
         if (states.hovered && !states.pressed && !states.checked) {
           textcolor = "gray";
         } else if (states.pressed || states.checked) {
           textcolor = "black";
           var icon = "ville/wax/wax-icon-24-filled.svg";
         }
       }

       return {
        icon : icon, 
        padding : padding,
        cursor: states.disabled ? undefined : "pointer",
        minWidth: 5,
        minHeight: 5,
        textColor: textcolor,
        font : "mainmenubutton-hym"
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
         gap : 2
       };
     }
   },

   "mainmenubutton-hym-home" :
   {
     alias : "mainmenubutton-hym",
     include : "mainmenubutton-hym",

     style : function(states)
     {
       return {
        icon : states.checked ? "ville/wax/Blue_House.svg" : "ville/wax/Gray_House.svg"
       };
     }
   },

   "mainmenubutton-hym-menu" :
   {
     alias : "mainmenubutton-hym",
     include : "mainmenubutton-hym",

     style : function(states)
     {
       return {
        icon : states.checked ? "ville/wax/wax_menu_blue.svg" : "ville/wax/wax_menu_gray.svg"
       };
     }
   },

   /*"mainmenubutton-hym/icon" : {

    style : function() {
        return {
          decorator : "mmenubutton-hym",
          scale: true,
          width: 28,
          height: 28
        };
      }
    },*/
  
    "hym-mainmenubutton-frame" :
   {
     alias : "atom",

     style : function(states)
     {
       var decorator = "mainmenubutton-box";
       var padding = [8, 0, 8, 12];
       var textcolor = "black";
       var bgcolor = "white";
       var font = "hym-mainmenubutton";

       if (!states.disabled) {
         if (states.hovered && !states.pressed && !states.checked) {
           decorator = "mainmenubutton-box-hovered";
           bgcolor = "white";
         } 
         else if (states.pressed || states.checked) {
           decorator = "mainmenubutton-box-pressed";
           font = "hym-mainmenubutton-bold";
           bgcolor = "#F2F1F6";
         }
       }

       return {
         decorator : decorator,
         padding : padding,
         cursor: states.disabled ? undefined : "pointer",
         textColor: textcolor,
         backgroundColor: bgcolor,
         font : font,
         opacity : 1
       };
     }
   },

   "hym-mainmenubutton-frame/label" : {
     alias : "atom/label",

     style : function(states)
     {
       return {
         textColor : states.disabled ? "text-disabled" : undefined
       };
     }
   },

   "hym-mainmenubutton" :
   {
     alias : "hym-mainmenubutton-frame",
     include : "hym-mainmenubutton-frame",

     style : function(states)
     {
      return {
        center : false,
        gap : 0
      };
     }
   },

   "hym-mainmenutogglebutton" :
   {
     alias : "atom",

     style : function(states)
     {
       return {
         decorator : "mainmenutogglebutton-box",
         padding : [8, 0, 8, 12],
         cursor: states.disabled ? undefined : "pointer",
         textColor: "black",
         backgroundColor: "white",
         font : "hym-mainmenubutton"
       };
     }
   },

   "hym-mainmenutogglebutton/icon" :
   {
     style : function(states)
     {
       return {
         decorator : "mainmenutogglebutton-icon"
       };
     }
   },

   "hym-mainmenutogglebutton/label" : {
     alias : "atom/label",

     style : function(states)
     {
       return {
         textColor : states.disabled ? "text-disabled" : undefined
       };
     }
   },

   "hym-submenubutton" : {
     
    include : "hym-mainmenubutton",
    
    style : function(states)
    {
      return {
        padding: [8, 0, 8, 28]
      };
    }
    },

   "hym-page-button" :
   {
    style : function(states)
    {
      return {
        center : false,
        //gap : 12,
        padding : [12,0,11,0],
        margin : [0,0,0,14],
        decorator : "page-button-right",
        font : "hym-default-bold"
      };
    }
   },

   "hym-page-last-button" :
   {
    style : function(states)
    {
      return {
        center : false,
        //gap : 12,
        padding : [12,0,12,0],
        margin : [0,0,0,14],
        decorator : "page-button-right-last",
        font : "hym-default-bold"
      };
    }
   },

   "hym-page-link-last-button" :
   {
    style : function(states)
    {
      return {
        center : false,
        gap : 12,
        padding : [0,0,0,0],
        margin : [0,0,0,14],
        font : "hym-app-link",
        textColor: "blue"
      };
    }
   },

   "hym-north-basebutton" :
   {
    style : function(states)
    {
      return {
        backgroundColor: "transparent",
        decorator: "hym-box-noborder",
        gap : 0,
        margin : 0,
        paddingTop: 8,
        paddingBottom: 8
      };
    }
   },

   "hym-north-menubutton" :
   {
    include : "hym-north-basebutton",
    
    style : function(states)
    {
      return {
        paddingLeft : 10
      };
    }
   },

   "hym-north-backbutton" :
   {
    include : "hym-north-basebutton",
    
    style : function(states)
    {
      return {
        paddingLeft : 6,
        paddingRight : 0
      };
    }
   },

   "hym-north-settingsbutton" :
   {
    include : "hym-north-basebutton",
    
    style : function(states)
    {
      return {
        paddingLeft : 0,
        paddingRight : 0
      };
    }
   },

   "hym-details-togglebutton" :
    {
      include: "hym-north-basebutton",

      style : function(states)
      {
        return {
          //icon : states.checked ? "ville/wax/chevronup.svg" : "ville/wax/chevrondown.svg",
          icon : "ville/wax/chevrondown.svg",
          gap: 8
        };
      }
    },

   /*
    ---------------------------------------------------------------------------
      DONUT BOOLEAN
    ---------------------------------------------------------------------------
    */
    "donutboolean": 
    {
      style: function(states) {
        return {
          maxWidth: 150,
          width: 150, 
          height: 150,
          primaryColor: "green",
          secondaryColor: "gray",
          gapColor: "white"
        };
      }
    },

    "donutboolean/donut":
    {
      style: function(states) {
        return {
          decorator: "donut"
        };
      }
    },

    "donutboolean/donuthole":
    {
      style: function(states) {
        return {
          decorator: "donut",
          backgroundColor: "white"
        };
      }
    },

    "donutboolean/measure":
    {
      style: function(states) {
        return {
          marginTop: -15,
          font: "control-header",
          alignX: "center", 
          alignY: "middle", 
          textAlign: "center"
        };
      }
    },

    "donutboolean/statement":
    {
      style: function(states) {
        return {
          marginTop: 15,
          font: "headeratom",
          alignX: "center", 
          alignY: "middle", 
          textAlign: "center"
        };
      }
    },

   /*
    ---------------------------------------------------------------------------
      WAX SWITCH
    ---------------------------------------------------------------------------
    */
    "wax-switch":
    {
      alias : "atom",

      style : function(states)
      {
        return {
          icon: qx.ui.mobile.basic.Image.PLACEHOLDER_IMAGE,
          gap: 6
        };
      }
    },


    "wax-switch/icon" : {
      style : function(states)
      {
        var decorator = "wax-switch";
        var bgcolor = "#e3e2e2";

        // Checked
        if (states.checked) {
          bgcolor = "black";
          decorator = "wax-switch-checked"
        } 

        return {
          decorator : decorator,
          scale : true,
          width: 48,
          height: 24,
          backgroundColor : bgcolor,
          cursor: "pointer"
        };
      }
    },

    "wax-switch-larger": "wax-switch",

    "wax-switch-larger/icon" : {
      style : function(states)
      {
        var decorator = "wax-switch-lgr";
        //TODOs - grab color from color theme
        var bgcolor = "#e3e2e2";

        // Checked
        if (states.checked) {
          //TODOs - grab color from color theme
          bgcolor = "black";
          decorator = "wax-switch-lgr-checked"
        } 

        return {
          decorator : decorator,
          scale : true,
          width: 48,
          height: 28,
          backgroundColor : bgcolor,
          cursor: "pointer"
        };
      }
    },

    "wax-switch-new":
    {

      style : function(states)
      {
        return {
          icon : qx.ui.basic.Image.PLACEHOLDER_IMAGE,
          backgroundColor: "transparent",
          decorator: "hym-box-noborder",
          gap : 20,
          margin : 0,
          paddingTop: 8,
          paddingBottom: 8
        };
      }
    },


    "wax-switch-new/icon" : {
      style : function(states)
      {
        var decorator = "wax-switch-new";
        var bgcolor = "#e3e2e2";

        // Checked
        if (states.checked) {
          bgcolor = "black";
          decorator = "wax-switch-new-checked"
        } 

        return {
          html: `<svg height="20" width="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="white" /></svg>`,
          decorator : decorator,
          scale : true,
          width: 48,
          height: 24,
          backgroundColor : bgcolor,
          cursor: "pointer"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      WAX TABVIEW
    ---------------------------------------------------------------------------
    */
    "tabview" :
    {
      style : function(states)
      {
        return {
          dynamicMarkEnabled : true
        };
      }
    },

    "tabview/bar" :
    {
      style : function(states)
      {
        return {
          marginBottom : 4,
          height : 40
        };
      }
    },

    "wax-tabview-page" : {},

    "wax-tabview-page/button" :
    {
      style : function(states)
      {

        var padding = [10, 16, 4, 16];

        return {
          zIndex : states.checked ? 10 : 5,
          textColor : states.disabled ? "text-disabled" : states.checked ? "white" : "black",
          padding : padding,
          cursor: "pointer"
        };
      }
    },

    "wax-tabview-page-line" : {},

    "wax-tabview-page-line/button" :
    {
      include: "wax-tabview-page/button",
      
      style : function(states)
      {
        return {
          textColor : "black"
        };
      }
    },

    "wax-tabview-block" : "tabview",

    "wax-tabview-block/bar" :
    {
      include : "tabview/bar",
      
      style : function(states)
      {
        return {
          backgroundColor : "#e3e2e2",
          paddingLeft : 4,
          decorator : "wax-tabview-bar-block",
          padding : 0
        };
      }
    },

    "wax-tabview-page-block" : {},

    "wax-tabview-page-block/button" :
    {
      include: "wax-tabview-page/button",
      
      style : function(states)
      {
        return {
          textColor : "black"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      WAX WINDOW
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