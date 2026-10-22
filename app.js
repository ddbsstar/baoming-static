const dialog=document.querySelector('#mini-dialog');
let opener;
const homeContent=document.querySelector('.enroll-container');
const nav=document.querySelector('.menu-fix-bottom');
const recordsNav=document.querySelector('#records-nav');
const page=document.createElement('div');page.id='extra-page';homeContent.after(page);
const title='2026年10月24日15:30 成都蓉城VS大连英博海发远征报名';
const items=[
 {title,count:'850/850',status:'已截止'},
 {title:'XX摆渡车乘坐登记表',count:'0/100',status:'进行中'},
 {title:'2026年6月19日 足协杯第四轮 19:30 杭州临平吴越VS大连英博海发',count:'316/500',status:'已截止'},
 {title:'全场拼图摆放志愿者（限大连北看台套票球迷）',count:'357/500',status:'已截止'},
 {title:'温州俱乐部德赛队VS大连英博队远征报名',count:'11/50',status:'已截止'},
 {title:'9月5日vs青岛海牛 回流票 北看台一层',count:'',status:'已截止'}
];
const paths={people:'M8 13c-3 0-5 2-5 5m13-5c3 0 5 2 5 5M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-7a4 4 0 0 1 0 7M5 20v-2a4 4 0 0 1 8 0v2',home:'m3 10 9-8 9 8v11H4V10m5 11v-6h6v6',share:'M4 20c0-8 5-12 12-12V3l6 7-6 6v-5c-6 0-10 3-12 9Z',message:'M3 3h18v15h-7l-4 4v-4H3V3m4 6h.1m4.9 0h.1m4.9 0h.1',ticket:'M4 3h16v5a3 3 0 0 0 0 6v7H4v-7a3 3 0 0 0 0-6V3m6 5v9m4-9v9m-6-6h8m-8 3h8',edit:'M18 3 8 13v4h4L22 7M16 4H3v18h17V11',sound:'M3 9h4l6-5v16l-6-5H3V9m14-2a8 8 0 0 1 0 10m2-13a12 12 0 0 1 0 16',trash:'M4 6h16M9 3h6m-9 3 1 16h10l1-16M10 10v8m4-8v8'};
function icon(name){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]}"/></svg>`}
function showDialog(button){opener=button;dialog.showModal()}
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>showDialog(button)));
document.querySelector('#close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>opener?.focus());
document.querySelector('#home').addEventListener('click',()=>{location.hash='';window.scrollTo({top:0,behavior:'smooth'})});
recordsNav.addEventListener('click',()=>{location.hash='records'});
let currentTab=0;
function renderRecords(){
 document.title='我的记录';nav.hidden=false;
 const labels=['最近浏览','我管理的','我参与的','我关注的'];
 const visible=currentTab===0?items:[];
 page.innerHTML=`<section class="records-page"><div class="record-tabs" role="tablist" aria-label="记录分类">${labels.map((label,i)=>`<button role="tab" aria-selected="${i===currentTab}" class="${i===currentTab?'selected':''}" data-tab="${i}">${label}</button>`).join('')}</div><div class="record-list">${visible.length?visible.map((item,i)=>`<a class="record-card" href="#activity/${i+1}"><img src="assets/record-${i+1}.jpg" alt="${item.title}"><div class="record-info"><div class="record-title">${item.title}</div><div class="record-meta"><span>${item.count?icon('people')+item.count:''}</span><span class="${item.status==='进行中'?'ongoing':'ended'}">${item.status}</span></div></div></a>`).join(''):'<div class="empty-records">暂无记录</div>'}</div><button class="recycle-button">${icon('trash')}回收站</button></section>`;
 page.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{currentTab=Number(b.dataset.tab);renderRecords()});
 page.querySelector('.recycle-button').onclick=()=>{page.querySelector('.record-list').innerHTML='<div class="empty-records">回收站为空</div>';page.querySelector('.recycle-button').hidden=true};
}
function renderDetail(index){
 const item=items[index-1];if(!item){location.hash='records';return}
 document.title=item.title;nav.hidden=true;
 page.innerHTML=`<article class="activity-page"><img class="activity-cover" src="assets/${index===1?'stadium-cover.jpg':`record-${index}.jpg`}" alt="${item.title}"><section class="activity-summary"><h1>${item.title}</h1>${index===1?'<div class="price"><small>¥</small>50</div>':''}<div class="activity-state"><div><span class="status-tag">${item.status}</span>${index===1?'<span class="status-tag">已提交</span>':''}</div><button class="subscribe">订阅 ${icon('sound')}</button></div><div class="activity-meta">${index===1?`<div>${icon('edit')}<span>报名：10/21 19:00 - 10/21 20:00</span></div>`:''}<div>${icon('people')}<span>提交：${item.count||'—'}</span></div></div></section><section class="activity-description">${index===1?`<p>${title}<br>时间：2026年10月24日15:30<br>对阵双方：成都蓉城VS大连英博海发<br>地点：五粮液文化体育中心专业足球场<br>报名须知<br>1、10月24日比赛的远征报名截止时间为：10月21日</p>`:`<p>${item.title}</p>`}</section><footer class="activity-actions"><a href="#records">${icon('home')}<span>主页</span></a><button data-action="share">${icon('share')}<span>分享</span></button><button data-action="message">${icon('message')}<span>留言</span></button><div class="registration-buttons"><button class="ticket-icon" aria-label="我的凭证">${icon('ticket')}</button><button class="view-registration">查看/取消</button></div></footer></article>`;
 page.querySelector('.subscribe').onclick=e=>{e.currentTarget.classList.toggle('subscribed');e.currentTarget.innerHTML=(e.currentTarget.classList.contains('subscribed')?'已订阅':'订阅')+' '+icon('sound')};
 page.querySelector('[data-action="share"]').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);notice('页面链接已复制')}catch{notice('复制浏览器地址即可分享')}};
 page.querySelector('[data-action="message"]').onclick=()=>notice('暂无留言');
 page.querySelector('.ticket-icon').onclick=()=>index===1?openVoucher():notice('暂无凭证');
 page.querySelector('.view-registration').onclick=()=>{if(index===1)location.hash='registration/1';else notice('暂无报名信息')};
}
function notice(text){let toast=document.querySelector('.page-notice');if(toast)toast.remove();toast=document.createElement('div');toast.className='page-notice';toast.setAttribute('role','status');toast.textContent=text;document.body.append(toast);setTimeout(()=>toast.remove(),3500)}
function route(){const hash=location.hash.slice(1);homeContent.hidden=!!hash;page.hidden=!hash;nav.hidden=false;recordsNav.querySelector('img').src=`assets/nav-${hash?'567':'566'}.png`;recordsNav.querySelector('span').classList.toggle('cen-focus',!!hash);document.querySelector('#home img').src=`assets/nav-${hash?'563':'564'}.png`;document.querySelector('#home span').classList.toggle('cen-focus',!hash);if(hash==='registration/1')renderRegistration();else if(hash==='records')renderRecords();else if(hash.startsWith('activity/'))renderDetail(Number(hash.split('/')[1]));else if(hash){location.hash='';return}else document.title='报名工具丨活动接龙统计预约';window.scrollTo(0,0)}

const voucher=document.createElement('dialog');voucher.id='voucher-sheet';voucher.setAttribute('aria-labelledby','voucher-title');
voucher.innerHTML=`<h2 id="voucher-title">我的凭证</h2><a class="voucher-row" href="#registration/1"><span><strong>范慧明</strong><small>2026-10-21 19:10</small></span><span class="voucher-status">未核销 &gt;</span></a><button class="voucher-cancel">取 消</button>`;
document.body.append(voucher);
function openVoucher(){voucher.showModal()}
voucher.querySelector('.voucher-cancel').onclick=()=>voucher.close();
voucher.querySelector('a').onclick=()=>voucher.close();
voucher.addEventListener('click',e=>{if(e.target===voucher){const r=voucher.getBoundingClientRect();if(e.clientY<r.top||e.clientX<r.left||e.clientX>r.right) voucher.close()}});
function renderRegistration(){
 nav.hidden=true;document.title=title;
 page.innerHTML=`<section class="registration-page"><div class="registration-notice"><span class="info-circle">i</span>填写后自动保存在当前浏览器，支持<a href="#registration/1">快速填写</a></div><div class="registration-fields"><h2>提交项目 <em>*</em></h2><div class="registration-product"><div class="product-icon">${icon('edit')}</div><div><strong>成都远征押金</strong><span>￥50</span></div><span class="product-selected">已选择1</span></div><div class="registration-field"><label for="registration-name">姓名 <em>*</em></label><div class="readonly-field"><input id="registration-name" readonly value="范慧明"></div></div><div class="registration-field"><label for="registration-phone">手机号 <em>*</em></label><div class="readonly-field"><input id="registration-phone" type="tel" inputmode="tel" autocomplete="off" maxlength="20" placeholder="请输入手机号"><button class="quick-fill">一键填写</button></div></div><div class="registration-field"><label for="registration-id">身份证号 <em>*</em></label><p class="field-help">支持大陆身份证、港澳居民来往内地通行证、台胞证</p><div class="readonly-field"><input id="registration-id" type="text" autocomplete="off" maxlength="32" placeholder="请输入身份证号"></div></div></div><div class="registration-payment"><div><span>已支付：</span><button class="paid-detail">50元 &gt;</button></div><div><span>非粉丝：</span><span>大恐怖了 &gt;</span></div><div><span>提交：</span><span>2026-10-21 19:10:20</span></div></div><footer class="registration-toolbar"><button class="registration-more">☰ 更 多</button><button class="registration-edit">▣ 保 存</button><button class="registration-number">${icon('ticket')}编号480</button></footer></section>`;
 page.querySelector('.registration-more').onclick=()=>{location.hash='activity/1'};
 const phone=page.querySelector('#registration-phone');
 const identity=page.querySelector('#registration-id');
 const cacheKey='baoming.registration.1.contact.v1';
 function restoreContact(){
  try{const cached=JSON.parse(localStorage.getItem(cacheKey)||'{}');phone.value=typeof cached.phone==='string'?cached.phone:'';identity.value=typeof cached.identity==='string'?cached.identity:'';return true}catch{return false}
 }
 function saveContact(announce=false){
  try{localStorage.setItem(cacheKey,JSON.stringify({phone:phone.value,identity:identity.value}));if(announce)notice('已保存到当前浏览器');return true}catch{notice('浏览器无法保存，请允许本地存储后重试');return false}
 }
 restoreContact();
 phone.addEventListener('input',()=>saveContact());
 identity.addEventListener('input',()=>saveContact());
 page.querySelector('.registration-edit').onclick=()=>saveContact(true);
 page.querySelector('.quick-fill').onclick=()=>notice(restoreContact()?'已填入本机保存的信息':'暂无可读取的本机信息');
 page.querySelector('.paid-detail').onclick=()=>notice('成都远征押金 · 已支付50元');
 page.querySelector('.registration-number').onclick=()=>notice('编号480 · 未核销');
}
window.addEventListener('hashchange',route);route();


document.addEventListener('dblclick',event=>{if(!event.target.closest('input,textarea,[contenteditable]'))event.preventDefault()},{passive:false});

// Block pinch gestures while allowing one-finger scrolling and form interaction.
['gesturestart','gesturechange','gestureend'].forEach(type=>document.addEventListener(type,event=>event.preventDefault(),{passive:false}));
document.addEventListener('touchmove',event=>{if(event.touches.length>1)event.preventDefault()},{passive:false});
