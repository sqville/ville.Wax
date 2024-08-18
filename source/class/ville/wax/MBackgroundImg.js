/* ************************************************************************

   

************************************************************************ */
qx.Mixin.define("ville.wax.MBackgroundImg", {
    properties: {
      /** The URL of the background image */
      waxBackgroundImage: {
        nullable: true,
        apply: "_applyWaxBackgroundImage"
      },
  
      /** How the background image should be repeated */
      waxBackgroundRepeat: {
        init: "repeat",
        apply: "_applyWaxBackgroundImage"
      },
  
      /**
       * Either a string or a number, which defines the horizontal position
       * of the background image.
       *
       * If the value is an integer it is interpreted as a pixel value, otherwise
       * the value is taken to be a CSS value. For CSS, the values are "center",
       * "left" and "right".
       */
      waxBackgroundPositionX: {
        nullable: true,
        apply: "_applyWaxBackgroundPosition"
      },
  
      /**
       * Either a string or a number, which defines the vertical position
       * of the background image.
       *
       * If the value is an integer it is interpreted as a pixel value, otherwise
       * the value is taken to be a CSS value. For CSS, the values are "top",
       * "center" and "bottom".
       */
      waxBackgroundPositionY: {
        nullable: true,
        apply: "_applyWaxBackgroundPosition"
      },
  
      /**
       * Specifies where the background image is positioned.
       */
      waxBackgroundOrigin: {
        nullable: true,
        apply: "_applyWaxBackgroundImage"
      },
  
      /**
       * Property group to define the background position
       */
      waxBackgroundPosition: {
        group: ["waxBackgroundPositionY", "waxBackgroundPositionX"]
      },
  
      /**
       * Whether to order gradients before Image-URL-based background declarations
       * if both qx.ui.decoration.MBackgroundImage and
       * qx.ui.decoration.MLinearBackgroundGradient decorations are used.
       */
      waxOrderGradientsFront: {
        check: "Boolean",
        init: false
      }
    },
  
    members: {
      /**
       * Adds the background-image styles to the given map
       * @param styles {Map} CSS style map
       */
      _styleWaxBackgroundImage(styles) {
        if (!this.getWaxBackgroundImage()) {
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
          "waxBackgroundImage",
          "waxBackgroundRepeat",
          "waxBackgroundPositionY",
          "waxBackgroundPositionX",
          "waxBackgroundOrigin"
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

            //console.log(image);
  
            //var id = qx.util.AliasManager.getInstance().resolve(image);
            //var source = qx.util.ResourceManager.getInstance().toUri(id);
            var source = image;
  
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
              this.getWaxOrderGradientsFront() ? "push" : "unshift"
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
                  source +
                  "'"
              );
            }
          }
        }.apply(
          this,
          this._getExtendedPropertyValueArrays(backgroundImageProperties)
        ));
      },
  
      // property apply
      _applyWaxBackgroundImage() {
        if (qx.core.Environment.get("qx.debug")) {
          if (this._isInitialized()) {
            throw new Error(
              "This decorator is already in-use. Modification is not possible anymore!"
            );
          }
        }
      },
  
      // property apply
      _applyWaxBackgroundPosition() {
        if (qx.core.Environment.get("qx.debug")) {
          if (this._isInitialized()) {
            throw new Error(
              "This decorator is already in-use. Modification is not possible anymore!"
            );
          }
          if (
            qx.core.Environment.get("engine.name") == "mshtml" &&
            qx.core.Environment.get("browser.documentmode") < 9
          ) {
            this.warn(
              "The backgroundPosition property is not supported by this client!"
            );
          }
        }
      }
    }
  });