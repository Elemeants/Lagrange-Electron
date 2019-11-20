const { app, BrowserWindow } = require('electron');

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      devTools: true
    },
    resizable: false,
    maximizable: false,
    title: 'Lagrange',
    darkTheme: true,
    frame: false,
  });
  win.setMenuBarVisibility(false);
  win.removeMenu();
  win.loadFile('./index.html');

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});