import * as vscode from 'vscode';
import { getUri } from "./utilities/getUri";
import { getNonce } from "./utilities/getNonce";
import { Disposable, Webview, WebviewPanel, window, Uri, ViewColumn } from "vscode";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('nodeeditor.helloWorld', () => {
      // Create and show panel
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );

      panel.webview.options = {
        enableScripts: true,
      };
  

      // And set its HTML content
      panel.webview.html = getWebviewContent(panel.webview,context.extensionUri);
    })
  );
}

function getWebviewContent(webview: Webview, extensionUri: Uri) {
    // The CSS file from the Svelte build output
    const stylesUri = getUri(webview, extensionUri, ["out","webview", "bundle.css"]);
    // The JS file from the Svelte build output
    const scriptUri = getUri(webview, extensionUri, ["out","webview", "bundle.js"]);
    
    const nonce = getNonce();

    // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Hello World</title>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <script defer nonce="${nonce}" src="${scriptUri}"></script>
          </head>
          <body theme='${vscode.window.activeColorTheme.kind}'>
          </body>
          </html>
          `;
        }
        
        // <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">