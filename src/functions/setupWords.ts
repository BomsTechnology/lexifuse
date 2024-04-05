import colors from '../constants/colors';
import WordProps from '../types/WordProps';

export const intializeWordStep = (word: WordProps) => {
  let tableStep = [word.answer, word.word1, word.word2, word.word3];
  tableStep = tableStep.sort(() => Math.random() - 0.5);
  return tableStep;
};

export const answerBgColor = (
  step: number,
  index: number,
  answer: string,
  word: string,
  isvalid: boolean,
  iserror: boolean,
  trueAnswer: string,
  use50: boolean,
  btnPosition: number
) => {
  if (index === step - 1) {
    if (answer === '') {
      if (use50) {
        if (word !== trueAnswer && btnPosition < 3) {
          return colors.gray2;
        } else {
          return colors.orange3;
        }
      } else {
        return colors.orange3;
      }
    } else if (!isvalid) {
      if (answer === word) {
        return colors.orange1;
      } else if (use50) {
        if (word !== trueAnswer && btnPosition < 3) {
          return colors.gray2;
        } else {
          return colors.orange3;
        }
      } else {
        return colors.orange3;
      }
    } else {
      if (iserror) {
        if (answer === word) {
          return colors.red1;
        } else if (use50) {
          if (word !== trueAnswer && btnPosition < 3) {
            return colors.gray2;
          } else {
            return colors.orange3;
          }
        } else {
          return colors.orange3;
        }
      } else {
        if (answer === word) {
          return colors.green1;
        } else if (use50) {
          if (word !== trueAnswer && btnPosition < 3) {
            return colors.gray2;
          } else {
            return colors.orange3;
          }
        } else {
          return colors.orange3;
        }
      }
    }
  } else {
    return colors.orange3;
  }
};

export const answerBorderColor = (
  step: number,
  index: number,
  answer: string,
  word: string,
  isvalid: boolean,
  iserror: boolean,
  trueAnswer: string,
  use50: boolean,
  btnPosition: number
) => {
  if (index === step - 1) {
    if (answer === '') {
      if (use50) {
        if (word !== trueAnswer && btnPosition < 3) {
          return colors.gray2;
        } else {
          return colors.orange4;
        }
      } else {
        return colors.orange4;
      }
    } else if (!isvalid) {
      if (answer === word) {
        return colors.orange2;
      } else if (use50) {
        if (word !== trueAnswer && btnPosition < 3) {
          return colors.gray2;
        } else {
          return colors.orange4;
        }
      } else {
        return colors.orange4;
      }
    } else {
      if (iserror) {
        if (answer === word) {
          return colors.red2;
        } else if (use50) {
          if (word !== trueAnswer && btnPosition < 3) {
            return colors.gray2;
          } else {
            return colors.orange4;
          }
        } else {
          return colors.orange4;
        }
      } else {
        if (answer === word) {
          return colors.green2;
        } else if (use50) {
          if (word !== trueAnswer && btnPosition < 3) {
            return colors.gray2;
          } else {
            return colors.orange4;
          }
        } else {
          return colors.orange4;
        }
      }
    }
  } else {
    return colors.orange3;
  }
};
