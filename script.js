// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  var passwordLength = prompt('What is the length of the password? It should be between 10 and 64.');
  
  while (passwordLength < 10 || passwordLength > 64) {
    passwordLength = prompt('The password length should be between 10 and 64.');
  }
  
  var hasUppercase = confirm('Should have uppercase?')
  var hasLowercase = confirm('Should have lowercase?')
  var hasNumber = confirm('Should have number?')
  var hasSpecialChar = confirm('Should have special characters?')
  
  if (!(hasUppercase || hasLowercase || hasNumber || hasSpecialChar)) {
    alert('You must select at least one character type.')
    return getPasswordOptions()

  }

  return {passwordLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar}
}

// Function for getting a random element from an array
function getRandom(arr) {
// Copied from https://stackoverflow.com/a/5915122/7647536
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function to generate password with user input
function generatePassword() {
// getPasswordOptions();

var {passwordLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar} = getPasswordOptions()
  
  var chars = [...(hasUppercase ? upperCasedCharacters : []), ...(hasLowercase ? lowerCasedCharacters : []), ...(hasNumber ? numericCharacters : []), ...(hasSpecialChar? specialCharacters : [])]

  var password = ''

  for (var i = 0; i < passwordLength; i++) {
    var arr
    
    if (i === 0 && hasUppercase) {
      arr = upperCasedCharacters
    } else if (i === 1 && hasLowercase) {
      arr = lowerCasedCharacters
    } else if (i === 2 && hasNumber) {
      arr =  numericCharacters 
    } else if (i === 3 && hasSpecialChar) {
      arr = specialCharacters
    } else {
      arr = chars
    }
    
    var char = getRandom(arr);
    password += char
  }
  
  // Copied from https://stackoverflow.com/a/13365977/7647536
  var shuffled = password.split('').sort(() => 0.5-Math.random()).join('');
  
  return shuffled
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);