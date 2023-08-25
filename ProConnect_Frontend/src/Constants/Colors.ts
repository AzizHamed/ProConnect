/**
 * This file contains predefined color schemes that can be used in the application.
 */

/**
 * This interface defines the primary colors used in the various parts of the application.
 */
interface ColorScheme
{
  background: string;
  container: string;
  highlight: string;
  textColor: string;
  star: string;
}

const Light: ColorScheme = {
  background: "#CFE8FB",
  container: "#FFFFFF7D",
  highlight: "#0F30F7",
  textColor: "#000000",
  star: "#F2AF0D",
};

const Dark: ColorScheme = {
  background: "#222222",
  container: "#5353537d",
  highlight: "#7415c2",
  textColor: "#FFFFFF",
  star: "#F2AF0D",
};

const Themes: Record<string, ColorScheme> = { Light, Dark };

/**
 * @returns ColorScheme based on the desired theme.
 */
function getColors(theme: string = 'Light'): ColorScheme
{
  return Themes[theme] || Light; // Default to Light theme if the specified theme doesn't exist
}

export default getColors;  