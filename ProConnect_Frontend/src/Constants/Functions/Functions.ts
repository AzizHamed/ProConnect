export function checkName(text : string, firstName : string, lastName : string){
  return firstName.toLowerCase().startsWith(text.toLowerCase()) || lastName.toLowerCase().startsWith(text.toLowerCase()) || (firstName.toLowerCase() + " " + lastName.toLowerCase()).startsWith(text.toLowerCase())
}

