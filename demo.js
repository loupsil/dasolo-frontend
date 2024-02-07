document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    
    var scriptSrc;
    var currentPath = window.location.pathname;
    console.log('Current path:', currentPath);

    if (currentPath === '/betree-chatbot-test' || currentPath === '/betree-chatbot-test/') {
        scriptSrc = 'https://loupsil.github.io/dasolo-frontend/betree.js';
    } else {
        scriptSrc = 'https://loupsil.github.io/dasolo-frontend/louis-explique.js';
    }
    console.log('Script source:', scriptSrc);

    if (scriptSrc) {
        var script = document.createElement('script');
        script.src = scriptSrc;
        document.head.appendChild(script);
        console.log('Script element appended to head:', script);
    }
});

