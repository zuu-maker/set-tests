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
  let chars = [];
  if (str[0] === "<") {
    // console.log(str.split("")); // hpow to split into chars
    chars = str.split("");
    chars[3] = chars[3].toUpperCase();
    return chars.join("");
  }
  chars = str.split("");
  chars[0] = chars[0].toUpperCase();
  return chars.join("");
}

export function checkStringInArray(array, searchString) {
  // Check if the searchString exists in this array
  var exists = array.includes(searchString);

  // Return the result
  return exists;
}
