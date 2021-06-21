const yellowButton = document.getElementById('yellowButton');
function changeBackgroundToYellow(){
document.body.style.background = "#FFD700";
}
yellowButton.addEventListener('click', changeBackgroundToYellow);
const greenButton = document.getElementById('greenButton');
function changeBackgroundToGreen(){
document.body.style.background = 'green';
}
greenButton.addEventListener('click', changeBackgroundToGreen);
const whiteButton = document.getElementById('whiteButton');
function changeBackgroundToWhite(){
document.body.style.background = 'white';
}
whiteButton.addEventListener('click', changeBackgroundToWhite);