!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.WebRingWidget=void 0;const r=t(1);n.WebRingWidget=r.default},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});const r=t(2);n.default=function(){return r.h("div",null,"Hello, world!")}},function(e,n,t){"use strict";t.r(n),t.d(n,"render",(function(){return j})),t.d(n,"hydrate",(function(){return L})),t.d(n,"createElement",(function(){return v})),t.d(n,"h",(function(){return v})),t.d(n,"Fragment",(function(){return g})),t.d(n,"createRef",(function(){return m})),t.d(n,"isValidElement",(function(){return o})),t.d(n,"Component",(function(){return b})),t.d(n,"cloneElement",(function(){return F})),t.d(n,"createContext",(function(){return R})),t.d(n,"toChildArray",(function(){return w})),t.d(n,"_unmount",(function(){return D})),t.d(n,"options",(function(){return r}));var r,o,l,_,u,i,c,s,f={},p=[],a=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function d(e,n){for(var t in n)e[t]=n[t];return e}function h(e){var n=e.parentNode;n&&n.removeChild(e)}function v(e,n,t){var r,o=arguments,l={};for(r in n)"key"!==r&&"ref"!==r&&(l[r]=n[r]);if(arguments.length>3)for(t=[t],r=3;r<arguments.length;r++)t.push(o[r]);if(null!=t&&(l.children=t),"function"==typeof e&&null!=e.defaultProps)for(r in e.defaultProps)void 0===l[r]&&(l[r]=e.defaultProps[r]);return y(e,l,n&&n.key,n&&n.ref,null)}function y(e,n,t,o,l){var _={type:e,props:n,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:l};return null==l&&(_.__v=_),r.vnode&&r.vnode(_),_}function m(){return{}}function g(e){return e.children}function b(e,n){this.props=e,this.context=n}function k(e,n){if(null==n)return e.__?k(e.__,e.__.__k.indexOf(e)+1):null;for(var t;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e)return t.__e;return"function"==typeof e.type?k(e):null}function x(e){var n,t;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,n=0;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e){e.__e=e.__c.base=t.__e;break}return x(e)}}function C(e){(!e.__d&&(e.__d=!0)&&l.push(e)&&!_++||i!==r.debounceRendering)&&((i=r.debounceRendering)||u)(P)}function P(){for(var e;_=l.length;)e=l.sort((function(e,n){return e.__v.__b-n.__v.__b})),l=[],e.some((function(e){var n,t,r,o,l,_,u;e.__d&&(_=(l=(n=e).__v).__e,(u=n.__P)&&(t=[],(r=d({},l)).__v=r,o=U(u,l,r,n.__n,void 0!==u.ownerSVGElement,null,t,null==_?k(l):_),W(t,l),o!=_&&x(l)))}))}function S(e,n,t,r,o,l,_,u,i,c){var s,a,d,v,m,b,x,C,P,S=r&&r.__k||p,w=S.length;for(i==f&&(i=null!=_?_[0]:w?k(r,0):null),t.__k=[],s=0;s<n.length;s++)if(null!=(v=t.__k[s]=null==(v=n[s])||"boolean"==typeof v?null:"string"==typeof v||"number"==typeof v?y(null,v,null,null,v):Array.isArray(v)?y(g,{children:v},null,null,null):null!=v.__e||null!=v.__c?y(v.type,v.props,v.key,null,v.__v):v)){if(v.__=t,v.__b=t.__b+1,null===(d=S[s])||d&&v.key==d.key&&v.type===d.type)S[s]=void 0;else for(a=0;a<w;a++){if((d=S[a])&&v.key==d.key&&v.type===d.type){S[a]=void 0;break}d=null}if(m=U(e,v,d=d||f,o,l,_,u,i,c),(a=v.ref)&&d.ref!=a&&(C||(C=[]),d.ref&&C.push(d.ref,null,v),C.push(a,v.__c||m,v)),null!=m){if(null==x&&(x=m),P=void 0,void 0!==v.__d)P=v.__d,v.__d=void 0;else if(_==d||m!=i||null==m.parentNode){e:if(null==i||i.parentNode!==e)e.appendChild(m),P=null;else{for(b=i,a=0;(b=b.nextSibling)&&a<w;a+=2)if(b==m)break e;e.insertBefore(m,i),P=i}"option"==t.type&&(e.value="")}i=void 0!==P?P:m.nextSibling,"function"==typeof t.type&&(t.__d=i)}else i&&d.__e==i&&i.parentNode!=e&&(i=k(d))}if(t.__e=x,null!=_&&"function"!=typeof t.type)for(s=_.length;s--;)null!=_[s]&&h(_[s]);for(s=w;s--;)null!=S[s]&&D(S[s],S[s]);if(C)for(s=0;s<C.length;s++)T(C[s],C[++s],C[++s])}function w(e){return null==e||"boolean"==typeof e?[]:Array.isArray(e)?p.concat.apply([],e.map(w)):[e]}function N(e,n,t){"-"===n[0]?e.setProperty(n,t):e[n]="number"==typeof t&&!1===a.test(n)?t+"px":null==t?"":t}function E(e,n,t,r,o){var l,_,u,i,c;if(o?"className"===n&&(n="class"):"class"===n&&(n="className"),"style"===n)if(l=e.style,"string"==typeof t)l.cssText=t;else{if("string"==typeof r&&(l.cssText="",r=null),r)for(i in r)t&&i in t||N(l,i,"");if(t)for(c in t)r&&t[c]===r[c]||N(l,c,t[c])}else"o"===n[0]&&"n"===n[1]?(_=n!==(n=n.replace(/Capture$/,"")),u=n.toLowerCase(),n=(u in e?u:n).slice(2),t?(r||e.addEventListener(n,M,_),(e.l||(e.l={}))[n]=t):e.removeEventListener(n,M,_)):"list"!==n&&"tagName"!==n&&"form"!==n&&"type"!==n&&"size"!==n&&!o&&n in e?e[n]=null==t?"":t:"function"!=typeof t&&"dangerouslySetInnerHTML"!==n&&(n!==(n=n.replace(/^xlink:?/,""))?null==t||!1===t?e.removeAttributeNS("http://www.w3.org/1999/xlink",n.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",n.toLowerCase(),t):null==t||!1===t&&!/^ar/.test(n)?e.removeAttribute(n):e.setAttribute(n,t))}function M(e){this.l[e.type](r.event?r.event(e):e)}function U(e,n,t,o,l,_,u,i,c){var s,f,p,a,h,v,y,m,k,x,C,P=n.type;if(void 0!==n.constructor)return null;(s=r.__b)&&s(n);try{e:if("function"==typeof P){if(m=n.props,k=(s=P.contextType)&&o[s.__c],x=s?k?k.props.value:s.__:o,t.__c?y=(f=n.__c=t.__c).__=f.__E:("prototype"in P&&P.prototype.render?n.__c=f=new P(m,x):(n.__c=f=new b(m,x),f.constructor=P,f.render=O),k&&k.sub(f),f.props=m,f.state||(f.state={}),f.context=x,f.__n=o,p=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=P.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=d({},f.__s)),d(f.__s,P.getDerivedStateFromProps(m,f.__s))),a=f.props,h=f.state,p)null==P.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==P.getDerivedStateFromProps&&m!==a&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(m,x),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(m,f.__s,x)||n.__v===t.__v){for(f.props=m,f.state=f.__s,n.__v!==t.__v&&(f.__d=!1),f.__v=n,n.__e=t.__e,n.__k=t.__k,f.__h.length&&u.push(f),s=0;s<n.__k.length;s++)n.__k[s]&&(n.__k[s].__=n);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(m,f.__s,x),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(a,h,v)}))}f.context=x,f.props=m,f.state=f.__s,(s=r.__r)&&s(n),f.__d=!1,f.__v=n,f.__P=e,s=f.render(f.props,f.state,f.context),null!=f.getChildContext&&(o=d(d({},o),f.getChildContext())),p||null==f.getSnapshotBeforeUpdate||(v=f.getSnapshotBeforeUpdate(a,h)),C=null!=s&&s.type==g&&null==s.key?s.props.children:s,S(e,Array.isArray(C)?C:[C],n,t,o,l,_,u,i,c),f.base=n.__e,f.__h.length&&u.push(f),y&&(f.__E=f.__=null),f.__e=!1}else null==_&&n.__v===t.__v?(n.__k=t.__k,n.__e=t.__e):n.__e=A(t.__e,n,t,o,l,_,u,c);(s=r.diffed)&&s(n)}catch(e){n.__v=null,r.__e(e,n,t)}return n.__e}function W(e,n){r.__c&&r.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){r.__e(e,n.__v)}}))}function A(e,n,t,r,o,l,_,u){var i,c,s,a,d,h=t.props,v=n.props;if(o="svg"===n.type||o,null!=l)for(i=0;i<l.length;i++)if(null!=(c=l[i])&&((null===n.type?3===c.nodeType:c.localName===n.type)||e==c)){e=c,l[i]=null;break}if(null==e){if(null===n.type)return document.createTextNode(v);e=o?document.createElementNS("http://www.w3.org/2000/svg",n.type):document.createElement(n.type,v.is&&{is:v.is}),l=null,u=!1}if(null===n.type)h!==v&&e.data!=v&&(e.data=v);else{if(null!=l&&(l=p.slice.call(e.childNodes)),s=(h=t.props||f).dangerouslySetInnerHTML,a=v.dangerouslySetInnerHTML,!u){if(null!=l)for(h={},d=0;d<e.attributes.length;d++)h[e.attributes[d].name]=e.attributes[d].value;(a||s)&&(a&&s&&a.__html==s.__html||(e.innerHTML=a&&a.__html||""))}(function(e,n,t,r,o){var l;for(l in t)"children"===l||"key"===l||l in n||E(e,l,null,t[l],r);for(l in n)o&&"function"!=typeof n[l]||"children"===l||"key"===l||"value"===l||"checked"===l||t[l]===n[l]||E(e,l,n[l],t[l],r)})(e,v,h,o,u),a?n.__k=[]:(i=n.props.children,S(e,Array.isArray(i)?i:[i],n,t,r,"foreignObject"!==n.type&&o,l,_,f,u)),u||("value"in v&&void 0!==(i=v.value)&&i!==e.value&&E(e,"value",i,h.value,!1),"checked"in v&&void 0!==(i=v.checked)&&i!==e.checked&&E(e,"checked",i,h.checked,!1))}return e}function T(e,n,t){try{"function"==typeof e?e(n):e.current=n}catch(e){r.__e(e,t)}}function D(e,n,t){var o,l,_;if(r.unmount&&r.unmount(e),(o=e.ref)&&(o.current&&o.current!==e.__e||T(o,null,n)),t||"function"==typeof e.type||(t=null!=(l=e.__e)),e.__e=e.__d=void 0,null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){r.__e(e,n)}o.base=o.__P=null}if(o=e.__k)for(_=0;_<o.length;_++)o[_]&&D(o[_],n,t);null!=l&&h(l)}function O(e,n,t){return this.constructor(e,t)}function j(e,n,t){var o,l,_;r.__&&r.__(e,n),l=(o=t===c)?null:t&&t.__k||n.__k,e=v(g,null,[e]),_=[],U(n,(o?n:t||n).__k=e,l||f,f,void 0!==n.ownerSVGElement,t&&!o?[t]:l?null:n.childNodes.length?p.slice.call(n.childNodes):null,_,t||f,o),W(_,e)}function L(e,n){j(e,n,c)}function F(e,n){var t,r;for(r in n=d(d({},e.props),n),arguments.length>2&&(n.children=p.slice.call(arguments,2)),t={},n)"key"!==r&&"ref"!==r&&(t[r]=n[r]);return y(e.type,t,n.key||e.key,n.ref||e.ref,null)}function R(e){var n={},t={__c:"__cC"+s++,__:e,Consumer:function(e,n){return e.children(n)},Provider:function(e){var r,o=this;return this.getChildContext||(r=[],this.getChildContext=function(){return n[t.__c]=o,n},this.shouldComponentUpdate=function(e){o.props.value!==e.value&&r.some((function(n){n.context=e.value,C(n)}))},this.sub=function(e){r.push(e);var n=e.componentWillUnmount;e.componentWillUnmount=function(){r.splice(r.indexOf(e),1),n&&n.call(e)}}),e.children}};return t.Consumer.contextType=t,t.Provider.__=t,t}r={__e:function(e,n){for(var t,r;n=n.__;)if((t=n.__c)&&!t.__)try{if(t.constructor&&null!=t.constructor.getDerivedStateFromError&&(r=!0,t.setState(t.constructor.getDerivedStateFromError(e))),null!=t.componentDidCatch&&(r=!0,t.componentDidCatch(e)),r)return C(t.__E=t)}catch(n){e=n}throw e}},o=function(e){return null!=e&&void 0===e.constructor},b.prototype.setState=function(e,n){var t;t=this.__s!==this.state?this.__s:this.__s=d({},this.state),"function"==typeof e&&(e=e(t,this.props)),e&&d(t,e),null!=e&&this.__v&&(n&&this.__h.push(n),C(this))},b.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),C(this))},b.prototype.render=g,l=[],_=0,u="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,c=f,s=0}]);
//# sourceMappingURL=index.js.map