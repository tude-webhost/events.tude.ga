


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
        panel: 'news',

        scheduleDisp: [ ]
    }
});

var contentel = document.getElementById('content');
contentel.onscroll = () => app.scrolled = contentel.scrollTop != 0;

document.addEventListener('mousemove', function(e) {
    var bounds;
    for (var obj of document.getElementsByClassName('box')) {
        if (obj.parentElement.querySelector(':hover') !== obj) continue;
        bounds = obj.getBoundingClientRect();
        let xAxis = (bounds.left+(bounds.right-bounds.left)/2 - e.clientX) / 200;
        let yAxis = -(bounds.top+(bounds.bottom-bounds.top)/2 - e.clientY) / 100;
        if (obj.hasAttribute('strong3d')) {
            xAxis *= 3;
            yAxis *= 3;
        }
        obj.style.setProperty('--transf', `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`);
    }
});

document.body.addEventListener('mousedown', () => document.body.classList.add('using-mouse'));
document.body.addEventListener('keydown', () => document.body.classList.remove('using-mouse'));

//

const eventTypes = {
    classic: 'Classic Event',
    tournament: 'Tournament',
    contest: 'Contest',
    special: 'Special Event'
}

var scheduleRaw = [ ];

fetch('http://pd.tude.ga/events/schedule.json')
    .catch(console.error)
    .then(obj => obj.json())
    .catch(console.error)
    .then(json => {
        // json.sort((a,b) => {
        //     var da = a.date.split('/');
        //     var db = b.date.split('/');
        //     var ta = parseInt(da[0]) + parseInt(da[1])*100 + parseInt(da[2])*10000;
        //     var tb = parseInt(db[0]) + parseInt(db[1])*100 + parseInt(db[2])*10000;
        //     return ta - tb;
        // });
        scheduleRaw = json;
        parseSchedule();
    });

function parseSchedule(length = 5) {
    var start = app.scheduleDisp.length;
    for (var i = start; i < start+length; i++) {
        var obj = {
            title: (i == 0 ? 'this week' : (i == 1 ? 'next week' : (i == 52 ? 'in a fucking year' : `in ${i} weeks`))),
            entries: []
        };
        var date = new Date();
        var day = date.getDay();
        if (day == 0) day = 7;
        for (var w = (i == 0 ? day : 0); w <= 7; w++) {
            var delta = w - day + i * 8;
            var target = new Date();
            target.setDate(target.getDate() + delta);
            for (var entry of scheduleRaw) {
                if (entry.date == `${target.getDate()}/${target.getMonth()+1}/${(target.getFullYear()+'').substring(2)}`) {
                    obj.entries.push({
                        time: dateString(target),
                        title: entry.name + ' &bull; ' + eventTypes[entry.type],
                        desc: entry.desc
                    });
                }
            }
        }
        app.scheduleDisp.push(obj);
    }
}

function dateString(date) {
    return (['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])[date.getDay()] + `, ` + date.getDate() + '. ' + (date.getMonth()+1) + '.';
}