// export interface INodeData {
//   // уникальный Id
//   id: number;
//   // текст в поле ввода
//   text: string;
//   // логическое предназначение
//   name: 'root' | 'if' | 'then' | 'else' | 'end';
//   // родительский Id
//   // parentId: number | null,
//   // уровень вложенности для обозначения отступов
//   level: number;
//   // индексы дочерних элементов
//   childIds: number[];
// }

// interface childIds {
//   if: number;
//   then: number;
//   else: number;
//   end: number;
// }

export interface INodes {
  [index: number]: INode;
}

export interface INode {
  id: number;
  text: string;
  name: 'root' | 'if' | 'then' | 'else' | 'end';
  childIds: number[];
}