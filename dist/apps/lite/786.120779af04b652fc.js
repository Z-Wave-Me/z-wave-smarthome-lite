"use strict";(self.webpackChunklite=self.webpackChunklite||[]).push([[786],{5515:(O,b,i)=>{i.d(b,{z:()=>p});var a=i(5e3),t=i(9808);let p=(()=>{class r{constructor(c,v){this.elementRef=c,this.location=v}back(){this.location.back()}}return r.\u0275fac=function(c){return new(c||r)(a.Y36(a.SBq),a.Y36(t.Ye))},r.\u0275dir=a.lG2({type:r,selectors:[["","zWaveBackButton",""]],hostBindings:function(c,v){1&c&&a.NdJ("click",function(){return v.back()})}}),r})()},311:(O,b,i)=>{i.d(b,{g:()=>M,f:()=>f});var a=i(2014),t=i(5e3),p=i(5753),r=i(8923),_=i(5374),c=i(4645),v=i(9808);const C=["*"];let M=(()=>{let s=class{constructor(u){this.mode$=u,this.value="",this.size="m",this.status="default",this.hoverable=!1}get padding(){return this.isEmpty?"none":(0,p.hj)(this.value.valueOf())?"m":"l"}get outputValue(){return(0,p.hj)(this.value.valueOf())&&this.value.valueOf()>99?"99+":String(this.value)}get isEmpty(){return""===this.value}};return s.\u0275fac=function(u){return new(u||s)(t.Y36(_.Au))},s.\u0275cmp=t.Xpm({type:s,selectors:[["tui-badge"]],hostVars:7,hostBindings:function(u,g){1&u&&t.NdJ("$.data-mode.attr",function(){return g.mode$}),2&u&&(t.uIk("data-size",g.size)("data-tui-host-status",g.status)("data-tui-host-padding",g.padding),t.ekj("_hoverable",g.hoverable)("_empty-value",g.isEmpty))},inputs:{value:"value",size:"size",status:"status",hoverable:"hoverable"},features:[t._Bn([c.CV])],ngContentSelectors:C,decls:3,vars:1,consts:[[1,"left-content"]],template:function(u,g){1&u&&(t.F$t(),t.TgZ(0,"span",0),t.Hsn(1),t.qZA(),t._uU(2)),2&u&&(t.xp6(2),t.hij("\n",g.outputValue,"\n"))},styles:["[_nghost-%COMP%]{transition-property:background-color;transition-duration:var(--tui-duration,300ms);transition-timing-function:ease-in-out;--left-content-color:currentColor;position:relative;display:inline-flex;font:var(--tui-font-text-s);align-items:center;justify-content:center;box-sizing:border-box;color:var(--tui-base-01);border-radius:6.25rem;white-space:nowrap;overflow:hidden;vertical-align:middle}[_nghost-%COMP%]:after{transition-property:background;transition-duration:var(--tui-duration,300ms);transition-timing-function:ease-in-out;position:absolute;top:0;left:0;width:100%;height:100%;content:'';box-sizing:border-box;border-radius:inherit;pointer-events:none}._hoverable[_nghost-%COMP%]:active[data-tui-host-status=custom]:after, ._hoverable[_nghost-%COMP%]:hover[data-tui-host-status=custom]:after{background-color:var(--tui-clear)}[data-tui-host-status=primary][_nghost-%COMP%]{background-color:var(--tui-primary);color:var(--tui-primary-text)}[data-tui-host-status=primary]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-primary-hover)}[data-tui-host-status=primary]._hoverable[_nghost-%COMP%]:active{background-color:var(--tui-primary-active)}[data-tui-host-status=error][_nghost-%COMP%]{--left-content-color:var(--tui-error-fill);background-color:var(--tui-error-bg);color:var(--tui-text-01)}[data-tui-host-status=error]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=error]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-error-bg-hover)}[data-tui-host-status=error][data-mode=onDark][_nghost-%COMP%]{background-color:var(--tui-error-bg-night);color:var(--tui-text-01-night)}[data-tui-host-status=error][data-mode=onDark]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=error][data-mode=onDark]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-error-bg-night-hover)}[data-tui-host-status=success][_nghost-%COMP%]{--left-content-color:var(--tui-success-fill);background-color:var(--tui-success-bg);color:var(--tui-text-01)}[data-tui-host-status=success]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=success]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-success-bg-hover)}[data-tui-host-status=success][data-mode=onDark][_nghost-%COMP%]{background-color:var(--tui-success-bg-night);color:var(--tui-text-01-night)}[data-tui-host-status=success][data-mode=onDark]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=success][data-mode=onDark]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-success-bg-night-hover)}[data-tui-host-status=warning][_nghost-%COMP%]{--left-content-color:var(--tui-warning-fill);background-color:var(--tui-warning-bg);color:var(--tui-text-01)}[data-tui-host-status=warning]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=warning]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-warning-bg-hover)}[data-tui-host-status=warning][data-mode=onDark][_nghost-%COMP%]{background-color:var(--tui-warning-bg-night);color:var(--tui-text-01-night)}[data-tui-host-status=warning][data-mode=onDark]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=warning][data-mode=onDark]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-warning-bg-night-hover)}[data-tui-host-status=info][_nghost-%COMP%]{--left-content-color:var(--tui-info-fill);background-color:var(--tui-info-bg);color:var(--tui-text-01)}[data-tui-host-status=info]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=info]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-info-bg-hover)}[data-tui-host-status=info][data-mode=onDark][_nghost-%COMP%]{background-color:var(--tui-info-bg-night);color:var(--tui-text-01-night)}[data-tui-host-status=info][data-mode=onDark]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=info][data-mode=onDark]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-info-bg-night-hover)}[data-tui-host-status=neutral][_nghost-%COMP%]{--left-content-color:var(--tui-neutral-fill);background-color:var(--tui-neutral-bg);color:var(--tui-text-01)}[data-tui-host-status=neutral]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=neutral]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-neutral-bg-hover)}[data-tui-host-status=neutral][data-mode=onDark][_nghost-%COMP%]{background-color:var(--tui-neutral-bg-night);color:var(--tui-text-01-night)}[data-tui-host-status=neutral][data-mode=onDark]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=neutral][data-mode=onDark]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-neutral-bg-night-hover)}[data-tui-host-status=default][_nghost-%COMP%]{background-color:var(--tui-base-06)}[data-tui-host-status=default][_nghost-%COMP%]:not([data-mode])._hoverable:hover{background-color:var(--tui-base-07)}[data-tui-host-status=default][_nghost-%COMP%]:not([data-mode])._hoverable:active{background-color:var(--tui-base-08)}[data-tui-host-status=default][data-mode=onDark][_nghost-%COMP%]{background-color:var(--tui-clear-inverse-hover)}[data-tui-host-status=default][data-mode=onDark]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-clear-inverse-active)}[data-tui-host-status=default][data-mode=onDark]._hoverable[_nghost-%COMP%]:active{background-color:var(--tui-clear-inverse-active)}[data-tui-host-status=default][data-mode=onDark][_nghost-%COMP%]:focus:after{border:2px solid var(--tui-base-01)}[data-tui-host-status=default][data-mode=onLight][_nghost-%COMP%]{background-color:var(--tui-clear);color:var(--tui-text-01)}[data-tui-host-status=default][data-mode=onLight]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-clear-hover)}[data-tui-host-status=default][data-mode=onLight]._hoverable[_nghost-%COMP%]:active{background-color:var(--tui-clear-active)}._hoverable[_nghost-%COMP%]{cursor:pointer}[data-tui-host-padding='m'][_nghost-%COMP%]{padding:0 .5rem}[data-tui-host-padding='m'][data-size='s'][_nghost-%COMP%]{padding:0 .375rem}[data-tui-host-padding='m'][data-size='l'][_nghost-%COMP%]{padding:0 .625rem}[data-tui-host-padding='l'][_nghost-%COMP%]{padding:0 .625rem}[data-tui-host-padding='l'][data-size='s'][_nghost-%COMP%]{padding:0 .5rem}[data-tui-host-padding='l'][data-size='l'][_nghost-%COMP%]{padding:0 .75rem}[data-size='s'][_nghost-%COMP%]{font:var(--tui-font-text-xs);height:1.25rem;min-width:1.25rem}[data-size='s'][_nghost-%COMP%]   .left-content[_ngcontent-%COMP%]:before{width:.25rem;height:.25rem}[data-size='m'][_nghost-%COMP%]{height:var(--tui-height-xs);line-height:var(--tui-height-xs);min-width:var(--tui-height-xs)}[data-size='l'][_nghost-%COMP%]{height:var(--tui-height-s);line-height:var(--tui-height-s);min-width:var(--tui-height-s)}[data-size='l'][_nghost-%COMP%]   .left-content[_ngcontent-%COMP%]:before{margin:0 .5rem 0 0;width:.5rem;height:.5rem}._empty-value[_nghost-%COMP%]   .left-content[_ngcontent-%COMP%]{margin:0 -.25rem}._empty-value[_nghost-%COMP%]   .left-content[_ngcontent-%COMP%]:before{margin:0}.left-content[_ngcontent-%COMP%]{display:none;color:var(--left-content-color);line-height:0}.left-content[_ngcontent-%COMP%]:not(:empty){display:block;margin-left:-.25rem}.left-content[_ngcontent-%COMP%]:not(:empty):before{content:none}[data-tui-host-status=error][_nghost-%COMP%]   .left-content[_ngcontent-%COMP%], [data-tui-host-status=info][_nghost-%COMP%]   .left-content[_ngcontent-%COMP%], [data-tui-host-status=neutral][_nghost-%COMP%]   .left-content[_ngcontent-%COMP%], [data-tui-host-status=success][_nghost-%COMP%]   .left-content[_ngcontent-%COMP%], [data-tui-host-status=warning][_nghost-%COMP%]   .left-content[_ngcontent-%COMP%]{display:block}.left-content[_ngcontent-%COMP%]:before{content:'';display:block;background:currentColor;margin:0 .375rem 0 0;width:.375rem;height:.375rem;border-radius:100%}"],changeDetection:0}),(0,a.gn)([(0,t.IIB)(),(0,r.TH)()],s.prototype,"value",void 0),(0,a.gn)([(0,t.IIB)(),(0,t.pfw)("attr.data-size"),(0,r.TH)()],s.prototype,"size",void 0),(0,a.gn)([(0,t.IIB)(),(0,t.pfw)("attr.data-tui-host-status"),(0,r.TH)()],s.prototype,"status",void 0),(0,a.gn)([(0,t.IIB)(),(0,t.pfw)("class._hoverable"),(0,r.TH)()],s.prototype,"hoverable",void 0),(0,a.gn)([(0,t.pfw)("attr.data-tui-host-padding")],s.prototype,"padding",null),(0,a.gn)([(0,t.pfw)("class._empty-value")],s.prototype,"isEmpty",null),s=(0,a.gn)([(0,a.fM)(0,(0,t.tBr)(_.Au))],s),s})(),f=(()=>{let s=class{};return s.\u0275fac=function(u){return new(u||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[[v.ez]]}),s})()},1813:(O,b,i)=>{i.d(b,{_t:()=>k,Gi:()=>y,d3:()=>B});var a=i(2014),t=i(5e3),p=i(9255),r=i(8923),_=i(6437),c=i(9040),v=i(5374),C=i(4645),M=i(8276),f=i(7819),s=i(9368),m=i(9808),u=i(3075),g=i(9740);const P=["input"];function T(o,l){if(1&o&&t._UZ(0,"div",6),2&o){const e=t.oxw();t.Q6J("content",e.leftContent)}}function D(o,l){if(1&o&&t._UZ(0,"tui-loader",7),2&o){const e=t.oxw();t.Q6J("inheritColor",!0)("size",e.loaderSize)}}function w(o,l){if(1&o){const e=t.EpF();t.TgZ(0,"tui-svg",8),t.NdJ("click",function(d){return t.CHM(e),t.oxw().remove(d)}),t.qZA()}}function E(o,l){if(1&o){const e=t.EpF();t.TgZ(0,"input",9,10),t.NdJ("ngModelChange",function(d){return t.CHM(e),t.oxw().onInput(d)})("blur",function(){return t.CHM(e),t.oxw().onBlur()})("keydown",function(d){return t.CHM(e),t.oxw().onKeyDown(d)}),t.qZA()}if(2&o){const e=t.oxw();t.Q6J("ngModel",e.editedText),t.uIk("maxLength",e.maxLength)}}const k=new RegExp(",|[\\s]");let y=(()=>{let o=class{constructor(e,n){this.elementRef=e,this.mode$=n,this.value="",this.editable=!1,this.allowSpaces=!0,this.separator=",",this.maxLength=null,this.size="m",this.showLoader=!1,this.status="default",this.hoverable=!1,this.removable=!1,this.disabled=!1,this.autoColor=!1,this.leftContent=null,this.edited=new t.vpe,this.editing=!1,this.editedText=null}set input(e){e&&(0,p.NY)(e.nativeElement)}get backgroundColor(){return this.autoColor?(0,s.Z)(this.value):null}get canRemove(){return this.removable&&!this.disabled&&!this.showLoader}get displayText(){return null===this.editedText?this.value:this.editedText}get loaderSize(){return(0,c.Bb)(this.size)?"s":"xs"}get hasIcon(){return this.showLoader||this.removable}edit(e){!this.canEdit||(e.preventDefault(),this.editing=!0,this.editedText=this.value)}remove(e){!this.canRemove||(e.preventDefault(),e.stopPropagation(),this.edited.emit(""))}onInput(e){const n=e.split(this.allowSpaces?this.separator:k);n.length>1?this.save(String(n)):this.editedText=e}onKeyDown(e){switch(e.stopPropagation(),e.key.toLowerCase()){case"enter":e.preventDefault(),this.save(this.editedText||"");break;case"escape":case"esc":e.preventDefault(),this.stopEditing(),(0,p.NY)(this.elementRef.nativeElement)}}onBlur(){null!==this.editedText&&this.save(this.editedText)}get canEdit(){return this.editable&&!this.disabled&&!this.showLoader}stopEditing(){this.editing=!1,this.editedText=null}save(e){this.stopEditing(),this.edited.emit(e.trim())}};return o.\u0275fac=function(e){return new(e||o)(t.Y36(t.SBq),t.Y36(v.Au))},o.\u0275cmp=t.Xpm({type:o,selectors:[["tui-tag"],["a","tuiTag",""]],viewQuery:function(e,n){if(1&e&&t.Gf(P,5,t.SBq),2&e){let d;t.iGM(d=t.CRH())&&(n.input=d.first)}},hostVars:12,hostBindings:function(e,n){1&e&&t.NdJ("$.data-mode.attr",function(){return n.mode$})("keydown.enter",function(h){return n.edit(h)})("keydown.delete",function(h){return n.remove(h)})("keydown.backspace",function(h){return n.remove(h)}),2&e&&(t.uIk("data-size",n.size)("data-tui-host-status",n.status),t.ekj("_hoverable",n.hoverable)("_disabled",n.disabled)("_autocolor",n.autoColor)("_editing",n.editing)("_has-icon",n.hasIcon))},inputs:{value:"value",editable:"editable",allowSpaces:"allowSpaces",separator:"separator",maxLength:"maxLength",size:"size",showLoader:"showLoader",status:"status",hoverable:"hoverable",removable:"removable",disabled:"disabled",autoColor:"autoColor",leftContent:"leftContent"},outputs:{edited:"edited"},features:[t._Bn([C.CV])],decls:7,vars:7,consts:[[1,"tag",3,"dblclick"],["polymorpheus-outlet","","class","left-content",3,"content",4,"ngIf"],["automation-id","tui-tag__text",1,"text"],["class","icon icon_loader",3,"inheritColor","size",4,"ngIf"],["tuiPreventDefault","mousedown","automation-id","tui-tag__remove","src","tuiIconCloseLarge","class","icon",3,"click",4,"ngIf"],["automation-id","tui-tag__edit","type","text","class","edit",3,"ngModel","ngModelChange","blur","keydown",4,"ngIf"],["polymorpheus-outlet","",1,"left-content",3,"content"],[1,"icon","icon_loader",3,"inheritColor","size"],["tuiPreventDefault","mousedown","automation-id","tui-tag__remove","src","tuiIconCloseLarge",1,"icon",3,"click"],["automation-id","tui-tag__edit","type","text",1,"edit",3,"ngModel","ngModelChange","blur","keydown"],["input",""]],template:function(e,n){1&e&&(t.TgZ(0,"div",0),t.NdJ("dblclick",function(h){return n.edit(h)}),t.YNc(1,T,1,1,"div",1),t.TgZ(2,"span",2),t._uU(3),t.qZA(),t.YNc(4,D,1,2,"tui-loader",3),t.YNc(5,w,1,0,"tui-svg",4),t.qZA(),t.YNc(6,E,2,2,"input",5)),2&e&&(t.Udp("background-color",n.backgroundColor),t.xp6(1),t.Q6J("ngIf",n.leftContent),t.xp6(2),t.Oqu(n.displayText),t.xp6(1),t.Q6J("ngIf",n.showLoader),t.xp6(1),t.Q6J("ngIf",n.canRemove),t.xp6(1),t.Q6J("ngIf",n.editing))},directives:[m.O5,g.r1,f.kM,M.P,_.A,u.Fj,u.JJ,u.On],styles:["[_nghost-%COMP%]{transition-property:background;transition-duration:var(--tui-duration,300ms);transition-timing-function:ease-in-out;position:relative;display:inline-block;font:var(--tui-font-text-s);border-radius:var(--tui-radius-s);max-width:100%;cursor:default;outline:0;text-decoration:none}[_nghost-%COMP%]:after{transition-property:background;transition-duration:var(--tui-duration,300ms);transition-timing-function:ease-in-out;position:absolute;top:0;left:0;width:100%;height:100%;content:'';box-sizing:border-box;border-radius:inherit;pointer-events:none}._hoverable[_nghost-%COMP%]:active[data-tui-host-status=custom]:after, ._hoverable[_nghost-%COMP%]:hover[data-tui-host-status=custom]:after{background-color:var(--tui-clear)}[_nghost-%COMP%]:focus:after{border:2px solid var(--tui-focus)}[data-tui-host-status=primary][_nghost-%COMP%]{background-color:var(--tui-primary);color:var(--tui-primary-text)}[data-tui-host-status=primary]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-primary-hover)}[data-tui-host-status=primary]._hoverable[_nghost-%COMP%]:active{background-color:var(--tui-primary-active)}[data-tui-host-status=error][_nghost-%COMP%]{background-color:var(--tui-error-bg);color:var(--tui-text-01)}[data-tui-host-status=error]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=error]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-error-bg-hover)}[data-tui-host-status=error][data-mode=onDark][_nghost-%COMP%]{background-color:var(--tui-error-bg-night);color:var(--tui-text-01-night)}[data-tui-host-status=error][data-mode=onDark]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=error][data-mode=onDark]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-error-bg-night-hover)}[data-tui-host-status=success][_nghost-%COMP%]{background-color:var(--tui-success-bg);color:var(--tui-text-01)}[data-tui-host-status=success]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=success]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-success-bg-hover)}[data-tui-host-status=success][data-mode=onDark][_nghost-%COMP%]{background-color:var(--tui-success-bg-night);color:var(--tui-text-01-night)}[data-tui-host-status=success][data-mode=onDark]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=success][data-mode=onDark]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-success-bg-night-hover)}[data-tui-host-status=warning][_nghost-%COMP%]{background-color:var(--tui-warning-bg);color:var(--tui-text-01)}[data-tui-host-status=warning]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=warning]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-warning-bg-hover)}[data-tui-host-status=warning][data-mode=onDark][_nghost-%COMP%]{background-color:var(--tui-warning-bg-night);color:var(--tui-text-01-night)}[data-tui-host-status=warning][data-mode=onDark]._hoverable[_nghost-%COMP%]:active, [data-tui-host-status=warning][data-mode=onDark]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-warning-bg-night-hover)}[data-tui-host-status=default][_nghost-%COMP%]{color:var(--tui-text-01-night);background-color:var(--tui-base-06)}[data-tui-host-status=default][_nghost-%COMP%]:not([data-mode])._hoverable:hover{background-color:var(--tui-base-07)}[data-tui-host-status=default][_nghost-%COMP%]:not([data-mode])._hoverable:active{background-color:var(--tui-base-08)}[data-tui-host-status=default][data-mode=onDark][_nghost-%COMP%]{color:var(--tui-text-01-night);background-color:var(--tui-clear-inverse)}[data-tui-host-status=default][data-mode=onDark]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-clear-inverse-hover)}[data-tui-host-status=default][data-mode=onDark]._hoverable[_nghost-%COMP%]:active{background-color:var(--tui-clear-inverse-active)}[data-tui-host-status=default][data-mode=onDark][_nghost-%COMP%]:focus:after{border:2px solid var(--tui-base-01)}[data-tui-host-status=default][data-mode=onLight][_nghost-%COMP%]{background-color:var(--tui-clear);color:var(--tui-text-01)}[data-tui-host-status=default][data-mode=onLight]._hoverable[_nghost-%COMP%]:hover{background-color:var(--tui-clear-hover)}[data-tui-host-status=default][data-mode=onLight]._hoverable[_nghost-%COMP%]:active{background-color:var(--tui-clear-active)}._editing[_nghost-%COMP%]{background:0 0!important}._disabled[_nghost-%COMP%]{pointer-events:none;opacity:var(--tui-disabled-opacity)}._hoverable[_nghost-%COMP%]{cursor:pointer}._autocolor[_nghost-%COMP%]{color:var(--tui-text-01)}.text[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:.02em}.tag[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center;border-radius:inherit;white-space:pre}[data-size='s'][_nghost-%COMP%]   .tag[_ngcontent-%COMP%]{font:var(--tui-font-text-xs);height:1.25rem;padding:0 .5rem}[data-size='m'][_nghost-%COMP%]   .tag[_ngcontent-%COMP%]{height:var(--tui-height-xs);padding:0 .5rem}[data-size='l'][_nghost-%COMP%]   .tag[_ngcontent-%COMP%]{height:var(--tui-height-s);padding:0 .75rem}._has-icon[data-size='s'][_nghost-%COMP%]   .tag[_ngcontent-%COMP%]{padding:0 .125rem 0 .75rem;-webkit-padding-start:.75rem;padding-inline-start:.75rem;-webkit-padding-end:.125rem;padding-inline-end:.125rem}._has-icon[data-size='m'][_nghost-%COMP%]   .tag[_ngcontent-%COMP%]{padding:0 0 0 .75rem;-webkit-padding-start:.75rem;padding-inline-start:.75rem;-webkit-padding-end:0;padding-inline-end:0}._has-icon[data-size='l'][_nghost-%COMP%]   .tag[_ngcontent-%COMP%]{padding:0 .25rem 0 .75rem;-webkit-padding-start:.75rem;padding-inline-start:.75rem;-webkit-padding-end:.25rem;padding-inline-end:.25rem}._editing[_nghost-%COMP%]   .tag[_ngcontent-%COMP%]{visibility:hidden}._disabled._has-icon[data-size='m'][_nghost-%COMP%]   .tag[_ngcontent-%COMP%], ._disabled._has-icon[data-size='s'][_nghost-%COMP%]   .tag[_ngcontent-%COMP%]{padding:0 .5rem 0 .75rem;-webkit-padding-start:.75rem;padding-inline-start:.75rem;-webkit-padding-end:.5rem;padding-inline-end:.5rem}._disabled._has-icon[data-size='l'][_nghost-%COMP%]   .tag[_ngcontent-%COMP%]{padding:0 .75rem}.edit[_ngcontent-%COMP%]{padding:0 0 0 .5rem;border:0;border-radius:inherit;background:0 0;font-size:inherit;line-height:inherit;font-weight:inherit;color:inherit;caret-color:currentColor;outline:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;word-break:keep-all;-webkit-text-fill-color:currentColor;position:absolute;top:0;left:0;font:var(--tui-font-text-s);color:var(--tui-text-01);width:100%;box-sizing:border-box;-webkit-padding-start:.5rem;padding-inline-start:.5rem;-webkit-padding-end:0;padding-inline-end:0}.edit[_ngcontent-%COMP%]:-webkit-autofill, .edit[_ngcontent-%COMP%]:-webkit-autofill:focus, .edit[_ngcontent-%COMP%]:-webkit-autofill:hover{border-radius:inherit;color:inherit!important;background-color:transparent!important;-webkit-text-fill-color:var(--tui-text-01)!important;border-color:var(--tui-autofill);-webkit-box-shadow:0 0 0 1000px var(--tui-autofill) inset!important}[data-size='s'][_nghost-%COMP%]   .edit[_ngcontent-%COMP%]{height:1.25rem;line-height:1.25rem}[data-size='m'][_nghost-%COMP%]   .edit[_ngcontent-%COMP%]{height:var(--tui-height-xs);line-height:var(--tui-height-xs)}[data-size='l'][_nghost-%COMP%]   .edit[_ngcontent-%COMP%]{height:var(--tui-height-s);line-height:var(--tui-height-s);padding:0 0 0 .75rem;-webkit-padding-start:.75rem;padding-inline-start:.75rem;-webkit-padding-end:0;padding-inline-end:0}.icon[_ngcontent-%COMP%]{margin:0 0 0 .25rem;-webkit-margin-start:.25rem;margin-inline-start:.25rem;-webkit-margin-end:0;margin-inline-end:0;height:100%}.icon[_ngcontent-%COMP%]:not(.icon_loader){cursor:pointer;pointer-events:all;opacity:var(--tui-disabled-opacity)}.icon[_ngcontent-%COMP%]:hover{opacity:1}.icon_loader[_ngcontent-%COMP%]{width:1rem;height:1rem;margin:0 .25rem}[data-size='s'][_nghost-%COMP%]   .icon_loader[_ngcontent-%COMP%]{margin:0 .375rem 0 .75rem;-webkit-margin-start:.75rem;margin-inline-start:.75rem;-webkit-margin-end:.375rem;margin-inline-end:.375rem;width:.5rem;height:.5rem}[data-size='l'][_nghost-%COMP%]   .icon_loader[_ngcontent-%COMP%]{margin:0 .25rem 0 .5rem;-webkit-margin-start:.5rem;margin-inline-start:.5rem;-webkit-margin-end:.25rem;margin-inline-end:.25rem}.left-content[_ngcontent-%COMP%]{margin:0 .25rem 0 0;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:.25rem;margin-inline-end:.25rem;width:1rem;height:1rem}"],changeDetection:0}),(0,a.gn)([(0,t.IIB)(),(0,r.TH)()],o.prototype,"value",void 0),(0,a.gn)([(0,t.IIB)(),(0,r.TH)()],o.prototype,"editable",void 0),(0,a.gn)([(0,t.IIB)(),(0,r.TH)()],o.prototype,"allowSpaces",void 0),(0,a.gn)([(0,t.IIB)(),(0,r.TH)()],o.prototype,"separator",void 0),(0,a.gn)([(0,t.IIB)(),(0,r.TH)()],o.prototype,"maxLength",void 0),(0,a.gn)([(0,t.IIB)(),(0,t.pfw)("attr.data-size"),(0,r.TH)()],o.prototype,"size",void 0),(0,a.gn)([(0,t.IIB)(),(0,r.TH)()],o.prototype,"showLoader",void 0),(0,a.gn)([(0,t.IIB)(),(0,t.pfw)("attr.data-tui-host-status"),(0,r.TH)()],o.prototype,"status",void 0),(0,a.gn)([(0,t.IIB)(),(0,t.pfw)("class._hoverable"),(0,r.TH)()],o.prototype,"hoverable",void 0),(0,a.gn)([(0,t.IIB)(),(0,r.TH)()],o.prototype,"removable",void 0),(0,a.gn)([(0,t.IIB)(),(0,t.pfw)("class._disabled"),(0,r.TH)()],o.prototype,"disabled",void 0),(0,a.gn)([(0,t.IIB)(),(0,t.pfw)("class._autocolor"),(0,r.TH)()],o.prototype,"autoColor",void 0),(0,a.gn)([(0,t.IIB)(),(0,r.TH)()],o.prototype,"leftContent",void 0),(0,a.gn)([(0,t.r_U)()],o.prototype,"edited",void 0),(0,a.gn)([(0,t.pfw)("class._editing")],o.prototype,"editing",void 0),(0,a.gn)([(0,t.i9L)("input",{read:t.SBq})],o.prototype,"input",null),(0,a.gn)([(0,t.pfw)("class._has-icon")],o.prototype,"hasIcon",null),(0,a.gn)([(0,t.L6J)("keydown.enter",["$event"])],o.prototype,"edit",null),(0,a.gn)([(0,t.L6J)("keydown.delete",["$event"]),(0,t.L6J)("keydown.backspace",["$event"])],o.prototype,"remove",null),o=(0,a.gn)([(0,a.fM)(0,(0,t.tBr)(t.SBq)),(0,a.fM)(1,(0,t.tBr)(v.Au))],o),o})(),B=(()=>{let o=class{};return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[m.ez,u.u5,_.Z,M.E,f.dS,g.wq]]}),o})()}}]);