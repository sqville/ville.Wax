qx.Class.define("ville.wax.demo.Composite", {
    extend: qx.ui.container.Composite,
    include: [qx.ui.core.MBlocker],
    
    /**
     * @param layout {qx.ui.layout.Abstract} A layout instance to use to
     *   place widgets on the screen.
     */
    construct(layout) {
      super(layout);
    }
});