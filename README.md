
# Projeto de Impressão de Etiquetas - Executável

Criado pela EasyToGo

Descrição
Este projeto é uma aplicação desktop criada pela EasyToGo para gerar e imprimir etiquetas a partir de códigos de pedido fornecidos pelo usuário. A interface permite que o usuário faça login, envie solicitações para a API de geração de etiquetas e, após a autenticação, gere e baixe etiquetas em formato PDF prontas para impressão.


## Stack utilizada

**Node.js**: Backend responsável pela autenticação e geração de etiquetas.

**Electron**: Para criar a interface desktop nativa.
Axios: Para fazer as requisições HTTP para a API de geração de etiquetas.

**SweetAlert**: Para exibir notificações e alertas amigáveis.

**Bootstrap**: Framework CSS para estilização da interface e responsividade.


## Funcionalidades

- Login de usuário com autenticação JWT.
- Geração de etiquetas com base no código de pedido fornecido.
- Download e impressão das etiquetas em formato PDF.
- Tratamento de erros e feedback amigável através de alertas visuais.


## Instalação

Instale executavel-erp com npm

```bash
  git clone https://github.com/ViniAguiar1/executavel-erp.git
  npm install executavel-erp
  cd executavel-erp
  npm start
```
    
## Como Usar
- Passo 1: Fazer Login
    Ao iniciar a aplicação, você será direcionado para a tela de login.

    Insira seu email e senha nos campos apropriados.

    Clique no botão "Login".


**Após o login bem-sucedido, você será redirecionado para a tela de impressão de etiquetas.**

- Passo 2: Gerar e Imprimir Etiquetas
    Na tela de impressão, insira o código do pedido no campo de texto.

    Clique no botão "Baixar e Imprimir Etiqueta" para gerar a etiqueta em PDF.


**A etiqueta será gerada e o PDF será baixado automaticamente, pronto para ser impresso.**


## Interface de Login
![Interface de Login](./images/login.png)

## Interface de Geração de Etiquetas
![Geração de Etiquetas](./images/impressao.png)


## Contribuindo

Contribuições são sempre bem-vindas!

Por favor, abra um Pull Request com sugestões ou melhorias.

