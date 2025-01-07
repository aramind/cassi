export const breakPascalCase = (text, textTransform) => {
  if (!text) return "";

  const broken = text.replace(/([A-Z])/g, " $1").trim();

  if (!textTransform) return broken;

  switch (textTransform.toLowerCase()) {
    case "capitalize":
      return broken.charAt(0).toUpperCase() + broken.slice(1).toLowerCase();
    case "uppercase":
      return broken.toUpperCase();
    case "lowercase":
      return broken.toLowerCase();
    default:
      return broken;
  }
};
