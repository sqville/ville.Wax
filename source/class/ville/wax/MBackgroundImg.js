qx.Mixin.define("ville.wax.MBackgroundImg", {
    members: {
        /**
         * Adds the background-image styles to the given map
         * @param styles {Map} CSS style map
         */
        _styleBackgroundImage(styles) {
          if (!this.getBackgroundImage()) {
            return;
          }
    
          if ("background" in styles) {
            if (!qx.lang.Type.isArray(styles["background"])) {
              styles["background"] = [styles["background"]];
            }
          } else {
            styles["background"] = [];
          }
    
          var backgroundImageProperties = [
            "backgroundImage",
            "backgroundRepeat",
            "backgroundPositionY",
            "backgroundPositionX",
            "backgroundOrigin"
          ];
    
          (function (images, repeats, tops, lefts, origins) {
            for (var i = 0; i < images.length; i++) {
              var image = images[i];
              var repeat = repeats[i];
              var top = tops[i] || 0;
              var left = lefts[i] || 0;
              var origin = origins[i] || "";
    
              if (top == null) {
                top = 0;
              }
              if (left == null) {
                left = 0;
              }
              if (!isNaN(top)) {
                top += "px";
              }
              if (!isNaN(left)) {
                left += "px";
              }
    
              var id, source;
              if (qx.lang.String.startsWith(image, "data:image/svg+xml")) {
                id = image;
                source = image;
              } else {
                id = qx.util.AliasManager.getInstance().resolve(image);
                source = qx.util.ResourceManager.getInstance().toUri(id);
              }
    
              var attrs = {
                image: "url('" + source + "')",
                position: left + " " + top,
                repeat: "repeat",
                origin: origin
              };
    
              if (repeat === "scale") {
                attrs.size = "100% 100%";
              } else {
                attrs.repeat = repeat;
              }
              var imageMarkup = [
                attrs.image,
                attrs.position + ("size" in attrs ? " / " + attrs.size : ""),
                attrs.repeat,
                attrs.origin
              ];
    
              styles["background"][
                this.getOrderGradientsFront() ? "push" : "unshift"
              ](imageMarkup.join(" "));
    
              if (
                qx.core.Environment.get("qx.debug") &&
                source &&
                source.endsWith(".png") &&
                (repeat == "scale" || repeat == "no-repeat") &&
                qx.core.Environment.get("engine.name") == "mshtml" &&
                qx.core.Environment.get("browser.documentmode") < 9
              ) {
                this.warn(
                  "Background PNGs with repeat == 'scale' or repeat == 'no-repeat'" +
                    " are not supported in this client! The image's resource id is '" +
                    id +
                    "'"
                );
              }
            }
          }.apply(
            this,
            this._getExtendedPropertyValueArrays(backgroundImageProperties)
          ));
        }
    }
});