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
  let result = text;
  const arrVarNames = Object.keys(varData);
  // Пройти циклом по всем символам
  for (let i = 0; i < result.length; i++) {
    // Если встретилась открывающая скобка -
    if (result[i] === '{') {
      // пройти циклом по всем символам после неё
      for (let j = i + 1; j < result.length; j++) {
        // Если встретилась закрывающая скобка -
        if (result[j] === '}') {
          // выделить подстроку между фигурными скобками
          const target = result.slice(i + 1, j);
          // Если массив имён переменных содержит такое имя -
          if (arrVarNames.includes(target)) {
            // найти значение переменной с таким именем,
            const varValue = varData[target];
            // преобразовать в результате имя переменной на её значение,
            // исключив фигурные скобки
            result = `${result.slice(0, i)}${varValue}${result.slice(j + 1)}`;
            // переопределить индекс основного цикла, чтобы в текущей
            // итерации он указывал на последний символ значения переменной
            // или на предыдущий, если значение переменной пустое
            i += varValue.length - 1;
            break;
          }
        }
      }
    }
  }
  return result;
}

export default getMessage;
