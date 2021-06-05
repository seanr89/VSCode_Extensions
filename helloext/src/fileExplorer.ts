import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import { window, workspace } from 'vscode';

//#region Utilities

interface Entry extends vscode.TreeItem {
  uri: vscode.Uri;
  fileName: string;
  //children: Entry[]|undefined;
}

//#endregion

export class FileSystemProvider implements vscode.TreeDataProvider<Entry> {
  //private _onDidChangeFile: vscode.EventEmitter<vscode.FileChangeEvent[]>;
  data = new Array();
  constructor() {
    //this._onDidChangeFile = new vscode.EventEmitter<vscode.FileChangeEvent[]>();
  }

  // tree data provider

  async getChildren(element?: Entry | undefined): Promise<Entry[]> {
    if (element === undefined) {
      return this.data;
    }
    return this.data;
    //return element.children;
  }

  public async GoGetFiles() {
    const files = await vscode.workspace.findFiles('**/*.csproj', '**/node_modules/**');
    console.log('files found');
    this.data = files.map((item) => ({
      uri: item.path,
      fileName: item.path.slice(0, item.path.lastIndexOf('\\')),
    }));
    console.log(this.data);
  }

  getTreeItem(element: Entry): vscode.TreeItem {
    return element;
    const treeItem = new vscode.TreeItem(element.uri, vscode.TreeItemCollapsibleState.None);
    // if (element.type === vscode.FileType.File) {
    //   treeItem.command = { command: 'fileExplorer.openFile', title: 'Open File', arguments: [element.uri] };
    //   treeItem.contextValue = 'file';
    // }
    return treeItem;
  }
}

export class FileExplorer {
  constructor(context: vscode.ExtensionContext) {
    const treeDataProvider = new FileSystemProvider();
    treeDataProvider.GoGetFiles().then((res) => {
      context.subscriptions.push(vscode.window.createTreeView('fileExplorer', { treeDataProvider }));
    });

    //context.subscriptions.push(vscode.window.createTreeView('fileExplorer', { treeDataProvider }));
    //vscode.commands.registerCommand('fileExplorer.openFile', (resource) => this.openResource(resource));
  }

  private openResource(resource: vscode.Uri): void {
    vscode.window.showTextDocument(resource);
  }
}
