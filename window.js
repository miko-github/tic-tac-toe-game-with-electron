const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

function createWindow() {
	const winOption = {
		width: 350,
		height: 370,
		minWidth: 310,
		minHeight: 320,
		maximizable: false,
		resizable: false,
		alwaysOnTop: true,
		autoHideMenuBar: true,
		icon: './assets/images/icon.png',
		webPreferences: {
			nodeIntegration: true,
		},
	};
	const main = new BrowserWindow(winOption);
	ipcMain.handle('ToggleDevTools', () => main.webContents.toggleDevTools());
	ipcMain.handle('RefreshWindow', () => main.reload());
	ipcMain.handle('FullScreenWindow', () => {
		main.setResizable(true);
		main.setMaximizable(true);
	});
	ipcMain.handle('ExitApp', () => app.quit());
	ipcMain.handle('ToggleAbout', () =>
		main.loadFile('./src/views/about.html'),
	);
	ipcMain.handle('LoadUpdateWindow', () =>
		main.loadFile('./src/views/update.html'),
	);
	main.loadFile('./src/views/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
