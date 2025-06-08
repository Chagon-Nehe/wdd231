const dialogBox = document.getElementById("dialogBox");
const openBtn = document.getElementById("openbtn");
const closeBtn = document.getElementById("closebtn");


// Open the dialog box when the open button is clicked
openBtn.addEventListener("click", () => {
    dialogBox.showModal();
});
// Close the dialog box when the close button is clicked
closeBtn.addEventListener("click", () => {
    dialogBox.close();
});