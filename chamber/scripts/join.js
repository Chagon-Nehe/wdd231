const getString= window.location.search;
console.log(getString);

const myinfo   = new URLSearchParams(getString);
console.log(myinfo);

console.log(myinfo.get('firstname'));
console.log(myinfo.get('lastname'));
console.log(myinfo.get('email'));
