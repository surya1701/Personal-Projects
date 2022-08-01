var a = 0, b = 0, c = 0, x = 0;
function changeto() {
    if (a != 0 && b != 0 && c != 0) {
        document.getElementById("intro").style.display = 'none';
        document.getElementById("negotiate").style.display = 'block';
    }
    else {
        if (x == 1) {
            document.getElementById("intro").style.display = 'none';
            document.getElementById("negotiate").style.display = 'block';
        }
        else {
            alert('View all the given information to proceed !');
            x += 1;
        }
    }
}
function response1(name) {
    document.getElementById(name).style.display = 'block';
    document.getElementById('choicerow1').style.display = 'none';
    document.getElementById('after_res1').style.display = 'block';
}
function response2(name) {
    document.getElementById(name).style.display = 'block';
    document.getElementById('choicerow2').style.display = 'none';
    document.getElementById('after_res2').style.display = 'block';
}