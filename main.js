const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

let mainWindow;
let tray = null; // Variável para armazenar o tray

// Função para criar a janela principal
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false, // Desativa o redimensionamento da janela
    fullscreenable: false, // Impede a maximização em tela cheia
    maximizable: false, // Remove o botão de maximizar
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadFile('index.html'); // Carrega o arquivo HTML principal

  // Remover o menu da janela
  mainWindow.setMenu(null);

  // Previne o fechamento da janela ao clicar no "X", escondendo-a na taskbar
  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide(); // Esconde a janela em vez de fechar
    }
    return false;
  });

  // Previne a maximização e o redimensionamento
  mainWindow.on('will-resize', (event) => {
    event.preventDefault();
  });

  // Configurações para minimizar a janela na bandeja ao minimizar
  mainWindow.on('minimize', (event) => {
    event.preventDefault();
    mainWindow.hide(); // Esconde a janela na bandeja
  });
}

// Inicializa o aplicativo quando estiver pronto
app.whenReady().then(() => {
  createWindow();

  // Criação do tray (bandeja do sistema)
  tray = new Tray(path.join(__dirname, 'icons', 'icon.png')); // Defina o caminho para o ícone da bandeja
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mostrar Aplicativo',
      click: () => {
        mainWindow.show(); // Mostra a janela quando clicado no tray
      }
    },
    {
      label: 'Sair',
      click: () => {
        app.isQuiting = true;
        app.quit(); // Sai da aplicação quando clicado em sair
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip('ERP Wise Printer'); // Texto da tooltip na bandeja
});

// Fecha o aplicativo se todas as janelas forem fechadas (comportamento padrão)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { // No MacOS, apps geralmente ficam abertos na dock
    app.quit();
  }
});

// Função para fazer o download do PDF da API e imprimir diretamente
ipcMain.handle('download-print-pdf', async (event, { url, token }) => {
  try {
    console.log(`Iniciando o download do PDF da URL: ${url}`);
    
    // Adiciona o token de autenticação ao cabeçalho
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const pdfBuffer = Buffer.from(response.data, 'binary');

    // Criar uma nova janela invisível para imprimir o PDF
    const printWindow = new BrowserWindow({
      show: false, // Janela invisível
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    });

    // Salvar o PDF em um arquivo temporário
    const pdfPath = path.join(app.getPath('desktop'), 'etiqueta_temp.pdf');
    fs.writeFileSync(pdfPath, pdfBuffer);
    console.log(`PDF salvo no caminho: ${pdfPath}`);

    // Carregar o PDF salvo na janela invisível
    await printWindow.loadURL(`file://${pdfPath}`);
    console.log('Carregando o PDF para a janela invisível...');

    // Imprimir o PDF silenciosamente (sem mostrar a caixa de diálogo de impressão)
    printWindow.webContents.on('did-finish-load', () => {
      console.log('PDF carregado com sucesso. Iniciando impressão...');
      printWindow.webContents.print({
        silent: true,  // Silencioso, sem caixa de diálogo
        printBackground: true,
      }, (success, errorType) => {
        if (!success) {
          console.error('Erro ao imprimir:', errorType);
        } else {
          console.log('Impressão concluída com sucesso.');
        }
        printWindow.close();  // Fechar a janela após a impressão
      });
    });
  } catch (error) {
    console.error('Erro ao baixar ou imprimir o PDF:', error);
    throw error;
  }
});
