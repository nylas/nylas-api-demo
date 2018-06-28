import { StyleSheet as OriginalStyleSheet } from 'aphrodite/no-important';

const descendantClassesHandler = (
  selector,
  parentSelector,
  generateSubtreeStyles
) => {
  if (selector[0] === '.') {
    const subStyles = generateSubtreeStyles(selector);
    return parentSelector + ' ' + subStyles;
  }
};

const descendantClassesExtension = {
  selectorHandler: descendantClassesHandler,
};

const extensions = [descendantClassesExtension];

const { StyleSheet, css } = OriginalStyleSheet.extend(extensions);
export { StyleSheet, css };
