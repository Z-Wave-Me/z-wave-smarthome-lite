"use strict";(self.webpackChunklite=self.webpackChunklite||[]).push([[977],{6406:(B,V,h)=>{h.d(V,{Z:()=>x});var S=h(4408),o=h(727);const y={schedule(c){let d=requestAnimationFrame,m=cancelAnimationFrame;const{delegate:p}=y;p&&(d=p.requestAnimationFrame,m=p.cancelAnimationFrame);const v=d(k=>{m=void 0,c(k)});return new o.w0(()=>null==m?void 0:m(v))},requestAnimationFrame(...c){const{delegate:d}=y;return((null==d?void 0:d.requestAnimationFrame)||requestAnimationFrame)(...c)},cancelAnimationFrame(...c){const{delegate:d}=y;return((null==d?void 0:d.cancelAnimationFrame)||cancelAnimationFrame)(...c)},delegate:void 0};var b=h(7565);const x=new class w extends b.v{flush(d){this._active=!0;const m=this._scheduled;this._scheduled=void 0;const{actions:p}=this;let v;d=d||p.shift();do{if(v=d.execute(d.state,d.delay))break}while((d=p[0])&&d.id===m&&p.shift());if(this._active=!1,v){for(;(d=p[0])&&d.id===m&&p.shift();)d.unsubscribe();throw v}}}(class z extends S.o{constructor(d,m){super(d,m),this.scheduler=d,this.work=m}requestAsyncId(d,m,p=0){return null!==p&&p>0?super.requestAsyncId(d,m,p):(d.actions.push(this),d._scheduled||(d._scheduled=y.requestAnimationFrame(()=>d.flush(void 0))))}recycleAsyncId(d,m,p=0){if(null!=p&&p>0||null==p&&this.delay>0)return super.recycleAsyncId(d,m,p);d.actions.some(v=>v.id===m)||(y.cancelAnimationFrame(m),d._scheduled=void 0)}})},3191:(B,V,h)=>{h.d(V,{Ig:()=>o,fI:()=>x,su:()=>y});var S=h(5e3);function o(c){return null!=c&&"false"!=`${c}`}function y(c,d=0){return function z(c){return!isNaN(parseFloat(c))&&!isNaN(Number(c))}(c)?Number(c):d}function x(c){return c instanceof S.SBq?c.nativeElement:c}},925:(B,V,h)=>{h.d(V,{t4:()=>z,ud:()=>b,sA:()=>O,kV:()=>C,_i:()=>L,i$:()=>m,Mq:()=>k});var S=h(5e3),o=h(9808);let y;try{y="undefined"!=typeof Intl&&Intl.v8BreakIterator}catch(l){y=!1}let c,p,v,A,z=(()=>{class l{constructor(R){this._platformId=R,this.isBrowser=this._platformId?(0,o.NF)(this._platformId):"object"==typeof document&&!!document,this.EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent),this.TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent),this.BLINK=this.isBrowser&&!(!window.chrome&&!y)&&"undefined"!=typeof CSS&&!this.EDGE&&!this.TRIDENT,this.WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT,this.IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window),this.FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent),this.ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT,this.SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT}}return l.\u0275fac=function(R){return new(R||l)(S.LFG(S.Lbi))},l.\u0275prov=S.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})(),b=(()=>{class l{}return l.\u0275fac=function(R){return new(R||l)},l.\u0275mod=S.oAB({type:l}),l.\u0275inj=S.cJS({}),l})();function m(l){return function d(){if(null==c&&"undefined"!=typeof window)try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>c=!0}))}finally{c=c||!1}return c}()?l:!!l.capture}function k(){if(null==v){if("object"!=typeof document||!document||"function"!=typeof Element||!Element)return v=!1,v;if("scrollBehavior"in document.documentElement.style)v=!0;else{const l=Element.prototype.scrollTo;v=!!l&&!/\{\s*\[native code\]\s*\}/.test(l.toString())}}return v}function L(){if("object"!=typeof document||!document)return 0;if(null==p){const l=document.createElement("div"),_=l.style;l.dir="rtl",_.width="1px",_.overflow="auto",_.visibility="hidden",_.pointerEvents="none",_.position="absolute";const R=document.createElement("div"),M=R.style;M.width="2px",M.height="1px",l.appendChild(R),document.body.appendChild(l),p=0,0===l.scrollLeft&&(l.scrollLeft=1,p=0===l.scrollLeft?1:2),l.remove()}return p}function C(l){if(function G(){if(null==A){const l="undefined"!=typeof document?document.head:null;A=!(!l||!l.createShadowRoot&&!l.attachShadow)}return A}()){const _=l.getRootNode?l.getRootNode():null;if("undefined"!=typeof ShadowRoot&&ShadowRoot&&_ instanceof ShadowRoot)return _}return null}function O(l){return l.composedPath?l.composedPath()[0]:l.target}},977:(B,V,h)=>{h.d(V,{xd:()=>Re,ZD:()=>Y,x0:()=>ke,N7:()=>ee,Cl:()=>Ve,rL:()=>q});var S=h(3191),o=h(5e3),y=h(4408);let b,z=1;const w={};function x(n){return n in w&&(delete w[n],!0)}const T={setImmediate(n){const i=z++;return w[i]=!0,b||(b=Promise.resolve()),b.then(()=>x(i)&&n()),i},clearImmediate(n){x(n)}},{setImmediate:d,clearImmediate:m}=T,p={setImmediate(...n){const{delegate:i}=p;return((null==i?void 0:i.setImmediate)||d)(...n)},clearImmediate(n){const{delegate:i}=p;return((null==i?void 0:i.clearImmediate)||m)(n)},delegate:void 0};var k=h(7565);const A=new class L extends k.v{flush(i){this._active=!0;const e=this._scheduled;this._scheduled=void 0;const{actions:t}=this;let r;i=i||t.shift();do{if(r=i.execute(i.state,i.delay))break}while((i=t[0])&&i.id===e&&t.shift());if(this._active=!1,r){for(;(i=t[0])&&i.id===e&&t.shift();)i.unsubscribe();throw r}}}(class v extends y.o{constructor(i,e){super(i,e),this.scheduler=i,this.work=e}requestAsyncId(i,e,t=0){return null!==t&&t>0?super.requestAsyncId(i,e,t):(i.actions.push(this),i._scheduled||(i._scheduled=p.setImmediate(i.flush.bind(i,void 0))))}recycleAsyncId(i,e,t=0){if(null!=t&&t>0||null==t&&this.delay>0)return super.recycleAsyncId(i,e,t);i.actions.some(r=>r.id===e)||(p.clearImmediate(e),i._scheduled=void 0)}});var C=h(7579),I=h(9646),O=h(9751),P=h(4968),l=h(6406),_=h(727),R=h(5191),M=h(4986),ie=h(4482),ne=h(8421),j=h(5403),se=h(5963);function N(n,i=M.z){return function re(n){return(0,ie.e)((i,e)=>{let t=!1,r=null,s=null,a=!1;const g=()=>{if(null==s||s.unsubscribe(),s=null,t){t=!1;const f=r;r=null,e.next(f)}a&&e.complete()},u=()=>{s=null,a&&e.complete()};i.subscribe(new j.Q(e,f=>{t=!0,r=f,s||(0,ne.Xf)(n(f)).subscribe(s=new j.Q(e,g,u))},()=>{a=!0,(!t||!s||s.closed)&&e.complete()}))})}(()=>(0,se.H)(n,i))}var oe=h(1884),le=h(9300),W=h(2722),H=h(8675),ae=h(1520),de=h(3900),ce=h(4782),U=h(9808),E=h(925);const he=new o.OlP("cdk-dir-doc",{providedIn:"root",factory:function ue(){return(0,o.f3M)(U.K0)}}),fe=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;let Z=(()=>{class n{constructor(e){if(this.value="ltr",this.change=new o.vpe,e){const r=e.documentElement?e.documentElement.dir:null;this.value=function pe(n){const i=(null==n?void 0:n.toLowerCase())||"";return"auto"===i&&"undefined"!=typeof navigator&&(null==navigator?void 0:navigator.language)?fe.test(navigator.language)?"rtl":"ltr":"rtl"===i?"rtl":"ltr"}((e.body?e.body.dir:null)||r||"ltr")}}ngOnDestroy(){this.change.complete()}}return n.\u0275fac=function(e){return new(e||n)(o.LFG(he,8))},n.\u0275prov=o.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),$=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({}),n})();class _e extends class ge{}{constructor(i){super(),this._data=i}connect(){return(0,R.b)(this._data)?this._data:(0,I.of)(this._data)}disconnect(){}}class ve{constructor(){this.viewCacheSize=20,this._viewCache=[]}applyChanges(i,e,t,r,s){i.forEachOperation((a,g,u)=>{let f,D;null==a.previousIndex?(f=this._insertView(()=>t(a,g,u),u,e,r(a)),D=f?1:0):null==u?(this._detachAndCacheView(g,e),D=3):(f=this._moveView(g,u,e,r(a)),D=2),s&&s({context:null==f?void 0:f.context,operation:D,record:a})})}detach(){for(const i of this._viewCache)i.destroy();this._viewCache=[]}_insertView(i,e,t,r){const s=this._insertViewFromCache(e,t);if(s)return void(s.context.$implicit=r);const a=i();return t.createEmbeddedView(a.templateRef,a.context,a.index)}_detachAndCacheView(i,e){const t=e.detach(i);this._maybeCacheView(t,e)}_moveView(i,e,t,r){const s=t.get(i);return t.move(s,e),s.context.$implicit=r,s}_maybeCacheView(i,e){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(i);else{const t=e.indexOf(i);-1===t?i.destroy():e.remove(t)}}_insertViewFromCache(i,e){const t=this._viewCache.pop();return t&&e.insert(t,i),t||null}}const K=new o.OlP("_ViewRepeater"),Se=["contentWrapper"],we=["*"],X=new o.OlP("VIRTUAL_SCROLL_STRATEGY");class ye{constructor(i,e,t){this._scrolledIndexChange=new C.x,this.scrolledIndexChange=this._scrolledIndexChange.pipe((0,oe.x)()),this._viewport=null,this._itemSize=i,this._minBufferPx=e,this._maxBufferPx=t}attach(i){this._viewport=i,this._updateTotalContentSize(),this._updateRenderedRange()}detach(){this._scrolledIndexChange.complete(),this._viewport=null}updateItemAndBufferSize(i,e,t){this._itemSize=i,this._minBufferPx=e,this._maxBufferPx=t,this._updateTotalContentSize(),this._updateRenderedRange()}onContentScrolled(){this._updateRenderedRange()}onDataLengthChanged(){this._updateTotalContentSize(),this._updateRenderedRange()}onContentRendered(){}onRenderedOffsetChanged(){}scrollToIndex(i,e){this._viewport&&this._viewport.scrollToOffset(i*this._itemSize,e)}_updateTotalContentSize(){!this._viewport||this._viewport.setTotalContentSize(this._viewport.getDataLength()*this._itemSize)}_updateRenderedRange(){if(!this._viewport)return;const i=this._viewport.getRenderedRange(),e={start:i.start,end:i.end},t=this._viewport.getViewportSize(),r=this._viewport.getDataLength();let s=this._viewport.measureScrollOffset(),a=this._itemSize>0?s/this._itemSize:0;if(e.end>r){const u=Math.ceil(t/this._itemSize),f=Math.max(0,Math.min(a,r-u));a!=f&&(a=f,s=f*this._itemSize,e.start=Math.floor(a)),e.end=Math.max(0,Math.min(r,e.start+u))}const g=s-e.start*this._itemSize;if(g<this._minBufferPx&&0!=e.start){const u=Math.ceil((this._maxBufferPx-g)/this._itemSize);e.start=Math.max(0,e.start-u),e.end=Math.min(r,Math.ceil(a+(t+this._minBufferPx)/this._itemSize))}else{const u=e.end*this._itemSize-(s+t);if(u<this._minBufferPx&&e.end!=r){const f=Math.ceil((this._maxBufferPx-u)/this._itemSize);f>0&&(e.end=Math.min(r,e.end+f),e.start=Math.max(0,Math.floor(a-this._minBufferPx/this._itemSize)))}}this._viewport.setRenderedRange(e),this._viewport.setRenderedContentOffset(this._itemSize*e.start),this._scrolledIndexChange.next(Math.floor(a))}}function Ce(n){return n._scrollStrategy}let Re=(()=>{class n{constructor(){this._itemSize=20,this._minBufferPx=100,this._maxBufferPx=200,this._scrollStrategy=new ye(this.itemSize,this.minBufferPx,this.maxBufferPx)}get itemSize(){return this._itemSize}set itemSize(e){this._itemSize=(0,S.su)(e)}get minBufferPx(){return this._minBufferPx}set minBufferPx(e){this._minBufferPx=(0,S.su)(e)}get maxBufferPx(){return this._maxBufferPx}set maxBufferPx(e){this._maxBufferPx=(0,S.su)(e)}ngOnChanges(){this._scrollStrategy.updateItemAndBufferSize(this.itemSize,this.minBufferPx,this.maxBufferPx)}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275dir=o.lG2({type:n,selectors:[["cdk-virtual-scroll-viewport","itemSize",""]],inputs:{itemSize:"itemSize",minBufferPx:"minBufferPx",maxBufferPx:"maxBufferPx"},features:[o._Bn([{provide:X,useFactory:Ce,deps:[(0,o.Gpc)(()=>n)]}]),o.TTD]}),n})(),J=(()=>{class n{constructor(e,t,r){this._ngZone=e,this._platform=t,this._scrolled=new C.x,this._globalSubscription=null,this._scrolledCount=0,this.scrollContainers=new Map,this._document=r}register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){const t=this.scrollContainers.get(e);t&&(t.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=20){return this._platform.isBrowser?new O.y(t=>{this._globalSubscription||this._addGlobalListener();const r=e>0?this._scrolled.pipe(N(e)).subscribe(t):this._scrolled.subscribe(t);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||this._removeGlobalListener()}}):(0,I.of)()}ngOnDestroy(){this._removeGlobalListener(),this.scrollContainers.forEach((e,t)=>this.deregister(t)),this._scrolled.complete()}ancestorScrolled(e,t){const r=this.getAncestorScrollContainers(e);return this.scrolled(t).pipe((0,le.h)(s=>!s||r.indexOf(s)>-1))}getAncestorScrollContainers(e){const t=[];return this.scrollContainers.forEach((r,s)=>{this._scrollableContainsElement(s,e)&&t.push(s)}),t}_getWindow(){return this._document.defaultView||window}_scrollableContainsElement(e,t){let r=(0,S.fI)(t),s=e.getElementRef().nativeElement;do{if(r==s)return!0}while(r=r.parentElement);return!1}_addGlobalListener(){this._globalSubscription=this._ngZone.runOutsideAngular(()=>{const e=this._getWindow();return(0,P.R)(e.document,"scroll").subscribe(()=>this._scrolled.next())})}_removeGlobalListener(){this._globalSubscription&&(this._globalSubscription.unsubscribe(),this._globalSubscription=null)}}return n.\u0275fac=function(e){return new(e||n)(o.LFG(o.R0b),o.LFG(E.t4),o.LFG(U.K0,8))},n.\u0275prov=o.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),Q=(()=>{class n{constructor(e,t,r,s){this.elementRef=e,this.scrollDispatcher=t,this.ngZone=r,this.dir=s,this._destroyed=new C.x,this._elementScrolled=new O.y(a=>this.ngZone.runOutsideAngular(()=>(0,P.R)(this.elementRef.nativeElement,"scroll").pipe((0,W.R)(this._destroyed)).subscribe(a)))}ngOnInit(){this.scrollDispatcher.register(this)}ngOnDestroy(){this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){const t=this.elementRef.nativeElement,r=this.dir&&"rtl"==this.dir.value;null==e.left&&(e.left=r?e.end:e.start),null==e.right&&(e.right=r?e.start:e.end),null!=e.bottom&&(e.top=t.scrollHeight-t.clientHeight-e.bottom),r&&0!=(0,E._i)()?(null!=e.left&&(e.right=t.scrollWidth-t.clientWidth-e.left),2==(0,E._i)()?e.left=e.right:1==(0,E._i)()&&(e.left=e.right?-e.right:e.right)):null!=e.right&&(e.left=t.scrollWidth-t.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){const t=this.elementRef.nativeElement;(0,E.Mq)()?t.scrollTo(e):(null!=e.top&&(t.scrollTop=e.top),null!=e.left&&(t.scrollLeft=e.left))}measureScrollOffset(e){const t="left",r="right",s=this.elementRef.nativeElement;if("top"==e)return s.scrollTop;if("bottom"==e)return s.scrollHeight-s.clientHeight-s.scrollTop;const a=this.dir&&"rtl"==this.dir.value;return"start"==e?e=a?r:t:"end"==e&&(e=a?t:r),a&&2==(0,E._i)()?e==t?s.scrollWidth-s.clientWidth-s.scrollLeft:s.scrollLeft:a&&1==(0,E._i)()?e==t?s.scrollLeft+s.scrollWidth-s.clientWidth:-s.scrollLeft:e==t?s.scrollLeft:s.scrollWidth-s.clientWidth-s.scrollLeft}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(o.SBq),o.Y36(J),o.Y36(o.R0b),o.Y36(Z,8))},n.\u0275dir=o.lG2({type:n,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]}),n})(),q=(()=>{class n{constructor(e,t,r){this._platform=e,this._change=new C.x,this._changeListener=s=>{this._change.next(s)},this._document=r,t.runOutsideAngular(()=>{if(e.isBrowser){const s=this._getWindow();s.addEventListener("resize",this._changeListener),s.addEventListener("orientationchange",this._changeListener)}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){if(this._platform.isBrowser){const e=this._getWindow();e.removeEventListener("resize",this._changeListener),e.removeEventListener("orientationchange",this._changeListener)}this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();const e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){const e=this.getViewportScrollPosition(),{width:t,height:r}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+r,right:e.left+t,height:r,width:t}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};const e=this._document,t=this._getWindow(),r=e.documentElement,s=r.getBoundingClientRect();return{top:-s.top||e.body.scrollTop||t.scrollY||r.scrollTop||0,left:-s.left||e.body.scrollLeft||t.scrollX||r.scrollLeft||0}}change(e=20){return e>0?this._change.pipe(N(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){const e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}}return n.\u0275fac=function(e){return new(e||n)(o.LFG(E.t4),o.LFG(o.R0b),o.LFG(U.K0,8))},n.\u0275prov=o.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();const be="undefined"!=typeof requestAnimationFrame?l.Z:A;let ee=(()=>{class n extends Q{constructor(e,t,r,s,a,g,u){super(e,g,r,a),this.elementRef=e,this._changeDetectorRef=t,this._scrollStrategy=s,this._detachedSubject=new C.x,this._renderedRangeSubject=new C.x,this._orientation="vertical",this._appendOnly=!1,this.scrolledIndexChange=new O.y(f=>this._scrollStrategy.scrolledIndexChange.subscribe(D=>Promise.resolve().then(()=>this.ngZone.run(()=>f.next(D))))),this.renderedRangeStream=this._renderedRangeSubject,this._totalContentSize=0,this._totalContentWidth="",this._totalContentHeight="",this._renderedRange={start:0,end:0},this._dataLength=0,this._viewportSize=0,this._renderedContentOffset=0,this._renderedContentOffsetNeedsRewrite=!1,this._isChangeDetectionPending=!1,this._runAfterChangeDetection=[],this._viewportChanges=_.w0.EMPTY,this._viewportChanges=u.change().subscribe(()=>{this.checkViewportSize()})}get orientation(){return this._orientation}set orientation(e){this._orientation!==e&&(this._orientation=e,this._calculateSpacerSize())}get appendOnly(){return this._appendOnly}set appendOnly(e){this._appendOnly=(0,S.Ig)(e)}ngOnInit(){super.ngOnInit(),this.ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>{this._measureViewportSize(),this._scrollStrategy.attach(this),this.elementScrolled().pipe((0,H.O)(null),N(0,be)).subscribe(()=>this._scrollStrategy.onContentScrolled()),this._markChangeDetectionNeeded()}))}ngOnDestroy(){this.detach(),this._scrollStrategy.detach(),this._renderedRangeSubject.complete(),this._detachedSubject.complete(),this._viewportChanges.unsubscribe(),super.ngOnDestroy()}attach(e){this.ngZone.runOutsideAngular(()=>{this._forOf=e,this._forOf.dataStream.pipe((0,W.R)(this._detachedSubject)).subscribe(t=>{const r=t.length;r!==this._dataLength&&(this._dataLength=r,this._scrollStrategy.onDataLengthChanged()),this._doChangeDetection()})})}detach(){this._forOf=null,this._detachedSubject.next()}getDataLength(){return this._dataLength}getViewportSize(){return this._viewportSize}getRenderedRange(){return this._renderedRange}setTotalContentSize(e){this._totalContentSize!==e&&(this._totalContentSize=e,this._calculateSpacerSize(),this._markChangeDetectionNeeded())}setRenderedRange(e){(function Ee(n,i){return n.start==i.start&&n.end==i.end})(this._renderedRange,e)||(this.appendOnly&&(e={start:0,end:Math.max(this._renderedRange.end,e.end)}),this._renderedRangeSubject.next(this._renderedRange=e),this._markChangeDetectionNeeded(()=>this._scrollStrategy.onContentRendered()))}getOffsetToRenderedContentStart(){return this._renderedContentOffsetNeedsRewrite?null:this._renderedContentOffset}setRenderedContentOffset(e,t="to-start"){const s="horizontal"==this.orientation,a=s?"X":"Y";let u=`translate${a}(${Number((s&&this.dir&&"rtl"==this.dir.value?-1:1)*e)}px)`;this._renderedContentOffset=e,"to-end"===t&&(u+=` translate${a}(-100%)`,this._renderedContentOffsetNeedsRewrite=!0),this._renderedContentTransform!=u&&(this._renderedContentTransform=u,this._markChangeDetectionNeeded(()=>{this._renderedContentOffsetNeedsRewrite?(this._renderedContentOffset-=this.measureRenderedContentSize(),this._renderedContentOffsetNeedsRewrite=!1,this.setRenderedContentOffset(this._renderedContentOffset)):this._scrollStrategy.onRenderedOffsetChanged()}))}scrollToOffset(e,t="auto"){const r={behavior:t};"horizontal"===this.orientation?r.start=e:r.top=e,this.scrollTo(r)}scrollToIndex(e,t="auto"){this._scrollStrategy.scrollToIndex(e,t)}measureScrollOffset(e){return super.measureScrollOffset(e||("horizontal"===this.orientation?"start":"top"))}measureRenderedContentSize(){const e=this._contentWrapper.nativeElement;return"horizontal"===this.orientation?e.offsetWidth:e.offsetHeight}measureRangeSize(e){return this._forOf?this._forOf.measureRangeSize(e,this.orientation):0}checkViewportSize(){this._measureViewportSize(),this._scrollStrategy.onDataLengthChanged()}_measureViewportSize(){const e=this.elementRef.nativeElement;this._viewportSize="horizontal"===this.orientation?e.clientWidth:e.clientHeight}_markChangeDetectionNeeded(e){e&&this._runAfterChangeDetection.push(e),this._isChangeDetectionPending||(this._isChangeDetectionPending=!0,this.ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>{this._doChangeDetection()})))}_doChangeDetection(){this._isChangeDetectionPending=!1,this._contentWrapper.nativeElement.style.transform=this._renderedContentTransform,this.ngZone.run(()=>this._changeDetectorRef.markForCheck());const e=this._runAfterChangeDetection;this._runAfterChangeDetection=[];for(const t of e)t()}_calculateSpacerSize(){this._totalContentHeight="horizontal"===this.orientation?"":`${this._totalContentSize}px`,this._totalContentWidth="horizontal"===this.orientation?`${this._totalContentSize}px`:""}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(o.SBq),o.Y36(o.sBO),o.Y36(o.R0b),o.Y36(X,8),o.Y36(Z,8),o.Y36(J),o.Y36(q))},n.\u0275cmp=o.Xpm({type:n,selectors:[["cdk-virtual-scroll-viewport"]],viewQuery:function(e,t){if(1&e&&o.Gf(Se,7),2&e){let r;o.iGM(r=o.CRH())&&(t._contentWrapper=r.first)}},hostAttrs:[1,"cdk-virtual-scroll-viewport"],hostVars:4,hostBindings:function(e,t){2&e&&o.ekj("cdk-virtual-scroll-orientation-horizontal","horizontal"===t.orientation)("cdk-virtual-scroll-orientation-vertical","horizontal"!==t.orientation)},inputs:{orientation:"orientation",appendOnly:"appendOnly"},outputs:{scrolledIndexChange:"scrolledIndexChange"},features:[o._Bn([{provide:Q,useExisting:n}]),o.qOj],ngContentSelectors:we,decls:4,vars:4,consts:[[1,"cdk-virtual-scroll-content-wrapper"],["contentWrapper",""],[1,"cdk-virtual-scroll-spacer"]],template:function(e,t){1&e&&(o.F$t(),o.TgZ(0,"div",0,1),o.Hsn(2),o.qZA(),o._UZ(3,"div",2)),2&e&&(o.xp6(3),o.Udp("width",t._totalContentWidth)("height",t._totalContentHeight))},styles:["cdk-virtual-scroll-viewport{display:block;position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;-webkit-overflow-scrolling:touch}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0}[dir=rtl] .cdk-virtual-scroll-spacer{right:0;left:auto;transform-origin:100% 0}\n"],encapsulation:2,changeDetection:0}),n})();function te(n,i,e){if(!e.getBoundingClientRect)return 0;const r=e.getBoundingClientRect();return"horizontal"===n?"start"===i?r.left:r.right:"start"===i?r.top:r.bottom}let ke=(()=>{class n{constructor(e,t,r,s,a,g){this._viewContainerRef=e,this._template=t,this._differs=r,this._viewRepeater=s,this._viewport=a,this.viewChange=new C.x,this._dataSourceChanges=new C.x,this.dataStream=this._dataSourceChanges.pipe((0,H.O)(null),(0,ae.G)(),(0,de.w)(([u,f])=>this._changeDataSource(u,f)),(0,ce.d)(1)),this._differ=null,this._needsUpdate=!1,this._destroyed=new C.x,this.dataStream.subscribe(u=>{this._data=u,this._onRenderedDataChange()}),this._viewport.renderedRangeStream.pipe((0,W.R)(this._destroyed)).subscribe(u=>{this._renderedRange=u,g.run(()=>this.viewChange.next(this._renderedRange)),this._onRenderedDataChange()}),this._viewport.attach(this)}get cdkVirtualForOf(){return this._cdkVirtualForOf}set cdkVirtualForOf(e){this._cdkVirtualForOf=e,function me(n){return n&&"function"==typeof n.connect}(e)?this._dataSourceChanges.next(e):this._dataSourceChanges.next(new _e((0,R.b)(e)?e:Array.from(e||[])))}get cdkVirtualForTrackBy(){return this._cdkVirtualForTrackBy}set cdkVirtualForTrackBy(e){this._needsUpdate=!0,this._cdkVirtualForTrackBy=e?(t,r)=>e(t+(this._renderedRange?this._renderedRange.start:0),r):void 0}set cdkVirtualForTemplate(e){e&&(this._needsUpdate=!0,this._template=e)}get cdkVirtualForTemplateCacheSize(){return this._viewRepeater.viewCacheSize}set cdkVirtualForTemplateCacheSize(e){this._viewRepeater.viewCacheSize=(0,S.su)(e)}measureRangeSize(e,t){if(e.start>=e.end)return 0;const r=e.start-this._renderedRange.start,s=e.end-e.start;let a,g;for(let u=0;u<s;u++){const f=this._viewContainerRef.get(u+r);if(f&&f.rootNodes.length){a=g=f.rootNodes[0];break}}for(let u=s-1;u>-1;u--){const f=this._viewContainerRef.get(u+r);if(f&&f.rootNodes.length){g=f.rootNodes[f.rootNodes.length-1];break}}return a&&g?te(t,"end",g)-te(t,"start",a):0}ngDoCheck(){if(this._differ&&this._needsUpdate){const e=this._differ.diff(this._renderedItems);e?this._applyChanges(e):this._updateContext(),this._needsUpdate=!1}}ngOnDestroy(){this._viewport.detach(),this._dataSourceChanges.next(void 0),this._dataSourceChanges.complete(),this.viewChange.complete(),this._destroyed.next(),this._destroyed.complete(),this._viewRepeater.detach()}_onRenderedDataChange(){!this._renderedRange||(this._renderedItems=this._data.slice(this._renderedRange.start,this._renderedRange.end),this._differ||(this._differ=this._differs.find(this._renderedItems).create((e,t)=>this.cdkVirtualForTrackBy?this.cdkVirtualForTrackBy(e,t):t)),this._needsUpdate=!0)}_changeDataSource(e,t){return e&&e.disconnect(this),this._needsUpdate=!0,t?t.connect(this):(0,I.of)()}_updateContext(){const e=this._data.length;let t=this._viewContainerRef.length;for(;t--;){const r=this._viewContainerRef.get(t);r.context.index=this._renderedRange.start+t,r.context.count=e,this._updateComputedContextProperties(r.context),r.detectChanges()}}_applyChanges(e){this._viewRepeater.applyChanges(e,this._viewContainerRef,(s,a,g)=>this._getEmbeddedViewArgs(s,g),s=>s.item),e.forEachIdentityChange(s=>{this._viewContainerRef.get(s.currentIndex).context.$implicit=s.item});const t=this._data.length;let r=this._viewContainerRef.length;for(;r--;){const s=this._viewContainerRef.get(r);s.context.index=this._renderedRange.start+r,s.context.count=t,this._updateComputedContextProperties(s.context)}}_updateComputedContextProperties(e){e.first=0===e.index,e.last=e.index===e.count-1,e.even=e.index%2==0,e.odd=!e.even}_getEmbeddedViewArgs(e,t){return{templateRef:this._template,context:{$implicit:e.item,cdkVirtualForOf:this._cdkVirtualForOf,index:-1,count:-1,first:!1,last:!1,odd:!1,even:!1},index:t}}}return n.\u0275fac=function(e){return new(e||n)(o.Y36(o.s_b),o.Y36(o.Rgc),o.Y36(o.ZZ4),o.Y36(K),o.Y36(ee,4),o.Y36(o.R0b))},n.\u0275dir=o.lG2({type:n,selectors:[["","cdkVirtualFor","","cdkVirtualForOf",""]],inputs:{cdkVirtualForOf:"cdkVirtualForOf",cdkVirtualForTrackBy:"cdkVirtualForTrackBy",cdkVirtualForTemplate:"cdkVirtualForTemplate",cdkVirtualForTemplateCacheSize:"cdkVirtualForTemplateCacheSize"},features:[o._Bn([{provide:K,useClass:ve}])]}),n})(),Y=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({}),n})(),Ve=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[[$,E.ud,Y],$,Y]}),n})()}}]);