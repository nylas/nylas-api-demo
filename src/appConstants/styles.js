import { StyleSheet } from 'aphrodite/no-important';

const COLORS = {
  NYLAS_BLACK: 'rgba(64, 68, 71, 1.0)',
  NYLAS_BLACK_80: 'rgba(64, 68, 71, 0.8)',
  NYLAS_BLACK_60: 'rgba(64, 68, 71, 0.6)',
  NYLAS_BLACK_40: 'rgba(64, 68, 71, 0.4)',
  NYLAS_BLACK_20: 'rgba(64, 68, 71, 0.2)',

  LIGHT_GRAY: 'rgba(229, 229, 229, 1.0)',
  LIGHT_GRAY_80: 'rgba(229, 229, 229, 0.8)',
  LIGHT_GRAY_60: 'rgba(229, 229, 229, 0.6)',
  LIGHT_GRAY_40: 'rgba(229, 229, 229, 0.4)',
  LIGHT_GRAY_20: 'rgba(229, 229, 229, 0.2)',

  BLUE_GRAY: 'rgba(108, 129, 144, 1.0)',
  BLUE_GRAY_80: 'rgba(108, 129, 144, 0.8)',
  BLUE_GRAY_60: 'rgba(108, 129, 144, 0.6)',
  BLUE_GRAY_40: 'rgba(108, 129, 144, 0.4)',
  BLUE_GRAY_20: 'rgba(108, 129, 144, 0.2)',

  GREEN: 'rgba(38, 185, 47, 1.0)',
  GREEN_80: 'rgba(38, 185, 47, 0.8)',
  GREEN_60: 'rgba(38, 185, 47, 0.6)',
  GREEN_40: 'rgba(38, 185, 47, 0.4)',
  GREEN_20: 'rgba(38, 185, 47, 0.2)',

  YELLOW: 'rgba(255, 216, 98, 1.0)',
  YELLOW_80: 'rgba(255, 216, 98, 0.8)',
  YELLOW_60: 'rgba(255, 216, 98, 0.6)',
  YELLOW_40: 'rgba(255, 216, 98, 0.4)',
  YELLOW_20: 'rgba(255, 216, 98, 0.2)',

  RED: 'rgba(255, 74, 74, 1.0)',
  RED_80: 'rgba(255, 74, 74, 0.8)',
  RED_60: 'rgba(255, 74, 74, 0.6)',
  RED_40: 'rgba(255, 74, 74, 0.4)',
  RED_20: 'rgba(255, 74, 74, 0.2)',

  BLUE: 'rgba(47, 136, 226, 1.0)',
  BLUE_80: 'rgba(47, 136, 226, 0.8)',
  BLUE_60: 'rgba(47, 136, 226, 0.6)',
  BLUE_40: 'rgba(47, 136, 226, 0.4)',
  BLUE_20: 'rgba(47, 136, 226, 0.2)',
  BLUE_10: 'rgba(47, 136, 226, 0.1)',

  WHITE: 'rgba(255, 255, 255, 1.0)',
  NYLAS_WHITE: 'rgba(251, 251, 251, 1.0)',

  TABLE_ROW: 'rgba(247, 250, 254, 1.0)',
};

const BACKGROUND_COLORS = {
  MAIN: COLORS.WHITE,
  MAIN_INSET: COLORS.NYLAS_WHITE,
  SECONDARY: COLORS.LIGHT_GRAY_40,
};

const BORDERS = {
  LIGHT: `solid ${COLORS.LIGHT_GRAY} 1px`,
  MEDIUM: `solid ${COLORS.NYLAS_BLACK_40} 1px`,
  DARK: `solid ${COLORS.NYLAS_BLACK} 1px`,
};

const GRADIENTS = {
  SEAFOAM: 'linear-gradient(130.67deg, #7DDC91 -7.52%, #25A5A6 92.48%)',
};

const STYLESHEETS = StyleSheet.create({
  ELLIPSIS_OVERFLOW: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  BOLD: {
    fontWeight: 600,
  },
});

const ANIMATION_TIMING_FUNCTIONS = {
  EASE_OUT_QUART: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
};

export default {
  COLORS,
  BACKGROUND_COLORS,
  BORDERS,
  GRADIENTS,
  STYLESHEETS,
  ANIMATION_TIMING_FUNCTIONS,
};
