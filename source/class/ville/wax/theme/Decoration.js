/* ************************************************************************

   Copyright: 2021 sqville

   License: MIT license

   Authors: Chris Eskew (sqville) chris.eskew@sqville.com

************************************************************************ */
/**
 * @asset(ville/wax/mcheckbox-knob.png)
 * @asset(ville/wax/mcheckbox-knob.svg)
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
        backgroundImage: "ville/wax/chevron_right-24px.svg",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "right",
        backgroundPositionY: "center"
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
      color : "blue"
     }
   },

   /*"mainmenubutton-box-pressed-hovered" : 
   {
     include : "mainmenubutton-box-pressed",

     style :
     {
       color : "button-border-hovered"
     }
   },*/

   "mainmenuindicator" :
   {
    style :
     {
      radius: 3
     }
   },

   "window-captionbar-default" :
   {
     style :
     {
      width: 0
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
      CHECK BOX
    ---------------------------------------------------------------------------
    */

    "mcheckbox" :
    {
      style :
      {
        radius: 70,
        width : [1,2],
        color: "#e3e2e2",
        //shadowBlurRadius: 2,
        //shadowVerticalLength: 1,
        //shadowColor: ['rgba(0, 0, 0, 0.2)', 'rgba(255, 255, 255, 0.4)'],
        //inset: [true, false],
        backgroundImage: "ville/wax/mcheckbox-knob.svg",
        backgroundPositionX: "left",
        backgroundPositionY: "center"
      }
    },

    "mcheckbox-checked" :
    {
      style :
      {
        radius: 70,
        width : [1,2],
        color: "blue",
        backgroundImage: "ville/wax/mcheckbox-knob.svg",
        backgroundPositionX: "right",
        backgroundPositionY: "center"
      }
    },

    "mcheckbox-focused" :
    {
      include : "mcheckbox",
      style :
      {
        color : "background-selected"
      }
    },

    "mcheckbox-invalid" :
    {
      include : "mcheckbox",
      style :
      {
        color : "invalid"
      }
    },

    "mmenubutton-hym" :
    {
      include : "image",
      style :
      {
        backgroundImage: ""
      }
    }

    
  }
});