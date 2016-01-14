const electron = require('electron');
var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
//electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  //if (process.platform != 'darwin') {
    app.quit();
  //}
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');


  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  var webContents = mainWindow.webContents;
  webContents.openDevTools();

  webContents.on('did-finish-load', function() {
    // We know the webpage is loaded, so we can start interacting with it now
    webContents.send("render-test", "woot")
  })

  // We can listen to messages from the renderer here:
  const ipcMain = electron.ipcMain;

  ipcMain.on('asynchronous-message', function(event, arg) {
    //console.log(arg);  // prints "ping"
    event.sender.send('asynchronous-reply', 'pong');
  });

  ipcMain.on('synchronous-message', function(event, arg) {
    //console.log(arg);  // prints "ping"
    event.returnValue = 'pong';
  });


});