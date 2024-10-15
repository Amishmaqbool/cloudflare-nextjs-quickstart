export const removeLeadingSlash = (str: string) => str.replace(/^\/+/g, "");

export const formatAsSlug = (input: string) => {
  return (
    input
      .replace(/<(?:.|\n)*?>/gm, "")
      .replace(/[!\"#$%&'\(\)\*\+,\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "")
      .replace(/(\s|\.)/g, "-")
      .replace(/-{2,}/g, "-")
      .replace(/—/g, "--")
      .toLowerCase()
  );
};
