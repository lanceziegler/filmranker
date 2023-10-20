// import { useMantineTheme } from "@mantine/core"

// export const useThemeCheck = () => {
//     const theme = useMantineTheme();

// }

import { ColorSchemeScript } from '@mantine/core';

export const useThemeCheck = () => {
  const theme = ColorSchemeScript;

  return theme;
};
