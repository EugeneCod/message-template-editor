import { INode, INodes, IVarData } from '../types';

function getMessage(varData: IVarData, template: INodes) {
  const templateIsEmpty = Object.entries(template).length === 0;
  if (templateIsEmpty) {
    return '';
  }
  const rootNode = template[0];
  const message = generateMessageFromTree(rootNode, template, varData);
  return message;
}

function generateMessageFromTree(node: INode, template: INodes, varData: IVarData) {
  let message = '';
  if (node.text.length) {
    message = convertVarToValue(node.text, varData);
  };
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
  let result: string = text;
  const arrVarNames = Object.keys(varData);
  arrVarNames.forEach((variable) => {
    const newString = result.replaceAll(`{${variable}}`, varData[variable]);
    result = newString;
  });
  return result;
}

export default getMessage;
