'use strict';

var specialTags = document.querySelectorAll('[data-x]');
specialTags[0].classList.remove('offsetfirst');
for (var i = 0; i < specialTags.length; i++) {
    specialTags[i].classList.add('offset');
}

window.addEventListener('scroll', function (xxxx) {
    findClosetAndremoveOffset();
});

/*helper*/
function findClosetAndremoveOffset() {
    var specialTags = document.querySelectorAll('[data-x]');
    var minIndex = 0;
    for (var _i = 1; _i < specialTags.length; _i++) {
        if (Math.abs(specialTags[_i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
            minIndex = _i;
        }
    }
    specialTags[minIndex].classList.remove('offset');

    var id = specialTags[minIndex].id;
    var a = document.querySelector('a[href="#' + id + '"]');
    var li = a.parentNode;
    var brotherAndme = li.parentNode.children;
    for (var _i2 = 0; _i2 < brotherAndme.length; _i2++) {
        brotherAndme[_i2].classList.remove('highlight');
    }
    li.classList.add('highlight');
}