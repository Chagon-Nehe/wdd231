// This script retrieves query parameters from the URL and logs them to the console
const myinfo   = new URLSearchParams(window.location.search);
console.log(myinfo);

console.log(myinfo.get('firstname'));
console.log(myinfo.get('lastname'));
console.log(myinfo.get('email'));


document.querySelector('#thanks-message').innerHTML = `<p>Thank you ${myinfo.get('firstname')} ${myinfo.get('lastname')} for joining the Chamber!</p>
<p>A confirmation email has been sent to ${myinfo.get('email')}.</p>`;
