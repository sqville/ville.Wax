/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "${Name}"
 *
 * @asset(${NamespacePath}/*)
 */
qx.Class.define("${Namespace}.Application",
{
  extend : qx.application.Standalone,



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
      
      // >>> START of Base Scaffolding >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // >>> Base Scaffolding are objects common to all Wax - Franklin based apps  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

      // App's Root
      var approot = this.getRoot();

      // Add a Blocker to the application's root for the Main Menu Popup
      this._blocker = new qx.ui.core.Blocker(approot).set({color: "black", opacity: .08});
      
      // App's main Container (Composite) with Dock Layout 
      var appcompdock = new qx.ui.container.Composite(new qx.ui.layout.Dock(0, 0)).set({backgroundColor: "transparent"});
      
      // Dock's North section (Canvas)
      var northhbox = this._northBox = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({backgroundColor: "white", decorator : "topheader"});

      // Dock's West section (VBox)
      var westbox = this._westBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({backgroundColor: "white", padding: [10,0,10,0], decorator : "leftside"});

      // Dock's Center section (Stack) === THE STACK ===
      var centerbox = new qx.ui.container.Stack().set({backgroundColor: "white", padding: 0});

      // phonegap
      //if (qx.core.Environment.get("phonegap")) {
        var southbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(4)).set({alignY: "middle", padding: [0,4,0,4], decorator: "bottombar"});
      //}

      // West Scroll area to fit all menu items
      var scrollwest = new qx.ui.container.Scroll();
      scrollwest.set({padding: 0, margin: 0, contentPadding: [0,0,0,0]});

      // Center Scroll area to fit all content
      var scroll = new qx.ui.container.Scroll();
      //var scroll = new qx.ui.core.scroll.NativeScrollBar("vertical");
      scroll.set({padding: 0, margin: 0, contentPadding: [0,0,0,0]});
      //scroll.setDragScrollSlowDownFactor(0);
      //scroll.set({padding: 0, margin: 0});

      // === North Toolbar, Parts and Buttons ===
      var northtoolbar = new qx.ui.toolbar.ToolBar().set({backgroundColor: "white"});
      var mainmenupart = new qx.ui.toolbar.Part(); //Top-Left of the screen 
      var profilepart = new qx.ui.toolbar.Part(); // Top-Right of the screen

      // Top-Left Button
      var mainmenubtnbutton = new qx.ui.toolbar.Button("MainMenu", "${NamespacePath}/round-menu-24px.svg").set({show: "icon"});

      // Top-Right MenuButton
      var profilemenubutton = new qx.ui.toolbar.MenuButton("ProfileMenu", "${NamespacePath}/round-account_circle-24px.svg").set({show: "icon", showArrow: false});
      
      // Main Menu Popup (VBox)
      var mainmenupopup = new qx.ui.popup.Popup().set({allowGrowY: true, padding: 10});
      mainmenupopup.setLayout(new qx.ui.layout.VBox(0));

      // Profile and Settings Menu and Menu Buttons
      var profilemenu = new qx.ui.menu.Menu().set({spacingX: 12});
      var profilemenubutton1 = new qx.ui.menu.Button("Edit my profile", "${NamespacePath}/edit-24px.svg").set({padding: 10});
      var settingsmenubutton = new qx.ui.menu.Button("Settings", "${NamespacePath}/outline-settings-24px.svg").set({padding: 10});
      var logoutmenubutton = new qx.ui.menu.Button("Log out", "${NamespacePath}/exit_to_app-24px.svg").set({padding: 10});

      // Search Button (hybrid mobile)
      var btnsearchbutton = new qx.ui.toolbar.Button("Search", "${NamespacePath}/baseline-search-24px.svg").set({show: "icon"});

      // Back Button (hybrid mobile)
      var btnbackbutton = new qx.ui.toolbar.Button("Back", "${NamespacePath}/baseline-chevron_left-24px.svg").set({show: "icon"});
      
      // Add Main Menu Popup Listeners
      mainmenubtnbutton.addListener("execute", function(e)
      {
        if (qx.core.Environment.get("browser.name") != "edge"){
          this._blocker.blockContent(mainmenubtnbutton.getZIndex());
        }
        mainmenupopup.show();
      }, this);
      mainmenupopup.addListener("disappear", function(e)
      {
        this._blocker.unblock();
      }, this);

      // Assemble all base pieces  
      scrollwest.add(westbox);
      scroll.add(centerbox);
      appcompdock.add(northhbox, {edge:"north"});
      appcompdock.add(scrollwest, {edge:"west"});
      appcompdock.add(scroll, {edge:"center"});
      approot.add(appcompdock, {edge: 0});
      profilemenu.add(profilemenubutton1);
      profilemenu.add(settingsmenubutton);
      profilemenu.add(logoutmenubutton);
      profilemenubutton.setMenu(profilemenu);
      northtoolbar.add(mainmenupart);
      if (qx.core.Environment.get("phonegap")) {
        var atmlogocurrentpage = new qx.ui.basic.Atom("${Namespace}","${NamespacePath}/wax_logo-24px.svg").set({font: "hym-app-header", gap: 6, paddingLeft: 35});
        northtoolbar.addSpacer();
        northtoolbar.add(atmlogocurrentpage);
        //mainmenupart.add(btnbackbutton);    
        profilepart.add(btnsearchbutton);
      } else {
        mainmenupart.add(mainmenubtnbutton);
        profilepart.add(profilemenubutton);
      }
      northtoolbar.addSpacer();
      northtoolbar.add(profilepart);
      northhbox.add(northtoolbar, {left: 0, right: 0});
      // Scaffolding has been created and assembled

      // phonegap
      if (qx.core.Environment.get("phonegap")) {
        appcompdock.add(southbox, {edge: "south"});
      }

      // <<< END of Base Scaffolding <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      // Add some simple ease in animation to the app's blocker
      var fadeinb = {duration: 300, timing: "ease", keyFrames : {
        0: {opacity: 0},
        100: {opacity: .08}
        }};

      this._blocker.addListener("blocked", function(e) {
        var domtable;
        if (domtable = this._blocker.getBlockerElement().getDomElement()) {
          qx.bom.element.Animation.animate(domtable, fadeinb);
        }
      }, this);



      // >>> Populate THE STACK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Four page stack EXAMPLE
       // Dashboard Page with Flow layout
       // Overview Page with links to a Detail Page
       // Table to List Page - shows how the Table Widget converts to a List Widget for smaller screens
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      var dashboardpage = new qx.ui.container.Composite().set({padding: 20});
      var overviewpage = new qx.ui.container.Composite(new qx.ui.layout.VBox(20)).set({padding: 20});
      var gallerypage = new qx.ui.container.Composite(new qx.ui.layout.VBox(20)).set({padding: 20});
      var tablelistpage = new qx.ui.container.Composite().set({padding: 20});
      
      //more structure
      dashboardpage.setLayout(new qx.ui.layout.VBox(6).set({alignX: "left"}));
      var dashboardsubpage1 = new qx.ui.container.Composite();
      var dashboardflow = new qx.ui.layout.Flow(16,20,"left");
      dashboardsubpage1.setLayout(dashboardflow);


      // Controls
      // First page marker 
      var label1 = new qx.ui.basic.Label("My Default Dashboard").set({font: "control-header"});
      // GroubBox
      var groupbox1 = new ${Namespace}.GroupBox("First GroupBox for Wax", "${NamespacePath}/baseline-directions_subway-24px.svg", true, true, false);
      groupbox1.setLayout(new qx.ui.layout.VBox());
      var piechartimage = new qx.ui.basic.Image("${NamespacePath}/pie_chart-24px.svg").set({scale: true, width: 272, height: 272});

      var groupbox2 = new ${Namespace}.GroupBox("Second GroupBox for Wax", "${NamespacePath}/local_airport-24px.svg", true, true, false);
      groupbox2.setLayout(new qx.ui.layout.VBox());

      var groupbox3 = new ${Namespace}.GroupBox("Third GroupBox for Wax - with linebreak", "${NamespacePath}/commute-24px.svg", true, true, false);
      groupbox3.setLayout(new qx.ui.layout.VBox());

      var groupbox4 = new ${Namespace}.GroupBox("Forth GroupBox for Wax - Flow within a Flow", "${NamespacePath}/local_dining-24px.svg", true, true, false);
      var groupbox4flow = new qx.ui.layout.Flow(6,6,"center");
      groupbox4.setLayout(groupbox4flow);
      groupbox4.set({allowShrinkX: true, allowShrinkY: true, allowGrowX: true, allowGrowY: true}); 
      groupbox4.add(new qx.ui.basic.Image("${NamespacePath}/bar_chart-24px.svg").set({scale: true, width: 222, height: 222}));
      groupbox4.add(new qx.ui.basic.Image("${NamespacePath}/bar_chart-24px.1.svg").set({scale: true, width: 222, height: 222}));
      groupbox4.add(new qx.ui.basic.Image("${NamespacePath}/bar_chart-24px.2.svg").set({scale: true, width: 222, height: 222}));
      groupbox4.add(new qx.ui.basic.Atom("Year over year growth shows how the market favored the bold","${NamespacePath}/bolt-24px.svg").set({rich: true, width: 200, height: 142}));

      var barchartimage = new qx.ui.basic.Image("${NamespacePath}/view_compact-24px.svg").set({scale: true, width: 312, height: 312});
      var bubblechartimage = new qx.ui.basic.Image("${NamespacePath}/bubble_chart-24px.svg").set({scale: true, width: 312, height: 312});
      
      groupbox1.add(piechartimage);
      groupbox1.add(new qx.ui.basic.Label("<b>Results:</b> Half of the pie is divided").set({rich: true}));
      var labelenv = new qx.ui.basic.Label("device.name=" + qx.core.Environment.get("device.name") + "<br>device.type=" + qx.core.Environment.get("device.type") + "<br>browser.name=" + qx.core.Environment.get("browser.name") + "<br>browser.version=" + qx.core.Environment.get("browser.version") + "<br>os.name=" + qx.core.Environment.get("os.name") + "<br>os.version=" + qx.core.Environment.get("os.version") + "<br>engine.name=" + qx.core.Environment.get("engine.name") + "<br>phonegap=" + qx.core.Environment.get("phonegap") + "<br>phonegap.notification=" + qx.core.Environment.get("phonegap.notification") + "<br>runtime.name=" + qx.core.Environment.get("runtime.name")).set({rich: true});
      groupbox2.add(labelenv);
      //groupbox2.add(barchartimage);
      //groupbox2.add(new qx.ui.basic.Label("<b>Overview:</b> Room will be configured in this manner").set({rich: true}));
      groupbox3.add(bubblechartimage);
      groupbox3.add(new qx.ui.basic.Label("<b>Insight:</b> Indicators suggest we go with <span style='color:red;'><b>Red</b></span>").set({rich: true}));

      
      // Assemble
      dashboardpage.add(label1);
      dashboardsubpage1.add(groupbox1);
      dashboardsubpage1.add(groupbox2);
      dashboardsubpage1.add(groupbox3, {lineBreak: true});
      dashboardsubpage1.add(groupbox4, {lineBreak: true, stretch: true});
      
      dashboardpage.add(dashboardsubpage1);


      // Second page marker  
      var label5 = new qx.ui.basic.Label("Actions").set({font: "control-header"});
      var secmidsection = new qx.ui.container.Composite(new qx.ui.layout.HBox(20));
      
      overviewpage.add(label5);
      
      // Do This code
      var secpagegroupbox1 = new ${Namespace}.GroupBox("Do This","", true, true).set({allowStretchX: [true, true], allowStretchY: [false, false], appearance: "groupbox-connected", minWidth: 340});
      secpagegroupbox1.getChildControl("open", true).setMarginRight(20);
      secpagegroupbox1.setLayout(new qx.ui.layout.VBox());
      var secpagegroupbox1contentbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(4)).set({alignY: "middle"});
      secpagegroupbox1contentbox.add(new qx.ui.basic.Label("If you would like to do this. This opens a modal window <b>with</b> a blocker box behind it. Adding more so text will wrap as screen shrinks").set({alignY: "middle", textAlign: "left", rich: true, wrap: true}), {flex: 1});
      secpagegroupbox1contentbox.add(new qx.ui.core.Spacer(30, 20), {flex: 1});
      var btnDoThis = new qx.ui.form.Button("Do This").set({width: 165, height: 40, maxHeight: 40, alignX: "right", alignY: "middle"});
      secpagegroupbox1contentbox.add(btnDoThis);
      secpagegroupbox1.add(secpagegroupbox1contentbox);
      var winDoThis = this.__createDetailWindow();
      winDoThis.set({caption: "Do This", status: "Modal window with a blocker", width: 660, contentPadding: 20});
      winDoThis.add(new qx.ui.basic.Label("<b>Action Name:</b>").set({rich: true}));
      winDoThis.add(new qx.ui.basic.Label(winDoThis.getCaption()).set({marginBottom:18}));
      winDoThis.add(new qx.ui.basic.Label("<b>Summary:</b>").set({rich: true}));
      winDoThis.add(new qx.ui.form.TextField().set({placeholder: "Action summary", marginBottom:18}));
      winDoThis.add(new qx.ui.basic.Label("<b>Details:</b>").set({rich: true}));
      winDoThis.add(new qx.ui.form.TextArea().set({placeholder: "Action details"}));
      var winselectbox01 = new qx.ui.form.SelectBox().set({marginBottom:18, maxWidth: 260});
      winselectbox01.add(new qx.ui.form.ListItem("New"));
      winselectbox01.add(new qx.ui.form.ListItem("In Progress"));
      winselectbox01.add(new qx.ui.form.ListItem("Complete"));
      winselectbox01.add(new qx.ui.form.ListItem("Revoked"));
      winDoThis.add(new qx.ui.basic.Label("<b>Status:</b>").set({rich: true}));
      winDoThis.add(winselectbox01);
      winDoThis.add(new qx.ui.basic.Label("<b>Date:</b>").set({rich: true, width: 175}));
      winDoThis.add(new qx.ui.form.DateField().set({marginBottom:18, maxWidth: 260}));
      winDoThis.add(new qx.ui.basic.Label("<b>Notes:</b>").set({rich: true}));
      winDoThis.add(new qx.ui.form.TextArea());

      var btnUpdatewin = new qx.ui.form.Button("Submit");
      var btnClosewin = new qx.ui.form.Button("Cancel");
      winDoThis.add(new qx.ui.core.Spacer(30, 20), {flex: 1});
      var buttonHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
      buttonHBox.add(btnUpdatewin, {flex: 1});
      buttonHBox.add(btnClosewin, {flex: 1});
      winDoThis.add(buttonHBox);
      btnDoThis.addListener("execute", function(e) {
        winDoThis.restore();
        if (qx.core.Environment.get("device.type") == "mobile") {
          winDoThis.maximize();
        }
        winDoThis.center();
        winDoThis.show();
      });
      btnClosewin.addListener("execute", function(e) {
        winDoThis.close();
      });

      winDoThis.addListener("appear", function(e) {
        this._blocker.block();
      }, this);
      winDoThis.addListener("disappear", function(e) {
        this._blocker.unblock();
      }, this);
      

      // Do That code
      var secpagegroupbox2 = new ${Namespace}.GroupBox("Do That","", true, true).set({allowStretchX: [true, true], allowStretchY: [false, false], appearance: "groupbox-connected", minWidth: 340});
      secpagegroupbox2.getChildControl("open", true).setMarginRight(20);
      secpagegroupbox2.setLayout(new qx.ui.layout.VBox(20));
      var secpagegroupbox2contentbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(4)).set({alignY: "middle"});
      secpagegroupbox2contentbox.add(new qx.ui.basic.Label("If you would like to do that. That opens a modal window <b>without</b> a blocker box behind it Adding more so text will wrap as screen shrinks").set({alignY: "middle", textAlign: "left", rich: true, wrap: true}), {flex: 1});
      secpagegroupbox2contentbox.add(new qx.ui.core.Spacer(30, 20), {flex: 1});
      var btnDoThat = new qx.ui.form.Button("Do That").set({width: 165, height: 40, maxHeight: 40, alignX: "right", alignY: "middle"});
      secpagegroupbox2contentbox.add(btnDoThat);
      secpagegroupbox2.add(secpagegroupbox2contentbox);
      secpagegroupbox2.add(new qx.ui.basic.Atom("Warning message about doing that.","${NamespacePath}/warning-24px.svg"));

      var winDoThat = this.__createDetailWindow();
      winDoThat.set({caption: "Do That", status: "Modal window without a blocker"});
      winDoThat.add(new qx.ui.basic.Image("${NamespacePath}/Roxarama-Guy.png"));
      var btnClosewinThat = new qx.ui.form.Button("Close Window");
      winDoThat.add(new qx.ui.core.Spacer(30, 20), {flex: 1});
      winDoThat.add(btnClosewinThat);
      btnDoThat.addListener("execute", function(e) {
        winDoThat.restore();
        winDoThat.center();
        winDoThat.show();
      }, this);
      btnClosewinThat.addListener("execute", function(e) {
        winDoThat.close();
      }, this);

      approot.addListener("resize", function(e){
        //console.log("within resize of approot");
        winDoThis.center();
        winDoThat.center();
      }, this);
      
      secmidsection.add(secpagegroupbox1, {width: "50%", flex: 1});
      secmidsection.add(secpagegroupbox2, {width: "50%", flex: 1});

      // All that you did code
      var secpagegroupbox3 = new ${Namespace}.GroupBox("All That You Did","", true, true).set({allowStretchX: [true, true], allowStretchY: [false, false], appearance: "groupbox-connected", minWidth: 340});
      secpagegroupbox3.getChildControl("open", true).setMarginRight(20);
      secpagegroupbox3.setLayout(new qx.ui.layout.VBox(20));
      secpagegroupbox3.add(new qx.ui.basic.Label("Here's a list of all that you did. The table below is just a simple grid rather than a qooxdoo table control. Versatility is the key. There are multiple options for every use case. Adding more so text will wrap as screen shrinks").set({alignY: "middle", textAlign: "left", rich: true, wrap: true}), {flex: 1});
      var secpagegridtable = this.__createGridTable();
      secpagegroupbox3.add(secpagegridtable);

      overviewpage.add(secmidsection);
      overviewpage.add(secpagegroupbox3);

      // Third page marker
      var label6 = new qx.ui.basic.Label("List of Items").set({font: "control-header"});
      //var tablelistflow = new qx.ui.layout.Flow().set({alignY: "bottom", alignX: "left"});
      var tablelistvbox = new qx.ui.layout.VBox();
      //tablelistpage.set({backgroundColor: "yellow"});
      //tablelistpage.setLayout(tablelistflow);
      tablelistpage.setLayout(tablelistvbox);
      tablelistpage.add(label6);
      var tableliststack = new qx.ui.container.Stack().set({ paddingTop: 10, allowGrowY: true});
      var tablelisttable = this.__createTable();
      var tablelistlist = this.__createList();
      tableliststack.add(tablelisttable);
      tableliststack.add(tablelistlist);
      tablelistpage.add(tableliststack, {flex: 1});

      // Gallery Page
      var lblGalleryHeader = new qx.ui.basic.Label("My Default Gallery").set({font: "control-header"});
      gallerypage.add(lblGalleryHeader);
      
      // Gallery Upload control - desktop only
      if (qx.core.Environment.get("device.type") == "desktop"){
        var ctrlUpload = new ${Namespace}.Upload("Drag and drop, or", "Browse", null);
        ctrlUpload.set({
          height: 120,
          spacing: 20,
          center: true,
          demo : true
        });
        ctrlUpload.getChildControl("message").set({ icon: "${NamespacePath}/cloud_upload-24px.svg", iconPosition: "top", gap: 0});
        gallerypage.add(ctrlUpload);
        var uploaddemorestore = new qx.ui.form.Button("Restore").set({allowGrowX: false});
        uploaddemorestore.addListener("execute", function(){	
          var progressbar = ctrlUpload.getChildControl("progressbar", true);
          progressbar.setValue(0);
        }, this);
        var uploadprogress = new qx.ui.form.Button("+ 10%").set({allowGrowX: false});
        uploadprogress.addListener("execute", function(){	
          var progressbar = ctrlUpload.getChildControl("progressbar", true);
          progressbar.setValue(progressbar.getValue()+10);
        }, this);
        var upldhbox = new qx.ui.container.Composite(new qx.ui.layout.HBox());
        upldhbox.add(uploaddemorestore);
        upldhbox.add(uploadprogress);
        //gallerypage.add(upldhbox);

        /*var btnCopy = new qx.ui.form.Button("Electron Copy Test");
        var txtPaste = new qx.ui.form.TextField().set({ minWidth: 300, placeholder: "Paste copied text here"});
        var electronhbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(8));
        electronhbox.add(btnCopy);
        electronhbox.add(txtPaste);*/
      };

      // Add Flow of image objects - images are from "resource/${Namespace}/gallery" folder
      var gallaryimageflow = new qx.ui.layout.Flow(6,6,"left");
      var gallerygroupboxcars = new ${Namespace}.GroupBox("Cars", "${NamespacePath}/commute-24px.svg", true, true, false);
      gallerygroupboxcars.setLayout(gallaryimageflow);
      gallerygroupboxcars.set({allowShrinkX: true, allowShrinkY: true, allowGrowX: true, allowGrowY: true}); 
      gallerygroupboxcars.add(new qx.ui.basic.Image("${NamespacePath}/gallery/Yellow_Car2.jpg").set({scale: true, width: 420, height: 280}));
      gallerygroupboxcars.add(new qx.ui.basic.Image("${NamespacePath}/gallery/Flame_Car2.jpg").set({scale: true, width: 420, height: 280}));
      
      var gallerygroupboxtrain = new ${Namespace}.GroupBox("Trains", "${NamespacePath}/baseline-directions_subway-24px.svg", true, true, false);
      gallerygroupboxtrain.setLayout(new qx.ui.layout.Flow(6,6,"left"));
      gallerygroupboxtrain.set({allowShrinkX: true, allowShrinkY: true, allowGrowX: true, allowGrowY: true}); 
      gallerygroupboxtrain.add(new qx.ui.basic.Image("${NamespacePath}/gallery/Deep_Train_Bridge_Sky.JPG").set({scale: true, width: 420, height: 280}));
      gallerygroupboxtrain.add(new qx.ui.basic.Image("${NamespacePath}/gallery/Top_Train_Bridge.JPG").set({scale: true, width: 420, height: 280}));
      gallerygroupboxtrain.add(new qx.ui.basic.Image("${NamespacePath}/gallery/Train_Bridge_Close.JPG").set({scale: true, width: 420, height: 280}));
      gallerygroupboxtrain.add(new qx.ui.basic.Image("${NamespacePath}/gallery/Train_Bridge_Close2.JPG").set({scale: true, width: 420, height: 280}));
      gallerygroupboxtrain.add(new qx.ui.basic.Image("${NamespacePath}/gallery/Deep_Train_Bridge.jpg").set({scale: true, width: 280, height: 420}));

      var gallerygroupboxfood = new ${Namespace}.GroupBox("Food", "${NamespacePath}/local_dining-24px.svg", true, true, false);
      gallerygroupboxfood.setLayout(new qx.ui.layout.Flow(6,6,"left"));
      gallerygroupboxfood.set({allowShrinkX: true, allowShrinkY: true, allowGrowX: true, allowGrowY: true}); 
      gallerygroupboxfood.add(new qx.ui.basic.Image("${NamespacePath}/gallery/Vegies2.jpg").set({scale: true, width: 420, height: 280}));

      var gallerygroupboxart = new ${Namespace}.GroupBox("Hand drawn", null, true, true, false);
      gallerygroupboxart.setLayout(new qx.ui.layout.Flow(6,6,"left"));
      gallerygroupboxart.set({allowShrinkX: true, allowShrinkY: true, allowGrowX: true, allowGrowY: true}); 
      gallerygroupboxart.add(new qx.ui.basic.Image("${NamespacePath}/gallery/Crowd_Pressure.png").set({scale: true, width: 420, height: 280}));
      gallerygroupboxart.add(new qx.ui.basic.Image("${NamespacePath}/gallery/Normal_Dude.png").set({scale: true, width: 420, height: 350}));
      gallerygroupboxart.add(new qx.ui.basic.Image("${NamespacePath}/gallery/RoxArms.jpg").set({scale: true}));
      gallerygroupboxart.add(new qx.ui.basic.Image("${NamespacePath}/gallery/Santa_Color-Orig.JPG").set({scale: true, width: 420, height: 306}));
      gallerygroupboxart.add(new qx.ui.basic.Image("${NamespacePath}/gallery/holiday_cheer.JPG").set({scale: true, width: 420, height: 392}));
      gallerygroupboxart.add(new qx.ui.basic.Image("${NamespacePath}/Roxarama-Guy.png").set({scale: true}));

      var gallerygroupboxvideo = new ${Namespace}.GroupBox("Videos", null, true, true, false);
      gallerygroupboxvideo.setLayout(new qx.ui.layout.Flow(6,6,"left"));
      gallerygroupboxvideo.set({allowShrinkX: true, allowShrinkY: true, allowGrowX: true, allowGrowY: true}); 
      gallerygroupboxvideo.add(new qx.ui.basic.Image("${NamespacePath}/gallery/movie1.jpg").set({scale: true}));
    
      
      gallerypage.add(gallerygroupboxcars);
      gallerypage.add(gallerygroupboxtrain);
      gallerypage.add(gallerygroupboxfood);
      gallerypage.add(gallerygroupboxart);
      gallerypage.add(gallerygroupboxvideo);

      // Menu Page for phonegap only
      //if (qx.core.Environment.get("phonegap")) {
        var menupage = new qx.ui.container.Composite(new qx.ui.layout.VBox(10, null, "separator-vertical")).set({padding: [60, 0, 0, 0]});
        var btnProfile = new qx.ui.form.Button("Profile", "${NamespacePath}/edit-24px.svg").set({appearance : "hym-page-button"});
        //btnProfile.getLayoutParent().add(new qx.ui.core.Spacer());
        var btnSettings = new qx.ui.form.Button("Settings", "${NamespacePath}/outline-settings-24px.svg").set({appearance : "hym-page-button"});
        var btnLogout = new qx.ui.form.Button("Logout", "${NamespacePath}/exit_to_app-24px.svg").set({appearance : "hym-page-button"});
        menupage.add(btnProfile);
        menupage.add(btnSettings);
        menupage.add(btnLogout);
        centerbox.add(menupage);
      //}

      
      // Assemble - THE STACK 
      centerbox.add(dashboardpage);
      centerbox.add(overviewpage);
      centerbox.add(tablelistpage);
      centerbox.add(gallerypage);

      // Show the default page
      centerbox.setSelection([dashboardpage]);

      // <<< END of THE STACK <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      
      // >>> Populate the Main Menu and Popup Main Menu with content >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Create Menu Buttons that will navigate the user through THE STACK Pages 
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Populate westBox with content
      var atmleftnavheader = new qx.ui.basic.Atom("Hello, Admin", "${NamespacePath}/round-account_circle-24px.svg").set({appearance: "header-atom", anonymous: true, focusable: false, selectable: false });
      atmleftnavheader.getChildControl("icon").set({ scale : true });
      westbox.add(atmleftnavheader);
      var tbtndashboardpage = new ${Namespace}.MenuButton("Dashboards", "${NamespacePath}/dashboard-24px.svg", true );
      westbox.add(tbtndashboardpage);

      var tbtnSecondPage = new ${Namespace}.MenuButton("Actions", "${NamespacePath}/assignment_returned-24px.svg", true);
      var btnSubSecondpage = new qx.ui.form.Button("Do This").set({ appearance: "submenubutton", allowGrowX: true, padding: [10,4,14,60], visibility: "excluded"});
      var btnSubSecondpage2 = new qx.ui.form.Button("Do That").set({ appearance: "submenubutton", allowGrowX: true, padding: [10,4,14,60], visibility: "excluded"});
      westbox.add(tbtnSecondPage);
      westbox.add(btnSubSecondpage);
      westbox.add(btnSubSecondpage2);

      btnSubSecondpage.addListener("execute", function(e) {
        winDoThis.restore();
        //if (qx.core.Environment.get("phonegap")) {
          winDoThis.maximize();
        //}
        winDoThis.center();
        winDoThis.show();
      });

      var tbtnThirdPage = new ${Namespace}.MenuButton("List of Items", "${NamespacePath}/view_list-24px.svg", true);
      westbox.add(tbtnThirdPage);

      var tbtnGalleryPage = new ${Namespace}.MenuButton("Gallery", "${NamespacePath}/camera-24px.svg", true, "14" );
      westbox.add(tbtnGalleryPage);

      var westboxbuttongroup = new qx.ui.form.RadioGroup();
      westboxbuttongroup.add(tbtndashboardpage, tbtnSecondPage, tbtnThirdPage, tbtnGalleryPage);
      
      // CLONE the above controls
      var atmmenuleftnavheader = atmleftnavheader.clone();
      atmmenuleftnavheader.getChildControl("icon").set({ scale : true });
      var tbtnmenudashboardpage = tbtndashboardpage.clone();
      tbtnmenudashboardpage.getChildControl("icon").set({ scale : true });
      var tbtnmenuSecondPage = tbtnSecondPage.clone();
      tbtnmenuSecondPage.getChildControl("icon").set({ scale : true });
      var btnsubmenusubsecondpage = btnSubSecondpage.clone();
      btnsubmenusubsecondpage.getChildControl("icon").set({ scale : true });
      var btnsubmenusubsecondpage2 = btnSubSecondpage2.clone();
      btnsubmenusubsecondpage.set({visibility: "visible", decorator: "mainmenubutton-box"});
      btnsubmenusubsecondpage2.set({visibility: "visible", decorator: "mainmenubutton-box"});
      var tbtnmenuThirdPage = tbtnThirdPage.clone();
      tbtnmenuThirdPage.getChildControl("icon").set({ scale : true });
      var tbtnmenuGalleryPage = tbtnGalleryPage.clone();
      // Add the clones to the Main Menu Popup
      mainmenupopup.add(atmmenuleftnavheader);
      mainmenupopup.add(tbtnmenudashboardpage);
      mainmenupopup.add(tbtnmenuSecondPage);
      mainmenupopup.add(btnsubmenusubsecondpage);
      mainmenupopup.add(btnsubmenusubsecondpage2);
      mainmenupopup.add(tbtnmenuThirdPage);
      mainmenupopup.add(tbtnmenuGalleryPage);

      btnsubmenusubsecondpage.addListener("execute", function(e) {
        mainmenupopup.hide();
        winDoThis.maximize();
        winDoThis.center();
        winDoThis.show();
      });

      // Assign all the clones their own RadioGroup
      var mainmenubuttongroup = new qx.ui.form.RadioGroup();
      mainmenubuttongroup.add(tbtnmenudashboardpage, tbtnmenuSecondPage, tbtnmenuThirdPage, tbtnmenuGalleryPage);
      
      //***  CODE for applying popup fading in and out  ***//
      var fadeinleft = {duration: 300, timing: "ease-out", origin: "left top", keyFrames : {
        0: {opacity: 0, left: "-300px"},
        100: {opacity: 1, left: "0px"}
        }};

      mainmenupopup.addListener("appear", function(e) {
        var domtable = mainmenupopup.getContentElement().getDomElement();
        qx.bom.element.Animation.animate(domtable, fadeinleft);
      }, this);

      // <<< END of Main Menu and Main Menu Popup <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    
      // >>> Populate the Hybrid Mobile (hym) Main Menu  content >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Create Menu Buttons that will navigate the user through THE STACK Pages 
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Populate southbox with content
      var tbtndashboardpagehym = new ${Namespace}.MenuButton("Dashboards", "${NamespacePath}/dashboard-24px.svg", true ).set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      var tbtnoverviewpagehym = new ${Namespace}.MenuButton("Actions", "${NamespacePath}/assignment_returned-24px.svg", true).set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      var tbtnlistofitemspagehym = new ${Namespace}.MenuButton("List of Items", "${NamespacePath}/view_list-24px.svg", true).set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      var tbtngallerypagehym = new ${Namespace}.MenuButton("Gallery", "${NamespacePath}/camera-24px.svg", true).set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      var tbtnmenuhym = new ${Namespace}.MenuButton("Menu", "${NamespacePath}/round-menu-24px.svg", true).set({appearance: "mainmenubutton-hym", iconPosition: "top"});
      southbox.add(tbtndashboardpagehym, {flex: 1});
      southbox.add(tbtnoverviewpagehym, {flex: 1});
      southbox.add(tbtnlistofitemspagehym, {flex: 1});
      southbox.add(tbtngallerypagehym, {flex: 1});
      southbox.add(tbtnmenuhym, {flex: 1});

      // Assign all the clones their own RadioGroup
      var mainmenubuttongrouphym = new qx.ui.form.RadioGroup();
      mainmenubuttongrouphym.add(tbtndashboardpagehym, tbtnoverviewpagehym, tbtnlistofitemspagehym, tbtngallerypagehym, tbtnmenuhym);

      // <<< END of Hybrid Mobil (hym) Main Menu and Main Menu Popup <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


      // >>> Wire all the Main Menu Buttons to THE STACK Pages (via Listeners) >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // Turn on all MenuButton listeners
      tbtndashboardpage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([dashboardpage]);
          mainmenubuttongroup.setSelection([tbtnmenudashboardpage]);
        }
      }, this);

      tbtnSecondPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          btnSubSecondpage.setVisibility("visible");
          btnSubSecondpage2.setVisibility("visible");
          centerbox.setSelection([overviewpage]);
          mainmenubuttongroup.setSelection([tbtnmenuSecondPage]);
          btnsubmenusubsecondpage.set({ decorator: "mainmenubutton-box-pressed"});
          btnsubmenusubsecondpage2.set({ decorator: "mainmenubutton-box-pressed"});
        } else {
          btnSubSecondpage.setVisibility("excluded");
          btnSubSecondpage2.setVisibility("excluded");
        }
      }, this);

      tbtnThirdPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([tablelistpage]);
          mainmenubuttongroup.setSelection([tbtnmenuThirdPage]);
        }
      }, this);

      tbtnGalleryPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([gallerypage]);
          mainmenubuttongroup.setSelection([tbtnmenuGalleryPage]);
        }
      }, this);

      // Popup menu buttons
      tbtnmenudashboardpage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([dashboardpage]);
          westboxbuttongroup.setSelection([tbtndashboardpage]);
          btnsubmenusubsecondpage.set({ decorator: "mainmenubutton-box" });
          btnsubmenusubsecondpage2.set({ decorator: "mainmenubutton-box" });
          mainmenupopup.hide();
        }
      }, this);

      tbtnmenuSecondPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([overviewpage]);
          westboxbuttongroup.setSelection([tbtnSecondPage]);
          btnsubmenusubsecondpage.set({ decorator: "mainmenubutton-box-pressed" });
          btnsubmenusubsecondpage2.set({ decorator: "mainmenubutton-box-pressed" });

          dashboardpage.setVisibility("excluded");

          mainmenupopup.hide();
        }
      }, this);

      tbtnmenuThirdPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([tablelistpage]);
          westboxbuttongroup.setSelection([tbtnThirdPage]);
          btnsubmenusubsecondpage.set({ decorator: "mainmenubutton-box" });
          btnsubmenusubsecondpage2.set({ decorator: "mainmenubutton-box" });

          dashboardpage.setVisibility("excluded");

          mainmenupopup.hide();
        }
      }, this);

      tbtnmenuGalleryPage.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([gallerypage]);
          westboxbuttongroup.setSelection([tbtnGalleryPage]);
          btnsubmenusubsecondpage.set({ decorator: "mainmenubutton-box" });
          btnsubmenusubsecondpage2.set({ decorator: "mainmenubutton-box" });

          dashboardpage.setVisibility("excluded");

          mainmenupopup.hide();
        }
      }, this);

      // if Hybrid Mobile
      tbtndashboardpagehym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([dashboardpage]);
          atmlogocurrentpage.set({show: "both", label:"Wax"});
        }
      }, this);

      tbtnoverviewpagehym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([overviewpage]);
          atmlogocurrentpage.set({show: "label", label:"Actions"});
        }
      }, this);

      tbtnlistofitemspagehym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([tablelistpage]);
          atmlogocurrentpage.set({show: "label", label:"Table List"});
        }
      }, this);

      tbtngallerypagehym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([gallerypage]);
          atmlogocurrentpage.set({show: "label", label:"Gallery"});
        }
      }, this);

      tbtnmenuhym.addListener("changeValue", function(e) {
        if (e.getData()) {
          centerbox.setSelection([menupage]);
          atmlogocurrentpage.set({show: "label", label:"Menu"});
        }
      }, this);


      // <<< END of Wiring <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      
      // ====================================
      // =======  MediaQuery code  ========== 
      // ====================================

      var mq1 = new qx.bom.MediaQuery("screen and (min-width: 1024px)");

      mq1.on("change", function(e){
        if(mq1.isMatching()){
          scrollwest.setVisibility("visible"); 
          mainmenupart.setVisibility("excluded");
        }
        else {
          scrollwest.addListener("appear", function(e) {
            var domtable = scrollwest.getContentElement().getDomElement();
            qx.bom.element.Animation.animate(domtable, fadeinleft);
          }, this); 
          scrollwest.setVisibility("excluded");
          mainmenupart.setVisibility("visible");
          winDoThat.center();
        }
      });
      if (mq1.isMatching()) {
        scrollwest.setVisibility("visible"); 
        mainmenupart.setVisibility("excluded");
      }
      else {
        scrollwest.addListener("appear", function(e) {
          var domtable = scrollwest.getContentElement().getDomElement();
          qx.bom.element.Animation.animate(domtable, fadeinleft);
        }, this); 
        scrollwest.setVisibility("excluded"); 
        mainmenupart.setVisibility("visible");
      }

      var mq2 = new qx.bom.MediaQuery("screen and (min-width: 767px)");

      mq2.on("change", function(e){
        if(mq2.isMatching()){
          tableliststack.setSelection([tablelisttable]);
          secmidsection.setLayout(new qx.ui.layout.HBox(20));
          secpagegridtable.getLayout().setColumnFlex(2, 1);
          secpagegridtable.getLayout().setColumnFlex(3, 1);
          secpagegridtable.getLayout().setColumnFlex(4, 1);
        }
        else {
          tableliststack.setSelection([tablelistlist]);
          secmidsection.setLayout(new qx.ui.layout.VBox(20));
          secpagegridtable.getLayout().setColumnFlex(2, 0);
          secpagegridtable.getLayout().setColumnWidth(2, 0);
          secpagegridtable.getLayout().setColumnFlex(3, 0);
          secpagegridtable.getLayout().setColumnWidth(3, 0);
          secpagegridtable.getLayout().setColumnFlex(4, 0);
          secpagegridtable.getLayout().setColumnWidth(4, 0);
        }
      });
      if (mq2.isMatching()) {
        tableliststack.setSelection([tablelisttable]);
        secmidsection.setLayout(new qx.ui.layout.HBox(20));
      }
      else {
        tableliststack.setSelection([tablelistlist]);
        secmidsection.setLayout(new qx.ui.layout.VBox(20));
        secpagegridtable.getLayout().setColumnFlex(2, 0);
        secpagegridtable.getLayout().setColumnWidth(2, 0);
        secpagegridtable.getLayout().setColumnFlex(3, 0);
        secpagegridtable.getLayout().setColumnWidth(3, 0);
        secpagegridtable.getLayout().setColumnFlex(4, 0);
        secpagegridtable.getLayout().setColumnWidth(4, 0);
      }

  
      // ====================================
      // =====  Device Targetted code  ======
      // ====================================
     

      // mobile
      if (qx.core.Environment.get("device.type") == "mobile"){
        
        // No need for the west scroll area (main menu) in mobile
        scrollwest.setVisibility("excluded");

        // This addresses the scroll bouncing in: 
        //  - Chrome for Android
        var dsktopstylsheet = qx.ui.style.Stylesheet.getInstance();
        dsktopstylsheet.addRule("html", "overscroll-behavior : none none;");
        dsktopstylsheet.addRule("body", "overscroll-behavior : none none;");


        // Set the body tag's position to prevent scroll bouncing (and pull down refresh) in:
        //  - Safari for iOS
        //      - Edge for iOS (same as above browser now)
        //  - FireFox for iOS
        document.body.style.position = "fixed";

        // TODO *Need solution to address scroll bouncing in:
        //   - Chrome for iOS

        // App still bounces in Landscape; Locking screen to portrait where API is available
        // https://developer.mozilla.org/en-US/docs/Web/API/Screen/lockOrientation
        screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;
        screen.lockOrientationUniversal("portrait");

        // Fix approot's position
        //approot.getContentElement().setStyle("position", "fixed");
        
      }

      // phonegap
      if (qx.core.Environment.get("phonegap")) {
        
        // build out south bar
        

      }

      // electron
      //if (qx.core.Environment.get("device.type") == "desktop" && qx.core.Environment.get("runtime.name") == "node.js"){
      if (this.__isElectron()) {

        // Add electron test controls
        //gallerypage.add(electronhbox);
        
        //const {clipboard} = require('electron')

        /*btnCopy.addListener("execute", function(){	
          if (!txtPaste.getValue())
          {
            txtPaste.setValue("");
          }
          txtPaste.setPlaceholder("Copied! Paste here to see");*/
          //clipboard.writeText("Electron Demo!!");
        //}, this);

      }

    },

    __createGridTable : function()
    {
      var container = new qx.ui.container.Composite();
      var layout = new qx.ui.layout.Grid();
      layout.setColumnFlex(0, 1);
      layout.setColumnFlex(1, 1);
      layout.setColumnFlex(2, 1);
      layout.setColumnFlex(3, 1);
      layout.setColumnFlex(4, 1);
      layout.setColumnFlex(5, 1);
      //layout.setRowFlex(1, 3);
      layout.setSpacing(10);
      container.setLayout(layout);

      // Table Headers
      container.add(new qx.ui.basic.Label("Action").set({font: "default-bold"}), {row: 0, column: 0});
      container.add(new qx.ui.basic.Label("Header02").set({font: "default-bold"}), {row: 0, column: 1});
      container.add(new qx.ui.basic.Label("Header03").set({font: "default-bold"}), {row: 0, column: 2});
      container.add(new qx.ui.basic.Label("Header04").set({font: "default-bold"}), {row: 0, column: 3});
      container.add(new qx.ui.basic.Label("Header05").set({font: "default-bold"}), {row: 0, column: 4});
      container.add(new qx.ui.basic.Label("Revoke").set({font: "default-bold"}), {row: 0, column: 5});

      // Table Row 01
      container.add(new qx.ui.basic.Label("Did This"), {row: 1, column: 0});
      container.add(new qx.ui.basic.Label("Row01Column02"), {row: 1, column: 1});
      container.add(new qx.ui.basic.Label("Row01Column03"), {row: 1, column: 2});
      container.add(new qx.ui.basic.Label("Row01Column04"), {row: 1, column: 3});
      container.add(new qx.ui.basic.Label("Row01Column05"), {row: 1, column: 4});
      container.add(new qx.ui.basic.Image("${NamespacePath}/cancel-24px.svg").set({opacity : .3}), {row: 1, column: 5});

      // Table Row 02
      container.add(new qx.ui.basic.Label("Did That"), {row: 2, column: 0});
      container.add(new qx.ui.basic.Label("Row02Column02"), {row: 2, column: 1});
      container.add(new qx.ui.basic.Label("Row02Column03"), {row: 2, column: 2});
      container.add(new qx.ui.basic.Label("Row02Column04"), {row: 2, column: 3});
      container.add(new qx.ui.basic.Label("Row02Column05"), {row: 2, column: 4});
      container.add(new qx.ui.basic.Image("${NamespacePath}/cancel-24px.svg").set({opacity : .3}), {row: 2, column: 5});

      return container;
    },

    __createTable : function()
    { 
      var rowData = this.__createrowData();

      var tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "", "Status", "Item ID", "Project", "Date Submitted" ]);
      tableModel.setData(rowData);
      tableModel.setColumnEditable(1, false);
      tableModel.setColumnEditable(2, false);
      tableModel.setColumnSortable(0, false);
      tableModel.setColumnSortable(5, false);

      var table = new qx.ui.table.Table(tableModel);

      table.set({
        allowStretchY: true,
        allowStretchX: true,
        rowHeight: 30,
        showCellFocusIndicator: false,
        focusCellOnPointerMove : true,
        forceLineHeight: true
      });

      var imgrenderer = new qx.ui.table.cellrenderer.Image(24,24);
      table.getTableColumnModel().setDataCellRenderer(0, imgrenderer);

      table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);

      var tcm = table.getTableColumnModel();
      tcm.setColumnWidth(0,40);
      tcm.setColumnWidth(1,95);
      tcm.setColumnWidth(2,100);
      tcm.setColumnWidth(3,215);
      tcm.setColumnWidth(4,130);

      //tcm.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());
      //tcm.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Html());
      //tcm.setColumnWidth(4,350);
      //tcm.setHeaderCellRenderer(4, new qx.ui.table.headerrenderer.Icon("icon/18/image/filter-frames.png", "A date"));

      return table;
    },

    __createList : function()
    { 
      var rowData = this.__createrowData();

      var listvbox = new qx.ui.layout.VBox(4, null, "separator-vertical");
      var listctrl = new qx.ui.container.Composite(listvbox);

      for (var i in rowData) {
        var groupbox1 = new ${Namespace}.GroupBox(rowData[i][3], rowData[i][0], true, false);
        groupbox1.setLayout(new qx.ui.layout.VBox(4));
        groupbox1.add(new qx.ui.basic.Label("<b>Status:</b> " + rowData[i][1]).set({rich: true}));
        groupbox1.add(new qx.ui.basic.Label("<b>Item ID:</b> " + rowData[i][2]).set({rich: true}));
        groupbox1.add(new qx.ui.basic.Label("<b>Date Submitted:</b> " + rowData[i][4]).set({rich: true}));

        listctrl.add(groupbox1);
      }
    
      return listctrl;
    },

    __createrowData : function()
    {
      var rowData = [];
      var now = new Date().getTime();
      var date;
      var dateRange = 400 * 24 * 60 * 60 * 1000; // 400 days
      
      date = new Date(now + Math.random() * dateRange - dateRange / 2);
      rowData.push([ "${NamespacePath}/round-check_circle_outline-24px.svg", "Completed", "001007222", "This Core", date ]);
      date = new Date(now + Math.random() * dateRange - dateRange / 2);
      rowData.push([ "${NamespacePath}/round-check_circle_outline-24px.svg", "Completed", "002009333", "That Core", date ]);
      date = new Date(now + Math.random() * dateRange - dateRange / 2);
      rowData.push([ "${NamespacePath}/round-check_circle_outline-24px.svg", "Completed", "003002777", "DTDT", date ]);
      date = new Date(now + Math.random() * dateRange - dateRange / 2);
      rowData.push([ "${NamespacePath}/round-check_circle_outline-24px.svg", "Completed", "004074555", "eThis Modernization", date ]);
      date = new Date(now + Math.random() * dateRange - dateRange / 2);
      rowData.push([ "${NamespacePath}/round-sync-24px.svg", "In Progress", "005111888", "eThat Modernization", date ]);
      date = new Date(now + Math.random() * dateRange - dateRange / 2);
      rowData.push([ "${NamespacePath}/round-sync-24px.svg", "In Progress", "006003662", "eThis eThat Integration", date ]);

      return rowData;
    },

    __createDetailWindow : function()
    {
      // Create the Window
      var win = new qx.ui.window.Window("Generic Window").set({ appearance: "wax-window", allowMaximize : true, allowMinimize : false, modal: true, movable: true });
      win.setLayout(new qx.ui.layout.VBox(4));
      win.setShowStatusbar(true);
      win.setStatus("Generic Message"); 
      win.getChildControl("title").set({padding: [10,0,0,10]});

      return win;
    },

    /**
     * Electron JS detection
     * https://github.com/cheton/is-electron
     */
    
    __isElectron : function() 
    {
      // Renderer process
      if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
          return true;
      }
  
      // Main process
      if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
          return true;
      }
  
      // Detect the user agent when the `nodeIntegration` option is set to true
      if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
          return true;
      }
  
      return false;
    }
  }
});
