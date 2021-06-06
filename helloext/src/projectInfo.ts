import { TreeItem, TreeItemCollapsibleState } from 'vscode';

export class ProjectInfo extends TreeItem {
  constructor(
    public readonly pathName: string,
    public readonly name: string,
    public readonly collapsibleState: TreeItemCollapsibleState = TreeItemCollapsibleState.None
  ) {
    super(name, collapsibleState);
    this.tooltip = `${this.label}`;
  }
}
