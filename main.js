const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
var db = require('diskdb');
db = db.connect(__dirname + '/db', ['todos']);

var mainWindow = null;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    // resizable: false
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

ipcMain.on('msg-findAll', function(event) {
  event.sender.send('reply-findAll', db.todos.find());
});

ipcMain.on('msg-addOne', function(event, arg) {
  event.sender.send('reply-addOne', db.todos.save(arg));
});

ipcMain.on('msg-removeOne', function(event, arg) {
  event.sender.send('reply-removeOne', function() {
    db.todos.remove({ _id: arg }, false);
    return db.todos.find();
  });
});

ipcMain.on('msg-updateOne', function(event, arg){
  db.todos.update({_id: arg._id}, arg, {multi: false, upsert: false});
})
