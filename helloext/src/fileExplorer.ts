import * as vscode from 'vscode';
import { EventEmitter, TreeItem } from 'vscode';
import { ProjectInfo } from './projectInfo';

export class FileExplorer implements vscode.TreeDataProvider<ProjectInfo> {
  private _onDidChangeTreeData: EventEmitter<ProjectInfo | undefined | null | void> = new EventEmitter<
    ProjectInfo | undefined | null | void
  >();
  readonly onDidChangeTreeData: vscode.Event<ProjectInfo | undefined | null | void> = this._onDidChangeTreeData.event;

  constructor(context: vscode.ExtensionContext) {
    vscode.commands.registerCommand('fileExplorer.openFile', (resource) => this.openResource(resource));
  }

  static async GoGetFiles() {
    let data: ProjectInfo[];
    const files = await vscode.workspace.findFiles('**/*.csproj', '**/node_modules/**');
    data = files.map((item) => new ProjectInfo(item.path, item.fsPath.substring(item.fsPath.lastIndexOf('\\') + 1)));
    return data;
  }

  getTreeItem(element: ProjectInfo): TreeItem {
    //return element;
    const treeItem = new vscode.TreeItem(element.name, element.collapsibleState);
    //if (element.type === vscode.FileType.File) {
    treeItem.command = { command: 'fileExplorer.openFile', title: 'Open File', arguments: [element] };
    treeItem.contextValue = 'file';
    //}
    return treeItem;
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

  refreshRecords(): void {
    this.getChildren();
  }

  private openResource(resource: ProjectInfo): void {
    console.log('openResource');
    vscode.workspace.openTextDocument(resource.pathName).then((doc) => {
      vscode.window.showTextDocument(doc);
    });
  }
}
