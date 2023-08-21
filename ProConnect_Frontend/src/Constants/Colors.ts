// Colors.ts
interface ColorScheme {
    background: string;
    container: string;
    highlight: string;
    black: string;
    star: string;
  }
  
  const Light: ColorScheme = {
    background: "#CFE8FB",
    container: "#FFFFFF7D",
    highlight: "#0F30F7",
    black: "#000000",
    star: "#F2AF0D",
  };
  
  const Dark: ColorScheme = {
    background: "#000000",
    container: "#FFFFFF7D",
    highlight: "#0F30F7",
    black: "#000000",
    star: "#F2AF0D",
  };
  
  const Themes: Record<string, ColorScheme> = { Light, Dark };
  
  function getColors(theme: string = 'Light'): ColorScheme {
    return Themes[theme] || Light; // Default to Light theme if the specified theme doesn't exist
  }
  
  export default getColors;  