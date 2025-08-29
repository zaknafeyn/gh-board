interface Theme {
  text: Record<string, string>;
  background: Record<string, string>;
  border: Record<string, string>;
  accent: Record<string, string>;
}

const themes: Record<string, Theme> = {
  'default': {
    text: {
      primary: '#F7F1FF',
      secondary: '#5AD4E6',
      inverted: '#1a1a1a',
      faint: '#6c7086',
      warning: '#f9e2af',
      success: '#a6e3a1',
      error: '#f38ba8',
    },
    background: {
      selected: '#535155',
      hover: '#45404b',
      primary: '#1e1e2e',
    },
    border: {
      primary: '#948AE3',
      secondary: '#6c7086',
      faint: '#45475a',
      active: '#89b4fa',
    },
    accent: {
      blue: '#89b4fa',
      green: '#a6e3a1',
      yellow: '#f9e2af',
      red: '#f38ba8',
      purple: '#cba6f7',
      pink: '#f5c2e7',
      teal: '#94e2d5',
    },
  },
};

export const colors = themes['default'];
