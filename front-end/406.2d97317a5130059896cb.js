(self.webpackChunklieblings=self.webpackChunklieblings||[]).push([[406],{8406:(e,t,o)=>{"use strict";o.r(t),o.d(t,{ContactModule:()=>b});var r=o(98),a=o(6594),n=o(9061),i=o(2874),c=o.n(i),s=o(6891),l=o(8348),m=o(5472),u=o(3115);let d=(()=>{class e{constructor(e){this._http=e,this._url=u.N.api_url,this.headers=(new m.WM).set("Access-Control-Allow-Origin","*").set("Authorization","my-auth-token").set("Content-Type","application/json")}addContact(e){return this._http.post(this._url+"/contact",e)}getAllContact(){return this._http.get(this._url+"/api/contact")}getAllService(){return this._http.get(this._url+"/service")}getAllTechnics(){return this._http.get(this._url+"/category")}}return e.\u0275fac=function(t){return new(t||e)(l.LFG(m.eN))},e.\u0275prov=l.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var p=o(293);const g=[{path:"",component:(()=>{class e{constructor(e,t){this.fb=e,this.service=t,this.subs=new s.u}ngOnInit(){this.contactForm=this.fb.group({name:[""],email:["",[n.kI.required,n.kI.email]],phone:[""],message:[""]})}ngOnDestroy(){this.subs.dispose()}addContact(){this.subs.add=this.service.addContact(this.contactForm.value).subscribe(e=>{setTimeout(()=>{c().fire("Thank you !","We received your message, we will contact you soon !","success"),this.contactForm.reset()},100)})}}return e.\u0275fac=function(t){return new(t||e)(l.Y36(n.qu),l.Y36(d))},e.\u0275cmp=l.Xpm({type:e,selectors:[["ll-contact"]],decls:52,vars:2,consts:[[1,"about-container"],["id","contactAdmin",1,"pt-20"],[1,"container"],[1,"grid","grid-cols-12","gap-4","lg:gap-8","xxl:gap-16"],[1,"contact__form","col-span-12","lg:col-span-7"],[1,"mb-8"],[3,"formGroup"],[1,"flex","flex-wrap","sm:flex-nowrap","sm:space-x-5","mt-3"],["type","text","placeholder","Your Name","formControlName","name",1,"border","border-gray-200","p-2","px-4","w-full","sm:w-1/2","rounded-sm"],["type","number","placeholder","Your Number","formControlName","phone",1,"border","border-gray-200","p-2","px-4","w-full","sm:w-1/2","rounded-sm","mt-3","sm:mt-0"],["type","email","placeholder","Your Email","formControlName","email",1,"border","border-gray-200","p-2","px-4","w-full","rounded-sm","mt-5"],["cols","10","rows","3","placeholder","Leave your message here ...","formControlName","message",1,"border","border-gray-200","p-3","mt-5","w-full","rounded-sm","mt-5"],[1,"px-5","py-2","text-white","mt-5","rounded","font-medium",2,"background-color","var(--purple)",3,"disabled","click"],[1,"col-span-12","lg:col-span-5","bg-black","bg-opacity-90","text-white","rounded","p-8","xxl:px-16","mt-10","lg:mt-0"],[1,"flex","space-x-4","mt-14"],[1,"flex","pt-1","bg-purple-600","rounded-lg"],[2,"color","var(--purple)"],[1,"flex-1"],["href","callto:125512556523",1,"text-gray-300","font-semibold","hover:text-accent"],["href","callto:125512556523",1,"text-gray-300","font-semibold","hover:text-accent","mt-2","inline-block"],[1,"flex","space-x-4","mt-8"],["href","mailto:mail@example.com",1,"text-gray-300","font-semibold","hover:text-accent"],["href","mailto:mail@example.com",1,"text-gray-300","font-semibold","hover:text-accent","mt-2","inline-block"],[1,"flex","pt-1","rounded-lg"],["target","_blank","href","https://www.google.com/maps/place/40%C2%B011'40.8%22N+105%C2%B019'32.3%22W/@40.194669,-105.3298772,17z/data=!3m1!4b1!4m14!1m7!3m6!1s0x54eab584e432360b:0x1c3bb99243deb742!2sUnited+States!3b1!8m2!3d37.09024!4d-95.712891!3m5!1s0x0:0x55ba4ddb8cd5ed29!7e2!8m2!3d40.1946654!4d-105.3256504",1,"text-gray-300","hover:text-accent","font-semibold"],[1,"col-span-12","mt-5"]],template:function(e,t){1&e&&(l.TgZ(0,"div",0),l.TgZ(1,"div",1),l.TgZ(2,"div",2),l.TgZ(3,"div",3),l.TgZ(4,"div",4),l.TgZ(5,"div",5),l.TgZ(6,"h3"),l._uU(7,"Leave us a message"),l.qZA(),l.TgZ(8,"p"),l._uU(9,"You will receive a response within 24 hours from our team."),l.qZA(),l.qZA(),l.TgZ(10,"form",6),l.TgZ(11,"div",7),l._UZ(12,"input",8),l._UZ(13,"input",9),l.qZA(),l._UZ(14,"input",10),l.TgZ(15,"textarea",11),l._uU(16,"            "),l.qZA(),l.TgZ(17,"button",12),l.NdJ("click",function(){return t.addContact()}),l._uU(18," Send Message "),l.qZA(),l.qZA(),l.qZA(),l.TgZ(19,"div",13),l.TgZ(20,"h3"),l._uU(21,"Contact info"),l.qZA(),l.TgZ(22,"div",14),l.TgZ(23,"div",15),l.TgZ(24,"mat-icon",16),l._uU(25,"settings_phone"),l.qZA(),l.qZA(),l.TgZ(26,"div",17),l.TgZ(27,"a",18),l._uU(28,"+1255 - 1255 - 6523"),l.qZA(),l._UZ(29,"br"),l.TgZ(30,"a",19),l._uU(31,"+1255 - 1255 - 6523"),l.qZA(),l.qZA(),l.qZA(),l.TgZ(32,"div",20),l.TgZ(33,"div",15),l.TgZ(34,"mat-icon",16),l._uU(35,"mail_outline"),l.qZA(),l.qZA(),l.TgZ(36,"div",17),l.TgZ(37,"a",21),l._uU(38,"mail@example.com"),l.qZA(),l._UZ(39,"br"),l.TgZ(40,"a",22),l._uU(41,"mail@example.com"),l.qZA(),l.qZA(),l.qZA(),l.TgZ(42,"div",20),l.TgZ(43,"div",23),l.TgZ(44,"mat-icon",16),l._uU(45,"map"),l.qZA(),l.qZA(),l.TgZ(46,"div",17),l.TgZ(47,"a",24),l._uU(48," Bowery St, New York, "),l._UZ(49,"br"),l._uU(50," NY 10013, USA "),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l._UZ(51,"div",25),l.qZA(),l.qZA(),l.qZA(),l.qZA()),2&e&&(l.xp6(10),l.Q6J("formGroup",t.contactForm),l.xp6(7),l.Q6J("disabled",t.contactForm.pristine||t.contactForm.invalid))},directives:[n._Y,n.JL,n.sg,n.Fj,n.JJ,n.u,n.wV,p.Hw],styles:[".about-container[_ngcontent-%COMP%]{margin-top:20px}"]}),e})()}];let Z=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[a.Bz.forChild(g)],a.Bz]}),e})();var h=o(161);o(838),o(9782),o(8707),o(1012),o(4487),o(8359),o(5639),o(4213);let f=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({}),e})(),b=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[r.ez,Z,h.m,f,m.Ed]]}),e})()}}]);