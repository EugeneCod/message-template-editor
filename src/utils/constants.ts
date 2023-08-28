import { INodes } from '../types';

export const ARR_VAR_NAMES: string[] = ['firstname', 'lastname', 'company', 'position'];
export const INITAIL_TEMPLATE: INodes = {
  0: {
    id: 0,
    text: 'Изначальный текст',
    name: 'root',
    childIds: [],
  },
};
export const MIN_TEXTAREA_HEIGHT: number = 56;

export const exaple: INodes = {
  0: {
    id: 0,
    text: 'Первый',
    name: 'root',
    childIds: [1, 2, 3, 4],
  },
  1: {
    id: 1,
    text: '',
    name: 'if',
    childIds: [],
  },
  2: {
    id: 2,
    text: '',
    name: 'then',
    childIds: [],
  },
  3: {
    id: 3,
    text: '',
    name: 'else',
    childIds: [],
  },
  4: {
    id: 4,
    text: 'Второй',
    name: 'end',
    childIds: [5, 6, 7, 8],
  },
  5: {
    id: 5,
    text: '',
    name: 'if',
    childIds: [],
  },
  6: {
    id: 6,
    text: '',
    name: 'then',
    childIds: [],
  },
  7: {
    id: 7,
    text: '',
    name: 'else',
    childIds: [],
  },
  8: {
    id: 8,
    text: 'Третий',
    name: 'end',
    childIds: [],
  },
};

// Объявить 4 новых узла
const nodes = {
  9: {
    id: 9,
    text: '',
    name: 'if',
    childIds: [],
  },
  10: {
    id: 10,
    text: '',
    name: 'then',
    childIds: [],
  },
  11: {
    id: 11,
    text: '',
    name: 'else',
    childIds: [],
  },
  12: {
    id: 9,
    text: '',
    name: 'end',
    childIds: [],
  },
};

export const exaple1: INodes = {
  0: {
    id: 0,
    text: 'Первый',
    name: 'root',
    childIds: [1, 2, 3, 4],
  },
  1: {
    id: 1,
    text: '',
    name: 'if',
    childIds: [],
  },
  2: {
    id: 2,
    text: '',
    name: 'then',
    childIds: [],
  },
  3: {
    id: 3,
    text: '',
    name: 'else',
    childIds: [],
  },
  4: {
    id: 4,
    text: 'Второй',
    name: 'end',
    childIds: [5, 6, 7, 8],
  },
  5: {
    id: 5,
    text: '',
    name: 'if',
    childIds: [],
  },
  6: {
    id: 6,
    text: '',
    name: 'then',
    childIds: [],
  },
  7: {
    id: 7,
    text: '',
    name: 'else',
    childIds: [],
  },
  8: {
    id: 8,
    text: 'Третий',
    name: 'end',
    childIds: [],
  },
};

export const exaple2: INodes = {
  0: {
    id: 0,
    text: 'Первый',
    name: 'root',
    childIds: [1, 2, 3, 4],
  },
  
  1: {
    id: 1,
    text: '',
    name: 'if',
    childIds: [],
  },
  2: {
    id: 2,
    text: '',
    name: 'then',
    childIds: [],
  },
  3: {
    id: 3,
    text: '',
    name: 'else',
    childIds: [],
  },
  4: {
    id: 4,
    text: 'Второй',
    name: 'end',
    childIds: [5, 6, 7, 8],
  },
  5: {
    id: 5,
    text: '',
    name: 'if',
    childIds: [],
  },
  6: {
    id: 6,
    text: '',
    name: 'then',
    childIds: [],
  },
  7: {
    id: 7,
    text: '',
    name: 'else',
    childIds: [],
  },
  8: {
    id: 8,
    text: 'Третий',
    name: 'end',
    childIds: [],
  },
};
