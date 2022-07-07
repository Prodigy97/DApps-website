/*
 2014 Artem Sapegin (sapegin.me), 2016 Vitaliy Filippov
 @license MIT
*/
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        (function() {
            function k(a, b, c) {
                for (var d = -1, e = !1; - 1 != (d = a.className.indexOf(b, d + 1));) d && !/\s/.exec(a.className.charAt(d - 1)) || d != a.className.length - b.length && !/\s/.exec(a.className.charAt(d + b.length)) || (e = !0, c && (a.className = a.className.substr(0, d - 1) + a.className.substr(d + b.length)));
                return e
            }

            function q(a, b, c) {
                var d = document.createElement("script");
                d.type = "text/javascript";
                d.src = a;
                d.onreadystatechange = function() {
                    "complete" ==
                    d.readyState ? b && b() : "loaded" == d.readyState && (d.children, "loading" == d.readyState && c && c());
                    d.parentNode && d.parentNode.removeChild(d);
                    d = null
                };
                d.onload = function() {
                    b && b();
                    d.parentNode && d.parentNode.removeChild(d);
                    d = null
                };
                d.onerror = function() {
                    c && c();
                    d.parentNode && d.parentNode.removeChild(d);
                    d = null
                };
                (document.head || document.getElementsByTagName("head")[0]).appendChild(d)
            }

            function t(a, b) {
                this.container = a;
                this.options = b;
                this.init()
            }

            function u(a, b) {
                this.widget = a;
                this.options = {};
                for (var c in b) this.options[c] =
                    b[c];
                this.detectService();
                this.service && this.init()
            }

            function v(a, b) {
                function c(a, b) {
                    return b.toUpper()
                }
                for (var d = {}, e = 0; e < a.attributes.length; e++) {
                    var f = a.attributes[e].name;
                    if ("data-" == f.substr(0, 5)) {
                        f = f.substr(5);
                        var g = a.attributes[e].value;
                        "yes" === g ? g = !0 : "no" === g && (g = !1);
                        d[b ? f : f.replace(/-(\w)/g, c)] = g
                    }
                }
                return d
            }

            function m(a, b) {
                return w(a, b, encodeURIComponent)
            }

            function w(a, b, c) {
                return a.replace(/\{([^\}]+)\}/g, function(a, e) {
                    return e in b ? c ? c(b[e]) : b[e] : a
                })
            }

            function n(a, b) {
                a = "mbr-social-likes__" +
                    a;
                return a + " " + a + "_" + b
            }

            function x(a, b) {
                function c(d) {
                    if ("keydown" !== d.type || 27 === d.which) {
                        for (; d && d != a; d = d.parentNode);
                        d != a && (k(a, "mbr-social-likes_opened", !0), removeListener(document, "click", c), removeListener(document, "touchstart", c), removeListener(document, "keydown", c), b())
                    }
                }
                addListener(document, "click", c);
                addListener(document, "touchstart", c);
                addListener(document, "keydown", c)
            }

            function y(a) {
                if (document.documentElement.getBoundingClientRect) {
                    var b = parseInt(a.style.left, 10),
                        c = parseInt(a.style.top,
                            10),
                        d = a[0].getBoundingClientRect();
                    10 > d.left ? a.stype.left = 10 - d.left + b + "px" : d.right > window.innerWidth - 10 && (a.style.left = window.innerWidth - d.right - 10 + b + "px");
                    10 > d.top ? a.style.top = 10 - d.top + c + "px" : d.bottom > window.innerHeight - 10 && (a.style.top = window.innerHeight - d.bottom - 10 + c + "px")
                }
                a.className += " mbr-social-likes_opened"
            }
            var h = "https:" === location.protocol ? "https:" : "http:",
                l = {
                    facebook: {
                        counterUrl: "https://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=?",
                        convertNumber: function(a) {
                            return a.data[0].total_count
                        },
                        popupUrl: "https://www.facebook.com/sharer/sharer.php?u={url}",
                        popupWidth: 600,
                        popupHeight: 359
                    },
                    twitter: {
                        popupUrl: "https://twitter.com/intent/tweet?url={url}&text={title}",
                        popupWidth: 600,
                        popupHeight: 250,
                        click: function() {
                            /[\.\?:\-\u2013\u2014]\s*$/.test(this.options.title) || (this.options.title += ":");
                            return !0
                        }
                    },
                    mailru: {
                        counterUrl: h + "//connect.mail.ru/share_count?url_list={url}&callback=1&func=?",
                        convertNumber: function(a) {
                            for (var b in a)
                                if (a.hasOwnProperty(b)) return a[b].shares
                        },
                        popupUrl: "https://connect.mail.ru/share?share_url={url}&title={title}&image_url={image}",
                        popupWidth: 492,
                        popupHeight: 500
                    },
                    vkontakte: {
                        counterUrl: "https://vk.com/share.php?act=count&url={url}&index={index}",
                        counter: function(a, b) {
                            var c = l.vkontakte;
                            c._ || (c._ = [], window.VK || (window.VK = {}), window.VK.Share = {
                                count: function(a, b) {
                                    c._[a].resolve(b)
                                }
                            });
                            var d = c._.length;
                            c._.push(b);
                            q(m(a, {
                                index: d
                            }), null, function() {
                                b.reject()
                            })
                        },
                        popupUrl: "https://vk.com/share.php?url={url}&title={title}&image={image}",
                        popupWidth: 655,
                        popupHeight: 450
                    },
                    odnoklassniki: {
                        counterUrl: h + "//connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}",
                        counter: function(a, b) {
                            var c = l.odnoklassniki;
                            c._ || (c._ = [], window.ODKL || (window.ODKL = {}), window.ODKL.updateCount = function(a, b) {
                                a && c._[a].resolve(b)
                            });
                            var d = c._.length;
                            c._.push(b);
                            q(m(a, {
                                index: d
                            }), null, function() {
                                b.reject()
                            })
                        },
                        popupUrl: "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}",
                        popupWidth: 580,
                        popupHeight: 336
                    },
                    plusone: {
                        counterUrl: h + "//share.yandex.ru/gpp.xml?url={url}&callback=?",
                        convertNumber: function(a) {
                            return parseInt(a.replace(/\D/g, ""), 10)
                        },
                        popupUrl: "https://plus.google.com/share?url={url}",
                        popupWidth: 500,
                        popupHeight: 550
                    },
                    pinterest: {
                        counterUrl: h + "//api.pinterest.com/v1/urls/count.json?url={url}&callback=?",
                        convertNumber: function(a) {
                            return a.count
                        },
                        popupUrl: "https://pinterest.com/pin/create/button/?url={url}&description={title}",
                        popupWidth: 740,
                        popupHeight: 550
                    }
                },
                p = {
                    promises: {},
                    fetch: function(a, b, c) {
                        p.promises[a] || (p.promises[a] = {});
                        var d = p.promises[a];
                        if (c.forceUpdate || !d[b]) {
                            var e = {},
                                f;
                            for (f in l[a]) e[f] = l[a][f];
                            for (f in c) e[f] = c[f];
                            var g = {
                                resolve: function(a) {},
                                reject: function() {}
                            };
                            if ((a =
                                    e.counterUrl && m(e.counterUrl, {
                                        url: b
                                    })) && "function" == typeof e.counter) e.counter(a, g);
                            else if (e.counterUrl) {
                                var h = function(a) {
                                    try {
                                        "function" == typeof e.convertNumber && (a = e.convertNumber(a)), g.resolve(a)
                                    } catch (z) {
                                        g.reject()
                                    }
                                };
                                if (0 < a.indexOf("=?")) {
                                    for (var k = 0; window["__jsonp" + k];) k++;
                                    window["__jsonp" + k] = function(a) {
                                        delete window["__jsonp" + k];
                                        h(a)
                                    };
                                    a = a.replace("=?", "=__jsonp" + k);
                                    q(a, null, function() {
                                        g.reject()
                                    })
                                } else GET(a, function(a, b) {
                                    a.responseText ? h(b || a.responseText) : g.reject()
                                })
                            } else g.reject();
                            d[b] =
                                g
                        }
                        return d[b]
                    }
                };
            window.socialLikes = function(a, b) {
                var c = a["__mbr-social-likes"];
                if (c) "object" == typeof b && c.update(b);
                else {
                    c = {};
                    var d = v(a),
                        e;
                    for (e in window.socialLikes.defaults) c[e] = window.socialLikes.defaults[e];
                    for (e in b) c[e] = b[e];
                    for (e in d) c[e] = d[e];
                    c = new t(a, c);
                    a["__mbr-social-likes"] = c
                }
            };
            h = function() {
                for (var a = {}, b = document.getElementsByTagName("meta"), c = 0; c < b.length; c++) {
                    var d = b[c].getAttribute("property");
                    d && "og:" == d.substr(0, 3) && (a[d.substr(3)] = b[c].getAttribute("content"))
                }
                return a
            }();
            window.socialLikes.defaults = {
                url: window.location.href.replace(window.location.hash, ""),
                title: h.title || document.title,
                image: h.image,
                counters: !0,
                zeroes: !1,
                wait: 500,
                timeout: 1E4,
                popupCheckInterval: 500,
                singleTitle: "Share"
            };
            t.prototype = {
                init: function() {
                    var a = this;
                    k(this.container, "mbr-social-likes") || (this.container.className += " mbr-social-likes");
                    this.single = k(this.container, "mbr-social-likes_single");
                    this.initUserButtons();
                    this.number = this.countersLeft = 0;
                    this.container["on_counter.mbr-social-likes"] = function(b) {
                        return a.updateCounter(b)
                    };
                    this.makeSingleButton();
                    this.buttons = [];
                    for (var b = 0; b < this.container.children.length; b++) {
                        var c = new u(this.container.children[b], this.options);
                        this.buttons.push(c);
                        c.options.counterUrl && this.countersLeft++
                    }
                    this.options.counters ? (this.timer = setTimeout(function() {
                        a.appear()
                    }, this.options.wait), this.timeout = setTimeout(function() {
                        a.ready()
                    }, this.options.timeout)) : this.appear()
                },
                initUserButtons: function() {
                    if (!this.userButtonInited && window.socialLikesButtons)
                        for (var a in window.socialLikesButtons) {
                            l[a] =
                                l[a] || {};
                            for (var b in window.socialLikesButtons[a]) l[a][b] = window.socialLikesButtons[a][b]
                        }
                    this.userButtonInited = !0
                },
                makeSingleButton: function() {
                    if (this.single) {
                        var a = this.container;
                        a.className += " mbr-social-likes_vertical";
                        var b = document.createElement("div");
                        b.className = "mbr-social-likes_single-w";
                        a.parentNode.insertBefore(b, a);
                        b.appendChild(a);
                        var c = document.createElement("div");
                        for (c.className = "mbr-social-likes__single-container"; a.firstChild;) c.appendChild(a.firstChild);
                        a.appendChild(c);
                        var d =
                            document.createElement("div");
                        d.className = n("widget", "single");
                        d.innerHTML = '<div class="' + n("button", "single") + '"><span class="' + n("icon", "single") + '"></span>' + this.options.singleTitle + "</div>";
                        b.appendChild(d);
                        addListener(d, "click", function() {
                            k(d, "mbr-social-likes__widget_active", !0) ? k(a, "mbr-social-likes_opened", !0) : (d.className += " mbr-social-likes__widget_active", a.style.left = (d.offsetWidth - a.offsetWidth) / 2 + "px", a.style.top = -a.offsetHeight + "px", y(a), x(a, function() {
                                k(d, "mbr-social-likes__widget_active", !0)
                            }));
                            return !1
                        });
                        this.widget = d
                    }
                },
                update: function(a) {
                    if (a.forceUpdate || a.url !== this.options.url) {
                        this.number = 0;
                        this.countersLeft = this.buttons.length;
                        if (this.widget) {
                            var b = this.widget.querySelector(".mbr-social-likes__counter");
                            b && b.parentNode.removeChild(b)
                        }
                        for (var c in a) this.options[c] = a[c];
                        for (b = 0; b < this.buttons.length; b++) this.buttons[b].update(a)
                    }
                },
                updateCounter: function(a, b, c) {
                    if ((c = c || 0) || this.options.zeroes) this.number += c, this.single && this.getCounterElem().text(this.number);
                    0 === this.countersLeft &&
                        (this.appear(), this.ready());
                    this.countersLeft--
                },
                appear: function() {
                    this.container.className += " mbr-social-likes_visible"
                },
                ready: function(a) {
                    this.timeout && clearTimeout(this.timeout);
                    this.container.className += " mbr-social-likes_ready";
                    a || (a = this.container["on_ready.mbr-social-likes"]) && a(this.number)
                },
                getCounterElem: function() {
                    var a = this.widget.querySelector(".mbr-social-likes__counter_single");
                    a.length || (a = document.createElement("span"), a.className = n("counter", "single"), this.widget.append(a));
                    return a
                }
            };
            u.prototype = {
                init: function() {
                    this.detectParams();
                    this.initHtml();
                    var a = this;
                    setTimeout(function() {
                        a.initCounter()
                    }, 0)
                },
                update: function(a) {
                    this.options.forceUpdate = !1;
                    for (var b in a) this.options[b] = a[b];
                    (a = this.widget.querySelector(".mbr-social-likes__counter")) && a.parentNode.removeChild(a);
                    this.initCounter()
                },
                detectService: function() {
                    var a = this.widget.getAttribute("data-service");
                    if (!a) {
                        for (var b = this.widget.classList || this.widget.className.split(" "), c = 0; c < b.length; c++) {
                            var d = b[c];
                            if (l[d]) {
                                a = d;
                                break
                            }
                        }
                        if (!a) return
                    }
                    this.service =
                        a;
                    for (var e in l[a]) this.options[e] = l[a][e]
                },
                detectParams: function() {
                    var a = this.widget.getAttribute("data-counter");
                    if (a) {
                        var b = parseInt(a, 10);
                        isNaN(b) ? this.options.counterUrl = a : this.options.counterNumber = b
                    }
                    if (a = this.widget.getAttribute("data-title")) this.options.title = a;
                    if (a = this.widget.getAttribute("data-url")) this.options.url = a
                },
                initHtml: function() {
                    var a = this,
                        b = this.options,
                        c = this.widget,
                        d = c.querySelector("a");
                    d && this.cloneDataAttrs(d, c);
                    d = document.createElement("span");
                    d.className = this.getElementClassNames("button");
                    d.innerHTML = c.innerHTML;
                    if (b.clickUrl) {
                        b = m(b.clickUrl, {
                            url: b.url,
                            title: b.title,
                            image: b.image || ""
                        });
                        var e = document.createElement("a");
                        e.href = b;
                        this.cloneDataAttrs(c, e);
                        c.parentNode.insertBefore(e, c);
                        c.parentNode.removeChild(c);
                        this.widget = c = e
                    } else c.addEventListener("click", function() {
                        a.click()
                    });
                    c.className = c.className.replace(" " + this.service, "") + " " + this.getElementClassNames("widget");
                    b = document.createElement("span");
                    b.className = this.getElementClassNames("icon");
                    d.children.length ? d.insertBefore(b,
                        d.firstChild) : d.appendChild(b);
                    c.innerHTML = "";
                    c.appendChild(d);
                    this.button = d
                },
                initCounter: function() {
                    if (this.options.counters)
                        if (this.options.counterNumber) this.updateCounter(this.options.counterNumber);
                        else {
                            var a = this,
                                b = p.fetch(this.service, this.options.url, {
                                    counterUrl: this.options.counterUrl,
                                    forceUpdate: this.options.forceUpdate
                                });
                            b.reject = b.resolve = function(b) {
                                a.updateCounter(b)
                            }
                        }
                },
                cloneDataAttrs: function(a, b) {
                    for (var c = 0; c < a.attributes.length; c++) "data-" == a.attributes[c].name.substr(0, 5) && b.setAttribute(a.attributes[c].name,
                        a.attributes[c].value)
                },
                getElementClassNames: function(a) {
                    return n(a, this.service)
                },
                updateCounter: function(a) {
                    a = parseInt(a, 10) || 0;
                    var b = document.createElement("span");
                    a || this.options.zeroes ? (b.innerHTML = a, b.className = this.getElementClassNames("counter")) : b.className = this.getElementClassNames("counter") + " mbr-social-likes__counter_empty";
                    this.widget.appendChild(b);
                    (b = this.widget["on_counter.mbr-social-likes"]) && b([this.service, a])
                },
                click: function(a) {
                    var b = this.options,
                        c = !0;
                    "function" == typeof b.click &&
                        (c = b.click.call(this, a));
                    c && (a = m(b.popupUrl, {
                        url: b.url,
                        title: b.title,
                        image: b.image || ""
                    }), a = this.addAdditionalParamsToUrl(a), this.openPopup(a, {
                        width: b.popupWidth,
                        height: b.popupHeight
                    }));
                    return !1
                },
                addAdditionalParamsToUrl: function(a) {
                    var b = v(this.widget),
                        c;
                    for (c in this.options.data) b[c] = this.options.data[c];
                    var d = "";
                    for (c in b) d += "&" + encodeURIComponent(c) + "=" + encodeURIComponent(b[c]);
                    if (!d) return a;
                    a.indexOf("?") || (d = "?" + d.substr(1));
                    return a + d
                },
                openPopup: function(a, b) {
                    var c = Math.round(screen.width /
                            2 - b.width / 2),
                        d = 0;
                    screen.height > b.height && (d = Math.round(screen.height / 3 - b.height / 2));
                    var e = window.open(a, "sl_" + this.service, "left=" + c + ",top=" + d + ",width=" + b.width + ",height=" + b.height + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
                    if (e) {
                        e.focus();
                        (a = this.widget["on_popup_opened.mbr-social-likes"]) && a([this.service, e]);
                        var f = this,
                            g = setInterval(function() {
                                if (e.closed) {
                                    clearInterval(g);
                                    var a = f.widget["on_popup_closed.mbr-social-likes"];
                                    a && a(f.service)
                                }
                            }, this.options.popupCheckInterval)
                    } else location.href =
                        a
                }
            };
            h = document.querySelectorAll(".mbr-social-likes");
            for (var r = 0; r < h.length; r++) window.socialLikes(h[r])
        })()
    }, 2E3)
});