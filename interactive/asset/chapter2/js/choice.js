function response1(name) {
    document.getElementById(name).style.display = 'block';
    document.getElementById('choicerow1').style.display = 'none';
    document.getElementById('after_res1').style.display = 'block';
}
function response2(name) {
    document.getElementById(name).style.display = 'block';
    document.getElementById('choicerow2').style.display = 'none';
    document.getElementById('carlson').style.display = 'block';
}
function response3(name) {
    document.getElementById('paint').src = 'asset/chapter2/img/' + name + '.jpg';
    document.getElementById('choicerow3').style.display = 'none';
    document.getElementById('choicerow4').style.display = 'none';
    document.getElementById('after_res2').style.display = 'block';
}
function response4(name) {
    document.getElementById('choicerow5').style.display = 'none';
    document.getElementById('after_res3').style.display = 'block';
    document.getElementById(name).style.display = 'block';
    if (name == 'shoot') {
        // play gunshot
    }
}