document.addEventListener('DOMContentLoaded', function () {
  var link = document.getElementById('link');
  link.addEventListener('click', function () {
    document.getElementById('linkpage').style.display = 'none';
    document.getElementById('framepage').style.display = 'initial';
    document.getElementsById('myFrame').src = String(document.getElementById('linkinput').value);
  })
})