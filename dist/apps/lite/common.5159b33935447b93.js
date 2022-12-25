"use strict";(self.webpackChunklite=self.webpackChunklite||[]).push([[592],{1463:(h,c,e)=>{e.d(c,{k:()=>o});var r=e(2907),i=e(3900),a=e(2722),s=e(8505),l=e(6129),n=e(4004),g=e(262),p=e(4086),f=e(7579),v=e(515),M=e(5963),w=e(8651),A=e(9606),z=e(8507),R=e(2403),O=e(7009),S=e(2178),C=e(6576),E=e(4650);class o{constructor(t,d,u){this.apiService=t,this.webSocketService=d,this.store=u,this.destroy$=new f.x,this.connection$=d.isConnect()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}subscribe(t){this.connection$.pipe((0,i.w)(d=>d?this.wsAccess(t):this.httpAccess(t)),(0,a.R)(this.destroy$)).subscribe()}httpAccess(t){return"devices"===t.api?this.updateDevices(t):"locations"===t.api?this.updateLocations(t):v.E}wsAccess(t){return o.wsAccessMap.get(t.api)?.(this)??v.E}subscribeDevices(){return this.webSocketService.on("me.z-wave.devices",()=>({event:"httpEncapsulatedRequest",data:{url:o.baseApiUrl+o.apiList.devices,method:"GET"},responseEvent:"me.z-wave.devices"})).pipe((0,a.R)(this.destroy$),(0,s.b)(t=>{this.store.dispatch(t instanceof Object?"structureChanged"in t?new w.HS(t.devices,t.structureChanged):new w.HS([t]):new w.aL(t))}))}subscribeLocations(){return this.webSocketService.on("me.z-wave.locations",()=>({event:"httpEncapsulatedRequest",data:{url:o.baseApiUrl+o.apiList.locations,method:"GET"},responseEvent:"me.z-wave.locations"})).pipe((0,a.R)(this.destroy$),(0,s.b)(t=>this.store.dispatch(new z.ae(t))))}updateDevices({api:t,timeBetweenRequests:d}){let u;return(0,M.H)(0,d??3e3).pipe((0,l.z)(()=>this.apiService.send(t,u)),(0,n.U)(({updateTime:y,structureChanged:D,devices:T})=>{this.store.dispatch(new w.HS(T,!u)),u=D?void 0:{params:{since:y}},console.groupEnd()}),(0,g.K)((y,D)=>(console.log("updateDevices",JSON.stringify(y)),D.pipe((0,p.g)(1e3)))))}updateLocations({api:t,timeBetweenRequests:d}){return(0,M.H)(0,d??6e3).pipe((0,l.z)(()=>this.apiService.send(t)),(0,n.U)(u=>{this.store.dispatch(new z.ae(u))}),(0,g.K)((u,y)=>(console.log("updateLocations",JSON.stringify(u)),y.pipe((0,p.g)(1e3)))))}subscribeProfile(){return this.webSocketService.on("me.z-wave.profile",()=>({event:"httpEncapsulatedRequest",data:{url:o.baseApiUrl+o.apiList.profiles,method:"GET"},responseEvent:"me.z-wave.profile"})).pipe((0,a.R)(this.destroy$),(0,s.b)(t=>[t].flat().map(d=>this.store.dispatch(new O.Bc(S.k.profileAdapter(d))))))}subscribeNotifications(){return this.webSocketService.on("me.z-wave.notifications").pipe((0,a.R)(this.destroy$),(0,s.b)(t=>{this.store.dispatch(new C.l(t))}))}}o.apiList={backup:"backup",customicon:"devices",devices:"devices",factory_default:"resetToFactoryDefault",firmwareupdate:"system/webif-access",firstaccess:"system/first-access",hide_devices:"hidedevices",icons:"icons",icons_install:"icons/install",icons_upload:"icons/upload",instances:"instances",ip_address:"system/ip-address",locations:"locations",locations_image:"locations/image",login:"login",logout:"logout",modules:"modules",modules_categories:"modules/categories",modules_transform:"modules/transform",namespaces:"namespaces",notification_channels:"notificationChannels",notification_filtering:"notificationFiltering",notifications:"notifications",oauth2:"oauth2",online_delete:"modules/delete",online_install:"modules/install",online_reset:"modules/reset",online_update:"modules/update",password_reset:"auth/forgotten",ping:"system/time/get",profiles:"profiles",profiles_auth_update:"auth/update",remote_id:"system/remote-id",reorder:"devices/reorder",restore:"restore",session:"session",skins:"skins",skins_active:"skins/active",skins_install:"skins/install",skins_reset:"skins/setToDefault",skins_update:"skins/update",system_info:"system/info",system_reboot:"system/reboot",time:"system/time/get",time_zone:"system/timezone",tokens:"modules/tokens",trust_my_network:"system/trust-my-network",update_device_database:"system/zwave/deviceInfoUpdate",update_zwave_vendors:"system/zwave/vendorsInfoUpdate",wifi_cli:"system/wifiCli/settings",wifi_cli_connection_type:"system/connectionType",zwave_devices:"system/zwave/deviceInfoGet",zwave_vendors:"system/zwave/vendorsInfoGet"},o.baseApiUrl="/ZAutomation/api/v1/",o.wsAccessMap=new Map([["profile",m=>m.subscribeProfile()],["locations",m=>m.subscribeLocations()],["devices",m=>m.subscribeDevices()],["notifications",m=>m.subscribeNotifications()]]),o.\u0275fac=function(t){return new(t||o)(E.LFG(r.s),E.LFG(R.i),E.LFG(A.yh))},o.\u0275prov=E.Yz7({token:o,factory:o.\u0275fac,providedIn:"any"})},2392:(h,c,e)=>{e.d(c,{M:()=>l});var r=e(9606);const i={admin:[1],admin_user:[1],apps:[1],appsLocal:[1],appsOnline:[1],customize:[1],module:[1],devices:[1,2,3],myAccess:[1,2,3],expertView:[1],remoteAccess:[1],devicesInclude:[1],rooms:[1,2,3,4],addRoom:[1],element:[1,2,3,4],eventDelete:[1],configRooms:[1],configRoomsId:[1],network:[1,3],networkConfigId:[1],logout:[1,2,3,4],automation:[1]};var a=e(2178),s=e(4650);let l=(()=>{class n{constructor(p,f,v){this.templateRef=p,this.viewContainer=f,this.store=v}set zWaveSecure(p){const f=this.store.selectSnapshot(a.k.profile).role;i[p].find(v=>v===f)?this.viewContainer.createEmbeddedView(this.templateRef):this.viewContainer.clear()}}return n.\u0275fac=function(p){return new(p||n)(s.Y36(s.Rgc),s.Y36(s.s_b),s.Y36(r.yh))},n.\u0275dir=s.lG2({type:n,selectors:[["","zWaveSecure",""]],inputs:{zWaveSecure:"zWaveSecure"}}),n})()},6651:(h,c,e)=>{e.d(c,{$:()=>a});var r=e(6895),i=e(4650);let a=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=i.oAB({type:s}),s.\u0275inj=i.cJS({imports:[r.ez]}),s})()},5020:(h,c,e)=>{e.d(c,{$:()=>i});const i=new(e(4650).OlP)("ServerStreamService Token")},4151:(h,c,e)=>{e.d(c,{T:()=>a});var r=e(6895),i=e(4650);let a=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=i.oAB({type:s}),s.\u0275inj=i.cJS({imports:[r.ez]}),s})()},1786:(h,c,e)=>{e.d(c,{_:()=>a});var r=e(6895),i=e(4650);let a=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=i.oAB({type:s}),s.\u0275inj=i.cJS({imports:[r.ez]}),s})()}}]);