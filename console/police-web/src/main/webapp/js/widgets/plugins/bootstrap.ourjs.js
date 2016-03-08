/**
 * jquery.bootstrap.js
 Copyright (c) Kris Zhang <kris.newghost@gmail.com>
 License: MIT (https://github.com/newghost/bootstrap-jquery-plugin/blob/master/LICENSE)
 */
String.prototype.format || (String.prototype.format = function() {
    var e = arguments;
    return this.replace(/{(\d+)}/g,
        function(t, n) {
            return typeof e[n] != "undefined" ? e[n] : t
        })
}),
    function(e) {
        e.fn.dialog = function(t) {
            var n = this,
                r = e(n),
                i = e(document.body),
                s = r.closest(".dialog"),
                o = "dialog-parent",
                u = arguments[1],
                a = arguments[2],
                f = function() {
                    var t = '<div class="dialog modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close">&times;</button><h4 class="modal-title"></h4></div><div class="modal-body"></div><div class="modal-footer"></div></div></div></div>';
                    s = e(t),
                        e(document.body).append(s),
                        s.find(".modal-body").append(r)
                },
                l = function(r) {
                    var i = (r || t || {}).buttons || {},
                        o = s.find(".modal-footer");
                    o.empty();
                    var u = i.constructor == Array;
                    for (var a in i) {
                        var f = i[a],
                            l = "",
                            c = "",
                            h = "btn-default",
                            p = "";
                        if (f.constructor == Object) l = f.id,
                            c = f.text,
                            h = f["class"] || f.classed || h,
                            p = f.click;
                        else {
                            if ( !! u || f.constructor != Function) continue;
                            c = a,
                                p = f
                        }
                        $button = e('<button type="button" class="btn">').addClass(h).html(c),
                        l && $button.attr("id", l),
                        p &&
                        function(e) {
                            $button.click(function() {
                                e.call(n)
                            })
                        } (p),
                            o.append($button)
                    }
                    o.data("buttons", i)
                },
                c = function() {
                    s.modal("show")
                },
                h = function(e) {
                    s.modal("hide").one("hidden.bs.modal",
                        function() {
                            e && (r.data(o).append(r), s.remove())
                        })
                };
            if (t.constructor == Object) { ! r.data(o) && r.data(o, r.parent()),
            s.size() < 1 && f(),
                l(),
                e(".modal-title", s).html(t.title || "");
                var p = e(".modal-dialog", s).addClass(t.dialogClass || "");
                e(".modal-header .close", s).click(function() {
                    var e = t.onClose || h;
                    e.call(n)
                }),
                (t["class"] || t.classed) && s.addClass(t["class"] || t.classed),
                t.autoOpen === !1 && (t.show = !1),
                t.width && p.width(t.width),
                t.height && p.height(t.height),
                    s.modal(t)
            }
            t == "destroy" && h(!0),
            t == "close" && h(),
            t == "open" && c();
            if (t == "option" && u == "buttons") {
                if (!a) return s.find(".modal-footer").data("buttons");
                l({
                    buttons: a
                }),
                    c()
            }
            return n
        }
    } (jQuery),
    $.messager = function() {
        var e = function(e, t) {
                var n = $.messager.model;
                arguments.length < 2 && (t = e || "", e = "&nbsp;"),
                    $("<div>" + t + "</div>").dialog({
                        title: e,
                        onClose: function() {
                            $(this).dialog("destroy")
                        },
                        buttons: [{
                            text: n.ok.text,
                            classed: n.ok.classed || "btn-success",
                            click: function() {
                                $(this).dialog("destroy")
                            }
                        }]
                    })
            },
            t = function(e, t, n) {
                var r = $.messager.model;
                $("<div>" + t + "</div>").dialog({
                    title: e,
                    onClose: function() {
                        $(this).dialog("destroy")
                    },
                    buttons: [{
                        text: r.ok.text,
                        classed: r.ok.classed || "btn-success",
                        click: function() {
                            $(this).dialog("destroy"),
                            n && n()
                        }
                    },
                        {
                            text: r.cancel.text,
                            classed: r.cancel.classed || "btn-danger",
                            click: function() {
                                $(this).dialog("destroy")
                            }
                        }]
                })
            },
            n = '<div class="dialog modal fade msg-popup"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-body text-center"></div></div></div></div>',
            r,
            i = function(e) {
                r || (r = $(n), $("body").append(r)),
                    r.find(".modal-body").html(e),
                    r.modal({
                        show: !0,
                        backdrop: !1
                    }),
                    setTimeout(function() {
                            r.modal("hide")
                        },
                        1500)
            };
        return {
            alert: e,
            popup: i,
            confirm: t
        }
    } (),
    $.messager.model = {
        ok: {
            text: "OK",
            classed: "btn-success"
        },
        cancel: {
            text: "Cancel",
            classed: "btn-danger"
        }
    },
    function(e) {
        e.fn.datagrid = function(t, n) {
            var r = this,
                i = e(r),
                s = i.data("config") || {},
                o = i.data("rows") || [],
                u = s.selectedClass || "success",
                a = s.singleSelect,
                f = function(t) {
                    var n = s.selectChange,
                        r = s.edit,
                        f = function(t) {
                            var r = e(this),
                                s = r.hasClass(u),
                                f = e("tbody tr", i).index(r),
                                l = o[f] || {};
                            a && e("tbody tr", i).removeClass(u),
                                r.toggleClass(u),
                            n && n(!s, f, l, r)
                        }; (n || typeof a != "undefined") && t.click(f);
                    var l = function(t) {
                        var n = e(this),
                            r = n.closest("tr"),
                            s = e("tbody tr", i).index(r),
                            u = o[s] || {},
                            a = n.attr("name");
                        a && (u[a] = n.val())
                    };
                    r && t.find("input").keyup(l)
                },
                l = function(e, t) {
                    var n = "<tr>";
                    for (var r = 0,
                             i = e[0].length; r < i; r++) {
                        var o = e[0][r],
                            u = o.formatter,
                            a = o.field,
                            f = o.tip,
                            l = t[a],
                            c = o.maxlength,
                            h = o.readonly;
                        typeof l == "undefined" && (l = ""),
                        s.edit && (c = c ? ' maxlength="{0}"'.format(o.maxlength) : "", h = h ? ' readonly="readonly"': "", l = '<input name="{0}" value="{1}" class="form-control"{2}{3}/>'.format(o.field, l, c, h)),
                            l = u ? u(t[a], t) : l,
                            n = n + "<td>" + l + "</td>"
                    }
                    return n += "</tr>",
                        n
                },
                c = function(t) {
                    if (!n) return;
                    var r = s.columns,
                        o = n.rows || n;
                    if (!r) return;
                    var u = "<tbody>";
                    if (o) for (var a = 0,
                                    c = o.length; a < c; a++) u += l(r, o[a]);
                    u += "</tbody>",
                        e("tbody", i).remove(),
                        i.data("rows", o).append(u),
                    s.edit && i.addClass("edit"),
                        f(e("tbody tr", i))
                },
                h = function() {
                    if (n && typeof n.index != "undefined") return [n.index];
                    var t = [];
                    return i.find("tbody tr").each(function(n) {
                        var r = e(this);
                        r.hasClass(u) && t.push(n)
                    }),
                        t
                };
            if (t && t.constructor == Object) {
                var p = t.columns;
                if (p) {
                    e("thead", i).size() < 1 && i.append("<thead></thead>");
                    var d = "<tr>";
                    for (var v = 0,
                             m = p[0].length; v < m; v++) {
                        var g = p[0][v];
                        d += "<th>" + (g.title || "") + "</th>"
                    }
                    d += "</tr>",
                        i.data("config", t),
                        e("thead", i).html(d)
                }
            }
            t == "loadData" && c();
            if (t == "getData") return o;
            if (t == "getConfig") return s;
            if (t == "getColumns") return s.columns;
            if (t == "selectRow") {
                if (typeof a == "undefined") return;
                typeof n == "number" ? (a && i.datagrid("unselectRow"), e("tbody tr", i).eq(n).addClass(u)) : a || e("tbody tr", i).addClass(u)
            }
            t == "unselectRow" && (typeof n != "undefined" ? e("tbody tr", i).eq(n).removeClass(u) : e("tbody tr", i).removeClass(u));
            if (t == "updateRow") {
                var y = h(),
                    b = n.row,
                    p = s.columns;
                for (var v = 0,
                         m = y.length; v < m; v++) {
                    var w = y[v];
                    o && (b = e.extend(o[w], b));
                    var E = e(l(p, b, s));
                    typeof n.index == "undefined" && E.addClass(u),
                        e("tbody tr", i).eq(w).after(E).remove(),
                        f(E)
                }
            }
            if (t == "getSelections") {
                var S = [];
                return e("tbody tr", i).each(function(t) {
                    e(this).hasClass(u) && S.push(o[t])
                }),
                    S
            }
            if (t == "getSelectedIndex") return h();
            if (t == "insertRow") {
                var x = h()[0],
                    b = n.row;
                if (typeof x == "undefined" || x < 0) x = o.length;
                if (!s || !b) return i;
                var T = e("tbody tr", i),
                    E = e(l(s.columns, b, s)),
                    N = T.eq(x);
                f(E),
                    N.size() ? N.before(E) : e("tbody", i).append(E),
                    o.splice(x, 0, b)
            }
            if (t == "deleteRow") {
                var y = typeof n == "number" ? [n] : h();
                for (var v = y.length - 1; v > -1; v--) {
                    var x = y[v];
                    e("tbody tr", i).eq(x).remove(),
                        o.splice(x, 1)
                }
            }
            return r
        }
    } (jQuery),
    function(e) {
        e.fn.tree = function(t, n) {
            var r = this,
                i = e(r),
                s = Array.prototype.push,
                o = "glyphicon-file",
                u = "glyphicon-folder-open",
                a = "glyphicon-folder-close",
                f = function(e, t, n) {
                    var r = []; ! t && r.push('<ul style="display:{0}">'.format(n == "close" ? "none": "block"));
                    for (var i = 0,
                             l = e.length; i < l; i++) {
                        var c = e[i],
                            h = c.children,
                            p = c.id,
                            d = c.state,
                            v = c.attributes;
                        r.push("<li>");
                        var m = typeof h == "undefined" ? o: d == "close" ? a: u;
                        r.push('<span class="glyphicon {0}"></span> '.format(m)),
                            r.push("<a{1}{2}{3}>{0}</a>".format(c.text, h ? " class='tree-node'": "", p ? " data-id='{0}'".format(p) : "", v ? " data-attr='{0}'".format(JSON.stringify(v)) : "")),
                        h && s.apply(r, f(h, !1, d)),
                            r.push("</li>")
                    }
                    return ! t && r.push("</ul>"),
                        r
                },
                l = function() {
                    e("span.glyphicon-folder-open, span.glyphicon-folder-close", i).click(function(t) {
                        var n = e(this),
                            r = n.closest("li").children("ul");
                        n.hasClass(a) ? (n.removeClass(a).addClass(u), r.show()) : (n.removeClass(u).addClass(a), r.hide())
                    })
                };
            if (t && t.constructor == Object) {
                var c = t.data;
                if (c && c.constructor == Array) {
                    var h = f(c, !0);
                    i.html(h.join("")),
                        i.data("config", t),
                        l()
                }
                var p = t.onClick;
                p && e("li>a", i).click(function() {
                    var t = e(this);
                    attrs = t.attr("data-attr"),
                        p.call(r, {
                                id: t.attr("data-id"),
                                attributes: attrs ? JSON.parse(attrs) : {},
                                text: t.text()
                            },
                            t)
                })
            }
            return r
        }
    } (jQuery)