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

    "hym-app-header" :
    {
      include : "default",
      family : ["-apple-system", "BlinkMacSystemFont", "Helvetica Neue", "arial", "Helvetica", "sans-serif"],
      bold : true,
      size : 16
    }
  }
});