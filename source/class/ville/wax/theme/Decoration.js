/* ************************************************************************

   Copyright: 2021 sqville

   License: MIT license

   Authors: Chris Eskew (sqville) chris.eskew@sqville.com

************************************************************************ */
/**
 * @asset(ville/wax/wax-switch-knob.svg)
 * @asset(ville/wax/wax-switch-knob26.svg)
 * 
 */



qx.Theme.define("ville.wax.theme.Decoration",
{
  extend : qx.theme.indigo.Decoration,

  decorations :
  {

    "scaledback-box" :
    {
      style :
      {
        radius: 3
      }
    },

    "normal-box" :
    {
      style :
      {
        radius: 0
      }
    },
    
    "nobgimg" :
    {
      style :
      {
        backgroundImage: "",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "right",
        backgroundPositionY: "center"
      }
    },
    
    "tablelist-list" :
    {
      style :
      {
        width : 1,
        color : "gray"
      }
    },
    
    "groupbox-open" :
    {
      style :
      {
        backgroundImage: "wax/baseline-expand_less-24px.svg",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "right",
        backgroundPositionY: "center"
      }
    },

    "groupbox-closed" :
    {
      style :
      {
        backgroundImage: "wax/demo/baseline-expand_more-24px.svg",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "right",
        backgroundPositionY: "center"
      }
    },

    "page-button-right" :
    {
      style :
      {
        width: [0,0,1,0],
        color: "#C7C7C7",
        //waxBackgroundImage: 'data:image/svg+xml,<svg fill="black" width="40px" height="24px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.73 4.2a.75.75 0 0 1 1.06.03l5 5.25c.28.3.28.75 0 1.04l-5 5.25a.75.75 0 1 1-1.08-1.04L12.2 10l-4.5-4.73a.75.75 0 0 1 .02-1.06Z" fill="black"></path></svg>',
        //waxBackgroundRepeat: "no-repeat",
        //waxBackgroundPositionX: "right",
        //waxBackgroundPositionY: "center"
        backgroundImage: 'data:image/svg+xml,<svg fill="black" width="40px" height="24px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.73 4.2a.75.75 0 0 1 1.06.03l5 5.25c.28.3.28.75 0 1.04l-5 5.25a.75.75 0 1 1-1.08-1.04L12.2 10l-4.5-4.73a.75.75 0 0 1 .02-1.06Z" fill="black"></path></svg>',
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "right",
        backgroundPositionY: "center"
        //backgroundImage: "ville/wax/chevron_right-24px.svg",
        //backgroundRepeat: "no-repeat",
        //backgroundPositionX: "right",
        //backgroundPositionY: "center"
      }
    },

    "page-button-right-last" :
    {
      include: "page-button-right",
      
      style :
      {
        width: 0
      }
    },

    "page-button-right-last-solo" :
    {
      include: "page-button-right-last",
      
      style :
      {
        widthTop: 1
      }
    },

    "white-box" :
    {
      style :
      {
        width: 1,
        color: "white-box-border",
        radius: 3
      }
    },

    "connected-top-box" :
    {
    	include : "white-box",
    	
    	style :
	    {
	      width: [1,0,0,0],
	      radius: [ 0, 0, 0, 0 ]
	    }
    },
    
    "border-me" :
    {
      style :
      {
        width : 1,
        color : "black",
        style : "solid"
      }
    },

    "topheader" :
    {
      style :
      {
        width : [0,0,1,0],
        color : "white-box-border",
        style : "solid"
      }
    },

    "topheader-blended" :
    {
      style :
      {
        width : [0,0,1,0],
        color : "#F2F1F6",
        style : "solid"
      }
    },

    "leftside" :
    {
      style :
      {
        width : [0,1,0,0],
        color : "white-box-border",
        style : "solid"
      }
    },

    "bottombar" :
    {
      style :
      {
        width : [1,0,0,0],
        color : "white-box-border",
        style : "solid"
      }
    },

    "bottombar-blended" :
    {
      style :
      {
        width : [1,0,0,0],
        color : "#F2F1F6",
        style : "solid"
      }
    },

    "mmenubutton-hym" :
    {
      include : "image",
      style :
      {
        backgroundImage: ""
      }
    },

    /*
    ---------------------------------------------------------------------------
      Main Menu Popup (Drawer)
    ---------------------------------------------------------------------------
    */
    
   "mainmenupopup" :
   {
    include : "popup", 
    
    style :
     {
       transitionProperty: ["visibility"],
       transitionDuration: "3s"
     }
   },

    /*
    ---------------------------------------------------------------------------
      BUTTON
    ---------------------------------------------------------------------------
    */
    
   "mainmenubutton-box" :
   {
     style :
     {
       radius : 0,
       width : [0,0,0,5],
       color : "white",
       transitionProperty: ["border-left-color"],
       transitionDuration: ".35s"
     }
   },

   "mainmenubutton-box-hovered" :
   {
     include : "mainmenubutton-box",

     style :
     {
      color : "#cccccc"
     }
   },

   "mainmenubutton-box-pressed" :
   {
     include : "mainmenubutton-box",

     style :
     {
      color : "black"
     }
   },

   "mainmenubutton-box-mark" : 
   {
     style :
     {
      radius : 0,
      width : [0,0,0,5], 
      color : "black"
     }
   },

   "mainmenubutton-box-new" : 
   {
     style :
     {
      radius : 0,
      width : [0,0,0,5], 
      color : "transparent"
     }
   },

   "mainmenuindicator" :
   {
    style :
     {
      radius: 3
     }
   },

   "mainmenutogglebutton-box" :
   {
     style :
     {
       radius : 0,
       width : [0,0,0,5],
       color : "white",
       backgroundPositionX: ['right']
     }
   },

   "mainmenutogglebutton-icon" :
   {
     style :
     {
       backgroundPositionX: ['right']
     }
   },

   "window-captionbar-default" :
   {
     style :
     {
      width: 0
     }
   },

   "hym-box-noborder" :
   {
     style :
     {
      radius: 8,
      width: 0
     }
   },

   "hym-box-border" :
   {
     style :
     {
      radius: 8,
      width: 2,
      color: "black"
     }
   },

   "wax-form-button" :
   {
    style :
    {
     radius: 6
    }
   },

   "article": 
   {
    include : "hym-box-noborder",
    
    style: 
    {
      backgroundImage: "ville/wax/Yellow_Car_g7.jpg",
      backgroundRepeat: "no-repeat",
      backgroundPositionX: "center",
      backgroundPositionY: -30
    }
  },

    /*
    ---------------------------------------------------------------------------
      PROGRESSBAR
    ---------------------------------------------------------------------------
    */

   "progressbar" :
   {
     style:
     {
       backgroundColor: "#FFF",
       radius : 0,
       width: 0,
       color: "border-separator"
     }
   },
   
   "progressbar-trans" :
   {
       radius : 0,
       width: 0
   },


   /*
    ---------------------------------------------------------------------------
      UPLOAD
    ---------------------------------------------------------------------------
    */
   "upload-area" :
   {
     style :
     {
       width : 1,
       radius : 3,
       style : "dashed",
       color : "gray"
     }
   },
   
   "upload-area-dragover" :
   {
    include: "upload-area",
     
     style :
     {
       style : "solid",
       color : "orange"
     }
   },

   /*
    ---------------------------------------------------------------------------
      WAX TABVIEW
    ---------------------------------------------------------------------------
    */

    "wax-tabview-mark" : 
    {
      style :
      {
        radius : 30
      }
    },

    "wax-tabview-line" : 
    {
      style :
      {
        radius : 2
      }
    },

    "wax-tabview-block" : 
    {
      style :
      {
        radius : 4,
        shadowLength : 1,
        shadowBlurRadius : 3,
        shadowColor : "shadow"
      }
    },

    "wax-tabview-bar-block" : 
    {
      style :
      {
        radius : 4
      }
    },

    "donut" :
    {
      style :
      {
        radius : 1000
      }
    },

   /*
    ---------------------------------------------------------------------------
      WAX SWITCH
    ---------------------------------------------------------------------------
    */

    "wax-switch" :
    {
      style :
      {
        radius: 70,
        width : [1,2],
        color: "#e3e2e2",
        //backgroundImage: "ville/wax/wax-switch-knob.svg",
        backgroundImage: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="white" /></svg>',
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "left",
        backgroundPositionY: "center",
        transitionProperty: ["background-color", "border", "background-position-x"],
        transitionDuration: "300ms",
        transitionTimingFunction : "ease"
      }
    },

    "wax-switch-checked" :
    {
      include: "wax-switch",
      style :
      {
        color: "black",
        backgroundPositionX: "right"
      }
    },

    "wax-switch-lgr" :
    {
      style :
      {
        radius: 70,
        width : [1,2],
        color: "#e3e2e2",
        backgroundImage: "ville/wax/wax-switch-knob26.svg",
        backgroundPositionX: "left",
        backgroundPositionY: "center",
        transitionProperty: ["background-color", "border", "background-position-x"],
        transitionDuration: "300ms",
        transitionTimingFunction : "ease"
      }
    },

    "wax-switch-lgr-checked" :
    {
      include: "wax-switch-lgr",
      style :
      {
        color: "black",
        backgroundPositionX: "right"
      }
    },

    "wax-switch-new" :
    {
      style :
      {
        radius: 70,
        width : [1,2],
        color: "#e3e2e2",
        transitionProperty: ["background-color", "border", "background-position-x"],
        transitionDuration: "300ms",
        transitionTimingFunction : "ease"
      }
    },

    "wax-switch-new-checked" :
    {
      include: "wax-switch-new",
      style :
      {
        color: "black"
      }
    }
    
  }
});