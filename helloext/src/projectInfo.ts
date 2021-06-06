import { TreeItem, TreeItemCollapsibleState, Uri } from 'vscode';

export class ProjectInfo extends TreeItem {
  constructor(
    public readonly pathName: string,
    public readonly name: string,
    //public readonly uri: Uri,
    public readonly collapsibleState: TreeItemCollapsibleState = TreeItemCollapsibleState.None
  ) {
    super(name, collapsibleState);
    this.tooltip = `${this.label}`;
  }
}
