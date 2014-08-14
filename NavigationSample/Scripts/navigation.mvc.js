﻿(function (win) {

    if (!(win.history && win.history.pushState))
        return;

    win.document.addEventListener('click', function (e) {
        if (e.target.tagName && e.target.tagName === 'A'
            && e.target.getAttribute('data-navigation') === 'refresh'
            && !e.ctrlKey && !e.shiftKey) {
            var element = e.target;
            var ajax = true;
            while (element != null && ajax) {
                if (element.getAttribute)
                    ajax = element.getAttribute('data-navigation') !== 'noajax';
                element = element.parentNode;
            }
            if (ajax) {
                e.preventDefault();
                refreshAjax(e.target.getAttribute('href'), true);
            }
        }
    });

    win.document.addEventListener('submit', function (e) {
        var els = e.target.elements;
        var req = new win.XMLHttpRequest();
        req.onreadystatechange = onReady(req, true, null);
        var data = {};
        for (var i = 0; i < els.length; i++) {
            data[els[0].name] = els[0].value;
        }
        e.preventDefault();
        req.open('post', getLink(e.target.action));
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(data));
    });

    win.addEventListener('popstate', function (e) {
        refreshAjax(win.location.pathname + win.location.search, false)
    });

    var link = win.location.pathname + win.location.search;
    function refreshAjax(newLink, addHistory) {
        var req = new win.XMLHttpRequest();
        req.onreadystatechange = onReady(req, addHistory, newLink);
        req.open('get', getLink(newLink));
        req.send();
    }

    function getLink(baseLink) {
        baseLink += baseLink.indexOf('?') > 0 ? '&' : '?';
        baseLink += 'refreshajax=' + win.encodeURIComponent(link);
        return baseLink;
    }

    function onReady(req, addHistory, newLink) {
        return function () {
            if (req.readyState === 4 && req.status === 200) {
                var panels = win.JSON.parse(req.responseText).Panels;
                for (var id in panels) {
                    var panel = win.document.getElementById(id);
                    panel.innerHTML = panels[id];
                    var evt;
                    if (typeof Event === 'function')
                        evt = new win.Event('refreshajax');
                    else {
                        evt = win.document.createEvent('Event');
                        evt.initEvent('refreshajax', false, false);
                    }
                    panel.dispatchEvent(evt);
                }
                if (!newLink)
                    newLink = win.JSON.parse(req.responseText).Link;
                if (addHistory)
                    win.history.pushState(newLink, win.document.title, newLink);
                link = newLink;
            }
        };
    }
})(window);