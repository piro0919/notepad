if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise((async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},s=(s,a)=>{Promise.all(s.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(s)};self.define=(s,n,c)=>{a[s]||(a[s]=Promise.resolve().then((()=>{let a={};const t={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return a;case"module":return t;default:return e(s)}}))).then((e=>{const s=c(...e);return a.default||(a.default=s),a}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/219-7057943a263d6a3e05d1.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/364.8cc18cf65c0b3a46fd49.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/37-bfe33675da72f4077e8c.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/373-a39f247e9edf68c209ef.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/377-7e62a15ea4532d0ad0f5.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/45-3632cfb477a6a3507502.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/489-8bfc9d160aadfa21f28d.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/52-63dd60d282f69cc95e30.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/64dba1ef-e2a7528fe181bdc29290.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/669-818d08315a0875358f86.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/675-d429277a52e6e1b5486c.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/737-233fc97c069176e1e6b6.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/78e521c3-50e33d25b0fa1ba94b15.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/908-ea4599d5e2a82e1a8c41.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/936.2ddc9a6e11883bde4915.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/95b64a6e-ee2cef8d4c4171528abb.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/962-f5f9cb23e3b9939b24ab.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/framework-c93ed74a065331c4bd75.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/main-12378b20f5c80aeea207.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/pages/404-08fc989a2fc93a193ede.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/pages/_app-cb3eb021fab1190560bc.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/pages/_error-80402f6d6dae03a985bc.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/pages/index-5ee6148ee7c305e36777.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/pages/notes/%5Bid%5D-8d806105cbed6e2d79d7.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/pages/notes/%5Bid%5D/edit-bbfe0df6e669de254bd9.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/pages/notes/new-5fac58bf1b21e50ad694.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/pages/settings-d50c3aadb6cd3b954d27.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/pages/signin-3b2afec17a55e940e628.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/pages/signout-3b14e50f34924366704e.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/chunks/webpack-f26f0075591f641a069d.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/css/1e549581f4732f3a9bbf.css",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/css/27b1972b0c3545a8add3.css",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/css/49d2e56f33be27d77f8b.css",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/css/4a57adc4ce121537c6d3.css",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/css/6e68213def79bdcd7e55.css",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/css/77432185f2de11f7bb70.css",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/css/8d302221a2744b79d8f1.css",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/css/bcd004891dfadba4c3cc.css",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/css/f2279aa9c0e367bd13a8.css",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/media/FLOPDesignFont.280f196706c161706364a878225214b7.woff2",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/xqJaB7vYzcbUQ8PTHjLDL/_buildManifest.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/_next/static/xqJaB7vYzcbUQ8PTHjLDL/_ssgManifest.js",revision:"xqJaB7vYzcbUQ8PTHjLDL"},{url:"/favicon.ico",revision:"5abb0de0f14a8c89b9794685b9e473a1"},{url:"/images/cat1.png",revision:"e1149a9e5ba4f1dcea452f3621cfde6a"},{url:"/images/girl1.png",revision:"907a46d6d88e8bd94cc9525ad0801378"},{url:"/images/girl2.png",revision:"49fb05371b0ab4c04128ab9764a39eb7"},{url:"/logo192.png",revision:"610f8342ffa4f4a19c4f0428bafe2935"},{url:"/logo512.png",revision:"5196c079541fc35de68a5578f1404a07"},{url:"/manifest.json",revision:"de9a0f525d24121753660db2796127fc"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));
