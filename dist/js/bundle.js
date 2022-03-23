var defaultInstanceSettings={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},defaultTweenSettings={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},validTransforms=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],cache={CSS:{},springs:{}};function minMax(e,t,n){return Math.min(Math.max(e,t),n)}function stringContains(e,t){return-1<e.indexOf(t)}function applyArguments(e,t){return e.apply(null,t)}var is={arr:function(e){return Array.isArray(e)},obj:function(e){return stringContains(Object.prototype.toString.call(e),"Object")},pth:function(e){return is.obj(e)&&e.hasOwnProperty("totalLength")},svg:function(e){return e instanceof SVGElement},inp:function(e){return e instanceof HTMLInputElement},dom:function(e){return e.nodeType||is.svg(e)},str:function(e){return"string"==typeof e},fnc:function(e){return"function"==typeof e},und:function(e){return void 0===e},nil:function(e){return is.und(e)||null===e},hex:function(e){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)},rgb:function(e){return/^rgb/.test(e)},hsl:function(e){return/^hsl/.test(e)},col:function(e){return is.hex(e)||is.rgb(e)||is.hsl(e)},key:function(e){return!defaultInstanceSettings.hasOwnProperty(e)&&!defaultTweenSettings.hasOwnProperty(e)&&"targets"!==e&&"keyframes"!==e}};function parseEasingParameters(e){e=/\(([^)]+)\)/.exec(e);return e?e[1].split(",").map(function(e){return parseFloat(e)}):[]}function spring(r,n){var e=parseEasingParameters(r),t=minMax(is.und(e[0])?1:e[0],.1,100),a=minMax(is.und(e[1])?100:e[1],.1,100),l=minMax(is.und(e[2])?10:e[2],.1,100),e=minMax(is.und(e[3])?0:e[3],.1,100),i=Math.sqrt(a/t),o=l/(2*Math.sqrt(a*t)),s=o<1?i*Math.sqrt(1-o*o):0,u=o<1?(o*i-e)/s:-e+i;function c(e){var t=n?n*e/1e3:e,t=o<1?Math.exp(-t*o*i)*(+Math.cos(s*t)+u*Math.sin(s*t)):(1+u*t)*Math.exp(-t*i);return 0===e||1===e?e:1-t}return n?c:function(){var e=cache.springs[r];if(e)return e;for(var t=0,n=0;;)if(1===c(t+=1/6)){if(16<=++n)break}else n=0;return e=t*(1/6)*1e3,cache.springs[r]=e}}function steps(t){return void 0===t&&(t=10),function(e){return Math.ceil(minMax(e,1e-6,1)*t)*(1/t)}}var bezier=function(){function r(e,t){return 1-3*t+3*e}function a(e,t){return 3*t-6*e}function x(e,t,n){return((r(t,n)*e+a(t,n))*e+3*t)*e}function A(e,t,n){return 3*r(t,n)*e*e+2*a(t,n)*e+3*t}return function(b,t,T,n){if(0<=b&&b<=1&&0<=T&&T<=1){var w=new Float32Array(11);if(b!==t||T!==n)for(var e=0;e<11;++e)w[e]=x(.1*e,b,T);return function(e){return b===t&&T===n||0===e||1===e?e:x(r(e),t,n)}}function r(e){for(var t=0,n=1;10!==n&&w[n]<=e;++n)t+=.1;var r=t+.1*((e-w[--n])/(w[n+1]-w[n])),a=A(r,b,T);if(.001<=a){for(var l=e,i=r,o=b,s=T,g=0;g<4;++g){var f=A(i,o,s);if(0===f)return i;i-=(x(i,o,s)-l)/f}return i}if(0===a)return r;for(var d,u,m=e,c=t,p=t+.1,h=b,v=T,y=0;0<(d=x(u=c+(p-c)/2,h,v)-m)?p=u:c=u,1e-7<Math.abs(d)&&++y<10;);return u}}}(),penner=function(){var t={linear:function(){return function(e){return e}}},n={Sine:function(){return function(e){return 1-Math.cos(e*Math.PI/2)}},Circ:function(){return function(e){return 1-Math.sqrt(1-e*e)}},Back:function(){return function(e){return e*e*(3*e-2)}},Bounce:function(){return function(e){for(var t,n=4;e<((t=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*t-2)/22-e,2)}},Elastic:function(e,t){void 0===t&&(t=.5);var n=minMax(e=void 0===e?1:e,1,10),r=minMax(t,.1,2);return function(e){return 0===e||1===e?e:-n*Math.pow(2,10*(e-1))*Math.sin((e-1-r/(2*Math.PI)*Math.asin(1/n))*(2*Math.PI)/r)}}};return["Quad","Cubic","Quart","Quint","Expo"].forEach(function(e,t){n[e]=function(){return function(e){return Math.pow(e,t+2)}}}),Object.keys(n).forEach(function(e){var r=n[e];t["easeIn"+e]=r,t["easeOut"+e]=function(t,n){return function(e){return 1-r(t,n)(1-e)}},t["easeInOut"+e]=function(t,n){return function(e){return e<.5?r(t,n)(2*e)/2:1-r(t,n)(-2*e+2)/2}},t["easeOutIn"+e]=function(t,n){return function(e){return e<.5?(1-r(t,n)(1-2*e))/2:(r(t,n)(2*e-1)+1)/2}}}),t}();function parseEasings(e,t){if(is.fnc(e))return e;var n=e.split("(")[0],r=penner[n],a=parseEasingParameters(e);switch(n){case"spring":return spring(e,t);case"cubicBezier":return applyArguments(bezier,a);case"steps":return applyArguments(steps,a);default:return applyArguments(r,a)}}function selectString(e){try{return document.querySelectorAll(e)}catch(e){return}}function filterArray(e,t){for(var n,r=e.length,a=2<=arguments.length?t:void 0,i=[],o=0;o<r;o++)o in e&&(n=e[o],t.call(a,n,o,e)&&i.push(n));return i}function flattenArray(e){return e.reduce(function(e,t){return e.concat(is.arr(t)?flattenArray(t):t)},[])}function toArray(e){return is.arr(e)?e:(e=is.str(e)?selectString(e)||e:e)instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e]}function arrayContains(e,t){return e.some(function(e){return e===t})}function cloneObject(e){var t,n={};for(t in e)n[t]=e[t];return n}function replaceObjectProps(e,t){var n,r=cloneObject(e);for(n in e)r[n]=(t.hasOwnProperty(n)?t:e)[n];return r}function mergeObjects(e,t){var n,r=cloneObject(e);for(n in t)r[n]=(is.und(e[n])?t:e)[n];return r}function rgbToRgba(e){var t=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e);return t?"rgba("+t[1]+",1)":e}function hexToRgba(e){e=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(e,t,n,r){return t+t+n+n+r+r}),e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return"rgba("+parseInt(e[1],16)+","+parseInt(e[2],16)+","+parseInt(e[3],16)+",1)"}function hslToRgba(e){var t,n,r,e=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e),a=parseInt(e[1],10)/360,i=parseInt(e[2],10)/100,o=parseInt(e[3],10)/100,e=e[4]||1;function s(e,t,n){return n<0&&(n+=1),1<n&&--n,n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}return 0==i?t=n=r=o:(t=s(i=2*o-(o=o<.5?o*(1+i):o+i-o*i),o,a+1/3),n=s(i,o,a),r=s(i,o,a-1/3)),"rgba("+255*t+","+255*n+","+255*r+","+e+")"}function colorToRgb(e){return is.rgb(e)?rgbToRgba(e):is.hex(e)?hexToRgba(e):is.hsl(e)?hslToRgba(e):void 0}function getUnit(e){e=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);if(e)return e[1]}function getTransformUnit(e){return stringContains(e,"translate")||"perspective"===e?"px":stringContains(e,"rotate")||stringContains(e,"skew")?"deg":void 0}function getFunctionValue(e,t){return is.fnc(e)?e(t.target,t.id,t.total):e}function getAttribute(e,t){return e.getAttribute(t)}function convertPxToUnit(e,t,n){if(arrayContains([n,"deg","rad","turn"],getUnit(t)))return t;var r=cache.CSS[t+n];if(!is.und(r))return r;var r=document.createElement(e.tagName),e=e.parentNode&&e.parentNode!==document?e.parentNode:document.body,a=(e.appendChild(r),r.style.position="absolute",r.style.width=100+n,100/r.offsetWidth),e=(e.removeChild(r),a*parseFloat(t));return cache.CSS[t+n]=e}function getCSSValue(e,t,n){var r;if(t in e.style)return r=t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),t=e.style[t]||getComputedStyle(e).getPropertyValue(r)||"0",n?convertPxToUnit(e,t,n):t}function getAnimationType(e,t){return is.dom(e)&&!is.inp(e)&&(!is.nil(getAttribute(e,t))||is.svg(e)&&e[t])?"attribute":is.dom(e)&&arrayContains(validTransforms,t)?"transform":is.dom(e)&&"transform"!==t&&getCSSValue(e,t)?"css":null!=e[t]?"object":void 0}function getElementTransforms(e){if(is.dom(e)){for(var t,n=e.style.transform||"",r=/(\w+)\(([^)]*)\)/g,a=new Map;t=r.exec(n);)a.set(t[1],t[2]);return a}}function getTransformValue(e,t,n,r){var a=stringContains(t,"scale")?1:0+getTransformUnit(t),a=getElementTransforms(e).get(t)||a;return n&&(n.transforms.list.set(t,a),n.transforms.last=t),r?convertPxToUnit(e,a,r):a}function getOriginalTargetValue(e,t,n,r){switch(getAnimationType(e,t)){case"transform":return getTransformValue(e,t,r,n);case"css":return getCSSValue(e,t,n);case"attribute":return getAttribute(e,t);default:return e[t]||0}}function getRelativeValue(e,t){var n=/^(\*=|\+=|-=)/.exec(e);if(!n)return e;var r=getUnit(e)||0,a=parseFloat(t),i=parseFloat(e.replace(n[0],""));switch(n[0][0]){case"+":return a+i+r;case"-":return a-i+r;case"*":return a*i+r}}function validateValue(e,t){if(is.col(e))return colorToRgb(e);if(/\s/g.test(e))return e;var n=getUnit(e),n=n?e.substr(0,e.length-n.length):e;return t?n+t:n}function getDistance(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function getCircleLength(e){return 2*Math.PI*getAttribute(e,"r")}function getRectLength(e){return 2*getAttribute(e,"width")+2*getAttribute(e,"height")}function getLineLength(e){return getDistance({x:getAttribute(e,"x1"),y:getAttribute(e,"y1")},{x:getAttribute(e,"x2"),y:getAttribute(e,"y2")})}function getPolylineLength(e){for(var t,n=e.points,r=0,a=0;a<n.numberOfItems;a++){var i=n.getItem(a);0<a&&(r+=getDistance(t,i)),t=i}return r}function getPolygonLength(e){var t=e.points;return getPolylineLength(e)+getDistance(t.getItem(t.numberOfItems-1),t.getItem(0))}function getTotalLength(e){if(e.getTotalLength)return e.getTotalLength();switch(e.tagName.toLowerCase()){case"circle":return getCircleLength(e);case"rect":return getRectLength(e);case"line":return getLineLength(e);case"polyline":return getPolylineLength(e);case"polygon":return getPolygonLength(e)}}function setDashoffset(e){var t=getTotalLength(e);return e.setAttribute("stroke-dasharray",t),t}function getParentSvgEl(e){for(var t=e.parentNode;is.svg(t)&&is.svg(t.parentNode);)t=t.parentNode;return t}function getParentSvg(e,t){var t=t||{},e=t.el||getParentSvgEl(e),n=e.getBoundingClientRect(),r=getAttribute(e,"viewBox"),a=n.width,n=n.height,t=t.viewBox||(r?r.split(" "):[0,0,a,n]);return{el:e,viewBox:t,x:+t[0],y:+t[1],w:a,h:n,vW:t[2],vH:t[3]}}function getPath(e,t){var n=is.str(e)?selectString(e)[0]:e,r=t||100;return function(e){return{property:e,el:n,svg:getParentSvg(n),totalLength:getTotalLength(n)*(r/100)}}}function getPathProgress(t,n,e){function r(e){return t.el.getPointAtLength(1<=n+(e=void 0===e?0:e)?n+e:0)}var a=getParentSvg(t.el,t.svg),i=r(),o=r(-1),s=r(1),u=e?1:a.w/a.vW,c=e?1:a.h/a.vH;switch(t.property){case"x":return(i.x-a.x)*u;case"y":return(i.y-a.y)*c;case"angle":return 180*Math.atan2(s.y-o.y,s.x-o.x)/Math.PI}}function decomposeValue(e,t){var n=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,r=validateValue(is.pth(e)?e.totalLength:e,t)+"";return{original:r,numbers:r.match(n)?r.match(n).map(Number):[0],strings:is.str(e)||t?r.split(n):[]}}function parseTargets(e){return filterArray(e?flattenArray(is.arr(e)?e.map(toArray):toArray(e)):[],function(e,t,n){return n.indexOf(e)===t})}function getAnimatables(e){var n=parseTargets(e);return n.map(function(e,t){return{target:e,id:t,total:n.length,transforms:{list:getElementTransforms(e)}}})}function normalizePropertyTweens(e,n){var t,r=cloneObject(n),a=(/^spring/.test(r.easing)&&(r.duration=spring(r.easing)),is.arr(e)&&(2===(t=e.length)&&!is.obj(e[0])?e={value:e}:is.fnc(n.duration)||(r.duration=n.duration/t)),is.arr(e)?e:[e]);return a.map(function(e,t){e=is.obj(e)&&!is.pth(e)?e:{value:e};return is.und(e.delay)&&(e.delay=t?0:n.delay),is.und(e.endDelay)&&(e.endDelay=t===a.length-1?n.endDelay:0),e}).map(function(e){return mergeObjects(e,r)})}function flattenKeyframes(t){for(var n=filterArray(flattenArray(t.map(function(e){return Object.keys(e)})),function(e){return is.key(e)}).reduce(function(e,t){return e.indexOf(t)<0&&e.push(t),e},[]),a={},e=0;e<n.length;e++)!function(e){var r=n[e];a[r]=t.map(function(e){var t,n={};for(t in e)is.key(t)?t==r&&(n.value=e[t]):n[t]=e[t];return n})}(e);return a}function getProperties(e,t){var n,r=[],a=t.keyframes;for(n in t=a?mergeObjects(flattenKeyframes(a),t):t)is.key(n)&&r.push({name:n,tweens:normalizePropertyTweens(t[n],e)});return r}function normalizeTweenValues(e,t){var n,r={};for(n in e){var a=getFunctionValue(e[n],t);is.arr(a)&&1===(a=a.map(function(e){return getFunctionValue(e,t)})).length&&(a=a[0]),r[n]=a}return r.duration=parseFloat(r.duration),r.delay=parseFloat(r.delay),r}function normalizeTweens(s,u){var c;return s.tweens.map(function(e){var e=normalizeTweenValues(e,u),t=e.value,n=is.arr(t)?t[1]:t,r=getUnit(n),a=getOriginalTargetValue(u.target,s.name,r,u),i=c?c.to.original:a,o=is.arr(t)?t[0]:i,a=getUnit(o)||getUnit(a),r=r||a;return is.und(n)&&(n=i),e.from=decomposeValue(o,r),e.to=decomposeValue(getRelativeValue(n,o),r),e.start=c?c.end:0,e.end=e.start+e.delay+e.duration+e.endDelay,e.easing=parseEasings(e.easing,e.duration),e.isPath=is.pth(t),e.isPathTargetInsideSVG=e.isPath&&is.svg(u.target),e.isColor=is.col(e.from.original),e.isColor&&(e.round=1),c=e})}var setProgressValue={css:function(e,t,n){return e.style[t]=n},attribute:function(e,t,n){return e.setAttribute(t,n)},object:function(e,t,n){return e[t]=n},transform:function(e,t,n,r,a){var i;r.list.set(t,n),t!==r.last&&!a||(i="",r.list.forEach(function(e,t){i+=t+"("+e+") "}),e.style.transform=i)}};function setTargetsValue(e,o){getAnimatables(e).forEach(function(e){for(var t in o){var n=getFunctionValue(o[t],e),r=e.target,a=getUnit(n),i=getOriginalTargetValue(r,t,a,e),n=getRelativeValue(validateValue(n,a||getUnit(i)),i),a=getAnimationType(r,t);setProgressValue[a](r,t,n,e.transforms,!0)}})}function createAnimation(e,t){var n,r,a=getAnimationType(e.target,t.name);if(a)return r=(n=normalizeTweens(t,e))[n.length-1],{type:a,property:t.name,animatable:e,tweens:n,duration:r.end,delay:n[0].delay,endDelay:r.endDelay}}function getAnimations(e,n){return filterArray(flattenArray(e.map(function(t){return n.map(function(e){return createAnimation(t,e)})})),function(e){return!is.und(e)})}function getInstanceTimings(e,t){function n(e){return e.timelineOffset||0}var r=e.length,a={};return a.duration=r?Math.max.apply(Math,e.map(function(e){return n(e)+e.duration})):t.duration,a.delay=r?Math.min.apply(Math,e.map(function(e){return n(e)+e.delay})):t.delay,a.endDelay=r?a.duration-Math.max.apply(Math,e.map(function(e){return n(e)+e.duration-e.endDelay})):t.endDelay,a}var instanceID=0;function createNewInstance(e){var t=replaceObjectProps(defaultInstanceSettings,e),n=replaceObjectProps(defaultTweenSettings,e),r=getProperties(n,e),e=getAnimatables(e.targets),r=getAnimations(e,r),n=getInstanceTimings(r,n),a=instanceID;return instanceID++,mergeObjects(t,{id:a,children:[],animatables:e,animations:r,duration:n.duration,delay:n.delay,endDelay:n.endDelay})}var activeInstances=[],engine=function(){var a;function i(e){for(var t=activeInstances.length,n=0;n<t;){var r=activeInstances[n];r.paused?(activeInstances.splice(n,1),t--):(r.tick(e),n++)}a=0<n?requestAnimationFrame(i):void 0}return"undefined"!=typeof document&&document.addEventListener("visibilitychange",function(){anime.suspendWhenDocumentHidden&&(isDocumentHidden()?a=cancelAnimationFrame(a):(activeInstances.forEach(function(e){return e._onDocumentVisibility()}),engine()))}),function(){a||isDocumentHidden()&&anime.suspendWhenDocumentHidden||!(0<activeInstances.length)||(a=requestAnimationFrame(i))}}();function isDocumentHidden(){return!!document&&document.hidden}function anime(e){var u,c=0,l=0,g=0,f=0,p=null;function h(e){var t=window.Promise&&new Promise(function(e){return p=e});return e.finished=t}var A=createNewInstance(e=void 0===e?{}:e);function v(){var e=A.direction;"alternate"!==e&&(A.direction="normal"!==e?"normal":"reverse"),A.reversed=!A.reversed,u.forEach(function(e){return e.reversed=A.reversed})}function y(e){return A.reversed?A.duration-e:e}function t(){c=0,l=y(A.currentTime)*(1/anime.speed)}function b(e,t){t&&t.seek(e-t.timelineOffset)}function d(l){for(var e=0,g=A.animations,f=g.length;e<f;){for(var t=g[e],d=t.animatable,n=t.tweens,r=n.length-1,a=n[r],r=(r&&(a=filterArray(n,function(e){return l<e.end})[0]||a),minMax(l-a.start-a.delay,0,a.duration)/a.duration),m=isNaN(r)?1:a.easing(r),i=a.to.strings,o=a.round,p=[],h=a.to.numbers.length,s=void 0,u=0;u<h;u++){var v=void 0,y=a.to.numbers[u],b=a.from.numbers[u]||0,v=a.isPath?getPathProgress(a.value,m*y,a.isPathTargetInsideSVG):b+m*(y-b);o&&(a.isColor&&2<u||(v=Math.round(v*o)/o)),p.push(v)}var T=i.length;if(T)for(var s=i[0],c=0;c<T;c++){i[c];var w=i[c+1],x=p[c];isNaN(x)||(s+=w?x+w:x+" ")}else s=p[0];setProgressValue[t.type](d.target,t.property,s,d.transforms),t.currentValue=s,e++}}function m(e){A[e]&&!A.passThrough&&A[e](A)}function n(e){var t=A.duration,n=A.delay,r=t-A.endDelay,a=y(e);if(A.progress=minMax(a/t*100,0,100),A.reversePlayback=a<A.currentTime,u){var i=a;if(A.reversePlayback)for(var o=f;o--;)b(i,u[o]);else for(var s=0;s<f;s++)b(i,u[s])}!A.began&&0<A.currentTime&&(A.began=!0,m("begin")),!A.loopBegan&&0<A.currentTime&&(A.loopBegan=!0,m("loopBegin")),a<=n&&0!==A.currentTime&&d(0),(r<=a&&A.currentTime!==t||!t)&&d(t),n<a&&a<r?(A.changeBegan||(A.changeBegan=!0,A.changeCompleted=!1,m("changeBegin")),m("change"),d(a)):A.changeBegan&&(A.changeCompleted=!0,A.changeBegan=!1,m("changeComplete")),A.currentTime=minMax(a,0,t),A.began&&m("update"),t<=e&&(l=0,A.remaining&&!0!==A.remaining&&A.remaining--,A.remaining?(c=g,m("loopComplete"),A.loopBegan=!1,"alternate"===A.direction&&v()):(A.paused=!0,A.completed||(A.completed=!0,m("loopComplete"),m("complete"),!A.passThrough&&"Promise"in window&&(p(),h(A)))))}return h(A),A.reset=function(){var e=A.direction;A.passThrough=!1,A.currentTime=0,A.progress=0,A.paused=!0,A.began=!1,A.loopBegan=!1,A.changeBegan=!1,A.completed=!1,A.changeCompleted=!1,A.reversePlayback=!1,A.reversed="reverse"===e,A.remaining=A.loop,u=A.children;for(var t=f=u.length;t--;)A.children[t].reset();(A.reversed&&!0!==A.loop||"alternate"===e&&1===A.loop)&&A.remaining++,d(A.reversed?A.duration:0)},A._onDocumentVisibility=t,A.set=function(e,t){return setTargetsValue(e,t),A},A.tick=function(e){n(((g=e)+(l-(c=c||g)))*anime.speed)},A.seek=function(e){n(y(e))},A.pause=function(){A.paused=!0,t()},A.play=function(){A.paused&&(A.completed&&A.reset(),A.paused=!1,activeInstances.push(A),t(),engine())},A.reverse=function(){v(),A.completed=!A.reversed,t()},A.restart=function(){A.reset(),A.play()},A.remove=function(e){removeTargetsFromInstance(parseTargets(e),A)},A.reset(),A.autoplay&&A.play(),A}function removeTargetsFromAnimations(e,t){for(var n=t.length;n--;)arrayContains(e,t[n].animatable.target)&&t.splice(n,1)}function removeTargetsFromInstance(e,t){var n=t.animations,r=t.children;removeTargetsFromAnimations(e,n);for(var a=r.length;a--;){var i=r[a],o=i.animations;removeTargetsFromAnimations(e,o),o.length||i.children.length||r.splice(a,1)}n.length||r.length||t.pause()}function removeTargetsFromActiveInstances(e){for(var t=parseTargets(e),n=activeInstances.length;n--;)removeTargetsFromInstance(t,activeInstances[n])}function stagger(e,t){var p=(t=void 0===t?{}:t).direction||"normal",h=t.easing?parseEasings(t.easing):null,s=t.grid,u=t.axis,c=t.from||0,v="first"===c,l="center"===c,y="last"===c,g=is.arr(e),f=g?parseFloat(e[0]):parseFloat(e),b=g?parseFloat(e[1]):0,T=getUnit(g?e[1]:e)||0,w=t.start||0+(g?f:0),d=[],m=0;return function(e,t,n){if(v&&(c=0),l&&(c=(n-1)/2),y&&(c=n-1),!d.length){for(var r,a,i,o=0;o<n;o++)s?(r=l?(s[0]-1)/2:c%s[0],a=l?(s[1]-1)/2:Math.floor(c/s[0]),r=r-o%s[0],a=a-Math.floor(o/s[0]),i=Math.sqrt(r*r+a*a),"x"===u&&(i=-r),d.push(i="y"===u?-a:i)):d.push(Math.abs(c-o)),m=Math.max.apply(Math,d);h&&(d=d.map(function(e){return h(e/m)*m})),"reverse"===p&&(d=d.map(function(e){return u?e<0?-1*e:-e:Math.abs(m-e)}))}return w+(g?(b-f)/m:f)*(Math.round(100*d[t])/100)+T}}function timeline(o){var s=anime(o=void 0===o?{}:o);return s.duration=0,s.add=function(e,t){var n=activeInstances.indexOf(s),r=s.children;function a(e){e.passThrough=!0}-1<n&&activeInstances.splice(n,1);for(var i=0;i<r.length;i++)a(r[i]);n=mergeObjects(e,replaceObjectProps(defaultTweenSettings,o)),n.targets=n.targets||o.targets,e=s.duration,n.autoplay=!1,n.direction=s.direction,n.timelineOffset=is.und(t)?e:getRelativeValue(t,e),a(s),s.seek(n.timelineOffset),t=anime(n),a(t),r.push(t),e=getInstanceTimings(r,o);return s.delay=e.delay,s.endDelay=e.endDelay,s.duration=e.duration,s.seek(0),s.reset(),s.autoplay&&s.play(),s},s}function InitialAnimation(e){let t=anime({targets:e,translateY:[-25,0],opacity:[0,1],easing:"easeOutExpo",duration:600,delay:anime.stagger(300)});t.play()}function InitialAnimationTwo(e){let t=anime({targets:e,translateY:[-15,0],opacity:[0,1],easing:"easeOutExpo",duration:500,delay:anime.stagger(300)});t.play()}anime.version="3.2.1",anime.speed=1,anime.suspendWhenDocumentHidden=!0,anime.running=activeInstances,anime.remove=removeTargetsFromActiveInstances,anime.get=getOriginalTargetValue,anime.set=setTargetsValue,anime.convertPx=convertPxToUnit,anime.path=getPath,anime.setDashoffset=setDashoffset,anime.stagger=stagger,anime.timeline=timeline,anime.easing=parseEasings,anime.penner=penner;let education_scroll=!(anime.random=function(e,t){return Math.floor(Math.random()*(t-e+1))+e}),projects_scroll=!1,technology_scroll=!1;function SetupScrollListener(){window.addEventListener("scroll",()=>{console.log(window.scrollY),!1===education_scroll&&200<window.scrollY&&(InitialAnimation("._edcation-stagger"),education_scroll=!0),!1===projects_scroll&&880<window.scrollY&&(InitialAnimation("._projects-stagger"),projects_scroll=!0),!1===technology_scroll&&1675<window.scrollY&&(InitialAnimationTwo("._technology-stagger"),technology_scroll=!0)})}function SetupClickListener(){document.querySelector(".education-link").addEventListener("click",()=>{window.scroll(0,581)}),document.querySelector(".projects-link").addEventListener("click",()=>{window.scrollTo(0,1263)}),document.querySelector(".technology-link").addEventListener("click",()=>{window.scrollTo(0,1911)})}function hoverListener(){document.querySelector("#personal-site-project-list-item").addEventListener("hover",()=>{document.querySelector("#personal-site-going-to-github").style.opacity=1}),document.querySelector("#maze-game-project-list-item").addEventListener("hover",()=>{document.querySelector("#maze-game-going-to-github").style.opacity=1})}window.onload=function(){window.scroll(0,0),InitialAnimation("._stagger"),SetupScrollListener(),SetupClickListener(),hoverListener()};