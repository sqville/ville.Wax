/* ************************************************************************

   License: MIT license

   Authors: Chris Eskew (sqville) sqville@gmail.com

************************************************************************ */

/**
 * This is the main application class of "ville.Wax"
 * @asset(ville/wax/wireframe-image-sm.png)
 * @asset(ville/wax/wireframe-image-sm-blue.png)
 * @asset(ville/wax/wax-28-comb-blue.svg)
 * @asset(ville/wax/wax-28-comb.png)
 * @asset(ville/wax/wax-28-comb-blue.png)
 * @asset(ville/wax/wax-28-comb.svg)
 * @asset(ville/wax/Wax_demo_logo.png) 
 * @asset(ville/wax/round-menu-24px.svg)
 * @asset(ville/wax/round-account_circle-24px.svg)
 * @asset(ville/wax/chevron_right-24px.svg)
 * @asset(ville/wax/Wax_demo_logo.svg)
 * @asset(ville/wax/ville_Wax.png)
 * @asset(ville/wax/close-24px.svg)
 * @asset(ville/wax/close-red-24px.svg)
 * @asset(ville/wax/wax-icon-24-outline.svg)
 * @asset(ville/wax/wax-icon-24-filled.svg)
 * @asset(ville/wax/Blue_House.svg)
 * @asset(ville/wax/Gray_House.svg)
 * @asset(ville/wax/wax_menu_gray.svg)
 * @asset(ville/wax/wax_menu_blue.svg)
 * @asset(ville/wax/arrow-down-outline.svg)
 * @asset(ville/wax/KeyItem.svg)
 * @asset(ville/wax/Yellow_Car_g7.jpg)
 * @asset(ville/wax/personfeedback.svg)
 * @asset(ville/wax/settings.svg)
 * @asset(ville/wax/ioschevronright.svg)
 * @asset(ville/wax/chevronleft.svg)
 * @asset(ville/wax/calendarinfo.svg)
 * @asset(ville/wax/chevrondown.svg)
 * @asset(ville/wax/chevronup.svg)
 * @asset(ville/wax/dismiss_24.svg)
 */
qx.Class.define("ville.wax.demo.ApplicationMobile",
{
  extend : qx.application.Standalone,

  /*
  *****************************************************************************
    PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    demoMode :
    {
      check : ["desktop", "mobile"],
      init : "mobile"
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    _blocker : null,

    _processingblocker : null,

    _processingpopup : null,
    
    _northBox : null,

    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main ()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      // *** START of Base Scaffolding *******************************************************

      // Change Widget to enable touch action for native scrolling
      qx.Class.include(qx.ui.core.Widget, ville.wax.MWidget); 

      // Enable dynamic bar movement
      qx.Class.include(qx.ui.tabview.TabView, ville.wax.MTabView);

      // Enable stack widget animation
      qx.Class.include(qx.ui.basic.Image, ville.wax.MImage); 

      // Enable the ability to load svg uri images either by including new properties
      // or by patching the existing mixin.
      // qx.Class.include(qx.ui.decoration.Decorator, ville.wax.MBackgroundImg); 
      qx.Class.patch(qx.ui.decoration.Decorator, ville.wax.MBackgroundImage);

      // Menu Page for mobile only
      var bckgcolormain = "#f2f3f4"; // old "#F2F1F6";
      var bckgcolorinside = "#f2f3f4";
      //#f8f9f9 //very lite gray
      //#f2f3f4 // medium lite gray
      //#e5e7e9 // darker gray
      var bckgcolortopbtm = "white";

      var svgimgcontent = `<svg class="hymprogress" viewBox="0 0 16 16">
          <circle class="hymcirclebackground" cx="8px" cy="8px" r="7px"></circle>
          <circle class="hymindeterminate-indicator-1" cx="8px" cy="8px" r="7px"></circle>
        </svg>`;

      // App's Root
      var approot = this.getRoot();
      approot.setBackgroundColor("black");

      // Add a Blocker to the application's root for the Main Menu Popup
      this._blocker = new qx.ui.core.Blocker(approot).set({color: "black", opacity: .08});
      this._processingblocker = new qx.ui.core.Blocker(approot).set({color: bckgcolormain, opacity: 1});

      
       
      // Processing Blocker Popup
      var processingpopup = this._processingpopup = new qx.ui.popup.Popup(new qx.ui.layout.VBox(0)).set({
        padding: 10, 
        backgroundColor: "transparent",
        decorator: "hym-box-noborder",
        autoHide: false
      });
      
      // Processing Blocker Popup Image
      var processingimg = new qx.ui.basic.Image().set({
        width: 50, 
        height: 50,
        html: svgimgcontent
      });
     // processingpopup.add(processingimg);

      var svgelem = new qx.html.Element();
      svgelem.useMarkup(svgimgcontent);
      
      this._processingblocker.addListenerOnce("blocked", () => {
        var blkrelem = this._processingblocker.getBlockerElement();
        blkrelem.setStyle("display", "flex", true);
        blkrelem.add(svgelem);
      });
      
      // App's main Container (Composite) with Dock Layout 
      var appcompdock = new qx.ui.container.Composite(new qx.ui.layout.Dock(0, 0)).set({backgroundColor: "white"});
      
      // Dock's North section
      var northhbox = this._northBox = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({visibility: "excluded"});

      // Dock's Center section (Stack)
      var centerbox = new qx.ui.container.Stack().set({backgroundColor: "white", padding: 0});
      //var centerbox = new qx.ui.container.Composite(new qx.ui.layout.Grow()).set({backgroundColor: "white", padding: 0});

      // Dock's South section
      var southbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(4)).set({alignY: "middle", padding: [8,4,34,4], decorator: "bottombar"});

      // === North Toolbar, Parts and Buttons ===
      var northtoolbar = new qx.ui.toolbar.ToolBar().set({allowGrowX: true});
      var mainmenupart = new qx.ui.toolbar.Part(); //Top-Left of the screen 
      var profilepart = new qx.ui.toolbar.Part(); // Top-Right of the screen

      // Icon Images
      var menuimage = "ville/wax/round-menu-24px.svg";
      var roundacct = "ville/wax/settings.svg";

      // Top-Left Button
      var mainmenubtnbutton = new qx.ui.toolbar.Button("MainMenu", menuimage).set({appearance: "hym-north-menubutton", show: "icon"});

      // Top-Right MenuButton
      var profilemenubutton = new qx.ui.toolbar.Button("ProfileMenu", roundacct).set({appearance: "hym-north-settingsbutton", marginRight: 20, show: "icon"});
      
      // Main Menu Popup (VBox)
      var mainmenupopup = new qx.ui.popup.Popup().set(
        {
          allowStretchX: true, 
          allowStretchY: true, 
          padding: 10, 
          minWidth: 300
        });
      mainmenupopup.setLayout(new qx.ui.layout.VBox(0));

      // Profile and Settings Menu and Menu Buttons
      //var profilemenu = new qx.ui.menu.Menu().set({spacingX: 12});
      //var switchmenubutton1 = new qx.ui.menu.Button("Switch to Mobile", "ville/wax/wireframe-image-sm.png").set({padding: 10});
      //switchmenubutton1.getChildControl("icon").set({ width: 24, height: 24 });
      //var aboutmenubutton1 = new qx.ui.menu.Button("About Wax", "ville/wax/wireframe-image-sm.png").set({padding: 10});
      //aboutmenubutton1.getChildControl("icon").set({ width: 24, height: 24 });
      
      // Add Main Menu Popup Listeners
      /*mainmenubtnbutton.addListener("execute", function(e)
      {
        if (qx.core.Environment.get("browser.name") != "edge"){
          this._blocker.blockContent(mainmenubtnbutton.getZIndex());
        }
        mainmenupopup.setHeight(parseInt(this.getRoot().getContentElement().getStyle("height")));
        mainmenupopup.show();
      }, this);*/
      

      // Assemble all base pieces  
      appcompdock.add(northhbox, {edge:"north"});
      appcompdock.add(centerbox, {edge:"center"});
      approot.add(appcompdock, {edge: 0});
      //profilemenu.add(switchmenubutton1);
      //profilemenu.add(aboutmenubutton1);
      //profilemenubutton.setMenu(profilemenu);

      var atmlogocurrentpage = new qx.ui.basic.Atom("current").set({font: "hym-app-header", allowGrowX: true, center: true, gap: 0, padding: 0, show: "label"});
      var atmlogonextpage = new qx.ui.basic.Atom("next").set({font: "hym-app-header", allowGrowX: true, center: true, gap: 0, padding: 0, show: "label"});
      var northbaratmstack = new qx.ui.container.Composite(new qx.ui.layout.Grow()).set({allowGrowX: true, padding: [0,24,0,0], margin: 0});
      northbaratmstack.add(atmlogonextpage);
      northbaratmstack.add(atmlogocurrentpage);
      mainmenupart.add(mainmenubtnbutton);
      profilepart.add(profilemenubutton);
      
      northtoolbar.add(mainmenupart);
      northtoolbar.addSpacer();
      //northtoolbar.add(atmlogocurrentpage);
      northtoolbar.add(northbaratmstack);
      northtoolbar.addSpacer();
      northtoolbar.add(profilepart);

      northhbox.add(northtoolbar, {left: 0, right: 0});

      appcompdock.add(southbox, {edge: "south"});

      // *** END of Base Scaffolding **************************************

      // Add some simple ease in animation to the app's blocker
      var fadeinb = {
        duration: 300, 
        timing: "ease", 
        keyFrames : {
          0: {opacity: 0},
          100: {opacity: .06}
        },
        keep: 100
      };

      this._blocker.addListener("blocked", function(e) {
        var domtable;
        if (domtable = this._blocker.getBlockerElement().getDomElement()) {
          qx.bom.element.Animation.animate(domtable, fadeinb);
        }
      }, this);

      this._blocker.addListener("unblocked", function(e) {
        var domtable;
        if (domtable = this._blocker.getBlockerElement().getDomElement()) {
          qx.bom.element.Animation.animateReverse(domtable, fadeinb);
        }
      }, this);

      // *** Populate THE STACK ***********************************************
      // Four page stack EXAMPLE
       // First Stack Page
       // Second Stack Page
       // Third Stack Page
       // Forth Stack Page (for ios and android only)
      // **********************************************************************
      
      // common stack page styling
      var stackpagepadding = [20, 30];
      var stackpageheaderfont = "control-header";
      var stackpagevboxspacing = 20;

      //var firstpagehbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(0));
      //firstpagehbox.add(new qx.ui.core.Spacer(), {flex: 1});


      // First/Home Page
      //var firststackpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(stackpagevboxspacing).set({alignY: "middle"})).set({ padding : stackpagepadding, maxWidth: 700});  
      var firststackpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(0).set({alignX: "center"})).set({ padding: 0, margin: 0, backgroundColor: bckgcolormain });

      //firstpagehbox.add(firststackpage, {flex: 2});
      //firstpagehbox.add(new qx.ui.core.Spacer(), {flex: 1});

      var firstscrollstackpage = new ville.wax.scroll.Scroll().set({overflow: ["hidden", "auto"], padding: 0, margin: 0, contentPadding: [0,0,0,0]});
      firstscrollstackpage.add(firststackpage);

      //var testscrollhider = new ville.wax.scroll.Scroll().set({height: 0, overflow: ["hidden", "hidden"], padding: 0, margin: 0, contentPadding: [0,0,0,0]});


      // TOP FLAT BOX
      var topdetailarea = new qx.ui.container.Composite(new qx.ui.layout.VBox(16).set({alignX: "center"})).set({ padding: 20, margin: [20,0,0,0], backgroundColor: "white" });
      var atmtopmsg = new qx.ui.basic.Atom("This is a top message", "ville/wax/calendarinfo.svg").set({font: "hym-default", padding: [8,10], gap: 8, alignX: "center", center: true, allowGrowX: false, backgroundColor: bckgcolorinside});
      atmtopmsg.getChildControl("icon").set({scale: true, width: 18, height: 18});
      var atmtopmsgnumbers = new qx.ui.basic.Atom("$1,234").set({font: "hym-app-page-bigmsg", padding: [8, 10, 0, 10], show: "label", alignX: "center", center: true, allowGrowX: false});
      var atmnumbersmsg = new qx.ui.basic.Atom("Larger message area.").set({font: "hym-app-page-content-lgr", padding: [0,0,0,0], show: "label", alignX: "center", center: true, allowGrowX: false});
      var btnnumberdetails = new qx.ui.form.ToggleButton("Details Dropdown").set({appearance: "hym-details-togglebutton", show: "both", iconPosition: "right", alignX: "center", center: true, allowGrowX: false});
      //gbnumberdetails.getChildControl("legend").set({font: "hym-app-page-content-sechead", center: true, iconPosition: "right"});
      var middletblgridlayout = new qx.ui.layout.Grid(80, 12);
      middletblgridlayout.setColumnAlign(1, "right", "middle");
      var middletablearea = new qx.ui.container.Composite(middletblgridlayout).set({ width: 220, alignX: "center", allowGrowX: false, allowStretchY: true, padding: 16, margin: 0, backgroundColor: bckgcolormain });
      middletablearea.add(new qx.ui.basic.Label("Amount"), {row: 0, column: 0});
      middletablearea.add(new qx.ui.basic.Label("$1,000"), {row: 0, column: 1});
      middletablearea.add(new qx.ui.basic.Label("Amount"), {row: 1, column: 0});
      middletablearea.add(new qx.ui.basic.Label("$230"), {row: 1, column: 1});
      middletablearea.add(new qx.ui.basic.Label("Date"), {row: 2, column: 0});
      middletablearea.add(new qx.ui.basic.Label("01/01/2024"), {row: 2, column: 1});
      middletablearea.add(new qx.ui.basic.Label("Date"), {row: 3, column: 0});
      middletablearea.add(new qx.ui.basic.Label("02/01/2024"), {row: 3, column: 1});

      //testscrollhider.add(middletablearea);

      var bottomdetailarea = new qx.ui.container.Composite(new qx.ui.layout.VBox(16).set({alignX: "center"})).set({ padding: [0,20,20,20], margin: 0, backgroundColor: "white" });
      var btncurrentthingaction1 = new qx.ui.form.Button("Action Button").set({appearance: "wax-form-button", marginTop: 20, allowGrowX: true, height: 40, alignX: "center"});
      var btncurrentthingmanage = new qx.ui.form.Button("Action Button").set({appearance: "wax-form-clearborderlessbutton", marginTop: 20, allowGrowX: true, height: 40, alignX: "center"});
      var btncurrentthingviewsched = new qx.ui.form.Button("Action Button Underlined").set({font: "hym-form-button-underlined", appearance: "wax-form-clearborderlessbutton", marginTop: 20, allowGrowX: true, height: 40, alignX: "center"});
      
      var lblRecentHappenings = new qx.ui.basic.Label("Area 01 Section 01").set({allowGrowX: true, padding: [0,0,10,16], margin: [20,0,0,0], font: "hym-app-page-section-header"});
      var btnAbout = new qx.ui.form.Button("Item 02").set({appearance : "hym-page-button"});
      var btnSwitchBack = new qx.ui.form.Button("Item 01").set({appearance : "hym-page-button"});
      var btnProfile = new qx.ui.form.Button("Item 03").set({appearance : "hym-page-info-button"});
      var btnLastBtn = new qx.ui.form.Button("List of All Items").set({appearance : "hym-page-last-button"});
      var firstbtnlistmenupage = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({padding: [0,0], margin: [0,16], backgroundColor: "white", decorator: "hym-box-noborder"});
      firstbtnlistmenupage.add(btnSwitchBack);
      firstbtnlistmenupage.add(btnAbout);
      firstbtnlistmenupage.add(btnProfile);
      firstbtnlistmenupage.add(btnLastBtn);

      var lblsectionboxheader = new qx.ui.basic.Label("Area 01 Section 02").set({allowGrowX: true, padding: [0,0,10,16], margin: [20,0,0,0], font: "hym-app-page-section-header"});
      var firstpagesection02 = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({padding: [0,0], margin: [0,16], backgroundColor: "white", decorator: "hym-box-noborder"});
      var lblsection02header = new qx.ui.basic.Label("Section message header.").set({padding: 12, font: "hym-app-page-content-sechead", allowGrowX: true, textAlign: "left"});
      var lblsection02msg = new qx.ui.basic.Label("Use this area for all sorts of blah, blah and blah. You can also use this area to figure out this, that and the other thing. Be sure to review this information before leaving.").set({padding: 12, font: "hym-app-page-content-lgr", rich: true, wrap: true, textAlign: "left"});
      var btnsection02 = new qx.ui.form.Button("View Section").set({appearance : "hym-page-last-button", decorator: "page-button-right-last-solo"});
      firstpagesection02.add(lblsection02header);
      firstpagesection02.add(lblsection02msg);
      firstpagesection02.add(btnsection02);
      
      topdetailarea.add(atmtopmsg);
      topdetailarea.add(atmtopmsgnumbers);
      topdetailarea.add(atmnumbersmsg);
      bottomdetailarea.add(btnnumberdetails);
      bottomdetailarea.add(btncurrentthingaction1);
      bottomdetailarea.add(btncurrentthingmanage);
      bottomdetailarea.add(btncurrentthingviewsched);
      
      firststackpage.add(topdetailarea);
      firststackpage.add(middletablearea);
      firststackpage.add(bottomdetailarea);
      firststackpage.add(lblRecentHappenings);
      firststackpage.add(firstbtnlistmenupage);

      firststackpage.add(lblsectionboxheader);
      firststackpage.add(firstpagesection02);

      bottomdetailarea.addListenerOnce("appear", () => {
        qx.bom.element.Transform.translate(bottomdetailarea.getContentElement().getDomElement(), [null, "-140px"]);
      });
      lblRecentHappenings.addListenerOnce("appear", () => {
        qx.bom.element.Transform.translate(lblRecentHappenings.getContentElement().getDomElement(), [null, "-140px"]);
      });
      firstbtnlistmenupage.addListenerOnce("appear", () => {
        qx.bom.element.Transform.translate(firstbtnlistmenupage.getContentElement().getDomElement(), [null, "-140px"]);
      });
      lblsectionboxheader.addListenerOnce("appear", () => {
        qx.bom.element.Transform.translate(lblsectionboxheader.getContentElement().getDomElement(), [null, "-140px"]);
      });
      firstpagesection02.addListenerOnce("appear", () => {
        qx.bom.element.Transform.translate(firstpagesection02.getContentElement().getDomElement(), [null, "-140px"]);
      });
      
      var growinline = {
        duration: 200, 
        timing: "ease-out", 
        keyFrames : {
          0: {translate: [null, "-140px"]},
          100: {translate: [null, "0px"]}
        },
        keep : 100
      };

      var scaleinline = {
        duration: 200, 
        origin: "top center",
        timing: "ease-out", 
        keyFrames : {
          0: {scale: [1, 0.9]},
          100: {scale: [1, 1]}
        },
        keep : 100
      };

      var rotateinline = {
        duration: 200, 
        timing: "ease-out", 
        keyFrames : {
          0: {rotate: "0deg"},
          100: {rotate: "-180deg"}
        },
        keep : 100
      };

      btnnumberdetails.addListener("changeValue", (e) => {
        var bottomdom = bottomdetailarea.getContentElement().getDomElement();
        var recentheaderdom = lblRecentHappenings.getContentElement().getDomElement();
        var recentmenubtnitemsdom = firstbtnlistmenupage.getContentElement().getDomElement();
        var secheaderdom = lblsectionboxheader.getContentElement().getDomElement();
        var secsectiondom = firstpagesection02.getContentElement().getDomElement();
        var tabledom = middletablearea.getContentElement().getDomElement();
        var togglearrowdom = btnnumberdetails.getChildControl("icon").getContentElement().getDomElement();
        if (e.getData()) {
          qx.bom.element.AnimationCss.animate(bottomdom, growinline);
          qx.bom.element.AnimationCss.animate(recentheaderdom, growinline);
          qx.bom.element.AnimationCss.animate(secheaderdom, growinline);
          qx.bom.element.AnimationCss.animate(secsectiondom, growinline);
          qx.bom.element.AnimationCss.animate(recentmenubtnitemsdom, growinline);
          qx.bom.element.AnimationCss.animate(tabledom, scaleinline);
          qx.bom.element.AnimationCss.animate(togglearrowdom, rotateinline);
        }
        else {
          qx.bom.element.AnimationCss.animateReverse(bottomdom, growinline);
          qx.bom.element.AnimationCss.animateReverse(recentheaderdom, growinline);
          qx.bom.element.AnimationCss.animateReverse(secheaderdom, growinline);
          qx.bom.element.AnimationCss.animateReverse(secsectiondom, growinline);
          qx.bom.element.AnimationCss.animateReverse(recentmenubtnitemsdom, growinline);
          qx.bom.element.AnimationCss.animateReverse(tabledom, scaleinline);
          qx.bom.element.AnimationCss.animateReverse(togglearrowdom, rotateinline);
        }
      });

      middletablearea.addListenerOnce("appear", () => {
        var tabledom = middletablearea.getContentElement().getDomElement();
        qx.bom.element.Transform.scale(tabledom, [1, 0.9]);
      });
      
      // SWITCH
      var waxswitch2 = new qx.ui.form.CheckBox("Larger switch").set({appearance: "wax-switch-larger"});


      //***  CODE for applying popup fading in and out  ***//
      var fadeinleft = {
        duration: 300, timing: "ease-out", origin: "left top", keep: 100,
        keyFrames : {
          0: {translate: "-300px"},
          100: {translate: "0px"}
        }
      };

      // Second Page 
      var secondscrollstackpage = new ville.wax.scroll.Scroll().set({overflow: ["hidden", "auto"], padding: 0, margin: 0, contentPadding: [0,0,0,0]});
      var secondstackpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(10)).set({padding: 0, backgroundColor: bckgcolormain});
      var secpagetopdetailarea = new qx.ui.container.Composite(new qx.ui.layout.VBox(16)).set({ padding: 20, margin: [0,0,0,0], backgroundColor: "white" });
      var lblsecondpageheader = new qx.ui.basic.Label("Area 02").set({font: "hym-app-page-header", allowGrowX: true, textAlign: "left"});
      var lblsecondpageheadermsg = new qx.ui.basic.Label("Use this area for all sorts of things such as blah, blah and blah. You can also use this area to figure out this, that and the other thing. Be sure to review this information before leaving.").set({font: "hym-app-page-content-lgr", rich: true, wrap: true, textAlign: "left"});
      var svgchannelshare = `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h5A2.5 2.5 0 0 1 13 5.5a.5.5 0 0 1-1 0c0-.83-.67-1.5-1.5-1.5h-5C4.67 4 4 4.67 4 5.5v5c0 .83.67 1.5 1.5 1.5h4.51a2.25 2.25 0 1 1 .12 1H5.5A2.5 2.5 0 0 1 3 10.5v-5ZM7.5 14a.5.5 0 0 0-.5.5A2.5 2.5 0 0 0 9.5 17h5a2.5 2.5 0 0 0 2.5-2.5v-5A2.5 2.5 0 0 0 14.5 7H9.87A2.25 2.25 0 1 0 10 8h4.51c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5h-5A1.5 1.5 0 0 1 8 14.5a.5.5 0 0 0-.5-.5Z" fill="currentColor"></path></svg>`;
      var imgtopheaderSecPage = new qx.ui.basic.Image().set({html: svgchannelshare, scale: true, width: 80, height: 80});
      var lblAreaboxheader = new qx.ui.basic.Label("Area 02 Overview").set({opacity: 0, allowGrowX: true, padding: [0,0,0,20], margin: [20,0,0,0], font: "hym-app-page-section-header"});
      var secpageareabox01 = new ville.wax.demo.Composite(new qx.ui.layout.VBox(0)).set({padding: [0,0], margin: [0,16], backgroundColor: "white", decorator: "hym-box-noborder", blockerColor: bckgcolormain, blockerOpacity: 1});
      var lblsecpageareabox01header = new qx.ui.basic.Label("Your thing analysis is available now.").set({padding: 12, font: "hym-app-page-content-sechead", allowGrowX: true, textAlign: "left"});
      var lblsecpageareabox01msg = new qx.ui.basic.Label("Use this area for all sorts of things such as blah, blah and blah. You can also use this area to figure out this, that and the other thing. Be sure to review this information before leaving.").set({padding: 12, font: "hym-app-page-content-lgr", rich: true, wrap: true, textAlign: "left"});
      var btnviewthinganalysis = new qx.ui.form.Button("View Thing Analysis").set({appearance : "hym-page-last-button", decorator: "page-button-right-last-solo"});
      secpageareabox01.add(lblsecpageareabox01header);
      secpageareabox01.add(lblsecpageareabox01msg);
      secpageareabox01.add(btnviewthinganalysis);
      secpagetopdetailarea.add(imgtopheaderSecPage);
      secpagetopdetailarea.add(lblsecondpageheader);
      secpagetopdetailarea.add(lblsecondpageheadermsg);
      secondstackpage.add(secpagetopdetailarea);
      secondstackpage.add(lblAreaboxheader);
      secondstackpage.add(secpageareabox01);
      secondscrollstackpage.add(secondstackpage);  

      var newsvgelem = new qx.html.Element();
      newsvgelem.useMarkup(svgimgcontent);
      
      var secpageareabox01blocker = secpageareabox01.getBlocker();
      secpageareabox01blocker.addListenerOnce("blocked", () => {
        var blkrelem = secpageareabox01blocker.getBlockerElement();
        blkrelem.setStyle("display", "flex", true);
        blkrelem.add(newsvgelem);
      });

      secpageareabox01.addListenerOnce("appear", () => {
        secpageareabox01.block();
        qx.event.Timer.once(
          function (e) {
            lblAreaboxheader.setOpacity(1);
            secpageareabox01.unblock();
          },
          this,
          3000
        );
      });
      

      //var btngobackhome = new qx.ui.form.Button("Go Back Home").set({allowGrowX: false});
      //secondstackpage.add(btngobackhome);
      /*btngobackhome.addListener("execute", function(e) {
        centerbox.setSelection([firstscrollstackpage]);
      });*/

      // Wax TabView with a line
      var wtabView2 = new qx.ui.tabview.TabView();

      var page1tbv2 = new qx.ui.tabview.Page("Home").set({appearance: "wax-tabview-page-line"});
      page1tbv2.setLayout(new qx.ui.layout.VBox());
      page1tbv2.add(new qx.ui.basic.Label("Home Page"));
      wtabView2.add(page1tbv2);

      var page2tbv2 = new qx.ui.tabview.Page("Next Long").set({appearance: "wax-tabview-page-line"});
      page2tbv2.setLayout(new qx.ui.layout.VBox());
      page2tbv2.add(new qx.ui.basic.Label("Next Long Page"));
      wtabView2.add(page2tbv2);

      var page3tbv2 = new qx.ui.tabview.Page("Last Very Long").set({appearance: "wax-tabview-page-line"});
      page3tbv2.setLayout(new qx.ui.layout.VBox());
      page3tbv2.add(new qx.ui.basic.Label("Last Very Long Page"));
      wtabView2.add(page3tbv2);

      // secondstackpage.add(wtabView2);
      //firststackpage.add(wtabView2);

      wtabView2.setSelection([page2tbv2]);

      /*var tabviewbarline = new qx.ui.core.Widget().set({height: 4, backgroundColor: "blue", zIndex: 5, decorator : "wax-tabview-line"});
      wtabView2.setDynamicMarkAnimationDuration(300); 
      wtabView2.setDynamicMarkAnimationTiming("ease");
      wtabView2.setDynamicMark(tabviewbarline);*/
      //wtabView2.setDynamicMarkEnabled(true);

      // Wax TabView - gray bar with white block
      
      var wtabView3 = new qx.ui.tabview.TabView().set({appearance: "wax-tabview-block"});

      var page1tbv3 = new qx.ui.tabview.Page("Day").set({appearance: "wax-tabview-page-block"});
      page1tbv3.setLayout(new qx.ui.layout.VBox());
      page1tbv3.add(new qx.ui.basic.Label("Day"));
      wtabView3.add(page1tbv3);

      var page2tbv3 = new qx.ui.tabview.Page("Week").set({appearance: "wax-tabview-page-block"});
      page2tbv3.setLayout(new qx.ui.layout.VBox());
      page2tbv3.add(new qx.ui.basic.Label("Week"));
      wtabView3.add(page2tbv3);

      var page3tbv3 = new qx.ui.tabview.Page("Month").set({appearance: "wax-tabview-page-block"});
      page3tbv3.setLayout(new qx.ui.layout.VBox());
      page3tbv3.add(new qx.ui.basic.Label("Month"));
      wtabView3.add(page3tbv3);


      /*
      page1tbv3.addListener("appear", function() {
        var tbvmarkdom = this.getContentElement().getDomElement();
        qx.bom.element.AnimationCss.animate(tbvmarkdom,
          {
            duration: 200,
            keyFrames : 
            {
              0 : {opacity: 0, top: this.getBounds().top + 6 + "px"},
              100 : {opacity: 1, top: this.getBounds().top + "px"}
            },
            keep : 100,
            timing: "ease-in"
          });
      });

      page2tbv3.addListener("appear", function() {
        var tbvmarkdom = this.getContentElement().getDomElement();
        qx.bom.element.AnimationCss.animate(tbvmarkdom,
          {
            duration: 200,
            keyFrames : 
            {
              0 : {opacity: 0, top: this.getBounds().top + 6 + "px"},
              100 : {opacity: 1, top: this.getBounds().top + "px"}
            },
            keep : 100,
            timing: "ease-in"
          });
      });
      
      page3tbv3.addListener("appear", function() {
        var tbvmarkdom = this.getContentElement().getDomElement();
        qx.bom.element.AnimationCss.animate(tbvmarkdom,
          {
            duration: 200,
            keyFrames : 
            {
              0 : {opacity: 0, top: this.getBounds().top + 6 + "px"},
              100 : {opacity: 1, top: this.getBounds().top + "px"}
            },
            keep : 100,
            timing: "ease-out"
          });
      });
      */
      

      // secondstackpage.add(wtabView3);
      //firststackpage.add(wtabView3);

      wtabView3.setSelection([page2tbv3]);

      //var tabviewbarblock = new qx.ui.core.Widget().set({ width: 40, height: 40, backgroundColor: "white", zIndex: 5, decorator : "wax-tabview-block"});
      //wtabView3.setDynamicMarkAnimationDuration(300); 
      //wtabView3.setDynamicMarkAnimationTiming("ease");
      //wtabView3.setDynamicMark(tabviewbarblock);
      


      northhbox.setVisibility("visible");
      //southbox.setVisibility("visible");
      //profilemenubutton.setVisibility("hidden");
      //mainmenupart.setVisibility("hidden");
      //centerbox.setSelection([menuscrollstackpage]);
      //atmlogocurrentpage.set({visibility: "visible", label:"Menu"});
      //mainmenubuttongrouphym.setSelection([tbtnmenuhym]);


      // Third Page
      var thirdstackpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(stackpagevboxspacing)).set({padding: 0, backgroundColor: bckgcolormain});   
    
      var thirdpagetopdetailarea = new qx.ui.container.Composite(new qx.ui.layout.VBox(16)).set({ padding: 20, margin: [0,0,0,0], backgroundColor: "white" });
      var lblthirdpageheader = new qx.ui.basic.Label("Area 03").set({font: "hym-app-page-header", allowGrowX: true, textAlign: "left"});
      var lblthirdpageheadermsg = new qx.ui.basic.Label("Use this area for all sorts of things such as blah, blah and blah. You can also use this area to figure out this, that and the other thing. Be sure to review this information before leaving.").set({font: "hym-app-page-content-lgr", rich: true, wrap: true, textAlign: "left"});
      var svgspace3d = `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M3 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6.5h-.71L14.86 10H16V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4h1.14L3.7 12.5H3V6Zm0 8v-.5h4.34l-.82 2.86-.2.64H6a3 3 0 0 1-3-3Zm4.48 2.64.9-3.14h3.24l.9 3.13.1.37H7.37l.1-.36h.01Zm1.18-4.14h2.68l-.72-2.5H9.38l-.72 2.5Zm4.82 3.86-.82-2.86H17v.5a3 3 0 0 1-3 3h-.35l-.17-.63Zm-1.1-3.86h2.76L13.7 10h-2.05l.72 2.5Zm-7.52 0h2.76l.72-2.5H6.29l-1.43 2.5Z" fill="currentColor"></path></svg>`;
      var imgtopheaderThirdPage = new qx.ui.basic.Image().set({html: svgspace3d, scale: true, width: 80, height: 80});
      thirdpagetopdetailarea.add(imgtopheaderThirdPage);
      thirdpagetopdetailarea.add(lblthirdpageheader);
      thirdpagetopdetailarea.add(lblthirdpageheadermsg);
      thirdstackpage.add(thirdpagetopdetailarea);
      /*btngobackhome3.addListener("execute", function(e) {
        centerbox.setSelection([firstscrollstackpage]);
      });*/

      //firststackpage.add(new qx.ui.basic.Label("The End").set({backgroundColor: "#f3f3f3", font: stackpageheaderfont, textColor: "red", textAlign: "center", allowGrowX: true, padding: [20,0,20,0], margin: [80,0,20,0]}));

      
      var bordersouthbox = "#B3B3B3";
      var boxsepcolor = "#C7C7C7";
      var arrowcolor = "#C4C4C4";
      var searchboxcolor = "#E4E3E9";

      southbox.setBackgroundColor(bckgcolortopbtm);

      var menuscrollstackpage = new ville.wax.scroll.Scroll().set({overflow: ["hidden", "auto"], padding: 0, margin: 0, contentPadding: [0,0,0,0]});
      var dashboardstackpage = new ville.wax.scroll.Scroll().set({overflow: ["hidden", "auto"], padding: 0, margin: 0, contentPadding: [0,0,0,0]});
      var menupage = new qx.ui.container.Composite(new qx.ui.layout.VBox(10)).set({ padding: 0, backgroundColor: bckgcolormain });
      var dashboardpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(10)).set({ padding: [10, 20], backgroundColor: bckgcolormain });
      
      //var lblwaxdemo = new qx.ui.basic.Label("Menu").set({font: "hym-app-page-header"});
      var lbldashboardwelcome = new qx.ui.basic.Label("Main Dashboard Message").set({font: "hym-app-page-header", marginTop: 12});
      var lbldashboardcont = new qx.ui.basic.Label("Sub main dashboard message.").set({font: "hym-default", padding: 0, margin: 0});
      var lbldashboardactiveitems = new qx.ui.basic.Label("Dashboard Section Header").set({font: "hym-app-page-section-header", marginTop: 22});

      var secondbtnlistmenupage = new qx.ui.container.Composite(new qx.ui.layout.VBox(10)).set({margin: [10,0], padding: [16,0], backgroundColor: "white", decorator: "hym-box-noborder"});
      //var btnAddaction = new qx.ui.form.Button("Add Something").set({appearance : "hym-page-link-last-button"});
      //secondbtnlistmenupage.add(btnAddaction);

      //var lblAreaHeadergetmore = new qx.ui.basic.Label("Get More From The Menu").set({padding: 0, margin: [20,0,0,0], font: "hym-app-page-section-header"});
      var thirdblockmenupage = new qx.ui.container.Composite(new qx.ui.layout.HBox(20)).set({margin: [0,0], padding: [20, 20], backgroundColor: "white", decorator: "hym-box-noborder"});
      var thirdblockatom = new qx.ui.basic.Atom("<b>Area 01 Item 01</b><br>Second level details<br><em>Third level details</em>", "ville/wax/KeyItem.svg").set({font: "hym-default", rich: true, iconPosition: "left", gap: 20, center: true});
      thirdblockatom.getChildControl("icon").set({scale: true, width: 32, height: 32});
      var imgarrowright = new qx.ui.basic.Image("ville/wax/ioschevronright.svg").set({scale: true, allowGrowY: true, alignY: "middle"});
      var btngetstartedaction = new qx.ui.form.Button("Action Button").set({appearance: "wax-form-button", marginTop: 20, allowGrowX: true, height: 40, alignX: "center"});
      var btnaction2 = new qx.ui.form.Button("Another Action Button").set({appearance: "wax-form-button", allowGrowX: true, height: 40, alignX: "center"});
      var atmfeedback = new qx.ui.basic.Atom("Message asking a question?", "ville/wax/personfeedback.svg").set({font: "hym-app-page-section-header", iconPosition: "top", allowGrowX: true, alignX: "center"});
      atmfeedback.getChildControl("icon").set({scale: true, width: 80, height: 80});
      var lbllookingforfeedback = new qx.ui.basic.Label("Sub message telling user what to do next.").set({font: "hym-default", allowGrowX: true, rich: true, wrap: true, textAlign: "center"});
      var btnleavefeedback = new qx.ui.form.Button("Action Button").set({appearance: "wax-form-clearbutton", allowGrowX: true, height: 40, alignX: "center"});
      thirdblockmenupage.add(thirdblockatom);
      thirdblockmenupage.add(new qx.ui.core.Spacer(), {flex: 1});
      thirdblockmenupage.add(imgarrowright);
      //thirdblockmenupage.add(btngetstartedaction);

      var fourthpagetopdetailarea = new qx.ui.container.Composite(new qx.ui.layout.VBox(16)).set({ padding: 20, margin: [0,0,0,0], backgroundColor: "white" });
      var lblfourthpageheader = new qx.ui.basic.Label("Area 04").set({font: "hym-app-page-header", allowGrowX: true, textAlign: "left"});
      var lblfourthpageheadermsg = new qx.ui.basic.Label("Use this area for all sorts of things such as blah, blah and blah. You can also use this area to figure out this, that and the other thing. Be sure to review this information before leaving.").set({font: "hym-app-page-content-lgr", rich: true, wrap: true, textAlign: "left"});
      var svgvideobckgrd = `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M6.2 4 2 8.2V6.8L4.8 4h1.4Zm7 0-1.46 1.46a3.48 3.48 0 0 0-1.02-.39L11.79 4h1.42Zm-1.08 3.17a2.51 2.51 0 0 0-2.34-1.16 2.5 2.5 0 1 0 2.34 1.16Zm.72-.72c.2.29.37.6.48.94L16.69 4 16.5 4h-1.2l-2.46 2.45ZM7.5 12c-.08 0-.15 0-.22.02A1.5 1.5 0 0 0 6 13.5V16h8v-2.5a1.5 1.5 0 0 0-1.5-1.5h-5Zm5-1c.22 0 .43.03.63.08L18 6.2V5.5c0-.2-.04-.4-.12-.59l-4.5 4.5a3.5 3.5 0 0 1-.93 1.59h.05Zm1.9.88c.23.27.4.58.5.93L18 9.7V8.29l-3.6 3.6ZM15 16v-1.2l3-3v1.4L15.2 16H15Zm-10-.3v-1.4l-1.7 1.69.2.01h1.2l.3-.3Zm1.57-6.48c.08.36.21.7.4 1.02L2.11 15.1A1.5 1.5 0 0 1 2 14.5v-.7l4.57-4.58ZM9.71 4 2 11.7v-1.4L8.3 4h1.4Z" fill="currentColor"></path></svg>`;
      var imgtopheaderFourthPage = new qx.ui.basic.Image().set({html: svgvideobckgrd, scale: true, width: 80, height: 80});
      fourthpagetopdetailarea.add(imgtopheaderFourthPage);
      fourthpagetopdetailarea.add(lblfourthpageheader);
      fourthpagetopdetailarea.add(lblfourthpageheadermsg);
      
      var lblAreaHeaderarticles = new qx.ui.basic.Label("Articles").set({padding: [0,0,0,20], margin: [20,0,0,0], font: "hym-app-page-section-header"});
      var articleblockmenupage = new qx.ui.container.Composite(new qx.ui.layout.VBox(20).set({alignY:"bottom"})).set({height: 300, margin: [0,20], padding: 0, backgroundColor: "white", decorator: "article"});
      var articleblockatom = new qx.ui.basic.Atom("<b>Do Bright Colors Make for Faster Cars</b><br>We explor the connection between form and function. Does color help with speed or this this jibberish in order to take up space.").set({padding: 14, backgroundColor: "white", rich: true, center: true});
      articleblockmenupage.add(articleblockatom);

      // Slidebar
      //var slidebar01 = new qx.ui.container.SlideBar();
      var slidebar01 = new qx.ui.container.Composite(new qx.ui.layout.HBox(20));
      var slidebar01scroll = new ville.wax.scroll.Scroll().set({overflow: ["auto", "hidden"], padding: 0, margin: 0, contentPadding: [0,0,0,0]});
      var sbwidget01 = new qx.ui.core.Widget().set({width: 330, height: 300, backgroundColor: "gray"});
      var sbwidget02 = new qx.ui.core.Widget().set({width: 330, height: 300, backgroundColor: "gray"});
      var sbwidget03 = new qx.ui.core.Widget().set({width: 330, height: 300, backgroundColor: "gray"});
      slidebar01.add(sbwidget01);
      slidebar01.add(sbwidget02);
      slidebar01.add(sbwidget03);
      slidebar01scroll.add(slidebar01);

      var lbltheend = new qx.ui.basic.Label("The End").set({padding: 0, margin: [20,0,0,0]});

      menupage.add(fourthpagetopdetailarea);
      menupage.add(secondbtnlistmenupage);
      menupage.add(lblAreaHeaderarticles);
      menupage.add(articleblockmenupage);
      menupage.add(slidebar01scroll);
      menupage.add(lbltheend);
      menuscrollstackpage.add(menupage);

      dashboardpage.add(lbldashboardwelcome);
      dashboardpage.add(lbldashboardcont);
      dashboardpage.add(lbldashboardactiveitems);
      dashboardpage.add(thirdblockmenupage);
      dashboardpage.add(btngetstartedaction);
      dashboardpage.add(btnaction2);
      dashboardpage.add(atmfeedback);
      dashboardpage.add(lbllookingforfeedback);
      dashboardpage.add(btnleavefeedback);
      dashboardstackpage.add(dashboardpage);

      
      northtoolbar.setBackgroundColor("transparent");
      northhbox.set({backgroundColor: bckgcolortopbtm, decorator: "topheader"});
      atmlogocurrentpage.set({visibility: "visible", label:"Menu", opacity: 1 });

      // Scroll feature
      /*
      var menuscrollcontentEl = menuscrollstackpage.getChildControl("pane").getContentElement();
      menuscrollcontentEl.addListener("scroll", function(e) {
        var menulblloctop = menuscrollstackpage.getItemTop(lblwaxdemo);
        var menulbllocbtm = menuscrollstackpage.getItemBottom(lblwaxdemo);
        var scrollval = menuscrollcontentEl.getScrollY();
        var scrollrange = menulbllocbtm - menulblloctop - 15;
        var opacityincrement = 1/scrollrange;
        var atmopac = atmlogocurrentpage.getOpacity();
        var lblwdopac = lblwaxdemo.getOpacity();

        var menuscrollheight = menuscrollstackpage.getItemBottom(lbltheend);
        */
        
        // top bar
        /*if (scrollval >= menulbllocbtm-6) {
          //atmlogocurrentpage.set({ opacity: 1 });
          northhbox.set({backgroundColor: bckgcolortopbtm, decorator: "topheader"});
        } else {
          //atmlogocurrentpage.set({ opacity: 0 });
          northhbox.set({backgroundColor: bckgcolormain, decorator: "topheader-blended"});
        }*/

        //bottom bar
        //var menuscrolldom = menuscrollcontentEl.getDomElement();

        //console.log("offsetheight: " + menuscrolldom.offsetHeight + " scrollTop: " + menuscrolldom.scrollTop + " scrollheight: " + menuscrolldom.scrollHeight);

        /*if (menuscrolldom.offsetHeight + menuscrolldom.scrollTop >= menuscrolldom.scrollHeight - 1) {
          southbox.set({backgroundColor: bckgcolormain, decorator: "bottombar-blended"});
        } else {
          southbox.set({backgroundColor: bckgcolortopbtm, decorator: "bottombar"});
        }*/
        
        /*
        if (scrollval > menulblloctop) {
          atmlogocurrentpage.set({ opacity: atmopac + opacityincrement });
        } else {
          atmlogocurrentpage.set({ opacity: 0 });
        }
        
        /*if (scrollval >= menulblloc) 
        {
          atmlogocurrentpage.set({visibility: "visible", label:"Menu" });
        } 
        else if (scrollval >= menulblloc + 10) 
        {
          northhbox.set({decorator: "topheader"});
        }
        else if (scrollval < menulblloc + 10 & scrollval > menulblloc -8) 
        {
          northhbox.set({decorator: null});
        }
        else
        {
          atmlogocurrentpage.set({visibility: "hidden"});
          northhbox.set({decorator: null});
        }*/
          
      //});

      //***  CODE for applying popup fading in and out  ***//
      var scaleback = {
        duration: 400, 
        timing: "cubic-bezier(0.165, 0.84, 0.44, 1)", 
        keyFrames : {
          0: {scale: 1},
          100: {scale: .96}
        },
        keep : 100
      };

      // Mobile modal window using qx.ui.window.Window
      var mobilemodalwindow = new qx.ui.window.Window().set({ appearance: "wax-window", showClose: false, allowMaximize : false, allowMinimize : false, modal: true, movable: false, resizable: false });
      mobilemodalwindow.setLayout(new qx.ui.layout.VBox(20));
      mobilemodalwindow.getChildControl("captionbar").exclude();
      var topbuttonarea = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({padding: [0,0,10,0], decorator: "window-captionbar-default", allowGrowX: true});
      var btncancelmodal = new qx.ui.form.Button("Cancel").set({allowGrowX: false});
      var btnsaveemodal = new qx.ui.form.Button("Save").set({allowGrowX: false});
      topbuttonarea.add(btncancelmodal);
      topbuttonarea.add(new qx.ui.core.Spacer(), {flex: 1});
      topbuttonarea.add(btnsaveemodal);
      mobilemodalwindow.add(topbuttonarea);

      // window top logo
      var editsettingssvg = `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M17.18 2.93a2.97 2.97 0 0 0-4.26-.06l-9.37 9.38c-.33.33-.56.74-.66 1.2l-.88 3.94a.5.5 0 0 0 .6.6l3.92-.87c.47-.1.9-.34 1.24-.68L8.2 16c-.11-.39-.18-.8-.2-1.21l-.95.94c-.2.2-.46.35-.74.41l-3.16.7.7-3.18c.07-.27.2-.51.4-.7l7.99-8 2.8 2.8L13.78 9c.41.02.82.09 1.21.2l2.13-2.13a2.97 2.97 0 0 0 .05-4.15Zm-3.55.65a1.97 1.97 0 0 1 2.79 2.8l-.67.66-2.8-2.79.68-.67Zm-2.56 7.86a2 2 0 0 1-1.43 2.48l-.46.12a4.7 4.7 0 0 0 0 1.02l.35.08A2 2 0 0 1 11 17.66l-.13.42c.26.2.54.38.84.52l.32-.35a2 2 0 0 1 2.91 0l.34.36c.3-.13.57-.3.82-.5l-.15-.55a2 2 0 0 1 1.43-2.48l.46-.12a4.7 4.7 0 0 0-.01-1.01l-.35-.09A2 2 0 0 1 16 11.34l.13-.42c-.26-.2-.54-.38-.84-.52l-.32.35a2 2 0 0 1-2.91 0l-.34-.36c-.29.13-.57.3-.82.5l.16.55Zm2.43 4.06a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" fill="currentColor"></path></svg>`;
      var editsettingsimg = new qx.ui.basic.Image().set({
        width : 60,
        height : 60,
        html : editsettingssvg
      });

      var lbleditsettingsheader = new qx.ui.basic.Label("Customize Thing Page").set({font: "hym-app-page-header", marginTop: 8});

      // window top message
      var lbleditsettingsmsg = new qx.ui.basic.Label("Drag and drop the sections below to change their order in Current Thing Page").set({rich: true, wrap: true});
      
      mobilemodalwindow.add(editsettingsimg);
      mobilemodalwindow.add(lbleditsettingsheader);
      mobilemodalwindow.add(lbleditsettingsmsg);

      btncancelmodal.addListener("execute", () => {
        mobilemodalwindow.close();
      });
      btnsaveemodal.addListener("execute", () => {
        mobilemodalwindow.close();
      });

      // Mobile modal full window using qx.ui.window.Window
      var mobilemodalfullwindow = new qx.ui.window.Window().set({ appearance: "wax-window", showClose: false, allowMaximize : false, allowMinimize : false, modal: true, movable: false, resizable: false });
      mobilemodalfullwindow.setLayout(new qx.ui.layout.VBox(4));
      var btnclosefullmodal = new qx.ui.form.Button("dismiss", "ville/wax/dismiss_24.svg").set({appearance: "hym-north-menubutton", show: "icon", allowGrowX: false});
      mobilemodalfullwindow.add(btnclosefullmodal);
      mobilemodalfullwindow.getChildControl("captionbar").exclude();

      btnclosefullmodal.addListener("execute", () => {
        mobilemodalfullwindow.close();
      });

      profilemenubutton.addListener("execute", function(e) {
        appcompdock.setDecorator("scaledback-box");
        var appdockdom = appcompdock.getContentElement().getDomElement();
        qx.bom.element.AnimationCss.animate(appdockdom, scaleback);
        mobilemodalwindow.show();
      }, this);

      mobilemodalwindow.addListener("appear", function() {
        var appheight = parseInt(this.getRoot().getContentElement().getStyle("height"));
        var appwidth = parseInt(this.getRoot().getContentElement().getStyle("width"));
        mobilemodalwindow.set({width: appwidth, height: appheight - 18});
        var popupup = {
          duration: 400, 
          timing: "cubic-bezier(0.165, 0.84, 0.44, 1)", 
          keyFrames : {
            0: {translate: [null, appheight + "px"]},
            100: {translate: [null, "20px"]}
          },
          keep : 100
        };
        qx.bom.element.AnimationCss.animate(mobilemodalwindow.getContentElement().getDomElement(), popupup);
      }, this);

      mobilemodalwindow.addListener("beforeClose", function(e) {
        e.preventDefault();
        var appdockdom = appcompdock.getContentElement().getDomElement();
        var appheight = parseInt(this.getRoot().getContentElement().getStyle("height"));
        qx.bom.element.AnimationCss.animateReverse(appdockdom, scaleback);
        var popupdown = {
          duration: 200, 
          timing: "ease-in", 
          keyFrames : {
            0: {translate: [null, "20px"]},
            100: {translate: [null, appheight + "px"]}
          },
          keep : 100
        };
        qx.bom.element.AnimationCss.animate(mobilemodalwindow.getContentElement().getDomElement(), popupdown).addListener("end", function() {
          mobilemodalwindow.hide();
          appcompdock.setDecorator("normal-box");
        });
      }, this);

      mobilemodalfullwindow.addListener("appear", function() {
        var appheight = parseInt(this.getRoot().getContentElement().getStyle("height"));
        var appwidth = parseInt(this.getRoot().getContentElement().getStyle("width"));
        mobilemodalfullwindow.set({width: appwidth, height: appheight});
        var popupup = {
          duration: 400, 
          timing: "cubic-bezier(0.165, 0.84, 0.44, 1)", 
          keyFrames : {
            0: {translate: [null, appheight + "px"]},
            100: {translate: [null, "0px"]}
          },
          keep : 100
        };
        qx.bom.element.AnimationCss.animate(mobilemodalfullwindow.getContentElement().getDomElement(), popupup);
      }, this);

      mobilemodalfullwindow.addListener("beforeClose", function(e) {
        e.preventDefault();
        var appheight = parseInt(this.getRoot().getContentElement().getStyle("height"));
        var popupdown = {
          duration: 200, 
          timing: "ease-in", 
          keyFrames : {
            0: {translate: [null, "0px"]},
            100: {translate: [null, appheight + "px"]}
          },
          keep : 100
        };
        qx.bom.element.AnimationCss.animate(mobilemodalfullwindow.getContentElement().getDomElement(), popupdown).addListener("end", function() {
          mobilemodalfullwindow.hide();
        });
      }, this);

      // Add Main Menu Popup Listeners
      mainmenubtnbutton.addListener("execute", function(e)
      {
        mobilemodalfullwindow.show();
      });

      // add a mobile detail page
      var mobiledetailscrollstackpage = new ville.wax.scroll.Scroll().set({overflow: ["hidden", "auto"], padding: 0, margin: 0, contentPadding: [0,0,0,0]});
      var mobiledetailpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(10)).set({ padding: 0, backgroundColor: bckgcolormain });
      mobiledetailscrollstackpage.add(mobiledetailpage);

      var detailpagetopdetailarea = new qx.ui.container.Composite(new qx.ui.layout.VBox(16).set({alignX: "center"})).set({ padding: [20,0], margin: [0,0,0,0], backgroundColor: "white" });
      var lbldetailpageheader = new qx.ui.basic.Label("Detail").set({font: "hym-app-page-header", allowGrowX: true, textAlign: "center"});
      //var lbldetailpageheadermsg = new qx.ui.basic.Label("Use this area for all sorts of things such as blah, blah and blah. You can also use this area to figure out this, that and the other thing. Be sure to review this information before leaving.").set({font: "hym-app-page-content-lgr", rich: true, wrap: true, textAlign: "left"});
      var svgdetailbeach = `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M8.26 4.6a5.21 5.21 0 0 1 9.03 5.22l-.2.34a.5.5 0 0 1-.67.19l-3.47-2-1.93 3.38c1.34.4 2.5 1.33 3.31 2.52h-.09c-.34 0-.66.11-.92.31A4.9 4.9 0 0 0 9.5 12.5a4.9 4.9 0 0 0-3.82 2.06 1.5 1.5 0 0 0-1.01-.3 5.94 5.94 0 0 1 5.31-2.74l2.1-3.68-3.83-2.2a.5.5 0 0 1-.18-.7l.2-.33Zm.92.42 1.7.98.02-.02a8.08 8.08 0 0 1 3.27-2.74 4.22 4.22 0 0 0-4.99 1.78ZM14 7.8c.47-.82.7-1.46.77-2.09a5.8 5.8 0 0 0-.06-1.62 6.96 6.96 0 0 0-2.95 2.41L14 7.8Zm.87.5 1.61.93a4.22 4.22 0 0 0-.74-5.02c.07.56.09 1.1.02 1.63-.1.79-.38 1.56-.89 2.46Zm-9.63 7.3a.5.5 0 0 0-.96.03c-.17.7-.5 1.08-.86 1.3-.38.23-.87.32-1.42.32a.5.5 0 0 0 0 1c.64 0 1.33-.1 1.94-.47.34-.2.64-.5.88-.87a2.96 2.96 0 0 0 4.68-.01 2.96 2.96 0 0 0 4.74-.06c.64.9 1.7 1.41 2.76 1.41a.5.5 0 1 0 0-1c-.98 0-1.96-.64-2.29-1.65a.5.5 0 0 0-.95 0 1.98 1.98 0 0 1-3.79.07.5.5 0 0 0-.94 0 1.98 1.98 0 0 1-3.8-.08Z" fill="currentColor"></path></svg>`;
      var imgtopheaderDetailPage = new qx.ui.basic.Image().set({html: svgdetailbeach, scale: true, width: 70, height: 70});
      detailpagetopdetailarea.add(imgtopheaderDetailPage);
      detailpagetopdetailarea.add(lbldetailpageheader);
      mobiledetailpage.add(detailpagetopdetailarea);

      //var btnBackButton = new qx.ui.form.Button("<").set({opacity: 1});
      var btnBackButton = new qx.ui.toolbar.Button("back", "ville/wax/chevronleft.svg").set({appearance: "hym-north-backbutton", show: "icon", enabled: false, opacity: 0, cursor: "arrow"});
      mainmenupart.add(btnBackButton);
      //btnBackButton.fadeOut(0);

      var movebtnleft = {
        duration: 300, 
        timing: "ease", 
        keyFrames : {
          0 : {opacity: 0, translate: ["0px", null]},
          100 : {opacity: 1, translate: ["-30px", null]}
        },
        keep : 100
      };

      var moveatmleftin = {
        duration: 300, 
        timing: "ease", 
        keyFrames : {
          0 : {opacity: 0, translate: ["60px", null]},
          100 : {opacity: 1, translate: ["0px", null]}
        },
        keep : 100
      };

      var moveatmleftout = {
        duration: 300, 
        timing: "ease", 
        keyFrames : {
          0 : {opacity: 1, translate: ["0px", null]},
          100 : {opacity: 0, translate: ["-60px", null]}
        },
        keep : 100
      };

      var moveslightleft = {
        duration: 300, 
        timing: "ease", 
        keyFrames : {
          0 : {opacity: 1, translate: ["0px", null]},
          100 : {opacity: 1, translate: ["-60px", null]}
        },
        keep : 100
      };

      var slideleft = {
        duration: 300, 
        timing: "ease-out", 
        keyFrames : {
          0 : {opacity: 1, translate: ["550px", null]},
          100 : {opacity: 1, translate: ["0px", null]}
        },
        keep : 100
      };

      btnAbout.addListener("execute", function(e) {
        profilemenubutton.setEnabled(false);
        mainmenubtnbutton.setEnabled(false);
        atmlogonextpage.setLabel("A01 Sec01 Item 02");
        profilemenubutton.fadeOut(300);
        mainmenubtnbutton.fadeOut(300);

        //qx.bom.element.AnimationCss.animate(atmlogocurrentpage.getContentElement().getDomElement(), moveatmleftout);
        qx.bom.element.AnimationCss.animate(atmlogonextpage.getContentElement().getDomElement(), moveatmleftin);
        atmlogocurrentpage.fadeOut(300);
        //atmlogocurrentpage.setLabel("Happening 2");
        //atmlogocurrentpage.fadeIn(150);
           
        qx.bom.element.AnimationCss.animate(firststackpage.getContentElement().getDomElement(), moveslightleft);

        mobiledetailscrollstackpage.setZIndex(11);
        var appwidth = parseInt(this.getRoot().getContentElement().getStyle("width"));
        slideleft.keyFrames[0].translate = [appwidth + "px", null];
        qx.bom.element.AnimationCss.animate(mobiledetailscrollstackpage.getContentElement().getDomElement(), slideleft);
        
        qx.bom.element.AnimationCss.animate(btnBackButton.getContentElement().getDomElement(), movebtnleft).addListener("end", () => {
          btnBackButton.setEnabled(true);
        });
      }, this);

      btnSwitchBack.addListener("execute", function(e) {
        profilemenubutton.setEnabled(false);
        mainmenubtnbutton.setEnabled(false);
        atmlogonextpage.setLabel("A01 Sec01 Item 01");
        profilemenubutton.fadeOut(300);
        mainmenubtnbutton.fadeOut(300);

        //qx.bom.element.AnimationCss.animate(atmlogocurrentpage.getContentElement().getDomElement(), moveatmleftout);
        qx.bom.element.AnimationCss.animate(atmlogonextpage.getContentElement().getDomElement(), moveatmleftin);
        atmlogocurrentpage.fadeOut(300);
        //atmlogocurrentpage.setLabel("Happening 2");
        //atmlogocurrentpage.fadeIn(150);
           
        qx.bom.element.AnimationCss.animate(firststackpage.getContentElement().getDomElement(), moveslightleft);

        mobiledetailscrollstackpage.setZIndex(11);
        var appwidth = parseInt(this.getRoot().getContentElement().getStyle("width"));
        slideleft.keyFrames[0].translate = [appwidth + "px", null];
        qx.bom.element.AnimationCss.animate(mobiledetailscrollstackpage.getContentElement().getDomElement(), slideleft);
        
        qx.bom.element.AnimationCss.animate(btnBackButton.getContentElement().getDomElement(), movebtnleft).addListener("end", () => {
          btnBackButton.setEnabled(true);
        });
      }, this);

      btnBackButton.addListener("execute", function(e) {
        btnBackButton.setEnabled(false);
        
        qx.bom.element.AnimationCss.animateReverse(firststackpage.getContentElement().getDomElement(), moveslightleft);
        qx.bom.element.AnimationCss.animateReverse(mobiledetailscrollstackpage.getContentElement().getDomElement(), slideleft).addListener("end", () => {
          mobiledetailscrollstackpage.setZIndex(10);
        });
        
        mainmenubtnbutton.fadeIn(300).addListener("end", () => {mainmenubtnbutton.setEnabled(true)});
        profilemenubutton.fadeIn(300).addListener("end", () => {profilemenubutton.setEnabled(true)});

        //qx.bom.element.AnimationCss.animateReverse(atmlogocurrentpage.getContentElement().getDomElement(), moveatmleftout);
        qx.bom.element.AnimationCss.animateReverse(atmlogonextpage.getContentElement().getDomElement(), moveatmleftin);
        //atmlogocurrentpage.fadeOut(150);
        //atmlogocurrentpage.setLabel("My Current Thing");
        atmlogocurrentpage.fadeIn(300);
        qx.bom.element.AnimationCss.animateReverse(btnBackButton.getContentElement().getDomElement(), movebtnleft);
      });

      // Info mobile modal window using qx.ui.window.Window
      var infomobilemodalwindow = new qx.ui.window.Window("Item 03 Info").set({ appearance: "wax-window", showClose: true, allowMaximize : false, allowMinimize : false, modal: true, movable: false, resizable: false });
      infomobilemodalwindow.setLayout(new qx.ui.layout.VBox(20));
      infomobilemodalwindow.getChildControl("title").set({font: "hym-app-header", padding: [10,0], textAlign: "center"});

      btnProfile.addListener("execute", (e) => {
        this._blocker.blockContent(btnProfile.getZIndex()); 
        infomobilemodalwindow.open();
      });

      infomobilemodalwindow.addListener("swipe", (e) => {
        if (e._native.swipe.axis == "y" && e._native.swipe.direction == "down") {
          //console.log("swipe down");
          infomobilemodalwindow.close();
        }
      });

      // INFO POPUP btnProfile
      infomobilemodalwindow.addListener("appear", function() {
        var appheight = parseInt(this.getRoot().getContentElement().getStyle("height"));
        var appwidth = parseInt(this.getRoot().getContentElement().getStyle("width"));
        infomobilemodalwindow.set({width: appwidth, height: appheight - 318});
        var smpopupup = {
          duration: 300, 
          timing: "cubic-bezier(0.165, 0.84, 0.44, 1)", 
          keyFrames : {
            0: {translate: [null, appheight + "px"]},
            100: {translate: [null, "318px"]}
          },
          keep : 100
        };
        
        qx.bom.element.AnimationCss.animate(infomobilemodalwindow.getContentElement().getDomElement(), smpopupup);
      }, this);

      infomobilemodalwindow.addListener("beforeClose", function(e) {
        e.preventDefault();
        this._blocker.unblock();
        var appheight = parseInt(this.getRoot().getContentElement().getStyle("height"));
        var infopopupdown = {
          duration: 300, 
          timing: "cubic-bezier(0.165, 0.84, 0.44, 1)", 
          keyFrames : {
            0: {translate: [null, "318px"]},
            100: {translate: [null, appheight + "px"]}
          },
          keep : 100
        };
        qx.bom.element.AnimationCss.animate(infomobilemodalwindow.getContentElement().getDomElement(), infopopupdown).addListener("end", function() {
          infomobilemodalwindow.hide();
        });
      }, this);

      /*mobiledetailscrollstackpage.addListener("appear", function() {
        var tbvmarkdom = this.getContentElement().getDomElement();
        qx.bom.element.AnimationCss.animate(tbvmarkdom,
          {
            duration: 300,
            keyFrames : 
            {
              0 : {opacity: 1, translate: ["600px", null]},
              100 : {opacity: 1, translate: ["0px", null]}
            },
            keep : 100,
            timing: "ease-out"
          });
      });*/

      //centerbox.addListener("changeSelection", (e) => {
       // console.log("when does this happen?");
        //var oldbounds = e.getOldData()[0].getButton().getBounds();
        //var newbounds = e.getData()[0].getButton().getBounds();
      //});

      // Settings Page
      var settingsstackpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(10)).set({padding: 0, backgroundColor: bckgcolormain});   
      var lblsettingsheader1 = new qx.ui.basic.Label("Settings Group 01").set({opacity: 0.7, font: "hym-default", padding: [10,0,0,20]});
      var btnsettings1 = new qx.ui.form.Button("Setting 01").set({backgroundColor: "white", appearance : "hym-page-settings-button"});
      var lblsettingsheader2 = new qx.ui.basic.Label("Settings Group 02").set({opacity: 0.7, font: "hym-default", padding: [0,0,0,20]});
      var settingsbuttongroup02 = new qx.ui.container.Composite(new qx.ui.layout.VBox(4, "middle", "settings-separator-vertical")).set({padding: 0, margin: 0, backgroundColor: "white", alignX: "left", allowGrowX: true});
      var btnsettings2 = new qx.ui.form.Button("Setting 02").set({appearance : "hym-page-settings-button"});
      var settingsbtnswitchbox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({padding : [12,0,12,20], margin: 0, backgroundColor: "white", alignX: "left", allowGrowX: true});
      var lblswitchlabel = new qx.ui.basic.Label("Setting 03").set({font: "hym-default-bold"});
      var waxswitch = new qx.ui.form.CheckBox("switch").set({paddingRight: 20, alignX: "right", show: "icon", appearance: "wax-switch"});
      settingsbtnswitchbox.add(lblswitchlabel);
      settingsbtnswitchbox.add(new qx.ui.core.Spacer(), {flex: 1});
      settingsbtnswitchbox.add(waxswitch);
      var btnsettings4 = new qx.ui.form.Button("Setting 04").set({appearance : "hym-page-settings-button"});
      settingsbuttongroup02.add(btnsettings2);
      settingsbuttongroup02.add(settingsbtnswitchbox);
      settingsbuttongroup02.add(btnsettings4);
      var lblsettingsheader3 = new qx.ui.basic.Label("Settings Group 03").set({opacity: 0.7, font: "hym-default", padding: [0,0,0,20]});
      var settingsbuttongroup03 = new qx.ui.container.Composite(new qx.ui.layout.VBox(4, "middle", "settings-separator-vertical")).set({padding: 0, margin: 0, backgroundColor: "white", alignX: "left", allowGrowX: true});
      var btnsettings5 = new qx.ui.form.Button("Setting 05").set({appearance : "hym-page-settings-button"});
      var btnsettings6 = new qx.ui.form.Button("Setting 06").set({appearance : "hym-page-settings-button"});
      settingsbuttongroup03.add(btnsettings5);
      settingsbuttongroup03.add(btnsettings6);
      settingsstackpage.add(lblsettingsheader1);
      settingsstackpage.add(lblsettingsheader1);
      settingsstackpage.add(btnsettings1);
      settingsstackpage.add(lblsettingsheader2);
      settingsstackpage.add(settingsbuttongroup02);
      settingsstackpage.add(lblsettingsheader3);
      settingsstackpage.add(settingsbuttongroup03);
    
      // Assemble - THE STACK 
      centerbox.add(settingsstackpage);
      centerbox.add(secondscrollstackpage);
      //secondstackpage.setVisibility("visible");
      centerbox.add(thirdstackpage);
      //thirdstackpage.setVisibility("visible");
      centerbox.add(mobiledetailscrollstackpage);
      mobiledetailscrollstackpage.set({visibility: "visible", zIndex: 9});
      centerbox.add(menuscrollstackpage);
      //menuscrollstackpage.setVisibility("visible");
      centerbox.add(firstscrollstackpage);
      //firstscrollstackpage.setVisibility("visible");
      centerbox.add(dashboardstackpage);

      profilemenubutton.setVisibility("hidden");
      atmlogocurrentpage.setLabel("Dashboard");
      atmlogonextpage.set({label: "A01 Sec01 Item 02", opacity: 0});

      

      // *** END of THE STACK ******************************************************
      
      // *** Populate the Main Menu and Popup Main Menu with content ***************
      // Create Menu Buttons that will navigate the user through THE STACK Pages ***
      var atmleftnavheader = new qx.ui.basic.Atom("Wax Demo", "ville/wax/Wax_demo_logo.png").set({appearance: "header-atom", anonymous: true, focusable: false, selectable: false });
      atmleftnavheader.getChildControl("icon").set({ scale : true });

      var tbtnfirststackpage = new ville.wax.demo.MenuButton("Home");
      tbtnfirststackpage.getChildControl("icon").set({ scale : true , width: 28, height: 28});

      var tbtnSecondPage = new ville.wax.demo.MenuButton("Second Page");
      tbtnSecondPage.getChildControl("icon").set({ scale : true , width: 28, height: 28});

      var tbtnThirdPage = new ville.wax.demo.MenuButton("Third Page");
      tbtnThirdPage.getChildControl("icon").set({ scale : true , width: 28, height: 28});
    
      // CLONE the above controls
      //var atmmenuleftnavheader = atmleftnavheader.clone();
      //atmmenuleftnavheader.getChildControl("icon").set({ scale : true });
      //var tbtnmenuheaderMyStuff = new ville.wax.demo.MenuButton("Specific Areas").set({appearance: "hym-mainmenubutton", anonymous: true, marginTop: 20});
      var tbtnmenuheaderMyStuff = new qx.ui.form.ToggleButton("Specific Areas", "ville/wax/chevronup.svg").set({appearance: "hym-mainmenutogglebutton", gap: 20, marginTop: 20, show: "both", iconPosition: "right", allowGrowX: true, allowShrinkX: true});
      //tbtnmenuheaderMyStuff.getChildControl("icon").set({allowGrowX: true, alignX: "right"});
      var tbtnmenusubmything = new ville.wax.demo.MenuButton("Area 01 Item 01").set({appearance: "hym-submenubutton"});
      var tbtnmenufirststackpage = new ville.wax.demo.MenuButton("Dashboard").set({appearance: "hym-submenubutton"});
      var tbtnmenuSecondPage = new ville.wax.demo.MenuButton("Settings").set({appearance: "hym-mainmenubutton"});
      var tbtnmenuThirdPage = new ville.wax.demo.MenuButton("Feedback").set({appearance: "hym-mainmenubutton"});

      mobilemodalfullwindow.add(tbtnmenuheaderMyStuff);
      mobilemodalfullwindow.add(tbtnmenusubmything);
      mobilemodalfullwindow.add(tbtnmenufirststackpage);
      mobilemodalfullwindow.add(tbtnmenuSecondPage);
      mobilemodalfullwindow.add(tbtnmenuThirdPage);

      var moveotheroptions = {
        duration: 300, 
        timing: "ease", 
        keyFrames : {
          0 : {translate: [null, "0px"]},
          100 : {translate: [null, "-76px"]}
        },
        keep : 100
      };

      tbtnmenuheaderMyStuff.addListener("changeValue", (e) => {
        var recentmenubtnitemsdom = tbtnmenuSecondPage.getContentElement().getDomElement();
        var tabledom = tbtnmenuThirdPage.getContentElement().getDomElement();
        var togglearrowdom = tbtnmenuheaderMyStuff.getChildControl("icon").getContentElement().getDomElement();
        if (e.getData()) {
          tbtnmenusubmything.fadeOut(200);
          tbtnmenufirststackpage.fadeOut(200);
          qx.bom.element.AnimationCss.animate(recentmenubtnitemsdom, moveotheroptions);
          qx.bom.element.AnimationCss.animate(tabledom, moveotheroptions);
          qx.bom.element.AnimationCss.animate(togglearrowdom, rotateinline);
        }
        else {
          tbtnmenusubmything.fadeIn(300);
          tbtnmenufirststackpage.fadeIn(300);
          qx.bom.element.AnimationCss.animateReverse(recentmenubtnitemsdom, moveotheroptions);
          qx.bom.element.AnimationCss.animateReverse(tabledom, moveotheroptions);
          qx.bom.element.AnimationCss.animateReverse(togglearrowdom, rotateinline);
        }
      });

      // Assign all the clones their own RadioGroup
      var mainmenubuttongroup = new qx.ui.form.RadioGroup();
      mainmenubuttongroup.add(tbtnmenusubmything, tbtnmenufirststackpage, tbtnmenuSecondPage, tbtnmenuThirdPage);

      mainmenubuttongroup.setSelection([tbtnmenufirststackpage]);

      thirdblockmenupage.addListener("click", (e) => {
        this._processingblocker.block();
        //processingpopup.set({alignX: "center", alignY: "middle"});
        //processingpopup.show();

        qx.event.Timer.once(
          function (e) {
            //this._processingpopup.setAutoHide(false);
            //this._processingpopup.hide();
            this._processingblocker.unblock();
          },
          this,
          2000
        );
      
        profilemenubutton.setVisibility("visible");
        atmlogocurrentpage.setLabel("Area 01 Item 01");
        southbox.setVisibility("visible");
        //dashboardstackpage.setZIndex(9);
        centerbox.setSelection([firstscrollstackpage]);
        mainmenubuttongroup.setSelection([tbtnmenusubmything]);
      }, this);

      // *** END of Main Menu and Main Menu Popup **********************************
    
      // *** Populate the Hybrid Mobile (hym) Main Menu  content *******************
      // Create Menu Buttons that will navigate the user through THE STACK Pages ***

      // Populate southbox with content
      var tbtnfirststackpagehym = new ville.wax.demo.MenuButton("Area01").set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      tbtnfirststackpagehym.getChildControl("icon").set({ scale : true, width: 28, height: 28 });
      var tbtnsecondstackpagehym = new ville.wax.demo.MenuButton("Area02").set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      tbtnsecondstackpagehym.getChildControl("icon").set({ scale : true, width: 28, height: 28 });
      var tbtnthirdpagehym = new ville.wax.demo.MenuButton("Area03").set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      tbtnthirdpagehym.getChildControl("icon").set({ scale : true, width: 28, height: 28 });
      var tbtnmenuhym = new ville.wax.demo.MenuButton("Area04").set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      tbtnmenuhym.getChildControl("icon").set({ scale : true, width: 28, height: 28 });

      southbox.add(tbtnfirststackpagehym, {flex: 1});
      southbox.add(tbtnsecondstackpagehym, {flex: 1});
      southbox.add(tbtnthirdpagehym, {flex: 1});
      southbox.add(tbtnmenuhym, {flex: 1});

      //southbox.setVisibility("excluded");

      // Assign all the clones their own RadioGroup
      var mainmenubuttongrouphym = new qx.ui.form.RadioGroup();
      mainmenubuttongrouphym.add(tbtnfirststackpagehym, tbtnsecondstackpagehym, tbtnthirdpagehym, tbtnmenuhym);

      // *** END of Hybrid Mobil (hym) Main Menu and Main Menu Popup ******************************


      // *** Wire all the Main Menu Buttons to THE STACK Pages (via Listeners) ********************
      // Turn on all wax.demo.MenuButton listeners
      tbtnfirststackpage.addListener("changeValue", function(e) {
        if (e.getData()) {
          //centerbox.setSelection([firstscrollstackpage]);
          mainmenubuttongroup.setSelection([tbtnmenufirststackpage]);
        }
      }, this);

      tbtnSecondPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          //centerbox.setSelection([secondstackpage]);
          mainmenubuttongroup.setSelection([tbtnmenuSecondPage]);
        }
      }, this);

      tbtnThirdPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          //centerbox.setSelection([thirdstackpage]);
          mainmenubuttongroup.setSelection([tbtnmenuThirdPage]);
        }
      }, this);

      // Popup menu buttons  tbtnmenufirststackpage
      tbtnmenufirststackpage.addListener("changeValue", function(e) {
        if (e.getData()) {
          this._processingblocker.block(); 
          mobilemodalfullwindow.hide(); 
          mobilemodalfullwindow.close();
          //processingpopup.set({alignX: "center", alignY: "middle"});
          //processingpopup.show();
  
          qx.event.Timer.once(
            function (e) {
              //this._processingpopup.setAutoHide(true);
              //this._processingpopup.hide();
              this._processingblocker.unblock();
            },
            this,
            2000
          );
          profilemenubutton.setVisibility("hidden");
          atmlogocurrentpage.setLabel("Dashboard");
          centerbox.setSelection([dashboardstackpage]);
          southbox.exclude();
        }
      }, this);

      tbtnmenusubmything.addListener("changeValue", function(e) {
        if (e.getData()) {
          this._processingblocker.block(); 
          mobilemodalfullwindow.hide(); 
          mobilemodalfullwindow.close();
          //processingpopup.set({alignX: "center", alignY: "middle"});
          //processingpopup.show();
  
          qx.event.Timer.once(
            function (e) {
              //this._processingpopup.setAutoHide(true);
              //this._processingpopup.hide();
              this._processingblocker.unblock();
            },
            this,
            2000
          );
          centerbox.setSelection([firstscrollstackpage]);
          southbox.show();
          atmlogocurrentpage.set({label:"Area 01 Item 01"});
          profilemenubutton.show();
        }
      }, this);

      tbtnmenuSecondPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          southbox.exclude();
          mobilemodalfullwindow.close();
          profilemenubutton.setVisibility("hidden");
          atmlogocurrentpage.setLabel("Settings");
          centerbox.setSelection([settingsstackpage]); 
        }
      }, this);

      tbtnmenuSecondPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          //centerbox.setSelection([secondstackpage]);
          //westboxbuttongroup.setSelection([tbtnSecondPage]);

          //firststackpage.setVisibility("excluded");

          if (mainmenupopup.getVisibility() == "visible"){
            this._blocker.unblock();
            var domtable = mainmenupopup.getContentElement().getDomElement();
            qx.bom.element.Animation.animateReverse(domtable, fadeinleft).addListener("end", function() {
              mainmenupopup.hide();
            });
          }
        }
      }, this);

      tbtnmenuThirdPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          //centerbox.setSelection([thirdstackpage]);
          //westboxbuttongroup.setSelection([tbtnThirdPage]);

          //firststackpage.setVisibility("excluded");

          if (mainmenupopup.getVisibility() == "visible"){
            this._blocker.unblock();
            var domtable = mainmenupopup.getContentElement().getDomElement();
            qx.bom.element.Animation.animateReverse(domtable, fadeinleft).addListener("end", function() {
              mainmenupopup.hide();
            });
          }
        }
      }, this);

      // if Hybrid Mobile
      tbtnfirststackpagehym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([firstscrollstackpage]);
          atmlogocurrentpage.set({label:"Area 01 Item 01"});
          profilemenubutton.show();
        }
      }, this);

      tbtnsecondstackpagehym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([secondscrollstackpage]);
          atmlogocurrentpage.set({label:"Area 02"});
          profilemenubutton.hide();
        }
      }, this);

      tbtnthirdpagehym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([thirdstackpage]);
          atmlogocurrentpage.set({label:"Area 03"});
        }
      }, this);

      tbtnmenuhym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([menuscrollstackpage]);
          atmlogocurrentpage.set({label:"Area 04"});
        }
      }, this);

      // Demo mode switching to Mobile
      //switchmenubutton1.addListener("execute", function(e){
      //this.setDemoMode("mobile");
      southbox.setVisibility("excluded");
      //scrollwestbox.setVisibility("excluded");
      //profilemenubutton.setVisibility("hidden");
      //mainmenupart.setVisibility("hidden");
      centerbox.setSelection([dashboardstackpage]);
      //atmlogocurrentpage.set({visibility: "visible", label:"Menu"});
      //mainmenubuttongrouphym.setSelection([tbtnmenuhym]);
      //}, this);


      // *** END of Wiring *************************************************************************

    },

    __createDetailWindow ()
    {
      // Create the Window
      var win = new qx.ui.window.Window("Detail Window").set({ appearance: "wax-window", allowMaximize : true, allowMinimize : false, modal: true, movable: true });
      win.setLayout(new qx.ui.layout.VBox(4));
      win.setShowStatusbar(true);
      win.setStatus("Generic Message"); 
      win.getChildControl("title").set({padding: [10,0,0,10]});

      return win;
    }
  }
});