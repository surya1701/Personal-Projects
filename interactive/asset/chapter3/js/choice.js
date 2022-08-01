var str = window.location.href;
var muter = 1;
var n = str[str.length - 1];
if (n == 1) {
    document.getElementById('shoot').style.display = 'block';
} else {
    document.getElementById('noshoot').style.display = 'block';
}

function response1(name) {
    document.getElementById(name).style.display = 'block';
    document.getElementById('choicerow1').style.display = 'none';
}