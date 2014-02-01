window.onload = function() {
    console.log('wow');

    var dogecoin_click = document.getElementById('dogecoin-click');
    dogecoin_click.onclick = function() {
        dogecoin_click.style.display = 'none';
        document.getElementById('dogecoin-address').style.display = 'inline';
    };
};
