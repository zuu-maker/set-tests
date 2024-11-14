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
  return str.toString().replace(/<\/?[^>]+(>|$)/g, "");
}

export function containsHtmlTags(str) {
  const regex = /<\/?[\w\s="/.':;#-\/]+>/gi;
  return regex.test(str);
}

export function capitalizeFirstChar(str) {
  if (!str) return str;
  return str;
}

export function checkStringInArray(array, searchString) {
  // Check if the searchString exists in this array
  var exists = array.includes(searchString);

  // Return the result
  return exists;
}
