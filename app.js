const dialog=document.querySelector('#mini-dialog');
let opener;
const homeContent=document.querySelector('.enroll-container');
const nav=document.querySelector('.menu-fix-bottom');
const recordsNav=document.querySelector('#records-nav');
const page=document.createElement('div');page.id='extra-page';homeContent.after(page);
const title='2026年10月24日15:30 成都蓉城VS大连英博海发远征报名';
const activityCopy="2026年10月24日15:30 成都蓉城VS大连英博海发远征报名\n时间：2026年10月24日15:30\n对阵双方：成都蓉城VS大连英博海发\n地点：五粮液文化体育中心专业足球场\n报名须知\n1、10月24日比赛的远征报名截止时间为：10月21日下午20:00。\n2、本场比赛俱乐部为远征球迷免费提供球票，但报名球迷需缴纳50元押金，待比赛结束后按实际到场核销情况返还押金。报名截止后，如报名球迷因个人原因未到场，押金不予返还。\n3、球迷购票采用电子票形式，每个身份证号和手机号只可以购买一张球票。购票信息提交内容与观赛者信息必须一致。1.2米以下儿童免票。四川省身份证号球迷请勿报名。\n4、远征球迷需在俱乐部官方平台报名成功后，由俱乐部为球迷统一购买球票，比赛日当天可在成都蓉城小程序或手机短信查看球票。\n5、进场时需出示身份证原件。\n6、成都赛区要求远征球迷必须坐远端接驳车统一前往球场，集合地点：成都市地铁1号线韦家碾地铁站E口\n集合时间：12:00，12:30准时发车。\n7、未抢到客队远征名额的球迷朋友，可以在22号下午14点到成都蓉城小程序购买主队票，然后统一前往远端集合点乘坐大巴前往球场。\n8、为了大家的安全，无票球迷朋友请勿到场外聚集。";
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
function participantAvatar(i){
 const choice=(i*11)%28;
 if(choice<12)return `<img class="web-avatar" src="assets/avatars/web-${choice}.jpg" alt="头像配图" loading="lazy">`;
 const n=choice-12;return `<span class="wechat-avatar" role="img" aria-label="虚拟微信头像" style="background-position:${(n%4)*100/3}% ${Math.floor(n/4)*100/3}%"></span>`;
}
function renderDetail(index){
 const item=items[index-1];if(!item){location.hash='records';return}
 document.title=item.title;nav.hidden=true;
 page.innerHTML=`<article class="activity-page"><img class="activity-cover" src="assets/${index===1?'stadium-cover.jpg':`record-${index}.jpg`}" alt="${item.title}"><section class="activity-summary"><h1>${item.title}</h1>${index===1?'<div class="price"><small>¥</small>50</div>':''}<div class="activity-state"><div><span class="status-tag">${item.status}</span>${index===1?'<button class="status-tag submitted-shortcut">已提交</button>':''}</div><button class="subscribe">订阅 ${icon('sound')}</button></div><div class="activity-meta">${index===1?`<div>${icon('edit')}<span>报名：10/21 19:00 - 10/21 20:00</span></div>`:''}<div>${icon('people')}<span>提交：${item.count||'—'}</span></div></div></section><section class="activity-description">${index===1?`<p>${activityCopy.replaceAll('\n','<br>')}</p>`:`<p>${item.title}</p>`}</section>${index===1?`<section class="submitted-section" id="submitted-section"><div class="submitted-tabs"><button aria-selected="true">已提交(850)</button></div><div class="submission-subscribe"><span>${icon('sound')}<b>订阅通知</b><small>及时接收报名成功、取消等</small></span><button class="go-subscribe">去订阅 &gt;</button></div><button class="participants-toggle" aria-expanded="false" aria-controls="participants-list">查看参与人列表 <span class="expand-chevron">⌄</span></button><div id="participants-list" hidden><div class="virtual-list-note">虚拟名单 · 仅用于页面展示</div><div class="virtual-participant-rows"></div><button class="load-participants">加载更多</button></div></section>`:''}<footer class="activity-actions"><a href="#records">${icon('home')}<span>主页</span></a><button data-action="share">${icon('share')}<span>分享</span></button><button data-action="message">${icon('message')}<span>留言</span></button><div class="registration-buttons"><button class="ticket-icon" aria-label="我的凭证">${icon('ticket')}</button><button class="view-registration">查看/取消</button></div></footer></article>`;
 if(index===1){
 let displayed=0;
 const loadParticipants=()=>{const end=Math.min(displayed+30,850);let rows='';for(let i=displayed;i<end;i++){const number=(i*317+854)%850+1;const minutes=Math.max(0,40-Math.floor(i/22));const time=`2026-10-21 19:${String(minutes).padStart(2,'0')}`;rows+=`<div class="virtual-participant">${participantAvatar(i)}<div class="virtual-person"><span>**</span><small>${time}</small></div><div class="virtual-state"><span>提交成功</span><small>编号：${number}</small></div></div>`}page.querySelector('.virtual-participant-rows').insertAdjacentHTML('beforeend',rows);displayed=end;page.querySelector('.load-participants').hidden=displayed===850};
 page.querySelector('.load-participants').onclick=loadParticipants;
 loadParticipants();
 page.querySelector('.submitted-shortcut').onclick=()=>page.querySelector('#submitted-section').scrollIntoView({behavior:'smooth',block:'start'});
 page.querySelector('.go-subscribe').onclick=e=>showDialog(e.currentTarget);
 page.querySelector('.participants-toggle').onclick=e=>{const button=e.currentTarget;const expanded=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!expanded));page.querySelector('#participants-list').hidden=expanded;button.hidden=true;page.querySelector('#submitted-section').scrollIntoView({behavior:'smooth',block:'start'})};
 }
 page.querySelector('.subscribe').onclick=e=>{e.currentTarget.classList.toggle('subscribed');e.currentTarget.innerHTML=(e.currentTarget.classList.contains('subscribed')?'已订阅':'订阅')+' '+icon('sound')};
 page.querySelector('[data-action="share"]').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);notice('页面链接已复制')}catch{notice('复制浏览器地址即可分享')}};
 page.querySelector('[data-action="message"]').onclick=()=>notice('暂无留言');
 page.querySelector('.ticket-icon').onclick=()=>index===1?openVoucher():notice('暂无凭证');
 page.querySelector('.view-registration').onclick=()=>{if(index===1)location.hash='registration/1';else notice('暂无报名信息')};
}
function notice(text){let toast=document.querySelector('.page-notice');if(toast)toast.remove();toast=document.createElement('div');toast.className='page-notice';toast.setAttribute('role','status');toast.textContent=text;document.body.append(toast);setTimeout(()=>toast.remove(),3500)}
function route(){const hash=location.hash.slice(1);homeContent.hidden=!!hash;page.hidden=!hash;nav.hidden=false;recordsNav.querySelector('img').src=`assets/nav-${hash?'567':'566'}.png`;recordsNav.querySelector('span').classList.toggle('cen-focus',!!hash);document.querySelector('#home img').src=`assets/nav-${hash?'563':'564'}.png`;document.querySelector('#home span').classList.toggle('cen-focus',!hash);if(hash==='voucher/1')renderTicket();else if(hash==='registration/1')renderRegistration();else if(hash==='records')renderRecords();else if(hash.startsWith('activity/'))renderDetail(Number(hash.split('/')[1]));else if(hash){location.hash='';return}else document.title='报名工具丨活动接龙统计预约';window.scrollTo(0,0)}

const voucher=document.createElement('dialog');voucher.id='voucher-sheet';voucher.setAttribute('aria-labelledby','voucher-title');
voucher.innerHTML=`<h2 id="voucher-title">我的凭证</h2><a class="voucher-row" href="#voucher/1"><span><strong>范慧明</strong><small>2026-10-21 19:40</small></span><span class="voucher-status">未核销 &gt;</span></a><button class="voucher-cancel">取 消</button>`;
document.body.append(voucher);
function openVoucher(){voucher.showModal()}
voucher.querySelector('.voucher-cancel').onclick=()=>voucher.close();
voucher.querySelector('a').onclick=()=>voucher.close();
voucher.addEventListener('click',e=>{if(e.target===voucher){const r=voucher.getBoundingClientRect();if(e.clientY<r.top||e.clientX<r.left||e.clientX>r.right) voucher.close()}});
function renderRegistration(){
 nav.hidden=true;document.title=title;
 page.innerHTML=`<section class="registration-page"><div class="registration-notice"><span class="info-circle">i</span>填写后自动保存在当前浏览器，支持<a href="#registration/1">快速填写</a></div><div class="registration-fields"><h2>提交项目 <em>*</em></h2><div class="registration-product"><div class="product-icon">${icon('edit')}</div><div><strong>成都远征押金</strong><span>￥50</span></div><span class="product-selected">已选择1</span></div><div class="registration-field"><label for="registration-name">姓名 <em>*</em></label><div class="readonly-field"><input id="registration-name" readonly value="范慧明"></div></div><div class="registration-field"><label for="registration-phone">手机号 <em>*</em></label><div class="readonly-field"><input id="registration-phone" type="tel" inputmode="tel" autocomplete="off" maxlength="20" placeholder="请输入手机号"><button class="quick-fill">一键填写</button></div></div><div class="registration-field"><label for="registration-id">身份证号 <em>*</em></label><p class="field-help">支持大陆身份证、港澳居民来往内地通行证、台胞证</p><div class="readonly-field"><input id="registration-id" type="text" autocomplete="off" maxlength="32" placeholder="请输入身份证号"></div></div></div><div class="registration-payment"><div><span>已支付：</span><button class="paid-detail">50元 &gt;</button></div><div><span>非粉丝：</span><span>大恐怖了 &gt;</span></div><div><span>提交：</span><span>2026-10-21 19:40:20</span></div></div><footer class="registration-toolbar"><button class="registration-more">☰ 更 多</button><button class="registration-edit">▣ 保 存</button><button class="registration-number">${icon('ticket')}编号668</button></footer></section>`;
 page.querySelector('.registration-more').onclick=()=>{location.hash='activity/1'};
 const phone=page.querySelector('#registration-phone');
 const identity=page.querySelector('#registration-id');
 const cacheKey='baoming.registration.1.contact.v1';
 function restoreContact(){
  try{const cached=JSON.parse(localStorage.getItem(cacheKey)||'{}');phone.value=typeof cached.phone==='string'?cached.phone:'';identity.value=typeof cached.identity==='string'?cached.identity:'';lockFilledFields();return true}catch{return false}
 }
 function saveContact(announce=false){
  try{localStorage.setItem(cacheKey,JSON.stringify({phone:phone.value,identity:identity.value}));if(announce)notice('已保存到当前浏览器');return true}catch{notice('浏览器无法保存，请允许本地存储后重试');return false}
 }
 function lockFilledFields(){phone.readOnly=!!phone.value.trim();identity.readOnly=!!identity.value.trim()}
 restoreContact();
 phone.addEventListener('input',()=>saveContact());
 identity.addEventListener('input',()=>saveContact());
 phone.addEventListener('blur',()=>{saveContact();phone.readOnly=!!phone.value.trim()});
 identity.addEventListener('blur',()=>{saveContact();identity.readOnly=!!identity.value.trim()});
 page.querySelector('.registration-edit').onclick=()=>{if(saveContact(true))lockFilledFields()};
 page.querySelector('.quick-fill').onclick=()=>{phone.value='';identity.value='';phone.readOnly=false;identity.readOnly=false;saveContact();phone.focus()};
 page.querySelector('.paid-detail').onclick=()=>notice('成都远征押金 · 已支付50元');
 page.querySelector('.registration-number').onclick=()=>notice('编号668 · 未核销');
}

function ticketGeneratedTime(){const d=new Date();const pad=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`}
function renderTicket(){
 nav.hidden=true;document.title=title;
 const generated=ticketGeneratedTime();
 page.innerHTML=`<section class="ticket-page"><article class="ticket-card"><div class="ticket-summary"><h1>${title}</h1><p>参与：范慧明</p><p>已选：成都远征押金 × 1</p><p>费用：50元 <a href="#registration/1">查看 &gt;</a></p><p>提交：2026-10-21 19:40:20</p></div><div class="ticket-divider"><span>${generated}生成</span></div><div class="ticket-validation"><div><img class="ticket-qr-image" src="assets/voucher-qr-668-transparent.png" alt="凭证二维码"><p>该凭证可扫码查看或核销</p></div><div><div class="ticket-number-blank" aria-label="编号668">668</div><p>递增唯一编号</p></div></div></article><button class="save-ticket-image">保存图片</button><div class="ticket-options"><button data-ticket-option="subscribe"><strong>订阅通知</strong><small>不错过提醒</small></button><button data-ticket-option="transfer"><strong>转让名额</strong><small>转好友或他人</small></button><button data-ticket-option="faq"><strong>常见问题</strong><small>查看更多 &gt;</small></button></div></section>`;
 page.querySelector('.save-ticket-image').onclick=()=>saveTicketImage(generated);
 page.querySelector('[data-ticket-option="subscribe"]').onclick=()=>notice('此静态页面暂不支持通知订阅');
 page.querySelector('[data-ticket-option="transfer"]').onclick=()=>notice('此活动不允许转让');
 page.querySelector('[data-ticket-option="faq"]').onclick=()=>notice('报名信息可从费用旁的“查看”进入');
}
async function saveTicketImage(generated){
 const canvas=document.createElement('canvas');canvas.width=1064;canvas.height=1224;
 const ctx=canvas.getContext('2d');if(!ctx){notice('当前浏览器不支持保存图片');return}
 ctx.scale(2,2);ctx.fillStyle='#fff';ctx.fillRect(0,0,532,612);ctx.fillStyle='#333';
 ctx.font='bold 23px sans-serif';
 const textLines=[];let line='';for(const char of title){if(ctx.measureText(line+char).width>470){textLines.push(line);line=char}else line+=char}if(line)textLines.push(line);
 textLines.forEach((text,i)=>ctx.fillText(text,28,48+i*34));
 ctx.font='20px sans-serif';['参与：范慧明','已选：成都远征押金 × 1','费用：50元','提交：2026-10-21 19:40:20'].forEach((text,i)=>ctx.fillText(text,28,150+i*40));
 ctx.strokeStyle='#e6e6e6';ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(0,310);ctx.lineTo(532,310);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#fff';ctx.fillRect(151,295,230,30);ctx.fillStyle='#aaa';ctx.font='16px sans-serif';ctx.textAlign='center';ctx.fillText(generated+'生成',266,316);
 const qr=new Image();qr.src='assets/voucher-qr-668-transparent.png';try{await qr.decode();ctx.drawImage(qr,43,348,180,180)}catch{notice('二维码加载失败，请稍后重试');return}
 ctx.fillStyle='#00ace8';ctx.font='40px sans-serif';ctx.fillText('668',400,451);
 ctx.strokeStyle='#00ace8';ctx.lineWidth=4;ctx.beginPath();ctx.arc(400,438,65,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#333';ctx.font='18px sans-serif';ctx.fillText('该凭证可扫码查看或核销',133,568);ctx.fillText('递增唯一编号',400,568);
 const link=document.createElement('a');link.download='我的凭证.png';link.href=canvas.toDataURL('image/png');document.body.append(link);link.click();link.remove();
}
window.addEventListener('hashchange',route);route();



document.addEventListener('dblclick',event=>{if(!event.target.closest('input,textarea,[contenteditable]'))event.preventDefault()},{passive:false});

// Block pinch gestures while allowing one-finger scrolling and form interaction.
['gesturestart','gesturechange','gestureend'].forEach(type=>document.addEventListener(type,event=>event.preventDefault(),{passive:false}));
document.addEventListener('touchmove',event=>{if(event.touches.length>1)event.preventDefault()},{passive:false});
