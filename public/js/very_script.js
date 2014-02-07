window.onload = function() {
    console.log('wow');

    var dogecoin_click = document.getElementById('dogecoin-click');
    dogecoin_click.onclick = function() {
        dogecoin_click.style.display = 'none';
        document.getElementById('dogecoin-address').style.display = 'inline';
    };

    // ~ Very thanks to http://indogewetrust.com/ for inspiration ~
    var flash_elements = document.getElementsByClassName('flash');
    var flash = function() {
        var r = ~~(Math.random() * 255),
            g = ~~(Math.random() * 255),
            b = ~~(Math.random() * 255);

        Array.prototype.forEach.call(flash_elements, function(el) {
            el.style.color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        });
    };
    setInterval(flash, 150);

    /* Wow, reset select tag to choice from before form submission failure */
    var prev_theme_el = document.getElementById('previously-selected-theme');
    if (prev_theme_el) {
        var prev_theme = prev_theme_el.innerHTML;
        var select = document.getElementById('theme');
        Array.prototype.forEach.call(select, function(el) {
            if (el.value === prev_theme) {
                el.selected = true;
            }
        });
    }
};
