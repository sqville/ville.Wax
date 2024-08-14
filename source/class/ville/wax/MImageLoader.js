qx.Mixin.define("ville.wax.MImageLoader",{
    statics: {
        /** @type {RegExp} Image types of a data URL */
        __dataUrlRegExp: /^data:image\/(png|gif|jpg|jpeg|bmp|svg+xml)\b/i
    }
});