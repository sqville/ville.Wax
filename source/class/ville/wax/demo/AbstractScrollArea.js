/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * The ScrollArea provides a container widget with on demand scroll bars
 * if the content size exceeds the size of the container.
 *
 * @childControl pane {qx.ui.core.scroll.ScrollPane} pane which holds the content to scroll
 * @childControl corner {qx.ui.core.Widget} corner where no scrollbar is shown
 */
 qx.Class.define("ville.wax.demo.AbsScrollArea",
 {
   extend : qx.ui.core.Widget,
   type : "abstract",
 
 
   /*
   *****************************************************************************
      STATICS
   *****************************************************************************
   */
 
   statics :
   {
     /**
      * The default width which is used for the width of the scroll bar if
      * overlaid.
      */
     DEFAULT_SCROLLBAR_WIDTH : 14
   },
 
 
 
   /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */
 
   construct : function()
   {
     this.base(arguments);
 
     if (qx.core.Environment.get("os.scrollBarOverlayed")) {
       // use a plain canvas to overlay the scroll bars
       this._setLayout(new qx.ui.layout.Canvas());
     } else {
       // Create 'fixed' grid layout
       var grid = new qx.ui.layout.Grid();
       grid.setColumnFlex(0, 1);
       grid.setRowFlex(0, 1);
       this._setLayout(grid);
     }
 
     // since the scroll container disregards the min size of the scrollbars
     // we have to set the min size of the scroll area to ensure that the
     // scrollbars always have an usable size.
     var size = qx.ui.core.scroll.AbstractScrollArea.DEFAULT_SCROLLBAR_WIDTH * 2 + 14;
     this.set({minHeight: size, minWidth: size});
 
     // Roll listener for scrolling
     //this._addRollHandling();

    // this.getContentElement().setStyle("WebkitOverflowScrolling", "touch");
    //this.getContentElement().setStyle("touch-action", "auto");
   },
 
 /*
   events : {
     /** Fired as soon as the scroll animation in X direction ends. 
     scrollAnimationXEnd: 'qx.event.type.Event',
 
     /** Fired as soon as the scroll animation in Y direction ends. 
     scrollAnimationYEnd: 'qx.event.type.Event'
   },
 */
 
 
   /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
 
   properties :
   {
     // overridden
     appearance :
     {
       refine : true,
       init : "scrollarea"
     }

   },
 
 
 
   /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */
 
   members :
   {
     /*
     ---------------------------------------------------------------------------
       CHILD CONTROL SUPPORT
     ---------------------------------------------------------------------------
     */
 
     // overridden
     _createChildControlImpl : function(id, hash)
     {
       var control;
 
       switch(id)
       {
         case "pane":
           //control = new qx.ui.core.scroll.ScrollPane();
           control = new ville.wax.demo.ScrollPane();
 
           //control.addListener("update", this._computeScrollbars, this);
           //control.addListener("scrollX", this._onScrollPaneX, this);
           //control.addListener("scrollY", this._onScrollPaneY, this);
 
           if (qx.core.Environment.get("os.scrollBarOverlayed")) {
             this._add(control, {edge: 0});
           } else {
             this._add(control, {row: 0, column: 0});
           }
           break;
 
 /*
         case "scrollbar-x":
           control = this._createScrollBar("horizontal");
           control.setMinWidth(0);
 
           control.exclude();
           control.addListener("scroll", this._onScrollBarX, this);
           control.addListener("changeVisibility", this._onChangeScrollbarXVisibility, this);
           control.addListener("scrollAnimationEnd", this._onScrollAnimationEnd.bind(this, "X"));
 
           if (qx.core.Environment.get("os.scrollBarOverlayed")) {
             control.setMinHeight(qx.ui.core.scroll.AbstractScrollArea.DEFAULT_SCROLLBAR_WIDTH);
             this._add(control, {bottom: 0, right: 0, left: 0});
           } else {
             this._add(control, {row: 1, column: 0});
           }
           break;
 
 
         case "scrollbar-y":
           control = this._createScrollBar("vertical");
           control.setMinHeight(0);
 
           control.exclude();
           control.addListener("scroll", this._onScrollBarY, this);
           control.addListener("changeVisibility", this._onChangeScrollbarYVisibility, this);
           control.addListener("scrollAnimationEnd", this._onScrollAnimationEnd.bind(this, "Y"));
 
           if (qx.core.Environment.get("os.scrollBarOverlayed")) {
             control.setMinWidth(qx.ui.core.scroll.AbstractScrollArea.DEFAULT_SCROLLBAR_WIDTH);
             this._add(control, {right: 0, bottom: 0, top: 0});
           } else {
             this._add(control, {row: 0, column: 1});
           }
           break;
 */
 
         case "corner":
           control = new qx.ui.core.Widget();
           control.setWidth(0);
           control.setHeight(0);
           control.exclude();
 
           if (!qx.core.Environment.get("os.scrollBarOverlayed")) {
             // only add for non overlayed scroll bars
             this._add(control, {row: 1, column: 1});
           }
           break;
       }
 
       return control || this.base(arguments, id);
     },
 
 
 
 
     /*
     ---------------------------------------------------------------------------
       PANE SIZE
     ---------------------------------------------------------------------------
     */
 
     /**
      * Returns the dimensions of the pane.
      *
      * @return {Map|null} The pane dimension in pixel. Contains
      *    the keys <code>width</code> and <code>height</code>.
      */
     getPaneSize : function() {
       return this.getChildControl("pane").getInnerSize();
     },
 
 
     /*
     ---------------------------------------------------------------------------
       ITEM LOCATION SUPPORT
     ---------------------------------------------------------------------------
     */
 
     /**
      * Returns the top offset of the given item in relation to the
      * inner height of this widget.
      *
      * @param item {qx.ui.core.Widget} Item to query
      * @return {Integer} Top offset
      */
     getItemTop : function(item) {
       return this.getChildControl("pane").getItemTop(item);
     },
 
 
     /**
      * Returns the top offset of the end of the given item in relation to the
      * inner height of this widget.
      *
      * @param item {qx.ui.core.Widget} Item to query
      * @return {Integer} Top offset
      */
     getItemBottom : function(item) {
       return this.getChildControl("pane").getItemBottom(item);
     },
 
 
     /**
      * Returns the left offset of the given item in relation to the
      * inner width of this widget.
      *
      * @param item {qx.ui.core.Widget} Item to query
      * @return {Integer} Top offset
      */
     getItemLeft : function(item) {
       return this.getChildControl("pane").getItemLeft(item);
     },
 
 
     /**
      * Returns the left offset of the end of the given item in relation to the
      * inner width of this widget.
      *
      * @param item {qx.ui.core.Widget} Item to query
      * @return {Integer} Right offset
      */
     getItemRight : function(item) {
       return this.getChildControl("pane").getItemRight(item);
     },
 
     /*
     ---------------------------------------------------------------------------
       SCROLL SUPPORT
     ---------------------------------------------------------------------------
     */

 
     /*
     ---------------------------------------------------------------------------
       EVENT LISTENERS
     ---------------------------------------------------------------------------
     */
 
 
     /*
     ---------------------------------------------------------------------------
       HELPER METHODS
     ---------------------------------------------------------------------------
     */
 
   }
 });
 