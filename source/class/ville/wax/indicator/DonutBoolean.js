/* ************************************************************************

   ville software

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Chris Eskew (sqville)

************************************************************************ */

/**
 * The Donut Boolean is designed to simply display the current %
 * of a measure.
 *
 * The Value is limited between 0 and Maximum value.
 * It's not allowed to set a Maximum value of 0.  If you set a Maximum value
 * bigger than 0, but smaller than Value, it will be limited to Value.
 *
 * @childControl donut {qx.ui.core.Widget} The colored bar area
 * @childControl donuthole {qx.ui.core.Widget} The middle area
 * @childControl measure {qx.ui.basic.Label} The measure in percent  
 * @childControl statement {qx.ui.basic.Label} The measure in words
 */
qx.Class.define("ville.wax.indicator.DonutBoolean", {
  extend: qx.ui.container.Composite,

  /**
   * @param value {Number ? 0} Progress bar value
   * @param maximum {Number ? 100} Progress bar maximum value
   * @param statement {String}
   */
  construct(value, maximum, statement) {
    super();

    this._createChildControl("donut");
    this._createChildControl("donuthole");
    this._createChildControl("measure");
    this._createChildControl("statement");

    //this.setLayout(new qx.ui.layout.HBox());
    this.setLayout(new qx.ui.layout.Canvas());

    if (statement != null) {
      this.setStatement(statement);
    }

    if (maximum != null) {
      this.setMaximum(maximum);
    }

    if (value != null) {
      this.setValue(value);
    }
  },

  properties: {
    appearance: {
      refine: true,
      init: "donutboolean"
    },

    /** Maximum value of the progress bar */
    maximum: {
      init: 100,
      event: "changeMaximum",
      apply: "_applyMaximum"
    },

    /** Current value of the progress bar */
    value: {
      init: 0,
      event: "changeValue",
      apply: "_applyValue"
    },

    statement : {
      check: "String",
      nullable: true
    },

    /**
     * The color of the primary segment.
     */
    primaryColor: {
      nullable: false,
      check: "Color",
      init: "green",
      themeable: true,
      event: "changePrimaryColor",
      apply: "_applyPrimaryColor"
    },

    /**
     * The color of the secondary segment.
     */
    secondaryColor: {
      nullable: false,
      check: "Color",
      themeable: true,
      init: "gray"
    },

    /**
     * The color of the segment gaps.
     */
    gapColor: {
      nullable: false,
      check: "Color",
      themeable: true,
      init: "white"
    }
  },

  events: {
    /**
     * Fired when the process is complete (value === maximum value)
     */
    complete: "qx.event.type.Event",

    /**
     * Fired when the % complete value is changed.
     */
    change: "qx.event.type.Data"
  },

  members: {

    // property apply
    _applyValue(value, old) {
      var max = this.getMaximum();

      //do nothing if is not a number
      if (!qx.lang.Type.isNumber(value) || !isFinite(value)) {
        value = old;
      }

      if (value < 0) {
        // limit value to 0
        value = 0;
      } else if (value > max) {
        // limit value to max
        value = max;
      }

      //set value
      this.setValue(value);

      //update progress
      this._changeProgress(value / max);
    },

    // property apply
    _applyMaximum(value, old) {
      var max = value;
      var val = this.getValue();

      //do nothing if is not a number, is negative or zero
      if (!qx.lang.Type.isNumber(max) || !isFinite(max) || max <= 0) {
        max = old;
      }

      //limit max to a greater than 0 value
      if (max < val) {
        max = val;
      }

      //set max
      this.setMaximum(max);

      //update progress
      this._changeProgress(val / max);
    },

    // property apply
    _applyPrimaryColor(value, old) {
      var primc = value;
      var val = this.getValue();
      var max = this.getMaximum();

      //do nothing if is not a number, is negative or zero
      /*if (!qx.lang.Type.isNumber(max) || !isFinite(max) || max <= 0) {
        max = old;
      }

      //limit max to a greater than 0 value
      if (max < val) {
        max = val;
      }

      //set max
      this.setMaximum(max);
      */

      //update progress
      this._changeProgress(val / max);
    },
    
    //overridden
    _createChildControlImpl(id, hash) {
      var control;

      switch (id) {
        case "donut":
          control = new qx.ui.core.Widget();
          this._add(control, { edge: 0 });
          break;
        case "donuthole":
          control = new qx.ui.core.Widget();
          this._add(control, { edge: "8%" });
          break;
        case "measure":
          control = new qx.ui.basic.Label();
          this._add(control);
          break;
        case "statement":
          control = new qx.ui.basic.Label();
          this._add(control);  
        //control = new qx.ui.container.Composite(new qx.ui.layout.VBox(2));
          //control.add(new qx.ui.core.Spacer(), { flex: 1} );
          //control.add(new qx.ui.basic.Label("0%").set({ allowGrowX: true, allowGrowY: true, alignX: "center", alignY: "middle", textAlign: "center" }));
          //control.add(new qx.ui.basic.Label("Hello").set({ allowGrowX: true, allowGrowY: true, alignX: "center", alignY: "middle", textAlign: "center" }));
          //control.add(new qx.ui.core.Spacer(), { flex: 1} );
          //this._add(control, {width: "100%"});
          break;
      }

      return control || super._createChildControlImpl(id);
    },

    /**
     * Update the progress bar.
     *
     * @param value {Number} future value of progress bar
     */
    _changeProgress(value) {
      var bar = this.getChildControl("donut");
      var measure = this.getChildControl("measure");
      var words = this.getChildControl("statement");
      var percent = Math.floor(value * 100);
      var to = Math.floor(value * 360);
      //var from = parseInt(bar.getLayoutProperties().width, 10);
      var tobargap = to + 1;
      var gapcolor = this.getGapColor();
      var seccolor = this.getSecondaryColor();
      var primcolor = this.getPrimaryColor();
      

      //bar.setLayoutProperties({ width: to + "%" });
      bar.getContentElement().setStyle("background-image", "conic-gradient(" + gapcolor + " 0 1deg, " + primcolor + " 1deg " + to + "deg, " + gapcolor + " " + to + "deg " + tobargap + "deg, " + seccolor + " 0)");

      //var wordsarr = words.getChildren();
      //wordsarr[0].setValue(percent + "%");
      //wordsarr[1].setValue(this.getStatement());
      measure.setValue(percent + "%");
      words.setValue(this.getStatement());
      
      //fire change event
      /*if (to != from) {
        this.fireDataEvent("change", to, from);
      }*/

      //fire complete event if 100% complete
      if (to === 100) {
        this.fireEvent("complete");
      }
      
    }
  }
});