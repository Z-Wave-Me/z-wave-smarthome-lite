"use strict";(self.webpackChunklite=self.webpackChunklite||[]).push([[154],{6406:(z,x,c)=>{c.d(x,{Z:()=>E});var S=c(4408),o=c(727);const _={schedule(d){let l=requestAnimationFrame,m=cancelAnimationFrame;const{delegate:u}=_;u&&(l=u.requestAnimationFrame,m=u.cancelAnimationFrame);const v=l(k=>{m=void 0,d(k)});return new o.w0(()=>m?.(v))},requestAnimationFrame(...d){const{delegate:l}=_;return(l?.requestAnimationFrame||requestAnimationFrame)(...d)},cancelAnimationFrame(...d){const{delegate:l}=_;return(l?.cancelAnimationFrame||cancelAnimationFrame)(...d)},delegate:void 0};var b=c(7565);const E=new class C extends b.v{flush(l){this._active=!0;const m=this._scheduled;this._scheduled=void 0;const{actions:u}=this;let v;l=l||u.shift();do{if(v=l.execute(l.state,l.delay))break}while((l=u[0])&&l.id===m&&u.shift());if(this._active=!1,v){for(;(l=u[0])&&l.id===m&&u.shift();)l.unsubscribe();throw v}}}(class y extends S.o{constructor(l,m){super(l,m),this.scheduler=l,this.work=m}requestAsyncId(l,m,u=0){return null!==u&&u>0?super.requestAsyncId(l,m,u):(l.actions.push(this),l._scheduled||(l._scheduled=_.requestAnimationFrame(()=>l.flush(void 0))))}recycleAsyncId(l,m,u=0){if(null!=u&&u>0||null==u&&this.delay>0)return super.recycleAsyncId(l,m,u);l.actions.some(v=>v.id===m)||(_.cancelAnimationFrame(m),l._scheduled=void 0)}})},445:(z,x,c)=>{c.d(x,{Is:()=>E,vT:()=>d});var S=c(4650),o=c(6895);const _=new S.OlP("cdk-dir-doc",{providedIn:"root",factory:function y(){return(0,S.f3M)(o.K0)}}),b=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;let E=(()=>{class l{constructor(u){if(this.value="ltr",this.change=new S.vpe,u){const k=u.documentElement?u.documentElement.dir:null;this.value=function C(l){const m=l?.toLowerCase()||"";return"auto"===m&&typeof navigator<"u"&&navigator?.language?b.test(navigator.language)?"rtl":"ltr":"rtl"===m?"rtl":"ltr"}((u.body?u.body.dir:null)||k||"ltr")}}ngOnDestroy(){this.change.complete()}}return l.\u0275fac=function(u){return new(u||l)(S.LFG(_,8))},l.\u0275prov=S.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})(),d=(()=>{class l{}return l.\u0275fac=function(u){return new(u||l)},l.\u0275mod=S.oAB({type:l}),l.\u0275inj=S.cJS({}),l})()},1281:(z,x,c)=>{c.d(x,{Eq:()=>b,Ig:()=>o,fI:()=>E,su:()=>_});var S=c(4650);function o(d){return null!=d&&"false"!=`${d}`}function _(d,l=0){return function y(d){return!isNaN(parseFloat(d))&&!isNaN(Number(d))}(d)?Number(d):l}function b(d){return Array.isArray(d)?d:[d]}function E(d){return d instanceof S.SBq?d.nativeElement:d}},3353:(z,x,c)=>{c.d(x,{Mq:()=>k,_i:()=>L,i$:()=>m,kV:()=>P,sA:()=>W,t4:()=>y});var S=c(4650),o=c(6895);let _;try{_=typeof Intl<"u"&&Intl.v8BreakIterator}catch{_=!1}let d,u,v,I,y=(()=>{class h{constructor(D){this._platformId=D,this.isBrowser=this._platformId?(0,o.NF)(this._platformId):"object"==typeof document&&!!document,this.EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent),this.TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent),this.BLINK=this.isBrowser&&!(!window.chrome&&!_)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT,this.WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT,this.IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window),this.FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent),this.ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT,this.SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT}}return h.\u0275fac=function(D){return new(D||h)(S.LFG(S.Lbi))},h.\u0275prov=S.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"}),h})();function m(h){return function l(){if(null==d&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>d=!0}))}finally{d=d||!1}return d}()?h:!!h.capture}function k(){if(null==v){if("object"!=typeof document||!document||"function"!=typeof Element||!Element)return v=!1,v;if("scrollBehavior"in document.documentElement.style)v=!0;else{const h=Element.prototype.scrollTo;v=!!h&&!/\{\s*\[native code\]\s*\}/.test(h.toString())}}return v}function L(){if("object"!=typeof document||!document)return 0;if(null==u){const h=document.createElement("div"),w=h.style;h.dir="rtl",w.width="1px",w.overflow="auto",w.visibility="hidden",w.pointerEvents="none",w.position="absolute";const D=document.createElement("div"),M=D.style;M.width="2px",M.height="1px",h.appendChild(D),document.body.appendChild(h),u=0,0===h.scrollLeft&&(h.scrollLeft=1,u=0===h.scrollLeft?1:2),h.remove()}return u}function P(h){if(function A(){if(null==I){const h=typeof document<"u"?document.head:null;I=!(!h||!h.createShadowRoot&&!h.attachShadow)}return I}()){const w=h.getRootNode?h.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&w instanceof ShadowRoot)return w}return null}function W(h){return h.composedPath?h.composedPath()[0]:h.target}},7154:(z,x,c)=>{c.d(x,{xd:()=>we,ZD:()=>Y,x0:()=>De,N7:()=>ee,mF:()=>B,Cl:()=>xe,rL:()=>J});var S=c(1281),o=c(4650),_=c(7579),y=c(9646),b=c(9751),C=c(4968),E=c(6406),T=c(4408);let l,d=1;const m={};function u(s){return s in m&&(delete m[s],!0)}const v={setImmediate(s){const i=d++;return m[i]=!0,l||(l=Promise.resolve()),l.then(()=>u(i)&&s()),i},clearImmediate(s){u(s)}},{setImmediate:L,clearImmediate:I}=v,A={setImmediate(...s){const{delegate:i}=A;return(i?.setImmediate||L)(...s)},clearImmediate(s){const{delegate:i}=A;return(i?.clearImmediate||I)(s)},delegate:void 0};var j=c(7565);const G=new class W extends j.v{flush(i){this._active=!0;const e=this._scheduled;this._scheduled=void 0;const{actions:t}=this;let n;i=i||t.shift();do{if(n=i.execute(i.state,i.delay))break}while((i=t[0])&&i.id===e&&t.shift());if(this._active=!1,n){for(;(i=t[0])&&i.id===e&&t.shift();)i.unsubscribe();throw n}}}(class P extends T.o{constructor(i,e){super(i,e),this.scheduler=i,this.work=e}requestAsyncId(i,e,t=0){return null!==t&&t>0?super.requestAsyncId(i,e,t):(i.actions.push(this),i._scheduled||(i._scheduled=A.setImmediate(i.flush.bind(i,void 0))))}recycleAsyncId(i,e,t=0){if(null!=t&&t>0||null==t&&this.delay>0)return super.recycleAsyncId(i,e,t);i.actions.some(n=>n.id===e)||(A.clearImmediate(e),i._scheduled=void 0)}});var w=c(727),D=c(5191),M=c(1884),ie=c(4986),ne=c(4482),re=c(8421),Z=c(5403),oe=c(5963);function N(s,i=ie.z){return function se(s){return(0,ne.e)((i,e)=>{let t=!1,n=null,r=null,a=!1;const p=()=>{if(r?.unsubscribe(),r=null,t){t=!1;const g=n;n=null,e.next(g)}a&&e.complete()},f=()=>{r=null,a&&e.complete()};i.subscribe(new Z.Q(e,g=>{t=!0,n=g,r||(0,re.Xf)(s(g)).subscribe(r=new Z.Q(e,p,f))},()=>{a=!0,(!t||!r||r.closed)&&e.complete()}))})}(()=>(0,oe.H)(s,i))}var le=c(9300),U=c(2722),H=c(8675),ae=c(1520),ce=c(3900),de=c(4782),V=c(3353),$=c(6895),F=c(445),he=c(4033);class ue{}class me extends ue{constructor(i){super(),this._data=i}connect(){return(0,D.b)(this._data)?this._data:(0,y.of)(this._data)}disconnect(){}}class ge{constructor(){this.viewCacheSize=20,this._viewCache=[]}applyChanges(i,e,t,n,r){i.forEachOperation((a,p,f)=>{let g,R;null==a.previousIndex?(g=this._insertView(()=>t(a,p,f),f,e,n(a)),R=g?1:0):null==f?(this._detachAndCacheView(p,e),R=3):(g=this._moveView(p,f,e,n(a)),R=2),r&&r({context:g?.context,operation:R,record:a})})}detach(){for(const i of this._viewCache)i.destroy();this._viewCache=[]}_insertView(i,e,t,n){const r=this._insertViewFromCache(e,t);if(r)return void(r.context.$implicit=n);const a=i();return t.createEmbeddedView(a.templateRef,a.context,a.index)}_detachAndCacheView(i,e){const t=e.detach(i);this._maybeCacheView(t,e)}_moveView(i,e,t,n){const r=t.get(i);return t.move(r,e),r.context.$implicit=n,r}_maybeCacheView(i,e){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(i);else{const t=e.indexOf(i);-1===t?i.destroy():e.remove(t)}}_insertViewFromCache(i,e){const t=this._viewCache.pop();return t&&e.insert(t,i),t||null}}const K=new o.OlP("_ViewRepeater"),pe=["contentWrapper"],_e=["*"],Q=new o.OlP("VIRTUAL_SCROLL_STRATEGY");class ve{constructor(i,e,t){this._scrolledIndexChange=new _.x,this.scrolledIndexChange=this._scrolledIndexChange.pipe((0,M.x)()),this._viewport=null,this._itemSize=i,this._minBufferPx=e,this._maxBufferPx=t}attach(i){this._viewport=i,this._updateTotalContentSize(),this._updateRenderedRange()}detach(){this._scrolledIndexChange.complete(),this._viewport=null}updateItemAndBufferSize(i,e,t){this._itemSize=i,this._minBufferPx=e,this._maxBufferPx=t,this._updateTotalContentSize(),this._updateRenderedRange()}onContentScrolled(){this._updateRenderedRange()}onDataLengthChanged(){this._updateTotalContentSize(),this._updateRenderedRange()}onContentRendered(){}onRenderedOffsetChanged(){}scrollToIndex(i,e){this._viewport&&this._viewport.scrollToOffset(i*this._itemSize,e)}_updateTotalContentSize(){!this._viewport||this._viewport.setTotalContentSize(this._viewport.getDataLength()*this._itemSize)}_updateRenderedRange(){if(!this._viewport)return;const i=this._viewport.getRenderedRange(),e={start:i.start,end:i.end},t=this._viewport.getViewportSize(),n=this._viewport.getDataLength();let r=this._viewport.measureScrollOffset(),a=this._itemSize>0?r/this._itemSize:0;if(e.end>n){const f=Math.ceil(t/this._itemSize),g=Math.max(0,Math.min(a,n-f));a!=g&&(a=g,r=g*this._itemSize,e.start=Math.floor(a)),e.end=Math.max(0,Math.min(n,e.start+f))}const p=r-e.start*this._itemSize;if(p<this._minBufferPx&&0!=e.start){const f=Math.ceil((this._maxBufferPx-p)/this._itemSize);e.start=Math.max(0,e.start-f),e.end=Math.min(n,Math.ceil(a+(t+this._minBufferPx)/this._itemSize))}else{const f=e.end*this._itemSize-(r+t);if(f<this._minBufferPx&&e.end!=n){const g=Math.ceil((this._maxBufferPx-f)/this._itemSize);g>0&&(e.end=Math.min(n,e.end+g),e.start=Math.max(0,Math.floor(a-this._minBufferPx/this._itemSize)))}}this._viewport.setRenderedRange(e),this._viewport.setRenderedContentOffset(this._itemSize*e.start),this._scrolledIndexChange.next(Math.floor(a))}}function Se(s){return s._scrollStrategy}let we=(()=>{class s{constructor(){this._itemSize=20,this._minBufferPx=100,this._maxBufferPx=200,this._scrollStrategy=new ve(this.itemSize,this.minBufferPx,this.maxBufferPx)}get itemSize(){return this._itemSize}set itemSize(e){this._itemSize=(0,S.su)(e)}get minBufferPx(){return this._minBufferPx}set minBufferPx(e){this._minBufferPx=(0,S.su)(e)}get maxBufferPx(){return this._maxBufferPx}set maxBufferPx(e){this._maxBufferPx=(0,S.su)(e)}ngOnChanges(){this._scrollStrategy.updateItemAndBufferSize(this.itemSize,this.minBufferPx,this.maxBufferPx)}}return s.\u0275fac=function(e){return new(e||s)},s.\u0275dir=o.lG2({type:s,selectors:[["cdk-virtual-scroll-viewport","itemSize",""]],inputs:{itemSize:"itemSize",minBufferPx:"minBufferPx",maxBufferPx:"maxBufferPx"},features:[o._Bn([{provide:Q,useFactory:Se,deps:[(0,o.Gpc)(()=>s)]}]),o.TTD]}),s})(),B=(()=>{class s{constructor(e,t,n){this._ngZone=e,this._platform=t,this._scrolled=new _.x,this._globalSubscription=null,this._scrolledCount=0,this.scrollContainers=new Map,this._document=n}register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){const t=this.scrollContainers.get(e);t&&(t.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=20){return this._platform.isBrowser?new b.y(t=>{this._globalSubscription||this._addGlobalListener();const n=e>0?this._scrolled.pipe(N(e)).subscribe(t):this._scrolled.subscribe(t);return this._scrolledCount++,()=>{n.unsubscribe(),this._scrolledCount--,this._scrolledCount||this._removeGlobalListener()}}):(0,y.of)()}ngOnDestroy(){this._removeGlobalListener(),this.scrollContainers.forEach((e,t)=>this.deregister(t)),this._scrolled.complete()}ancestorScrolled(e,t){const n=this.getAncestorScrollContainers(e);return this.scrolled(t).pipe((0,le.h)(r=>!r||n.indexOf(r)>-1))}getAncestorScrollContainers(e){const t=[];return this.scrollContainers.forEach((n,r)=>{this._scrollableContainsElement(r,e)&&t.push(r)}),t}_getWindow(){return this._document.defaultView||window}_scrollableContainsElement(e,t){let n=(0,S.fI)(t),r=e.getElementRef().nativeElement;do{if(n==r)return!0}while(n=n.parentElement);return!1}_addGlobalListener(){this._globalSubscription=this._ngZone.runOutsideAngular(()=>{const e=this._getWindow();return(0,C.R)(e.document,"scroll").subscribe(()=>this._scrolled.next())})}_removeGlobalListener(){this._globalSubscription&&(this._globalSubscription.unsubscribe(),this._globalSubscription=null)}}return s.\u0275fac=function(e){return new(e||s)(o.LFG(o.R0b),o.LFG(V.t4),o.LFG($.K0,8))},s.\u0275prov=o.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})(),X=(()=>{class s{constructor(e,t,n,r){this.elementRef=e,this.scrollDispatcher=t,this.ngZone=n,this.dir=r,this._destroyed=new _.x,this._elementScrolled=new b.y(a=>this.ngZone.runOutsideAngular(()=>(0,C.R)(this.elementRef.nativeElement,"scroll").pipe((0,U.R)(this._destroyed)).subscribe(a)))}ngOnInit(){this.scrollDispatcher.register(this)}ngOnDestroy(){this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){const t=this.elementRef.nativeElement,n=this.dir&&"rtl"==this.dir.value;null==e.left&&(e.left=n?e.end:e.start),null==e.right&&(e.right=n?e.start:e.end),null!=e.bottom&&(e.top=t.scrollHeight-t.clientHeight-e.bottom),n&&0!=(0,V._i)()?(null!=e.left&&(e.right=t.scrollWidth-t.clientWidth-e.left),2==(0,V._i)()?e.left=e.right:1==(0,V._i)()&&(e.left=e.right?-e.right:e.right)):null!=e.right&&(e.left=t.scrollWidth-t.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){const t=this.elementRef.nativeElement;(0,V.Mq)()?t.scrollTo(e):(null!=e.top&&(t.scrollTop=e.top),null!=e.left&&(t.scrollLeft=e.left))}measureScrollOffset(e){const t="left",n="right",r=this.elementRef.nativeElement;if("top"==e)return r.scrollTop;if("bottom"==e)return r.scrollHeight-r.clientHeight-r.scrollTop;const a=this.dir&&"rtl"==this.dir.value;return"start"==e?e=a?n:t:"end"==e&&(e=a?t:n),a&&2==(0,V._i)()?e==t?r.scrollWidth-r.clientWidth-r.scrollLeft:r.scrollLeft:a&&1==(0,V._i)()?e==t?r.scrollLeft+r.scrollWidth-r.clientWidth:-r.scrollLeft:e==t?r.scrollLeft:r.scrollWidth-r.clientWidth-r.scrollLeft}}return s.\u0275fac=function(e){return new(e||s)(o.Y36(o.SBq),o.Y36(B),o.Y36(o.R0b),o.Y36(F.Is,8))},s.\u0275dir=o.lG2({type:s,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]}),s})(),J=(()=>{class s{constructor(e,t,n){this._platform=e,this._change=new _.x,this._changeListener=r=>{this._change.next(r)},this._document=n,t.runOutsideAngular(()=>{if(e.isBrowser){const r=this._getWindow();r.addEventListener("resize",this._changeListener),r.addEventListener("orientationchange",this._changeListener)}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){if(this._platform.isBrowser){const e=this._getWindow();e.removeEventListener("resize",this._changeListener),e.removeEventListener("orientationchange",this._changeListener)}this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();const e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){const e=this.getViewportScrollPosition(),{width:t,height:n}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+n,right:e.left+t,height:n,width:t}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};const e=this._document,t=this._getWindow(),n=e.documentElement,r=n.getBoundingClientRect();return{top:-r.top||e.body.scrollTop||t.scrollY||n.scrollTop||0,left:-r.left||e.body.scrollLeft||t.scrollX||n.scrollLeft||0}}change(e=20){return e>0?this._change.pipe(N(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){const e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}}return s.\u0275fac=function(e){return new(e||s)(o.LFG(V.t4),o.LFG(o.R0b),o.LFG($.K0,8))},s.\u0275prov=o.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})();const q=new o.OlP("VIRTUAL_SCROLLABLE");let Re=(()=>{class s extends X{constructor(e,t,n,r){super(e,t,n,r)}measureViewportSize(e){const t=this.elementRef.nativeElement;return"horizontal"===e?t.clientWidth:t.clientHeight}}return s.\u0275fac=function(e){return new(e||s)(o.Y36(o.SBq),o.Y36(B),o.Y36(o.R0b),o.Y36(F.Is,8))},s.\u0275dir=o.lG2({type:s,features:[o.qOj]}),s})();const Ee=typeof requestAnimationFrame<"u"?E.Z:G;let ee=(()=>{class s extends Re{constructor(e,t,n,r,a,p,f,g){super(e,p,n,a),this.elementRef=e,this._changeDetectorRef=t,this._scrollStrategy=r,this.scrollable=g,this._platform=(0,o.f3M)(V.t4),this._detachedSubject=new _.x,this._renderedRangeSubject=new _.x,this._orientation="vertical",this._appendOnly=!1,this.scrolledIndexChange=new b.y(R=>this._scrollStrategy.scrolledIndexChange.subscribe(O=>Promise.resolve().then(()=>this.ngZone.run(()=>R.next(O))))),this.renderedRangeStream=this._renderedRangeSubject,this._totalContentSize=0,this._totalContentWidth="",this._totalContentHeight="",this._renderedRange={start:0,end:0},this._dataLength=0,this._viewportSize=0,this._renderedContentOffset=0,this._renderedContentOffsetNeedsRewrite=!1,this._isChangeDetectionPending=!1,this._runAfterChangeDetection=[],this._viewportChanges=w.w0.EMPTY,this._viewportChanges=f.change().subscribe(()=>{this.checkViewportSize()}),this.scrollable||(this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable"),this.scrollable=this)}get orientation(){return this._orientation}set orientation(e){this._orientation!==e&&(this._orientation=e,this._calculateSpacerSize())}get appendOnly(){return this._appendOnly}set appendOnly(e){this._appendOnly=(0,S.Ig)(e)}ngOnInit(){!this._platform.isBrowser||(this.scrollable===this&&super.ngOnInit(),this.ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>{this._measureViewportSize(),this._scrollStrategy.attach(this),this.scrollable.elementScrolled().pipe((0,H.O)(null),N(0,Ee)).subscribe(()=>this._scrollStrategy.onContentScrolled()),this._markChangeDetectionNeeded()})))}ngOnDestroy(){this.detach(),this._scrollStrategy.detach(),this._renderedRangeSubject.complete(),this._detachedSubject.complete(),this._viewportChanges.unsubscribe(),super.ngOnDestroy()}attach(e){this.ngZone.runOutsideAngular(()=>{this._forOf=e,this._forOf.dataStream.pipe((0,U.R)(this._detachedSubject)).subscribe(t=>{const n=t.length;n!==this._dataLength&&(this._dataLength=n,this._scrollStrategy.onDataLengthChanged()),this._doChangeDetection()})})}detach(){this._forOf=null,this._detachedSubject.next()}getDataLength(){return this._dataLength}getViewportSize(){return this._viewportSize}getRenderedRange(){return this._renderedRange}measureBoundingClientRectWithScrollOffset(e){return this.getElementRef().nativeElement.getBoundingClientRect()[e]}setTotalContentSize(e){this._totalContentSize!==e&&(this._totalContentSize=e,this._calculateSpacerSize(),this._markChangeDetectionNeeded())}setRenderedRange(e){(function be(s,i){return s.start==i.start&&s.end==i.end})(this._renderedRange,e)||(this.appendOnly&&(e={start:0,end:Math.max(this._renderedRange.end,e.end)}),this._renderedRangeSubject.next(this._renderedRange=e),this._markChangeDetectionNeeded(()=>this._scrollStrategy.onContentRendered()))}getOffsetToRenderedContentStart(){return this._renderedContentOffsetNeedsRewrite?null:this._renderedContentOffset}setRenderedContentOffset(e,t="to-start"){e=this.appendOnly&&"to-start"===t?0:e;const r="horizontal"==this.orientation,a=r?"X":"Y";let f=`translate${a}(${Number((r&&this.dir&&"rtl"==this.dir.value?-1:1)*e)}px)`;this._renderedContentOffset=e,"to-end"===t&&(f+=` translate${a}(-100%)`,this._renderedContentOffsetNeedsRewrite=!0),this._renderedContentTransform!=f&&(this._renderedContentTransform=f,this._markChangeDetectionNeeded(()=>{this._renderedContentOffsetNeedsRewrite?(this._renderedContentOffset-=this.measureRenderedContentSize(),this._renderedContentOffsetNeedsRewrite=!1,this.setRenderedContentOffset(this._renderedContentOffset)):this._scrollStrategy.onRenderedOffsetChanged()}))}scrollToOffset(e,t="auto"){const n={behavior:t};"horizontal"===this.orientation?n.start=e:n.top=e,this.scrollable.scrollTo(n)}scrollToIndex(e,t="auto"){this._scrollStrategy.scrollToIndex(e,t)}measureScrollOffset(e){let t;return t=this.scrollable==this?n=>super.measureScrollOffset(n):n=>this.scrollable.measureScrollOffset(n),Math.max(0,t(e??("horizontal"===this.orientation?"start":"top"))-this.measureViewportOffset())}measureViewportOffset(e){let t;const n="left",r="right",a="rtl"==this.dir?.value;t="start"==e?a?r:n:"end"==e?a?n:r:e||("horizontal"===this.orientation?"left":"top");const p=this.scrollable.measureBoundingClientRectWithScrollOffset(t);return this.elementRef.nativeElement.getBoundingClientRect()[t]-p}measureRenderedContentSize(){const e=this._contentWrapper.nativeElement;return"horizontal"===this.orientation?e.offsetWidth:e.offsetHeight}measureRangeSize(e){return this._forOf?this._forOf.measureRangeSize(e,this.orientation):0}checkViewportSize(){this._measureViewportSize(),this._scrollStrategy.onDataLengthChanged()}_measureViewportSize(){this._viewportSize=this.scrollable.measureViewportSize(this.orientation)}_markChangeDetectionNeeded(e){e&&this._runAfterChangeDetection.push(e),this._isChangeDetectionPending||(this._isChangeDetectionPending=!0,this.ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>{this._doChangeDetection()})))}_doChangeDetection(){this._isChangeDetectionPending=!1,this._contentWrapper.nativeElement.style.transform=this._renderedContentTransform,this.ngZone.run(()=>this._changeDetectorRef.markForCheck());const e=this._runAfterChangeDetection;this._runAfterChangeDetection=[];for(const t of e)t()}_calculateSpacerSize(){this._totalContentHeight="horizontal"===this.orientation?"":`${this._totalContentSize}px`,this._totalContentWidth="horizontal"===this.orientation?`${this._totalContentSize}px`:""}}return s.\u0275fac=function(e){return new(e||s)(o.Y36(o.SBq),o.Y36(o.sBO),o.Y36(o.R0b),o.Y36(Q,8),o.Y36(F.Is,8),o.Y36(B),o.Y36(J),o.Y36(q,8))},s.\u0275cmp=o.Xpm({type:s,selectors:[["cdk-virtual-scroll-viewport"]],viewQuery:function(e,t){if(1&e&&o.Gf(pe,7),2&e){let n;o.iGM(n=o.CRH())&&(t._contentWrapper=n.first)}},hostAttrs:[1,"cdk-virtual-scroll-viewport"],hostVars:4,hostBindings:function(e,t){2&e&&o.ekj("cdk-virtual-scroll-orientation-horizontal","horizontal"===t.orientation)("cdk-virtual-scroll-orientation-vertical","horizontal"!==t.orientation)},inputs:{orientation:"orientation",appendOnly:"appendOnly"},outputs:{scrolledIndexChange:"scrolledIndexChange"},features:[o._Bn([{provide:X,useFactory:(i,e)=>i||e,deps:[[new o.FiY,new o.tBr(q)],s]}]),o.qOj],ngContentSelectors:_e,decls:4,vars:4,consts:[[1,"cdk-virtual-scroll-content-wrapper"],["contentWrapper",""],[1,"cdk-virtual-scroll-spacer"]],template:function(e,t){1&e&&(o.F$t(),o.TgZ(0,"div",0,1),o.Hsn(2),o.qZA(),o._UZ(3,"div",2)),2&e&&(o.xp6(3),o.Udp("width",t._totalContentWidth)("height",t._totalContentHeight))},styles:["cdk-virtual-scroll-viewport{display:block;position:relative;transform:translateZ(0)}.cdk-virtual-scrollable{overflow:auto;will-change:scroll-position;contain:strict;-webkit-overflow-scrolling:touch}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{height:1px;transform-origin:0 0;flex:0 0 auto}[dir=rtl] .cdk-virtual-scroll-spacer{transform-origin:100% 0}"],encapsulation:2,changeDetection:0}),s})();function te(s,i,e){if(!e.getBoundingClientRect)return 0;const n=e.getBoundingClientRect();return"horizontal"===s?"start"===i?n.left:n.right:"start"===i?n.top:n.bottom}let De=(()=>{class s{constructor(e,t,n,r,a,p){this._viewContainerRef=e,this._template=t,this._differs=n,this._viewRepeater=r,this._viewport=a,this.viewChange=new _.x,this._dataSourceChanges=new _.x,this.dataStream=this._dataSourceChanges.pipe((0,H.O)(null),(0,ae.G)(),(0,ce.w)(([f,g])=>this._changeDataSource(f,g)),(0,de.d)(1)),this._differ=null,this._needsUpdate=!1,this._destroyed=new _.x,this.dataStream.subscribe(f=>{this._data=f,this._onRenderedDataChange()}),this._viewport.renderedRangeStream.pipe((0,U.R)(this._destroyed)).subscribe(f=>{this._renderedRange=f,this.viewChange.observers.length&&p.run(()=>this.viewChange.next(this._renderedRange)),this._onRenderedDataChange()}),this._viewport.attach(this)}get cdkVirtualForOf(){return this._cdkVirtualForOf}set cdkVirtualForOf(e){this._cdkVirtualForOf=e,function fe(s){return s&&"function"==typeof s.connect&&!(s instanceof he.c)}(e)?this._dataSourceChanges.next(e):this._dataSourceChanges.next(new me((0,D.b)(e)?e:Array.from(e||[])))}get cdkVirtualForTrackBy(){return this._cdkVirtualForTrackBy}set cdkVirtualForTrackBy(e){this._needsUpdate=!0,this._cdkVirtualForTrackBy=e?(t,n)=>e(t+(this._renderedRange?this._renderedRange.start:0),n):void 0}set cdkVirtualForTemplate(e){e&&(this._needsUpdate=!0,this._template=e)}get cdkVirtualForTemplateCacheSize(){return this._viewRepeater.viewCacheSize}set cdkVirtualForTemplateCacheSize(e){this._viewRepeater.viewCacheSize=(0,S.su)(e)}measureRangeSize(e,t){if(e.start>=e.end)return 0;const n=e.start-this._renderedRange.start,r=e.end-e.start;let a,p;for(let f=0;f<r;f++){const g=this._viewContainerRef.get(f+n);if(g&&g.rootNodes.length){a=p=g.rootNodes[0];break}}for(let f=r-1;f>-1;f--){const g=this._viewContainerRef.get(f+n);if(g&&g.rootNodes.length){p=g.rootNodes[g.rootNodes.length-1];break}}return a&&p?te(t,"end",p)-te(t,"start",a):0}ngDoCheck(){if(this._differ&&this._needsUpdate){const e=this._differ.diff(this._renderedItems);e?this._applyChanges(e):this._updateContext(),this._needsUpdate=!1}}ngOnDestroy(){this._viewport.detach(),this._dataSourceChanges.next(void 0),this._dataSourceChanges.complete(),this.viewChange.complete(),this._destroyed.next(),this._destroyed.complete(),this._viewRepeater.detach()}_onRenderedDataChange(){!this._renderedRange||(this._renderedItems=this._data.slice(this._renderedRange.start,this._renderedRange.end),this._differ||(this._differ=this._differs.find(this._renderedItems).create((e,t)=>this.cdkVirtualForTrackBy?this.cdkVirtualForTrackBy(e,t):t)),this._needsUpdate=!0)}_changeDataSource(e,t){return e&&e.disconnect(this),this._needsUpdate=!0,t?t.connect(this):(0,y.of)()}_updateContext(){const e=this._data.length;let t=this._viewContainerRef.length;for(;t--;){const n=this._viewContainerRef.get(t);n.context.index=this._renderedRange.start+t,n.context.count=e,this._updateComputedContextProperties(n.context),n.detectChanges()}}_applyChanges(e){this._viewRepeater.applyChanges(e,this._viewContainerRef,(r,a,p)=>this._getEmbeddedViewArgs(r,p),r=>r.item),e.forEachIdentityChange(r=>{this._viewContainerRef.get(r.currentIndex).context.$implicit=r.item});const t=this._data.length;let n=this._viewContainerRef.length;for(;n--;){const r=this._viewContainerRef.get(n);r.context.index=this._renderedRange.start+n,r.context.count=t,this._updateComputedContextProperties(r.context)}}_updateComputedContextProperties(e){e.first=0===e.index,e.last=e.index===e.count-1,e.even=e.index%2==0,e.odd=!e.even}_getEmbeddedViewArgs(e,t){return{templateRef:this._template,context:{$implicit:e.item,cdkVirtualForOf:this._cdkVirtualForOf,index:-1,count:-1,first:!1,last:!1,odd:!1,even:!1},index:t}}}return s.\u0275fac=function(e){return new(e||s)(o.Y36(o.s_b),o.Y36(o.Rgc),o.Y36(o.ZZ4),o.Y36(K),o.Y36(ee,4),o.Y36(o.R0b))},s.\u0275dir=o.lG2({type:s,selectors:[["","cdkVirtualFor","","cdkVirtualForOf",""]],inputs:{cdkVirtualForOf:"cdkVirtualForOf",cdkVirtualForTrackBy:"cdkVirtualForTrackBy",cdkVirtualForTemplate:"cdkVirtualForTemplate",cdkVirtualForTemplateCacheSize:"cdkVirtualForTemplateCacheSize"},features:[o._Bn([{provide:K,useClass:ge}])]}),s})(),Y=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=o.oAB({type:s}),s.\u0275inj=o.cJS({}),s})(),xe=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=o.oAB({type:s}),s.\u0275inj=o.cJS({imports:[F.vT,Y,F.vT,Y]}),s})()}}]);