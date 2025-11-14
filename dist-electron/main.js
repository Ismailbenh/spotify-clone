import require$$0 from "electron";
import require$$1 from "path";
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var main$1 = {};
var hasRequiredMain;
function requireMain() {
  if (hasRequiredMain) return main$1;
  hasRequiredMain = 1;
  const { app, BrowserWindow } = require$$0;
  const path = require$$1;
  function createWindow() {
    const win = new BrowserWindow({
      width: 1400,
      height: 900,
      minWidth: 400,
      minHeight: 700,
      backgroundColor: "#000000",
      titleBarStyle: "hiddenInset",
      // macOS style
      frame: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        webSecurity: false
        // Allow loading local audio files
      }
    });
    if (process.env.VITE_DEV_SERVER_URL) {
      win.loadURL(process.env.VITE_DEV_SERVER_URL);
      win.webContents.openDevTools();
    } else {
      win.loadFile(path.join(__dirname, "../dist/index.html"));
    }
  }
  app.whenReady().then(createWindow);
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  return main$1;
}
var mainExports = requireMain();
const main = /* @__PURE__ */ getDefaultExportFromCjs(mainExports);
export {
  main as default
};
