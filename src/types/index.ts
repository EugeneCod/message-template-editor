export interface INodes {
  [index: number]: INode;
}

export interface INode {
  id: number;
  text: string;
  name: 'root' | 'if' | 'then' | 'else' | 'end';
  childIds: number[];
}

export interface IVarData {
  [key: string]: string;
}