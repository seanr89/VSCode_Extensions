import * as vscode from 'vscode';
import { TreeItem } from 'vscode';
import { ProjectInfo } from './projectInfo';

export class FileExplorer implements vscode.TreeDataProvider<ProjectInfo> {
  constructor(context: vscode.ExtensionContext) {
    // context.subscriptions.push(vscode.window.createTreeView('fileExplorer', { treeDataProvider }));
    //context.subscriptions.push(vscode.window.createTreeView('fileExplorer', { treeDataProvider }));
    //vscode.commands.registerCommand('fileExplorer.openFile', (resource) => this.openResource(resource));
  }

  static async GoGetFiles() {
    let data: ProjectInfo[];
    const files = await vscode.workspace.findFiles('**/*.csproj', '**/node_modules/**');
    console.log('files found');
    //item.fsPath.substring(0, item.fsPath.lastIndexOf('/')))
    data = files.map((item) => new ProjectInfo(item.path, item.fsPath.substring(item.fsPath.lastIndexOf('\\') + 1)));
    // files.forEach((element) => {
    //   console.log(element.fsPath);
    //   console.log(element.fsPath.substring(element.fsPath.lastIndexOf('\\') + 1));
    // });
    return data;
  }

  getTreeItem(element: ProjectInfo): TreeItem {
    return element;
  }

  getChildren(element?: ProjectInfo): Thenable<ProjectInfo[]> {
    if (!element) {
      return new Promise(async function (resolve, reject) {
        const projects: ProjectInfo[] = await FileExplorer.GoGetFiles();
        resolve(projects);
      });
    } else {
      return Promise.resolve([]);
    }
  }

  // private openResource(resource: vscode.Uri): void {
  //   vscode.window.showTextDocument(resource);
  // }
}
