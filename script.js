


Vue.component('panel', {
    props: [ 'name' ],
    template: '#t-panel'
});

Vue.component('box', {
    props: [ 'click' ],
    template: '#t-box'
});

var app;
app = new Vue({
    el: '#app',
    data: {
        scrolled: false,
        panel: 'news'
    }
});

var contentel = document.getElementById('content');
contentel.onscroll = () => app.scrolled = contentel.scrollTop != 0;

document.addEventListener('mousemove', function(e) {
    var bounds;
    for (var obj of document.getElementsByClassName('box')) {
        if (obj.parentElement.querySelector(':hover') !== obj) continue;
        bounds = obj.getBoundingClientRect();
        let xAxis = (bounds.left+(bounds.right-bounds.left)/2 - e.pageX) / 100;
        let yAxis = -(bounds.top+(bounds.bottom-bounds.top)/2 - e.pageY) / 50;
        if (obj.hasAttribute('strong3d')) {
            xAxis *= 3;
            yAxis *= 3;
        }
        obj.style.setProperty('--transf', `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`);
    }
});