qx.Class.define("ville.wax.Stack",
{
  extend: qx.ui.container.Stack,

  construct() {
    super();

    this.addListener("beforeChangeSelection", this._onBeforeChangeSelection, this);
  },

  events: {
    /** Fires before the selection was modified */
    beforeChangeSelection: "qx.event.type.Data"
  },
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Event handler for <code>beforeChangeSelection</code>.
     *
     * @param e {qx.event.type.Event} Data event.
     */
    _onBeforeChangeSelection(e) {
      if (
        !this.fireNonBubblingEvent(
          "beforeChangeSelection",
          qx.event.type.Event,
          [false, true]
        )
      ) {
        e.preventDefault();
      }
    }
  }
});