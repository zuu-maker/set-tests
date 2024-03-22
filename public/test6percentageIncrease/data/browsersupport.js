!function(e,n,s){function t(e,n){return typeof e===n}function o(){var e,n,s,o,a,i,l;for(var c in f)if(f.hasOwnProperty(c)){if(e=[],n=f[c],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(s=0;s<n.options.aliases.length;s++)e.push(n.options.aliases[s].toLowerCase());for(o=t(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],l=i.split("."),1===l.length?Modernizr[l[0]]=o:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=o),r.push((o?"":"no-")+l.join("-"))}}function a(e){var n=c.className,s=Modernizr._config.classPrefix||"";if(u&&(n=n.baseVal),Modernizr._config.enableJSClass){var t=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");n=n.replace(t,"$1"+s+"js$2")}Modernizr._config.enableClasses&&(n+=" "+s+e.join(" "+s),u?c.className.baseVal=n:c.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):u?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}var r=[],f=[],l={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var s=this;setTimeout(function(){n(s[e])},0)},addTest:function(e,n,s){f.push({name:e,fn:n,options:s})},addAsyncTest:function(e){f.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr;var c=n.documentElement,u="svg"===c.nodeName.toLowerCase();Modernizr.addTest("inlinesvg",function(){var e=i("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var p="Moz O ms Webkit",d=l._config.usePrefixes?p.split(" "):[];l._cssomPrefixes=d;var m=function(n){var t,o=g.length,a=e.CSSRule;if("undefined"==typeof a)return s;if(!n)return!1;if(n=n.replace(/^@/,""),t=n.replace(/-/g,"_").toUpperCase()+"_RULE",t in a)return"@"+n;for(var i=0;o>i;i++){var r=g[i],f=r.toUpperCase()+"_"+t;if(f in a)return"@-"+r.toLowerCase()+"-"+n}return!1};l.atRule=m;var g=l._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];l._prefixes=g,o(),a(r),delete l.addTest,delete l.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var a=this||self;function c(){var b=a.navigator;return b&&(b=b.userAgent)?b:""}function d(b){return-1!=c().indexOf(b)};function e(){return d("Firefox")||d("FxiOS")}function f(){return(d("Chrome")||d("CriOS"))&&!d("Edge")||d("Silk")};function g(){return d("iPhone")&&!d("iPod")&&!d("iPad")};var k=d("Opera"),l=d("Trident")||d("MSIE"),m=d("Edge"),n=d("Gecko")&&!(-1!=c().toLowerCase().indexOf("webkit")&&!d("Edge"))&&!(d("Trident")||d("MSIE"))&&!d("Edge"),p=-1!=c().toLowerCase().indexOf("webkit")&&!d("Edge"),q;
a:{var r="",t=function(){var b=c();if(n)return/rv:([^\);]+)(\)|;)/.exec(b);if(m)return/Edge\/([\d\.]+)/.exec(b);if(l)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(b);if(p)return/WebKit\/(\S+)/.exec(b);if(k)return/(?:Version)[ \/]?(\S+)/.exec(b)}();t&&(r=t?t[1]:"");if(l){var u,v=a.document;u=v?v.documentMode:void 0;if(null!=u&&u>parseFloat(r)){q=String(u);break a}}q=r};var w=e(),x=g()||d("iPod"),y=d("iPad"),z=d("Android")&&!(f()||e()||d("Opera")||d("Silk")),A=f(),B=d("Safari")&&!(f()||d("Coast")||d("Opera")||d("Edge")||d("Edg/")||d("OPR")||e()||d("Silk")||d("Android"))&&!(g()||d("iPad")||d("iPod"));function C(b){return(b=b.exec(c()))?b[1]:""}var D=function(){if(w)return C(/Firefox\/([0-9.]+)/);if(l||m||k)return q;if(A){if(g()||d("iPad")||d("iPod")||d("Macintosh")){var b=C(/CriOS\/([0-9.]+)/);if(b)return b}return C(/Chrome\/([0-9.]+)/)}if(B&&!(g()||d("iPad")||d("iPod")))return C(/Version\/([0-9.]+)/);if(x||y){if(b=/Version\/(\S+).*Mobile\/(\S+)/.exec(c()))return b[1]+"."+b[2]}else if(z)return(b=C(/Android\s+([0-9.]+)/))?b:C(/Version\/([0-9.]+)/);return""}();function E(b){var h;(h=!Modernizr.inlinesvg||l)||(h=parseInt(D,10),h=B&&14>h);return h?(location.replace(b+window.location.search),!0):!1}var F=["ispring","compatibility","performRedirectIfNeeded"],G=a;F[0]in G||"undefined"==typeof G.execScript||G.execScript("var "+F[0]);for(var H;F.length&&(H=F.shift());)F.length||void 0===E?G=G[H]&&G[H]!==Object.prototype[H]?G[H]:G[H]={}:G[H]=E;E("data/html5-unsupported.html");window.onerror=function(){return!0};a.console||(window._log="",a.console={log:function(b){window._log+="\n"+b},warn:function(b){window._log+="\nwarn: "+b},error:function(b){window._log+="\nerror: "+b}});})();