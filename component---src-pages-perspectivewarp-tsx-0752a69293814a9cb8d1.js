(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{EZyI:function(e,t,n){"use strict";n.r(t);var c=n("KQm4"),a=n("q1tI"),i=n.n(a),r=n("W/yf"),o=n("fdqv"),l=n("8BKa"),s=n("qKvR"),d=n("ufqH"),u=n("LuW/"),g=n("w2tK"),b=n("ZAM1");const p=n.n(b).a;var f={name:"1mb7ed4",styles:"padding:40px;"};t.default=e=>{const{0:t,1:n}=Object(a.useState)([]),{0:b,1:w}=Object(a.useState)([]),{0:h,1:j}=Object(a.useState)(!1),{0:O,1:m}=Object(a.useState)(p),{0:y,1:v}=Object(a.useState)();Object(a.useEffect)(()=>{let e=new Image;return(async()=>{try{await new Promise((t,n)=>{e.onload=e=>{t(null)},e.src=O}),n([]),w([]),v(e)}catch{console.error("something went wrong drawing the image.")}})(),()=>{e.onload=null,n([]),w([]),v(void 0)}},[O]);const k={fill:"#fcba03",r:6,font:"30px serif",fontFill:"#000"},x={...k,fill:"#be2de2"};return Object(s.d)(r.a,null,Object(s.d)("div",{css:Object(s.c)("margin-top:20px;button{margin-top:10px;background-color:",Object(d.b)("0.2",u.a.darkgrey),";outline:none;}p{margin:20px;}")},Object(s.d)("label",{css:f},"Click here to upload an image.",Object(s.d)("input",{type:"file",accept:"image/*",onChange:e=>{let t=e.target.files;t&&t.length>0&&m(URL.createObjectURL(t[0]))}})),Object(s.d)("p",null,"Click to select 4 points identifying a feature to display without perspective, in clockwise direction from top left corner. The feature should be a flat surface, viewed in the image at an angle and/or rotated."),Object(s.d)(l.a,{points:t,clickHandler:e=>{const t=Object(o.a)(e.currentTarget,e);j(!1),0!=b.length&&w([]),n(e=>e.length>=4?[]:[].concat(Object(c.a)(e),[t]))},image:y,style:k}),4===t.length&&Object(s.d)(i.a.Fragment,null,Object(s.d)("p",null,"Now select 4 coresponding points defining the rectangle the selected feature will occupy without perspective."),Object(s.d)(l.a,{points:b,clickHandler:e=>{const t=Object(o.a)(e.currentTarget,e);j(!1),w(e=>{switch(e.length){case 0:return[t];case 1:return[].concat(Object(c.a)(e),[{x:t.x,y:e[0].y}]);case 2:return[].concat(Object(c.a)(e),[{x:e[1].x,y:t.y},{x:e[0].x,y:t.y}]);case 4:default:return[]}})},image:y,style:x})),4===b.length&&Object(s.d)(i.a.Fragment,null,Object(s.d)("p",null,"Click to compute and display the warped image. (May take a few seconds, especially with large images)"),Object(s.d)("button",{onClick:()=>{j(!0)}},"Generate warped")),4===b.length&&y&&h&&Object(s.d)(g.a,{srcPoints:t,targPoints:b,image:y,style:x})))}},fdqv:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return i}));var c=n("q1tI");function a(){const{0:e,1:t}=Object(c.useState)({width:void 0,height:void 0});return Object(c.useEffect)(()=>{function e(){t({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)},[]),e}function i(e,t){let n=e.getBoundingClientRect();return{x:t.clientX-n.left,y:t.clientY-n.top}}}}]);
//# sourceMappingURL=component---src-pages-perspectivewarp-tsx-0752a69293814a9cb8d1.js.map