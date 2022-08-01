var str = window.location.href;
var n = str[str.length - 1];
if (n == 1) {
    document.getElementById('steal').style.display = 'block';
} else {
    document.getElementById('riot').style.display = 'block';
}

function response1(name) {
    document.getElementById('after_res1').style.display = 'block';
    document.getElementById(name).style.display = 'block';
    document.getElementById('choicerow1').style.display = 'none';
}
function response2(name) {
    document.getElementById(name).style.display = 'block';
    document.getElementById('after_res2').style.display = 'block';
    document.getElementById('choicerow2').style.display = 'none';
}
function response3(name) {
    document.getElementById('end').style.display = 'block';
    document.getElementById(name).style.display = 'block';
    document.getElementById('interrogation').style.display = 'none';
}