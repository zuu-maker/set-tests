export function capitalize(str, lc, all) {
  if (all) {
    return str
      .split(" ")
      .map((word) => capitalize(word, lc))
      .join(" ")
      .split("-")
      .map((word) => capitalize(word, false))
      .join("-");
  } else {
    return lc
      ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
      : str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export function stripHtmlTags(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}
