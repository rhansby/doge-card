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

    // Wow such subscription button handling:
    var subscribe_click = document.getElementById('subscribe-click');
    if (subscribe_click) {
        subscribe_click.onclick = function() {
            subscribe_click.style.display = 'none';
            document.getElementById('form-subscribe').style.display = 'block';
        };
    }

    var subscribe_form = document.getElementById('form-subscribe');
    if (subscribe_form) {
        subscribe_form.onsubmit = function(event) {
            // Wow no traditional form submission, only AJAX:
            event.preventDefault();

            // Wow such non-support for IE <= 6
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 201) {
                    console.log(xmlhttp.responseText);

                    subscribe_form.style.display = 'none';
                    document.getElementById('subscribe-success').style.display = 'block';
                }
            }

            xmlhttp.open('GET', '/subscribe?email=' + document.getElementById('email').value, true);
            xmlhttp.send();
        }
    }
};
