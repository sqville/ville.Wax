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
    main : function()
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

      // Menu Page for mobile only
      var bckgcolormain = "#F2F1F6";
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
      processingpopup.add(processingimg);
      
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
      var profilemenubutton = new qx.ui.toolbar.MenuButton("ProfileMenu", roundacct).set({show: "icon", showArrow: false});
      
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
      var profilemenu = new qx.ui.menu.Menu().set({spacingX: 12});
      var switchmenubutton1 = new qx.ui.menu.Button("Switch to Mobile", "ville/wax/wireframe-image-sm.png").set({padding: 10});
      //switchmenubutton1.getChildControl("icon").set({ width: 24, height: 24 });
      var aboutmenubutton1 = new qx.ui.menu.Button("About Wax", "ville/wax/wireframe-image-sm.png").set({padding: 10});
      //aboutmenubutton1.getChildControl("icon").set({ width: 24, height: 24 });

      //create About Wax popup window
      var winAboutWax = this.__createDetailWindow();

      winAboutWax.getLayout().set({spacing: 20});
      winAboutWax.set({caption: "About Wax", contentPadding: 0, status: "Github repo coming soon"});
      var txtaboutwax = "Wax aims to be a rapid application development and prototyping tool/system. There's a spectrum of rapid-app-dev tools (or low-code tools) - Outsystems, Appian and Ionic on the high-end, Foundation, Gatsbyjs and SemanticUI on the other. Wax is currently not yet on this spectrum, but it does have an approach and supporting assets to begin the process of becoming a highly effective and useful app-dev/app-prototyping asset.<br><br><br>";
      txtaboutwax += "<span style='font-size: 16px;'>THE APPROACH (so far):</span><br><br>";
      txtaboutwax += "<b>Build Qooxdoo skeletons (and lots of them) that function on multiple devices or use case scenarios.</b> A typical use case - After meeting with the client and gathering initial requirements, the prototype developer generates an application using a skeleton (chosen from a long list of skeletons) that best meets the initial requirements. Just like website templates found on the web, Qooxdoo skeletons would encompass enough functionality to help produce a high fidelity prototype in a matter of a few days. There is the potential that a skeleton could also include mock data (json) and non-Qooxdoo scripts to set up a cloud backend (not yet proven out). Skeletons could even include non-Qooxdoo templates for native mobile frameworks such as React Native, Flutter and Felgo (easy to do since skeleton templates are just static files with mustache-like tags).<br><br>";
      txtaboutwax += "<b>Cut and paste components from a well-stocked and possibly specially-tailored demo browser application.</b> Just as we do today, we cut and paste code from examples into our apps. Properly constructed skeletons and documented demos could facilitate the rapid integration of components into any application (not yet proven out). Wax skeletons, and resulting applications would be divided out logically into three areas: Scaffolding, Wiring and Appearance. Scaffolding includes object creation, placement and initial configuration. Wiring involves application flow (mostly via event listener creation and assignment). Appearance is simple look and feel via theming and animations. Skeletons would include an appropriate amount of Appearance and animation code, but when the goal is to rapidly produce a high fidelity prototype Scaffolding and Wiring would be the top focus.<br><br>";
      txtaboutwax += "<b>Use other frameworks for native mobile applications, and sync changes made in the main Qooxdoo app with the produced (from a skeleton) native mobile framework project.</b> Converting Qooxdoo produced code to React Native code, for example, is relatively easy. Object hierarchy is taken from getObjectRegistry method of the Application (taken from Inspector application). UI objects and their properties can be easily mapped and organized (proven out to a small degree). The difficult part is how to best get the changes to (and from) the native mobile project. Using qooxdoo compiler would be ideal, but the compiler does not have access to the apps object hierarchy. The approach Wax would take is to mimic the manual means of producing code. The manual means goes something like this: Include InspectorModel.js file in a project. Add a control (Button) to execute the reading of the ObjectRegistry and translation to the target framework. Write the translation to the console (or a TextArea object). Cut and paste resulting code to the other project.  A more automated approach would be to include an Electronjs project/app in the skeleton for the user to run at any given time. Electronjs would then sync the resulting translation to the target native mobile project. This Electronjs, automated approach has not yet been proven out.<br><br><br>";
      txtaboutwax += "<span style='font-size: 16px;'>CONCLUSION:</span><br><br>";
      txtaboutwax += "Is Wax, or even the concept of Wax, a worthwhile endeavor? Can the needed productivity gains be met in order to call itself a rapid app-dev tool? Is the noted approach the right way forward? It completely leaves out any type of changes being made, or needed, to qooxdoo compiler. Red flag, or just using the simplest approach is the best approach, approach? This is all a head-scratcher for sure. Too many unknowns without enough time. Welcome to software solution development :-)<br><br><br>";
      txtaboutwax += "<span style='font-size: 16px;'>SPECIAL NOTE:</span><br><br>";
      txtaboutwax += "Skeletons and the demo browser are not new concepts to Qooxdoo. These features have been around since the beginning. The purpose of this writeup is to convey good-intent, thoughts and ideas on how to improve peoples work lives, and not meant to be critical or take credit for anything in anyway. The past and current qooxdoo core team have done, and are doing, phenomenal work. My thanks go out to them for making me look better than I really am - Cheers.";
      //var aboutbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
      //var aboutscroll = new qx.ui.container.Scroll().set({ allowStretchY: true, padding: 0, margin: 0, contentPadding: [0,24,0,24]});
      var aboutscroll = new ville.wax.scroll.Scroll().set({ allowStretchY: true, padding: 0, margin: 0, contentPadding: [0,24,0,24]});
      var waxatom = new qx.ui.basic.Atom(txtaboutwax,"ville/wax/ville_Wax.png").set({rich: true, iconPosition: "top", gap: 30, paddingTop: 30});
      waxatom.getChildControl("icon").set({scale: true, width: 300, height: 106});
      waxatom.getChildControl("label").set({wrap: true});
      aboutscroll.add(waxatom);

      winAboutWax.add(aboutscroll, {flex:1});
      var btnClosewinAbout = new qx.ui.form.Button("Close Window").set({marginBottom: 18, maxWidth: 300, alignX: "center", alignY: "middle"});
      winAboutWax.add(btnClosewinAbout);

      btnClosewinAbout.addListener("execute", function(e) {
        winAboutWax.close();
      }, this);

      approot.addListener("resize", function(e){
        winAboutWax.center();
      }, this);

      aboutmenubutton1.addListener("execute", function(e) {
        winAboutWax.restore();
        winAboutWax.maximize();
        winAboutWax.center(); 
        winAboutWax.show();
      }, this);

      
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
      profilemenu.add(switchmenubutton1);
      profilemenu.add(aboutmenubutton1);
      profilemenubutton.setMenu(profilemenu);

      var atmlogocurrentpage = new qx.ui.basic.Atom("Wax").set({font: "hym-app-header", gap: 0, padding: 0, show: "label"});
      mainmenupart.add(mainmenubtnbutton);
      profilepart.add(profilemenubutton);
      
      northtoolbar.add(mainmenupart);
      northtoolbar.addSpacer();
      northtoolbar.add(atmlogocurrentpage);
      northtoolbar.addSpacer();
      northtoolbar.add(profilepart);

      northhbox.add(northtoolbar, {left: 0, right: 0});

      appcompdock.add(southbox, {edge: "south"});

      // *** END of Base Scaffolding **************************************

      // Add some simple ease in animation to the app's blocker
      var fadeinb = {duration: 300, timing: "ease-out", keyFrames : {
        0: {opacity: 0},
        100: {opacity: .07}
        }};

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

      var firstpagehbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(0));
      firstpagehbox.add(new qx.ui.core.Spacer(), {flex: 1});

      // First/Home Page
      var firststackpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(stackpagevboxspacing).set({alignY: "middle"})).set({ padding : stackpagepadding, maxWidth: 700});  
      // add the pages independent scroll area

      firstpagehbox.add(firststackpage, {flex: 2});
      firstpagehbox.add(new qx.ui.core.Spacer(), {flex: 1});

      var firstscrollstackpage = new ville.wax.scroll.Scroll().set({overflow: ["hidden", "auto"], padding: 0, margin: 0, contentPadding: [0,0,0,0]});

      firstscrollstackpage.add(firstpagehbox);
      
      var atmfirstpageheader = new qx.ui.basic.Atom("Control Showcase", "ville/wax/Wax_demo_logo.png").set({appearance: "control-header-atom", anonymous: true, focusable: false, selectable: false });
      var atmscrolldownmsg = new qx.ui.basic.Atom("Scroll down", "ville/wax/arrow-down-outline.svg").set({center: true, padding: 0});
      atmscrolldownmsg.getChildControl("icon").set({ scale : true, width: 24, height: 24 });
      var hboxheaderstuff = new qx.ui.container.Composite(new qx.ui.layout.VBox(0));
      hboxheaderstuff.add(atmfirstpageheader);
      hboxheaderstuff.add(atmscrolldownmsg);
      firststackpage.add(hboxheaderstuff);

      var bounceloopanima = {duration: 3500, keep: 100, keyFrames : {
        0 : {translate: [null, "0px"]},
        20 : {translate: [null, "0px"]},
        40 : {translate: [null, "0px"]},
        50 : {translate: [null, "0px"]},
        75 : {translate: [null, "0px"]},
        80 : {translate: [null, "-5px"]},
        85 : {translate: [null, "4px"]},
        90 : {translate: [null, "-1px"]},
        100 : {translate: [null, "0px"]}
        },
        delay : 1000,
        repeat : 4
      };

      atmscrolldownmsg.addListener("appear", function(e) {
        var icondom = this.getChildControl("icon").getContentElement().getDomElement();
        qx.bom.element.AnimationCss.animate(icondom, bounceloopanima);
      });

      // DONUTCHARTBOOLEAN
      firststackpage.add(new qx.ui.basic.Label("Donut Chart Boolean").set({font: stackpageheaderfont, padding: [60, 0, 0, 0]}));
      firststackpage.add(new qx.ui.basic.Label("https://spectrum.adobe.com/page/donut-chart/#Boolean").set({rich: true, wrap: true}));

      var donutcontainer = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({maxWidth: 200, width: 200, height: 200});
      
      var donutdec = new qx.ui.decoration.Decorator().set({
        radius : 100
      });
      
      var DonutChartBoolean = new qx.ui.core.Widget().set({
        backgroundColor: "blue",
        decorator: donutdec
      });

      var internalwidget = new qx.ui.core.Widget().set({
        backgroundColor: "white",
        decorator: donutdec
      });

      var valuelabel = new qx.ui.basic.Label("<span style='font-size: 3em; font-weight: 300;'>78%</span><br><span style='font-size: 1.2em; font-weight: 800;'>Completion rate</span>").set({ rich: true, alignX: "center", alignY: "middle", textAlign: "center" });

      DonutChartBoolean.addListenerOnce("appear", function() {
        this.getContentElement().setStyle("background-image", "conic-gradient(white 0 1deg, green 1deg 280deg, white 280deg 281deg, gray 0)");
        //this.getContentElement().setStyle("border-image", "repeating-linear-gradient(45deg, #f33, #3bf, #f33 30px) 60");
      });

      donutcontainer.add(DonutChartBoolean, {
        left: "2%",
        top: "2%",
        right: "2%",
        bottom: "2%",
        width: "20%",
        height: "20%",
      });
      donutcontainer.add(internalwidget, {
        left: "10%",
        top: "10%",
        right: "10%",
        bottom: "10%",
        width: "20%",
        height: "20%",
      });

      donutcontainer.add(valuelabel);

      var donutwidget = new ville.wax.indicator.DonutBoolean(82, 100, "Good Rate");

      firststackpage.add(donutwidget);

      //firststackpage.add(donutcontainer);


      // SWITCH
      firststackpage.add(new qx.ui.basic.Label("Switch").set({font: stackpageheaderfont, padding: [60, 0, 0, 0]}));
      firststackpage.add(new qx.ui.basic.Label("Just a simple qx.ui.form.CheckBox made to look like a switch control via appearance and decorator changes (with help of an SVG file for the white knob).").set({rich: true, wrap: true}));
      var waxswitch = new qx.ui.form.CheckBox("Default switch").set({appearance: "wax-switch"});
      firststackpage.add(waxswitch);
      var waxswitch2 = new qx.ui.form.CheckBox("Larger switch").set({appearance: "wax-switch-larger"});
      firststackpage.add(waxswitch2);

      //***  CODE for applying popup fading in and out  ***//
      /*var fadeinleft = {
        duration: 300, timing: "ease-out", origin: "left top", keep: 100,
        keyFrames : {
          0: {opacity: 0, left: "-300px"},
          100: {opacity: 1, left: "0px"}
        }
      };*/
      var fadeinleft = {
        duration: 300, timing: "ease-out", origin: "left top", keep: 100,
        keyFrames : {
          0: {translate: "-300px"},
          100: {translate: "0px"}
        }
      };

      // Second Page 
      var secondstackpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(stackpagevboxspacing)).set({padding: stackpagepadding});
      var lblsecondpageheader = new qx.ui.basic.Label("Second Page").set({font: stackpageheaderfont});
      secondstackpage.add(lblsecondpageheader);

      var btngobackhome = new qx.ui.form.Button("Go Back Home").set({allowGrowX: false});
      secondstackpage.add(btngobackhome);
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
      firststackpage.add(wtabView2);

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

      wtabView3.addListener("beforeChangeSelection", (e) => {
        console.log("what what what");
      })

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
      firststackpage.add(wtabView3);

      wtabView3.setSelection([page2tbv3]);

      //var tabviewbarblock = new qx.ui.core.Widget().set({ width: 40, height: 40, backgroundColor: "white", zIndex: 5, decorator : "wax-tabview-block"});
      //wtabView3.setDynamicMarkAnimationDuration(300); 
      //wtabView3.setDynamicMarkAnimationTiming("ease");
      //wtabView3.setDynamicMark(tabviewbarblock);
      

      firststackpage.add(new qx.ui.basic.Label("Drawer").set({font: stackpageheaderfont, padding: [80, 0, 0, 0]}));

      var mainmenudrawerbutton = new qx.ui.form.Button("Left side, main menu style", menuimage).set({allowStretchX: false, allowStretchY: false});
      firststackpage.add(mainmenudrawerbutton);

      // Add Main Menu Popup Listeners
      mainmenudrawerbutton.addListener("execute", function(e)
      {
        if (qx.core.Environment.get("browser.name") != "edge"){
          this._blocker.blockContent(mainmenudrawerbutton.getZIndex());
        }
        mainmenupopup.setHeight(parseInt(this.getRoot().getContentElement().getStyle("height")));
        mainmenupopup.show();
      }, this);

      var btnOpenwin = new qx.ui.form.Button("Try the Window based drawer").set({allowGrowX: false});
      var winDrawer = this.__createDetailWindow();
      winDrawer.set({height: 500, width: 450});
      winDrawer.setLayout(new qx.ui.layout.Canvas());
      
      var winbtndrawer = new qx.ui.form.Button("Open Window Drawer").set({allowGrowX: false});
      winDrawer.add(winbtndrawer);

      // tested using popup
      var winmenupopup = new qx.ui.popup.Popup().set({allowGrowX: false, padding: 10, minWidth: 300});
      winmenupopup.setLayout(new qx.ui.layout.VBox(0));
      winmenupopup.setAutoHide(false);
      winmenupopup.add(new qx.ui.basic.Label("This is a window drawer"));
      
      var btnclosewinmenupopup = new qx.ui.form.Button("Close drawer");
      btnclosewinmenupopup.addListener("execute", function() {
        var domtable = winmenupopup.getContentElement().getDomElement();
        qx.bom.element.Animation.animateReverse(domtable, fadeinleft).addListener("end", function() {
          winDrawer.remove(winmenupopup);
        });
      });
      winmenupopup.add(btnclosewinmenupopup);

      winbtndrawer.addListener("execute", function() {
        winmenupopup.setHeight(parseInt(winDrawer.getChildControl("pane").getContentElement().getStyle("height")));
        winDrawer.add(winmenupopup);
        winmenupopup.setVisibility("visible");
      });

      winmenupopup.addListener("appear", function() {
        this.setDomPosition(0,0);
        var domtable = this.getContentElement().getDomElement();  
        qx.bom.element.Animation.animate(domtable, fadeinleft);
      });

      firststackpage.add(btnOpenwin);

      btnOpenwin.addListener("execute", function() {
        winDrawer.center();
        winDrawer.fadeIn(200);
        winDrawer.show();
      });

      winDrawer.addListener("beforeClose", function(e) {
        e.preventDefault();
        winDrawer.fadeOut(200).addListener("end", function() {
          winDrawer.exclude();
        });
      });

      // --Drawer--
      winDrawer.addListener("resize", function(e) {
        if (winmenupopup.getVisibility() == "visible" & !winmenupopup.getAutoHide()){
          winmenupopup.setHeight(e.getData().height);
        }
      });

      // --Mobile--
      firststackpage.add(new qx.ui.basic.Label("Mobile").set({font: stackpageheaderfont, padding: [80, 0, 0, 0]}));
      firststackpage.add(new qx.ui.basic.Label("Controls and features that you would expect from a mobile app, such as TabBar, modal and non-modal drawers/popups, page transitions and unimpeded scrolling").set({rich: true, wrap: true}));
      var btnSwitchtoMobileView = new qx.ui.form.Button("Switch to Mobile View").set({allowGrowX: false});
      firststackpage.add(btnSwitchtoMobileView);

      //btnSwitchtoMobileView.addListener("execute", function(e){
      //this.setDemoMode("mobile");
      northhbox.setVisibility("visible");
      //southbox.setVisibility("visible");
      //profilemenubutton.setVisibility("hidden");
      //mainmenupart.setVisibility("hidden");
      //centerbox.setSelection([menuscrollstackpage]);
      //atmlogocurrentpage.set({visibility: "visible", label:"Menu"});
      //mainmenubuttongrouphym.setSelection([tbtnmenuhym]);
      //}, this);

      // Third Page
      var thirdstackpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(stackpagevboxspacing)).set({padding: stackpagepadding});
      var lblthirdpageheader = new qx.ui.basic.Label("Third Page").set({font: stackpageheaderfont});     
      thirdstackpage.add(lblthirdpageheader);
      var btngobackhome3 = new qx.ui.form.Button("Go Back Home").set({allowGrowX: false});
      thirdstackpage.add(btngobackhome3);
      /*btngobackhome3.addListener("execute", function(e) {
        centerbox.setSelection([firstscrollstackpage]);
      });*/

      firststackpage.add(new qx.ui.basic.Label("The End").set({backgroundColor: "#f3f3f3", font: stackpageheaderfont, textColor: "red", textAlign: "center", allowGrowX: true, padding: [20,0,20,0], margin: [80,0,20,0]}));

      
      var bordersouthbox = "#B3B3B3";
      var boxsepcolor = "#C7C7C7";
      var arrowcolor = "#C4C4C4";
      var searchboxcolor = "#E4E3E9";

      southbox.setBackgroundColor(bckgcolortopbtm);

      var menuscrollstackpage = new ville.wax.scroll.Scroll().set({overflow: ["hidden", "auto"], padding: 0, margin: 0, contentPadding: [0,0,0,0]});
      var dashboardstackpage = new ville.wax.scroll.Scroll().set({overflow: ["hidden", "auto"], padding: 0, margin: 0, contentPadding: [0,0,0,0]});
      var menupage = new qx.ui.container.Composite(new qx.ui.layout.VBox(10)).set({ padding: [10, 20], backgroundColor: bckgcolormain });
      var dashboardpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(10)).set({ padding: [10, 20], backgroundColor: bckgcolormain });
      var btnAbout = new qx.ui.form.Button("Detail Screen", "ville/wax/wax-icon-24-outline.svg").set({appearance : "hym-page-button"});
      var btnSwitchBack = new qx.ui.form.Button("Switch to Desktop", "ville/wax/wax-icon-24-outline.svg").set({appearance : "hym-page-button"});
      var btnProfile = new qx.ui.form.Button("Modal Popup", "ville/wax/wax-icon-24-outline.svg").set({appearance : "hym-page-button"});
      var btnSettings = new qx.ui.form.Button("Next Item", "ville/wax/wax-icon-24-outline.svg").set({appearance : "hym-page-button"});
      var btnLogout = new qx.ui.form.Button("Next Item", "ville/wax/wax-icon-24-outline.svg").set({appearance : "hym-page-button"});
      var btnLastBtn = new qx.ui.form.Button("Last Item", "ville/wax/wax-icon-24-outline.svg").set({appearance : "hym-page-last-button"});
      
      var lblwaxdemo = new qx.ui.basic.Label("Menu").set({font: "hym-app-page-header"});
      var lbldashboardwelcome = new qx.ui.basic.Label("Welcome back, Buddy!").set({font: "hym-app-page-header", marginTop: 12});
      var lbldashboardcont = new qx.ui.basic.Label("Let's continue your journey.").set({padding: 0, margin: 0});
      var lbldashboardactiveitems = new qx.ui.basic.Label("Your active items").set({font: "hym-app-page-section-header", marginTop: 22});
      
      var firstbtnlistmenupage = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({padding: [0,0], backgroundColor: "white", decorator: "hym-box-noborder"});
      firstbtnlistmenupage.add(btnSwitchBack);
      firstbtnlistmenupage.add(btnAbout);
      firstbtnlistmenupage.add(btnProfile);
      firstbtnlistmenupage.add(btnSettings);
      firstbtnlistmenupage.add(btnLogout);
      firstbtnlistmenupage.add(btnLastBtn);

      var secondbtnlistmenupage = new qx.ui.container.Composite(new qx.ui.layout.VBox(10)).set({margin: [10,0], padding: [16,0], backgroundColor: "white", decorator: "hym-box-noborder"});
      var btnAddaction = new qx.ui.form.Button("Add Something").set({appearance : "hym-page-link-last-button"});
      secondbtnlistmenupage.add(btnAddaction);

      var lblAreaHeadergetmore = new qx.ui.basic.Label("Get More From The Menu").set({padding: 0, margin: [20,0,0,0], font: "hym-app-page-section-header"});
      var thirdblockmenupage = new qx.ui.container.Composite(new qx.ui.layout.HBox(20)).set({margin: [0,0], padding: [20, 20], backgroundColor: "white", decorator: "hym-box-noborder"});
      var thirdblockatom = new qx.ui.basic.Atom("<b>Your Latest Thing</b><br>Second level details<br>Third level details", "ville/wax/KeyItem.svg").set({rich: true, iconPosition: "left", gap: 20, center: true});
      thirdblockatom.getChildControl("icon").set({scale: true, width: 32, height: 32});
      var imgarrowright = new qx.ui.basic.Image("ville/wax/ioschevronright.svg").set({scale: true, allowGrowY: true, alignY: "middle"});
      var btngetstartedaction = new qx.ui.form.Button("Other Action 1").set({appearance: "wax-form-button", marginTop: 20, allowGrowX: true, height: 40, alignX: "center"});
      var btnaction2 = new qx.ui.form.Button("Another Action You Can Do").set({appearance: "wax-form-button", allowGrowX: true, height: 40, alignX: "center"});
      var atmfeedback = new qx.ui.basic.Atom("How are we doing?", "ville/wax/personfeedback.svg").set({font: "hym-app-page-section-header", iconPosition: "top", allowGrowX: true, alignX: "center"});
      atmfeedback.getChildControl("icon").set({scale: true, width: 80, height: 80});
      var lbllookingforfeedback = new qx.ui.basic.Label("We're always looking for ways to improve, so please share your thoughts with us.").set({allowGrowX: true, rich: true, wrap: true, textAlign: "center"});
      var btnleavefeedback = new qx.ui.form.Button("Leave Feedback").set({appearance: "wax-form-clearbutton", allowGrowX: true, height: 40, alignX: "center"});
      thirdblockmenupage.add(thirdblockatom);
      thirdblockmenupage.add(new qx.ui.core.Spacer(), {flex: 1});
      thirdblockmenupage.add(imgarrowright);
      //thirdblockmenupage.add(btngetstartedaction);

      var lblAreaHeaderarticles = new qx.ui.basic.Label("Articles").set({padding: 0, margin: [20,0,0,0], font: "hym-app-page-section-header"});
      var articleblockmenupage = new qx.ui.container.Composite(new qx.ui.layout.VBox(20).set({alignY:"bottom"})).set({height: 300, margin: [0,0], padding: [0,0], backgroundColor: "white", decorator: "article"});
      var articleblockatom = new qx.ui.basic.Atom("<b>Do Bright Colors Make for Faster Cars</b><br>We explor the connection between form and function. Does color help with speed or this this jibberish in order to take up space.").set({padding: 14, backgroundColor: "white", rich: true, center: true});
      //articleblockatom.getChildControl("icon").set({width: 300});
      articleblockmenupage.add(articleblockatom);

      var lbltheend = new qx.ui.basic.Label("The End").set({padding: 0, margin: [20,0,0,0]});

      menupage.add(lblwaxdemo);
      menupage.add(firstbtnlistmenupage);
      menupage.add(secondbtnlistmenupage);
      menupage.add(lblAreaHeadergetmore);
      //menupage.add(thirdblockmenupage);
      menupage.add(lblAreaHeaderarticles);
      menupage.add(articleblockmenupage);
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

      

      //northhbox.setBackgroundColor(bckgcolormain);
      northtoolbar.setBackgroundColor("transparent");
      northhbox.set({backgroundColor: bckgcolortopbtm, decorator: "topheader"});
      //decorator : "topheader"
      atmlogocurrentpage.set({visibility: "visible", label:"Menu", opacity: 1 });

      // Scroll feature
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
        
        // top bar
        /*if (scrollval >= menulbllocbtm-6) {
          //atmlogocurrentpage.set({ opacity: 1 });
          northhbox.set({backgroundColor: bckgcolortopbtm, decorator: "topheader"});
        } else {
          //atmlogocurrentpage.set({ opacity: 0 });
          northhbox.set({backgroundColor: bckgcolormain, decorator: "topheader-blended"});
        }*/

        

        
        //bottom bar
        var menuscrolldom = menuscrollcontentEl.getDomElement();

        //console.log("offsetheight: " + menuscrolldom.offsetHeight + " scrollTop: " + menuscrolldom.scrollTop + " scrollheight: " + menuscrolldom.scrollHeight);

        if (menuscrolldom.offsetHeight + menuscrolldom.scrollTop >= menuscrolldom.scrollHeight - 1) {
          southbox.set({backgroundColor: bckgcolormain, decorator: "bottombar-blended"});
        } else {
          southbox.set({backgroundColor: bckgcolortopbtm, decorator: "bottombar"});
        }
        
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
          
      });

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
      mobilemodalwindow.setLayout(new qx.ui.layout.VBox(4));
      var btnclosemodal = new qx.ui.form.Button("X").set({allowGrowX: false});
      mobilemodalwindow.add(btnclosemodal);
      mobilemodalwindow.add(new qx.ui.basic.Label("I am a modal detail window"));

      btnclosemodal.addListener("execute", () => {
        mobilemodalwindow.close();
      });

      // Mobile modal full window using qx.ui.window.Window
      var mobilemodalfullwindow = new qx.ui.window.Window().set({ appearance: "wax-window", showClose: false, allowMaximize : false, allowMinimize : false, modal: true, movable: false, resizable: false });
      mobilemodalfullwindow.setLayout(new qx.ui.layout.VBox(4));
      var btnclosefullmodal = new qx.ui.form.Button("X").set({allowGrowX: false});
      mobilemodalfullwindow.add(btnclosefullmodal);
      //mobilemodalfullwindow.add(new qx.ui.basic.Label("<b>Dashboard</b>").set({rich: true, backgroundColor: "#D3D3D3"}));
      //mobilemodalfullwindow.add(new qx.ui.basic.Label("Settings"));
      //mobilemodalfullwindow.add(new qx.ui.basic.Label("Feedback"));

      btnclosefullmodal.addListener("execute", () => {
        mobilemodalfullwindow.close();
      });

      btnProfile.addListener("execute", function(e) {
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
      var mobiledetailpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(10)).set({ padding: [10, 20], backgroundColor: bckgcolormain });
      mobiledetailscrollstackpage.add(mobiledetailpage);
      var lbldetailscreen = new qx.ui.basic.Label("Detail Screen").set({font: "hym-app-page-header"});
      mobiledetailpage.add(lbldetailscreen);
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
        btnBackButton.setEnabled(true);
        mobiledetailscrollstackpage.setZIndex(11);
        qx.bom.element.AnimationCss.animate(menuscrollstackpage.getContentElement().getDomElement(), moveslightleft);
        //get width of the screen
        var appwidth = parseInt(this.getRoot().getContentElement().getStyle("width"));
        slideleft.keyFrames[0].translate = [appwidth + "px", null];
        qx.bom.element.AnimationCss.animate(mobiledetailscrollstackpage.getContentElement().getDomElement(), slideleft);
        
        //btnBackButton.fadeIn(300);
        mainmenubtnbutton.fadeOut(300);
        qx.bom.element.AnimationCss.animate(btnBackButton.getContentElement().getDomElement(), movebtnleft);
      }, this);

      btnBackButton.addListener("execute", function(e) {
        qx.bom.element.AnimationCss.animateReverse(menuscrollstackpage.getContentElement().getDomElement(), moveslightleft);
        qx.bom.element.AnimationCss.animateReverse(mobiledetailscrollstackpage.getContentElement().getDomElement(), slideleft).addListener("end", function(){
          mobiledetailscrollstackpage.setZIndex(10);
        });
        
        mainmenubtnbutton.fadeIn(300);
        qx.bom.element.AnimationCss.animateReverse(btnBackButton.getContentElement().getDomElement(), movebtnleft).addListener("end", function(){
          btnBackButton.set({enabled: false});
        });
        
      });

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

    
      // Assemble - THE STACK 
      centerbox.add(firstscrollstackpage);
      firstscrollstackpage.setVisibility("visible");
      centerbox.add(secondstackpage);
      secondstackpage.setVisibility("visible");
      centerbox.add(thirdstackpage);
      thirdstackpage.setVisibility("visible");
      centerbox.add(mobiledetailscrollstackpage);
      mobiledetailscrollstackpage.setVisibility("visible");
      centerbox.add(menuscrollstackpage);
      menuscrollstackpage.setVisibility("visible");
      centerbox.add(dashboardstackpage);

      profilemenubutton.setVisibility("hidden");
      atmlogocurrentpage.setLabel("Dashboard");

      thirdblockmenupage.addListener("click", (e) => {
        
        this._processingblocker.blockContent(thirdblockmenupage.getZIndex());  
        processingpopup.set({alignX: "center", alignY: "middle"});
        processingpopup.show();

        qx.event.Timer.once(
          function (e) {
            this._processingpopup.setAutoHide(true);
            this._processingpopup.hide();
            this._processingblocker.unblock();
          },
          this,
          4000
        );
      
        profilemenubutton.setVisibility("visible");
        atmlogocurrentpage.setLabel("Details");
        southbox.setVisibility("visible");
        dashboardstackpage.setZIndex(9);
      }, this);
      

      // Show the default page
      //centerbox.setSelection([menuscrollstackpage]);

      

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
      var atmmenuleftnavheader = atmleftnavheader.clone();
      atmmenuleftnavheader.getChildControl("icon").set({ scale : true });
      var tbtnmenuheaderMyStuff = new ville.wax.demo.MenuButton("My Stuff").set({appearance: "hym-mainmenubutton", anonymous: true, marginTop: 20});
      var tbtnmenusubmything = new ville.wax.demo.MenuButton("My Currently Active Thing").set({appearance: "hym-submenubutton"});
      var tbtnmenufirststackpage = tbtnfirststackpage.clone();
      tbtnmenufirststackpage.set({appearance: "hym-submenubutton", label: "Dashboard"});
      var tbtnmenuSecondPage = tbtnSecondPage.clone();
      tbtnmenuSecondPage.set({appearance: "hym-mainmenubutton", label: "Settings"});
      var tbtnmenuThirdPage = tbtnThirdPage.clone();
      tbtnmenuThirdPage.set({appearance: "hym-mainmenubutton", label: "Feedback"});

      // Add the clones to the Main Menu Popup
      /*mainmenupopup.add(atmmenuleftnavheader);
      mainmenupopup.add(tbtnmenufirststackpage);
      mainmenupopup.add(tbtnmenuSecondPage);
      mainmenupopup.add(tbtnmenuThirdPage);
      mainmenupopup.add(new qx.ui.core.Spacer(), {flex: 1});
      mainmenupopup.add(new qx.ui.basic.Label("Bottom of area").set({textAlign: "center", allowGrowX: true, height: 40}));*/

      mobilemodalfullwindow.add(tbtnmenuheaderMyStuff);
      mobilemodalfullwindow.add(tbtnmenusubmything);
      mobilemodalfullwindow.add(tbtnmenufirststackpage);
      mobilemodalfullwindow.add(tbtnmenuSecondPage);
      mobilemodalfullwindow.add(tbtnmenuThirdPage);

      // Assign all the clones their own RadioGroup
      var mainmenubuttongroup = new qx.ui.form.RadioGroup();
      mainmenubuttongroup.add(tbtnmenusubmything, tbtnmenufirststackpage, tbtnmenuSecondPage, tbtnmenuThirdPage);

      mainmenubuttongroup.setSelection([tbtnmenufirststackpage]);

      // --Drawer--
      // Turn off auto hide so we can animate the closing of the main menu popup
      mainmenupopup.setAutoHide(false);

      // --Drawer--
      if (!mainmenupopup.getAutoHide()) {
        mainmenupopup.addListenerOnce("appear", function(e) {
          var domtable = mainmenupopup.getContentElement().getDomElement();
          qx.event.Registration.addListener(document.documentElement, "pointerdown",function(e){
            var target = qx.ui.core.Widget.getWidgetByElement(e.getTarget());
            if (mainmenupopup.isVisible() & target != mainmenupopup & !qx.ui.popup.Manager.getInstance().getContainsFunction()(mainmenupopup, target)) {
              this._blocker.unblock();
              qx.bom.element.Animation.animateReverse(domtable, fadeinleft).addListener("end", function() {
                mainmenupopup.exclude();
              });
            }
          }, this, true);
          
        }, this);
      }

      // --Drawer--
      mainmenupopup.addListener("appear", function(e) {
        var domtable = mainmenupopup.getContentElement().getDomElement();  
        qx.bom.element.Animation.animate(domtable, fadeinleft);
      }, this);

      // Hide all popups on window blur --Drawer--
      qx.bom.Element.addListener(window, "blur", function() {
        if (mainmenupopup.getVisibility() == "visible"){
          this._blocker.unblock();
          var domtable = mainmenupopup.getContentElement().getDomElement();
          qx.bom.element.Animation.animateReverse(domtable, fadeinleft).addListener("end", function() {
            mainmenupopup.hide();
          });
        }
      }, this);

      // --Drawer--
      approot.addListener("resize", function(e) {
        if (mainmenupopup.getVisibility() == "visible" & !mainmenupopup.getAutoHide()){
          mainmenupopup.setHeight(e.getData().height);
        }
      });






      // *** END of Main Menu and Main Menu Popup **********************************
    
      // *** Populate the Hybrid Mobile (hym) Main Menu  content *******************
      // Create Menu Buttons that will navigate the user through THE STACK Pages ***

      // Populate southbox with content
      var tbtnfirststackpagehym = new ville.wax.demo.MenuButton("Home").set({appearance: "mainmenubutton-hym-home", iconPosition: "top"});
      tbtnfirststackpagehym.getChildControl("icon").set({ scale : true, width: 28, height: 28 });
      var tbtnsecondstackpagehym = new ville.wax.demo.MenuButton("Second").set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      tbtnsecondstackpagehym.getChildControl("icon").set({ scale : true, width: 28, height: 28 });
      var tbtnthirdpagehym = new ville.wax.demo.MenuButton("Third").set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      tbtnthirdpagehym.getChildControl("icon").set({ scale : true, width: 28, height: 28 });
      var tbtnmenuhym = new ville.wax.demo.MenuButton("Menu").set({appearance: "mainmenubutton-hym-menu", iconPosition: "top"});
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

      // Popup menu buttons
      tbtnmenufirststackpage.addListener("changeValue", function(e) {
        if (e.getData()) {
          //centerbox.setSelection([firstscrollstackpage]);
          //westboxbuttongroup.setSelection([tbtnfirststackpage]);
          
          if (mainmenupopup.getVisibility() == "visible"){
            this._blocker.unblock();
            var domtable = mainmenupopup.getContentElement().getDomElement();
            qx.bom.element.Animation.animateReverse(domtable, fadeinleft).addListener("end", function() {
              mainmenupopup.hide();

            });
          }
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
          atmlogocurrentpage.set({show: "both", label:"Home"});
        }
      }, this);

      tbtnsecondstackpagehym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([secondstackpage]);
          atmlogocurrentpage.set({show: "both", label:"Second Page"});
        }
      }, this);

      tbtnthirdpagehym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([thirdstackpage]);
          atmlogocurrentpage.set({show: "both", label:"Third Page"});
        }
      }, this);

      tbtnmenuhym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([menuscrollstackpage]);
          //atmlogocurrentpage.set({show: "both", label:"Menu"});
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

    __createDetailWindow : function()
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