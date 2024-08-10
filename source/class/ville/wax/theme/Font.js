/* ************************************************************************

   Copyright: 2021 sqville

   License: MIT license

   Authors: Chris Eskew (sqville) chris.eskew@sqville.com

************************************************************************ */

qx.Theme.define("ville.wax.theme.Font",
{
  extend : qx.theme.indigo.Font,

  fonts :
  {
    "default" :
    {
      size : 14,
      family : ["Lato", "Helvetica Neue", "arial", "Helvetica", "sans-serif"],
      color : "black"
    },

    "default-bold" :
    {
      include : "default",
      bold : true
    },

    //override
    "monospace" :
    {
      size : 14,
      family : [ "DejaVu Sans Mono", "Courier New", "monospace" ],
      color: "font",
      lineHeight: 1.8
    },

    "mainmenubutton" :
    {
      include : "default",
      size : 16
    },

    "mainmenubutton-bold" :
    {
      include : "mainmenubutton",
      bold : true
    },

    "mainmenubutton-hym" :
    {
      include : "default",
      size : 11
    },

    "mainmenuindicator" :
    {
      include : "default-bold",
      size : 14
    },

    "headeratom" :
    {
      include : "default-bold",
      size : 16
    },

    "control-headeratom" :
    {
    	include : "default-bold",
    	size : 32
    },

    "control-header" :
    {
    	include : "default",
    	size : 32
    },

    "area-header" :
    {
      include : "default",
      size : 21
    },

    "hym-default" :
    {
      include : "default",
      family : ["-apple-system", "BlinkMacSystemFont", "Helvetica Neue", "arial", "Helvetica", "sans-serif"]
    },

    "hym-mainmenubutton" :
    {
      include : "hym-default",
      size : 14
    },

    "hym-mainmenubutton-bold" :
    {
      include : "hym-mainmenubutton",
      bold : true
    },

    "hym-app-page-content-lgr" :
    {
      include : "hym-default",
      size : 16
    },

    "hym-app-page-content-sechead" :
    {
      include : "hym-default",
      size : 18
    },

    "hym-app-header" :
    {
      include : "hym-default",
      bold : true,
      size : 16
    },

    "hym-app-page-header" :
    {
      include : "hym-default",
      bold : true,
      size : 24
    },

    "hym-app-page-bigmsg" :
    {
      include : "hym-default",
      bold : true,
      size : 42,
      letterSpacing : 1
    },

    "hym-app-page-section-header" :
    {
      include : "hym-default",
      bold : true,
      size : 16
    },

    "hym-app-link" :
    {
      include : "hym-default",
      size : 14
    },

    "hym-form-button" :
    {
      include : "hym-default",
      size : 14,
      bold : true
    }
  }
});