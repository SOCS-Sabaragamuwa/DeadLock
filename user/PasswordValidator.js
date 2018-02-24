module.export = function(character, response) {
  if (
    character == character.toUpperCase() &&
    character == character.toLowerCase()
  ) {
    response = true;
  }
};
