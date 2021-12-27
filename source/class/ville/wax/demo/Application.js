/* ************************************************************************

   Copyright: 2021 sqville

   License: MIT license

   Authors: Chris Eskew (sqville) chris.eskew@sqville.com

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
 */
qx.Class.define("ville.wax.demo.Application",
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
      init : "desktop"
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
    
    _northBox : null,
    
    _westBox : null,

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
      // *** Base Scaffolding are objects common to all Wax - Franklin based apps  ***********

      // Change Widget to enable touch action for native scrolling
      qx.Class.include(qx.ui.core.Widget, ville.wax.MWidget); 

      // App's Root
      var approot = this.getRoot();
      approot.setBackgroundColor("black");

      // Add a Blocker to the application's root for the Main Menu Popup
      this._blocker = new qx.ui.core.Blocker(approot).set({color: "black", opacity: .08});
      
      // App's main Container (Composite) with Dock Layout 
      var appcompdock = new qx.ui.container.Composite(new qx.ui.layout.Dock(0, 0)).set({backgroundColor: "white"});
      
      // Dock's North section (Canvas)
      var northhbox = this._northBox = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({backgroundColor: "white", decorator : "topheader"});

      // Dock's West section (VBox)
      var westbox = this._westBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({backgroundColor: "white", padding: [10,0,10,10], decorator : "leftside"});

      // Dock's Center section (Stack) === THE STACK ===
      var centerbox = new qx.ui.container.Stack().set({backgroundColor: "white", padding: 0});

      // phone/phonegap
      //if (qx.core.Environment.get("phonegap")) {
      var southbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(4)).set({alignY: "middle", padding: [8,4,34,4], decorator: "bottombar"});
      //}

      // West Scroll area to fit all menu items
      var scrollwestbox = new qx.ui.container.Scroll().set({scrollbarX: "off", minWidth: 231, padding: 0, margin: 0, contentPadding: [0,0,0,0]});

      // Center Scroll area to fit all content
      //var scrollcenterbox = new qx.ui.container.Scroll().set({padding: 0, margin: 0, contentPadding: [0,0,0,0]});
      var scrollcenterbox = new ville.wax.scroll.Scroll().set({overflow: ["hidden", "auto"], padding: 0, margin: 0, contentPadding: [0,0,0,0]});

      // === North Toolbar, Parts and Buttons ===
      var northtoolbar = new qx.ui.toolbar.ToolBar().set({backgroundColor: "white"});
      var mainmenupart = new qx.ui.toolbar.Part(); //Top-Left of the screen 
      var profilepart = new qx.ui.toolbar.Part(); // Top-Right of the screen

      // Icon Images dsfdf
      var menuimage = "ville/wax/round-menu-24px.svg";
      var roundacct = "ville/wax/round-account_circle-24px.svg";

      // Top-Left Button
      var mainmenubtnbutton = new qx.ui.toolbar.Button("MainMenu", menuimage).set({show: "icon"});

      // Top-Right MenuButton
      var profilemenubutton = new qx.ui.toolbar.MenuButton("ProfileMenu", roundacct).set({show: "icon", showArrow: false});
      
      // Main Menu Popup (VBox)
      var mainmenupopup = new qx.ui.popup.Popup().set({allowStretchX: true, allowStretchY: true, padding: 10, minWidth: 300});
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
      //winAboutWax.add(new qx.ui.core.Spacer(30, 20), {flex: 1});
      winAboutWax.add(btnClosewinAbout);
      /*winAboutWax.addListener("execute", function(e) {
        winAboutWax.restore();
        winAboutWax.center();
        winAboutWax.show();
      }, this);*/
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
      mainmenubtnbutton.addListener("execute", function(e)
      {
        if (qx.core.Environment.get("browser.name") != "edge"){
          this._blocker.blockContent(mainmenubtnbutton.getZIndex());
        }
        mainmenupopup.setHeight(parseInt(this.getRoot().getContentElement().getStyle("height")));
        mainmenupopup.show();
      }, this);
      

      // Assemble all base pieces  
      scrollwestbox.add(westbox);
      scrollcenterbox.add(centerbox);
      appcompdock.add(northhbox, {edge:"north"});
      appcompdock.add(scrollwestbox, {edge:"west"});
      appcompdock.add(scrollcenterbox, {edge:"center"});
      approot.add(appcompdock, {edge: 0});
      profilemenu.add(switchmenubutton1);
      profilemenu.add(aboutmenubutton1);
      profilemenubutton.setMenu(profilemenu);

      //var atmlogocurrentpage = new qx.ui.basic.Atom("Wax","ville/wax/Wax_demo_logo.svg").set({font: "hym-app-header", gap: 10, padding: 0, visibility: "hidden"});
      //atmlogocurrentpage.getChildControl("icon").set({ scale: true, width: 48, height: 38 });
      var atmlogocurrentpage = new qx.ui.basic.Atom("Wax").set({font: "hym-app-header", gap: 10, padding: 0, visibility: "hidden"});
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
      var stackpagevboxspacing = 10;

      // First/Home Page
      var firststackpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(stackpagevboxspacing)).set({padding: stackpagepadding});  
      // first page header
      var lblfirstpageheader = new qx.ui.basic.Label("Home").set({font: stackpageheaderfont});
      // first page - assemble
      firststackpage.add(lblfirstpageheader);

      var mcheckbox = new qx.ui.form.CheckBox("Prefer this to look different").set({appearance: "wax-switch"});
      firststackpage.add(mcheckbox);

      var btnOpenwin = new qx.ui.form.Button("Open Window").set({allowGrowX: false});
      var winDrawer = this.__createDetailWindow();
      winDrawer.set({height: 500, width:600});
      winDrawer.setLayout(new qx.ui.layout.Canvas());
      var winbtndrawer = new qx.ui.form.Button("Open Window Drawer").set({allowGrowX: false});
      winDrawer.add(winbtndrawer);

            //***  CODE for applying popup fading in and out  ***//
            var fadeinleft = {
              duration: 300, timing: "ease-out", origin: "left top", keep: 100,
              keyFrames : {
                0: {opacity: 0, left: "-300px"},
                100: {opacity: 1, left: "0px"}
              }
            };

      // tested using popup
      var winmenupopup = new qx.ui.popup.Popup().set({allowGrowX: false, padding: 10, minWidth: 300});
      winmenupopup.setLayout(new qx.ui.layout.VBox(0));
      winmenupopup.setAutoHide(false);
      winmenupopup.add(new qx.ui.basic.Label("This is a window drawer"));
      var btnclosewinmenupopup = new qx.ui.form.Button("Close drawer");
      btnclosewinmenupopup.addListener("execute", function() {
        winDrawer.remove(winmenupopup);
      });
      winmenupopup.add(btnclosewinmenupopup);

      winbtndrawer.addListener("execute", function() {
        winmenupopup.setHeight(parseInt(winDrawer.getChildControl("pane").getContentElement().getStyle("height")));
        winDrawer.add(winmenupopup);
        //winmenupopup.getContentElement().removeStyle("position");
        winmenupopup.setVisibility("visible");
      });

      winmenupopup.addListener("appear", function() {
        this.setDomPosition(0,0);
        var domtable = this.getContentElement().getDomElement();  
        qx.bom.element.Animation.animate(domtable, fadeinleft)
      });

      firststackpage.add(btnOpenwin);

      btnOpenwin.addListener("execute", function() {
        winDrawer.center();
        winDrawer.show();
      });


      //--START--// Animate toggle switch //--//--//
      var slideright = {
        duration: 300, 
        timing: "ease", 
        keyFrames : {
          0: {"backgroundColor": "#e3e2e2", "background-position-x": "0%", "border-color": "#e3e2e2"},
          100: {"backgroundColor": "blue", "background-position-x": "100%", "border-color": "blue"}
        },
        keep : 100
      };

      mcheckbox.addListener("changeValue", function(e) {
        var cbimage = mcheckbox.getChildControl("icon").getContentElement().getDomElement();
        if (e.getData())
          qx.bom.element.AnimationCss.animate(cbimage, slideright);
        else
          qx.bom.element.AnimationCss.animateReverse(cbimage, slideright);
      }, this); 
      //--//--// Animate toggle switch //--END--//


      // Second Page 
      var secondstackpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(stackpagevboxspacing)).set({padding: stackpagepadding});
      var lblsecondpageheader = new qx.ui.basic.Label("Second Page").set({font: stackpageheaderfont});
      secondstackpage.add(lblsecondpageheader); 
      
      var mtabView = new qx.ui.tabview.TabView();

      var page1 = new qx.ui.tabview.Page("Home").set({appearance: "wax-tabview-page"});
      page1.setLayout(new qx.ui.layout.VBox());
      page1.add(new qx.ui.basic.Label("Home Page"));
      mtabView.add(page1);

      var page2 = new qx.ui.tabview.Page("Next Long").set({appearance: "wax-tabview-page"});
      page2.setLayout(new qx.ui.layout.VBox());
      page2.add(new qx.ui.basic.Label("Next Long Page"));
      mtabView.add(page2);

      var page3 = new qx.ui.tabview.Page("Last Very Long").set({appearance: "wax-tabview-page"});
      page3.setLayout(new qx.ui.layout.VBox());
      page3.add(new qx.ui.basic.Label("Last Very Long Page"));
      mtabView.add(page3);

      secondstackpage.add(mtabView);

      mtabView.setSelection([page2]);

      //--START--// Animate tabview //--//--//
      var tabviewbarmark = new qx.ui.core.Widget().set({backgroundColor: "blue", zIndex: 5});
      //add the widget to the tabview's bar
      mtabView.getChildControl("bar").add(tabviewbarmark); 

      //animate the widget when the tabview's selection changes
      mtabView.addListener("changeSelection", function(e) {
        //previous tabview buttons location and size details
        var oldbounds = e.getOldData()[0].getChildControl("button").getBounds();
        //the clicked tabview buttons location and size details
        var newbounds = e.getData()[0].getChildControl("button").getBounds();
        //grab the marks dom element
        var tbvmarkdom = tabviewbarmark.getContentElement().getDomElement();
        // build and adjust the animation each time since tabview buttons vary in size and location
        var tabviewbarmarkmove = {
          duration: 300, 
          timing: "ease", 
          keyFrames : {
            0: {"left": oldbounds.left + "px", "top": oldbounds.top + "px", "width": oldbounds.width + "px", "height": oldbounds.height + "px"},
            100: {"left": newbounds.left + "px", "top": newbounds.top + "px", "width": newbounds.width + "px", "height": newbounds.height + "px"}
          },
          keep : 100
        };
        //run the animation on the marks dom element
        qx.bom.element.AnimationCss.animate(tbvmarkdom, tabviewbarmarkmove);
      }, this); 
      //--//--// Animate tabview //--END--//
      mtabView.addListenerOnce("appear", function() {
        var movetobounds = mtabView.getSelection()[0].getChildControl("button").getBounds();
        //tabviewbarmark.setUserBounds(movetobounds.left, movetobounds.top, movetobounds.width, movetobounds.height);
        tabviewbarmark.getContentElement().setStyles({
          "left": movetobounds.left + "px", 
          "top": movetobounds.top + "px", 
          "width": movetobounds.width + "px", 
          "height": movetobounds.height + "px"
        });
      })

      

      // Third Page
      var thirdstackpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(stackpagevboxspacing)).set({padding: stackpagepadding});
      var lblthirdpageheader = new qx.ui.basic.Label("Third Page").set({font: stackpageheaderfont});     
      thirdstackpage.add(lblthirdpageheader);




      // Menu Page for mobile only
      var menupage = new qx.ui.container.Composite(new qx.ui.layout.VBox(10, null, "separator-vertical")).set({padding: [60, 0, 0, 0]});
      var btnAbout = new qx.ui.form.Button("About Wax", "ville/wax/wireframe-image-sm.png").set({appearance : "hym-page-button"});
      var btnSwitchBack = new qx.ui.form.Button("Switch to Desktop", "ville/wax/wireframe-image-sm.png").set({appearance : "hym-page-button"});
      var btnProfile = new qx.ui.form.Button("Profile", "ville/wax/wireframe-image-sm.png").set({appearance : "hym-page-button"});
      var btnSettings = new qx.ui.form.Button("Settings", "ville/wax/wireframe-image-sm.png").set({appearance : "hym-page-button"});
      var btnLogout = new qx.ui.form.Button("Logout", "ville/wax/wireframe-image-sm.png").set({appearance : "hym-page-button"});
      
      var lblwaxdemo = new qx.ui.basic.Label("WAX DEMO").set({paddingLeft: 20, textColor: "gray"});
      menupage.add(lblwaxdemo);
      menupage.add(btnSwitchBack);
      menupage.add(btnAbout);
      menupage.add(new qx.ui.basic.Label("ADDITIONAL FEATURES").set({paddingLeft: 20, paddingTop: 38, textColor: "gray"}));
      menupage.add(btnProfile);
      menupage.add(btnSettings);
      menupage.add(btnLogout);

      // Test mobile modal window animations
      var mobilemodalwindow = new qx.ui.window.Window("Detail Window").set({ width: 300, height: 200, appearance: "wax-window", allowMaximize : false, allowMinimize : false, modal: true, movable: true });
      mobilemodalwindow.setLayout(new qx.ui.layout.VBox(4));
      mobilemodalwindow.add(new qx.ui.basic.Label("I am a modal window"));

      // Scroll feature
      var centerscrollcontentEl = scrollcenterbox.getChildControl("pane").getContentElement();
      centerscrollcontentEl.addListener("scroll", function(){
        //console.log(scrollcenterbox.getItemTop(lblwaxdemo));
        //console.log(centerscrollcontentEl.getScrollY());
        if (centerscrollcontentEl.getScrollY() > 73) {
          atmlogocurrentpage.set({show: "both", label:"WAX DEMO"});
        } else {
          atmlogocurrentpage.set({show: "both", label:"Menu"});
        }
          
      });

      //***  CODE for applying popup fading in and out  ***//
      var scaleback = {
        duration: 500, 
        timing: "cubic-bezier(0.165, 0.84, 0.44, 1)", 
        keyFrames : {
          0: {scale: 1},
          100: {scale: .85}
        },
        keep : 100
      };

      btnProfile.addListener("execute", function(e) {
        var appdockdom = appcompdock.getContentElement().getDomElement();
        appcompdock.setDecorator("scaledback-box");
        qx.bom.element.AnimationCss.animate(appdockdom, scaleback);
        mobilemodalwindow.restore();
        mobilemodalwindow.center();
        mobilemodalwindow.show();
      }, this);

      mobilemodalwindow.addListener("close", function(e) {
        var appdockdom = appcompdock.getContentElement().getDomElement();
        //appcompdock.setDecorator("scaledback-box");
        qx.bom.element.AnimationCss.animateReverse(appdockdom, scaleback);
      }, this);



    
      // Assemble - THE STACK 
      centerbox.add(firststackpage);
      centerbox.add(secondstackpage);
      centerbox.add(thirdstackpage);
      centerbox.add(menupage);

      // Show the default page
      centerbox.setSelection([firststackpage]);

      btnAbout.addListener("execute", function(e) {
        winAboutWax.restore();
        winAboutWax.maximize();
        winAboutWax.center();
        winAboutWax.show();
      }, this);

      // *** END of THE STACK ******************************************************
      
      // *** Populate the Main Menu and Popup Main Menu with content ***************
      // Create Menu Buttons that will navigate the user through THE STACK Pages ***
      // Populate westBox with content
      var atmleftnavheader = new qx.ui.basic.Atom("Wax Demo", "ville/wax/Wax_demo_logo.png").set({appearance: "header-atom", anonymous: true, focusable: false, selectable: false });
      atmleftnavheader.getChildControl("icon").set({ scale : true });
      westbox.add(atmleftnavheader);
      var tbtnfirststackpage = new ville.wax.demo.MenuButton("Home");
      tbtnfirststackpage.getChildControl("icon").set({ scale : true , width: 28, height: 28});
      westbox.add(tbtnfirststackpage);

      var tbtnSecondPage = new ville.wax.demo.MenuButton("Second Page");
      tbtnSecondPage.getChildControl("icon").set({ scale : true , width: 28, height: 28});
      westbox.add(tbtnSecondPage);

      var tbtnThirdPage = new ville.wax.demo.MenuButton("Third Page");
      tbtnThirdPage.getChildControl("icon").set({ scale : true , width: 28, height: 28});
      westbox.add(tbtnThirdPage);

      westbox.add(new qx.ui.core.Spacer(), {flex: 1});
      westbox.add(new qx.ui.basic.Label("Bottom of area").set({textAlign: "center", allowGrowX: true, height: 40}));

      var westboxbuttongroup = new qx.ui.form.RadioGroup();
      westboxbuttongroup.add(tbtnfirststackpage, tbtnSecondPage, tbtnThirdPage);

      //--START--// Animate westbox nav //--//--//
      /*var westboxmark = new qx.ui.core.Widget();
      westbox.add(westboxmark);
      westboxbuttongroup.addListener("changeSelection", function(e) {
        if (e.getOldData()[0].getBounds() && e.getData()[0].getBounds()){
          var oldbounds = e.getOldData()[0].getBounds();
          var newbounds = e.getData()[0].getBounds();
          westboxmark.set({decorator : "mainmenubutton-box-mark"});
          e.getData()[0].setDecorator("mainmenubutton-box-new");
          //grab the marks dom element
          var westboxmarkdom = westboxmark.getContentElement().getDomElement();
          // build and adjust the animation each time since tabview buttons vary in size and location
          var westboxmarkmove = {
            duration: 300, 
            timing: "ease", 
            keyFrames : {
              0: {"left": oldbounds.left + "px", "top": oldbounds.top + "px", "width": oldbounds.width + "px", "height": oldbounds.height + "px"},
              100: {"left": newbounds.left + "px", "top": newbounds.top + "px", "width": newbounds.width + "px", "height": newbounds.height + "px"}
            },
            keep : 100
          };
          //run the animation on the marks dom element
          qx.bom.element.AnimationCss.animate(westboxmarkdom, westboxmarkmove);
        }
      }); */
      //--//--// Animate westbox nav //--END--//

      /*tbtnfirststackpage.addListener("appear", function(e) {
        westboxmark.set({opacity : .08, backgroundColor : "blue"});
        this.setBackgroundColor("yellow");
        westboxmark.setDomPosition(0, 0);
      });*/
      
     
      

      
      // CLONE the above controls
      var atmmenuleftnavheader = atmleftnavheader.clone();
      atmmenuleftnavheader.getChildControl("icon").set({ scale : true });
      var tbtnmenufirststackpage = tbtnfirststackpage.clone();
      tbtnmenufirststackpage.getChildControl("icon").set({ scale : true });
      var tbtnmenuSecondPage = tbtnSecondPage.clone();
      tbtnmenuSecondPage.getChildControl("icon").set({ scale : true });
      var tbtnmenuThirdPage = tbtnThirdPage.clone();
      tbtnmenuThirdPage.getChildControl("icon").set({ scale : true });

      // Add the clones to the Main Menu Popup
      mainmenupopup.add(atmmenuleftnavheader);
      mainmenupopup.add(tbtnmenufirststackpage);
      mainmenupopup.add(tbtnmenuSecondPage);
      mainmenupopup.add(tbtnmenuThirdPage);
      mainmenupopup.add(new qx.ui.core.Spacer(), {flex: 1});
      mainmenupopup.add(new qx.ui.basic.Label("Bottom of area").set({textAlign: "center", allowGrowX: true, height: 40}));



      // Assign all the clones their own RadioGroup
      var mainmenubuttongroup = new qx.ui.form.RadioGroup();
      mainmenubuttongroup.add(tbtnmenufirststackpage, tbtnmenuSecondPage, tbtnmenuThirdPage);
      
      


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
      })




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

      southbox.setVisibility("excluded");

      // Assign all the clones their own RadioGroup
      var mainmenubuttongrouphym = new qx.ui.form.RadioGroup();
      mainmenubuttongrouphym.add(tbtnfirststackpagehym, tbtnsecondstackpagehym, tbtnthirdpagehym, tbtnmenuhym);

      // *** END of Hybrid Mobil (hym) Main Menu and Main Menu Popup ******************************


      // *** Wire all the Main Menu Buttons to THE STACK Pages (via Listeners) ********************
      // Turn on all wax.demo.MenuButton listeners
      tbtnfirststackpage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([firststackpage]);
          mainmenubuttongroup.setSelection([tbtnmenufirststackpage]);
        }
      }, this);

      tbtnSecondPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([secondstackpage]);
          mainmenubuttongroup.setSelection([tbtnmenuSecondPage]);
        }
      }, this);

      tbtnThirdPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([thirdstackpage]);
          mainmenubuttongroup.setSelection([tbtnmenuThirdPage]);
        }
      }, this);

      // Popup menu buttons
      tbtnmenufirststackpage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([firststackpage]);
          westboxbuttongroup.setSelection([tbtnfirststackpage]);
          
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
          centerbox.setSelection([secondstackpage]);
          westboxbuttongroup.setSelection([tbtnSecondPage]);

          firststackpage.setVisibility("excluded");

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
          centerbox.setSelection([thirdstackpage]);
          westboxbuttongroup.setSelection([tbtnThirdPage]);

          firststackpage.setVisibility("excluded");

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
          centerbox.setSelection([firststackpage]);
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
          centerbox.setSelection([menupage]);
          atmlogocurrentpage.set({show: "both", label:"Menu"});
        }
      }, this);

      // Demo mode switching to Mobile
      switchmenubutton1.addListener("execute", function(e){
        this.setDemoMode("mobile");
        southbox.setVisibility("visible");
        scrollwestbox.setVisibility("excluded");
        profilemenubutton.setVisibility("hidden");
        mainmenupart.setVisibility("hidden");
        centerbox.setSelection([menupage]);
        atmlogocurrentpage.set({visibility: "visible", label:"Menu"});
        mainmenubuttongrouphym.setSelection([tbtnmenuhym]);
      }, this);

      // Demo mode switching back to desktop
      btnSwitchBack.addListener("execute", function(e){
        this.setDemoMode("desktop");
        southbox.setVisibility("excluded");
        profilemenubutton.setVisibility("visible");
        atmlogocurrentpage.setVisibility("hidden");
        mainmenupart.setVisibility("visible");
        centerbox.setSelection([firststackpage]);
        mainmenubuttongroup.setSelection([tbtnmenufirststackpage]);
        westboxbuttongroup.setSelection([tbtnfirststackpage]);
      }, this);

      //westboxbuttongroup.setSelection([tbtnSecondPage]);


      // *** END of Wiring *************************************************************************

      
      // ====================================
      // =======  MediaQuery code  ========== 
      // ====================================

      var mq1 = new qx.bom.MediaQuery("screen and (min-width: 1024px)");

      mq1.on("change", function(e){
        if(mq1.isMatching() && this.getDemoMode()=="desktop"){
          scrollwestbox.setVisibility("visible"); 
          mainmenupart.setVisibility("excluded");
        }
        else {
          scrollwestbox.addListener("appear", function(e) {
            var domtable = scrollwestbox.getContentElement().getDomElement();
            qx.bom.element.Animation.animate(domtable, fadeinleft);
          }, this); 
          scrollwestbox.setVisibility("excluded");
          if (this.getDemoMode() == "desktop")
            mainmenupart.setVisibility("visible");
        }
      }, this);
      if (mq1.isMatching()) {
        scrollwestbox.setVisibility("visible"); 
        mainmenupart.setVisibility("excluded");
      }
      else {
        scrollwestbox.addListener("appear", function(e) {
          var domtable = scrollwestbox.getContentElement().getDomElement();
          qx.bom.element.Animation.animate(domtable, fadeinleft);
        }, this); 
        scrollwestbox.setVisibility("excluded"); 
        mainmenupart.setVisibility("visible");
      }

      var mq2 = new qx.bom.MediaQuery("screen and (min-width: 767px)");

      mq2.on("change", function(e){
        if(mq2.isMatching()){}
        else {}
      });

      if (mq2.isMatching()) {}
      else {}
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