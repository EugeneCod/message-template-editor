import { INodes } from '../types/node';

export const ARR_VAR_NAMES: string[] = ['firstname', 'lastname', 'company', 'position'];
export const INITAIL_TEMPLATE: INodes = {
  0: {
    // id: 0,
    text: 'Изначальный текст',
    name: 'root',
    childIds: [],
  },
};
export const MIN_TEXTAREA_HEIGHT: number = 56;



// глубокое копирование объекта
// const obj1 = {
//   key: {id: 1},
// };
// const obj2 = {...obj1, key: {...obj1.key}};


export const sampleData: INodes = {
  0: {
    // id: 0,
    text: 'Изначальный текст',
    name: 'root',
    childIds: [1, 2, 3, 4],
  },
  1: {
    // id: 1,
    text: '',
    name: 'if',
    childIds: [],
  },
  2: {
    // id: 2,
    text: '',
    name: 'then',
    childIds: [5, 6, 7, 8],
  },
  3: {
    // id: 3,
    text: '',
    name: 'else',
    childIds: [],
  },
  4: {
    // id: 4,
    text: '',
    name: 'end',
    childIds: [],
  },
  5: {
    // id: 5,
    text: '',
    name: 'if',
    childIds: [],
  },
  6: {
    // id: 6,
    text: '',
    name: 'then',
    childIds: [],
  },
  7: {
    // id: 7,
    text: '',
    name: 'else',
    childIds: [],
  },
  8: {
    // id: 8,
    text: '',
    name: 'end',
    childIds: [],
  },
};
