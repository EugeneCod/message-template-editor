import getMessage from './getMessage';
import { INodes } from '../types';

const templateWithoutConditions: INodes = {
  0: {
    id: 0,
    text: 'Hello {firstname} {lastname}.',
    name: 'root',
    childIds: [],
  },
};

const templateWithTwoConditions: INodes = {
  0: {
    id: 0,
    text: 'Hello {firstname}. ',
    name: 'root',
    childIds: [1, 2, 3, 4],
  },
  1: {
    id: 1,
    text: '{company}',
    name: 'if',
    childIds: [],
  },
  2: {
    id: 2,
    text: 'I know you work at {company} ',
    name: 'then',
    childIds: [5, 6, 7, 8],
  },
  3: {
    id: 3,
    text: 'Where do you work at the moment? ',
    name: 'else',
    childIds: [],
  },
  4: {
    id: 4,
    text: 'Jake. Software Developer. ',
    name: 'end',
    childIds: [],
  },
  5: {
    id: 5,
    text: '{position}',
    name: 'if',
    childIds: [],
  },
  6: {
    id: 6,
    text: 'as {position}. ',
    name: 'then',
    childIds: [],
  },
  7: {
    id: 7,
    text: ', but what is your role? ',
    name: 'else',
    childIds: [],
  },
  8: {
    id: 8,
    text: ';) ',
    name: 'end',
    childIds: [],
  },
};
const templateWithLogicOperators: INodes = {
  0: {
    id: 0,
    text: 'Hello {firstname}. ',
    name: 'root',
    childIds: [1, 2, 3, 4],
  },
  1: {
    id: 1,
    text: '||',
    name: 'if',
    childIds: [],
  },
  2: {
    id: 2,
    text: ';) ',
    name: 'then',
    childIds: [],
  },
  3: {
    id: 3,
    text: 'Message ',
    name: 'else',
    childIds: [],
  },
  4: {
    id: 4,
    text: '',
    name: 'end',
    childIds: [],
  },
};

describe('getMessage', () => {
  it('Возвращает пустую строку при пустом шаблоне и отсутствии переменных', () => {
    const template = {};
    const values = {};
    const message = getMessage(template, values);
    expect(message).toBe('');
  });

  it('Возвращает правильную строку, когда заполнены все перемнные', () => {
    const template: INodes = {
      0: {
        id: 0,
        text: 'Hello {firstname}. I know you work at {company} as {position}. ;)',
        name: 'root',
        childIds: [],
      },
    };
    const values = {
      firstname: 'Bill',
      company: 'Bill & Melinda Gates Foundation',
      position: 'Co-chair',
    };
    const message = getMessage(template, values);
    expect(message).toBe(
      'Hello Bill. I know you work at Bill & Melinda Gates Foundation as Co-chair. ;)',
    );
  });

  it('Возвращает правильную строку, когда переменные не заполнены и имеются две условные конструкции', () => {
    const template: INodes = templateWithTwoConditions;
    const values = {
      firstname: '',
      company: '',
      position: '',
    };
    const message = getMessage(template, values);
    expect(message).toBe('Hello . Where do you work at the moment? Jake. Software Developer. ');
  });

  it('Возвращает правильную строку, когда все переменные заполнены и имеются две условные конструкции', () => {
    const template: INodes = templateWithTwoConditions;
    const values = {
      firstname: 'Bill',
      company: 'Bill & Melinda Gates Foundation',
      position: 'Co-chair',
    };
    const message = getMessage(template, values);
    expect(message).toBe(
      'Hello Bill. I know you work at Bill & Melinda Gates Foundation as Co-chair. ;) Jake. Software Developer. ',
    );
  });

  it("Возвращает правильную строку, когда в блоке 'if' указан условный оператор", () => {
    const template: INodes = templateWithLogicOperators;
    const values = {
      firstname: 'Bill',
      company: '',
      position: '',
    };
    const message = getMessage(template, values);
    expect(message).toBe('Hello Bill. ;) ');
  });
  it('Не преобразует значение переменной, когда оно может интерпретироваться, как другая переменная', () => {
    const template: INodes = templateWithoutConditions;
    let values = {
      firstname: 'Bill',
      lastname: '{firstname}',
    };
    let message = getMessage(template, values);
    expect(message).toBe('Hello Bill {firstname}.');

    values = {
      firstname: '{lastname}',
      lastname: 'Gates',
    };
    message = getMessage(template, values);
    expect(message).toBe('Hello {lastname} Gates.');
  });
  it("Возвращает правильную строку, когда имя переменной состоит из различных символов", () => {
    const template: INodes = {
      0: {
        id: 0,
        text: 'Hello {firstname} {123} {/.?#%@)([]{}} {} {a1/} {a1/ 123}.',
        name: 'root',
        childIds: [],
      },
    };
    const values = {
      firstname: 'Bill',
      '123': 'Word',
      '/.?#%@)([]{}': 'Word2',
      'a1/': '',
      'a1/ 123': 'Word3',
    };
    const message = getMessage(template, values);
    expect(message).toBe('Hello Bill Word Word2 {}  Word3.');
  });
});
