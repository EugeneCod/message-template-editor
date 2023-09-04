import { INode, INodes, IVarData } from '../types';

function getMessage(template: INodes, values: IVarData) {
  const templateIsEmpty = Object.entries(template).length === 0;
  if (templateIsEmpty) {
    return '';
  }
  const rootNode = template[0];
  const message = generateMessageFromTree(rootNode, template, values);
  return message;
}

function generateMessageFromTree(node: INode, template: INodes, varData: IVarData) {
  let message = '';
  if (node.text.length) {
    message = convertVarToValue(node.text, varData);
  }
  if (node.childIds.length === 0) return message;

  const childIf = template[node.childIds[0]];
  const childThen = template[node.childIds[1]];
  const childElse = template[node.childIds[2]];
  const childEnd = template[node.childIds[3]];

  const childIfMessage = convertVarToValue(childIf.text, varData);
  if (childIfMessage.length) {
    message += generateMessageFromTree(childThen, template, varData);
  } else {
    message += generateMessageFromTree(childElse, template, varData);
  }
  message += generateMessageFromTree(childEnd, template, varData);
  return message;
}

function convertVarToValue(text: string, varData: IVarData) {
  let result = '';
  let restOfString = text;
  const arrVarNames = Object.keys(varData);
  // Регулярка поиска букв от 1 до бесконечности в любом регистре в фигурных скобках
  let target = /\{([a-z]{1,})\}/i;

  let match: RegExpMatchArray | null | undefined;
  while (true) {
    match = restOfString.match(target);
    // Если совпадений нет - прибавить остаток строки к результату и прекратить цикл
    if (match === null || match.index === undefined) {
      result += restOfString;
      break;
    }
    arrVarNames.includes(match[1])
      ? // Если массив имен переменных содержит совпадение - прибавить к результату
        // часть остатка строки до совпадения и значение найденной переменной
        (result = result + restOfString.slice(0, match.index) + varData[match[1]])
      : // В ином случае прибавить к результату часть остатка строки вместе
        // с совпадением в неизменном виде
        (result += restOfString.slice(0, match.index + match[0].length));
    restOfString = restOfString.slice(match.index + match[0].length);
  }
  return result;
}

export default getMessage;
