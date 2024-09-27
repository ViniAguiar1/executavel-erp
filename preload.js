const { ipcRenderer } = require('electron');

window.electronAPI = {
  fetchEtiquetas: (apiUrl) => ipcRenderer.invoke('fetch-etiquetas', apiUrl),
};
