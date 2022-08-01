
var player = document.createElement("div");
player.innerHTML = "<iframe id='myframe' src='" + String(document.getElementById('linkinput').value) + "'width='400' height='400'></iframe>"
document.body.appendChild(player);
/*
<div class="col text-center">
                <button class="btn btn-info btn-block" type="button" id="mini">MiniPlay&nbsp;
                    <i class="typcn typcn-tabs-outline"></i>
                </button>
            </div>
*/