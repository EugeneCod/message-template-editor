import getMessage from './getMessage';
import { INodes } from '../types';

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
      position: 'Co-chair'
    };
    const message = getMessage(template, values);
    expect(message).toBe('Hello Bill. I know you work at Bill & Melinda Gates Foundation as Co-chair. ;)');
  });
});
