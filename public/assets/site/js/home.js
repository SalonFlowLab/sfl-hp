/* トップページFV：業務の断片が集まり、ロゴが描かれ、ダッシュボードが組み上がる演出（prefers-reduced-motion では最終状態を表示） */
(function(){
var NAVY='#103A71',BLUE='#1E88E5',GOLD='#C99A1A',NS='http://www.w3.org/2000/svg';
var track=document.getElementById('track'),stage=document.getElementById('stage'),scene=document.getElementById('scene');
var ct=document.getElementById('ct'),cb=document.getElementById('cb'),vt=document.getElementById('vtext'),vp=document.getElementById('vp'),copy=document.getElementById('copy');
var playBtn=document.getElementById('play'),playLabel=document.getElementById('playlabel');
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var W=0,H=0,mobile=false,cur=0,S={};
function ease(t){t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)}
function cl(t){return Math.max(0,Math.min(1,t))}
function lerp(a,b,t){return a+(b-a)*t}
function mk(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);(p||scene).appendChild(e);return e}
function mix(c1,c2,t){var a=[parseInt(c1.slice(1,3),16),parseInt(c1.slice(3,5),16),parseInt(c1.slice(5,7),16)],b=[parseInt(c2.slice(1,3),16),parseInt(c2.slice(3,5),16),parseInt(c2.slice(5,7),16)];return 'rgb('+a.map(function(x,i){return Math.round(lerp(x,b[i],t))}).join(',')+')'}
var TEXT=['バラバラの仕事を、','ひとつに。'];

/* ---------- 業務の断片が集まり、ロゴが描かれる ---------- */
var LG={"blue_main": "M141.7 38.7 L139.7 39.5 L137.3 41.0 L132.8 45.2 L130.0 48.7 L127.0 54.3 L125.0 59.8 L124.8 61.5 L124.0 64.5 L123.8 74.0 L124.2 77.8 L124.8 79.8 L124.8 80.8 L126.5 86.2 L126.8 86.5 L128.0 90.3 L132.0 98.0 L135.3 103.0 L138.8 107.3 L147.5 116.8 L153.7 123.0 L156.7 126.8 L159.7 131.7 L162.8 138.8 L163.3 141.2 L164.0 142.7 L164.8 146.8 L165.2 152.7 L165.2 157.8 L164.8 161.8 L164.3 163.3 L164.0 166.2 L162.7 171.0 L161.0 174.8 L160.8 175.8 L159.2 178.7 L158.8 179.7 L154.5 185.8 L150.7 189.8 L147.3 192.5 L141.3 196.2 L137.0 198.0 L132.3 199.3 L130.3 199.5 L128.0 200.2 L123.0 200.5 L115.5 200.2 L112.8 199.5 L110.8 199.3 L104.7 197.3 L99.3 194.8 L94.5 192.0 L90.8 189.2 L87.7 186.0 L83.0 180.2 L79.2 173.0 L78.2 170.3 L77.8 168.5 L77.0 166.3 L77.0 165.3 L75.8 159.8 L75.7 152.7 L76.3 146.8 L77.0 143.7 L80.0 135.7 L83.0 130.5 L85.0 127.8 L90.0 122.7 L95.0 119.2 L100.0 117.0 L101.2 116.8 L102.8 116.2 L104.8 115.8 L109.8 115.8 L112.5 116.2 L115.3 117.0 L118.2 118.3 L119.7 119.5 L120.5 119.8 L123.8 123.5 L124.0 124.2 L125.3 126.0 L126.7 126.2 L127.5 125.5 L127.8 124.5 L126.7 122.0 L124.8 119.5 L122.7 117.3 L120.2 115.5 L119.3 115.3 L115.0 113.3 L109.7 112.2 L103.3 112.2 L98.7 113.2 L93.2 115.2 L90.8 116.3 L86.0 119.7 L82.2 123.2 L79.2 126.5 L76.2 130.8 L74.0 135.2 L72.2 139.8 L70.8 145.8 L70.5 151.5 L70.8 160.0 L72.2 166.3 L72.8 167.8 L73.2 169.5 L73.8 170.7 L74.2 172.2 L77.2 178.3 L81.0 184.0 L83.2 186.7 L87.5 191.0 L91.0 193.8 L95.5 196.8 L99.7 199.0 L103.7 200.7 L111.0 202.8 L118.7 203.8 L123.3 203.8 L130.7 203.0 L136.2 201.7 L139.0 200.7 L143.3 198.7 L148.2 195.8 L151.2 193.5 L156.2 188.7 L158.2 186.3 L161.7 181.0 L163.7 177.2 L164.0 175.8 L164.7 174.8 L165.7 172.2 L167.7 164.8 L167.7 163.5 L168.2 161.0 L168.3 150.3 L167.7 145.2 L166.8 142.8 L166.7 141.0 L166.2 140.2 L166.2 139.5 L166.5 139.2 L167.8 140.5 L168.2 141.8 L168.8 142.8 L169.2 144.3 L169.8 145.3 L171.8 151.3 L172.2 153.8 L172.8 156.0 L173.5 162.7 L173.5 167.5 L172.8 175.5 L172.0 179.7 L171.3 181.5 L169.8 188.0 L169.0 189.7 L168.7 191.2 L168.2 191.8 L167.7 193.5 L164.5 199.0 L161.3 202.8 L156.0 207.7 L152.3 210.0 L148.0 211.5 L146.3 212.5 L146.3 213.3 L146.8 213.8 L148.7 213.8 L152.7 213.0 L154.8 212.2 L159.7 209.7 L163.3 207.2 L165.2 205.7 L169.7 201.0 L172.7 197.2 L174.5 194.2 L178.8 186.0 L178.8 185.5 L179.8 183.7 L180.0 182.7 L182.8 175.0 L183.0 173.5 L183.5 172.5 L184.8 167.0 L185.8 161.5 L185.8 159.7 L186.5 154.7 L186.5 150.0 L185.7 143.0 L184.5 138.5 L181.7 131.8 L178.5 126.7 L173.0 120.0 L168.8 115.8 L163.0 110.5 L154.2 103.0 L145.5 94.2 L144.5 92.7 L143.2 91.3 L140.2 87.0 L138.0 83.3 L136.0 79.2 L134.0 72.5 L133.3 68.0 L133.3 61.5 L133.7 58.2 L134.8 52.7 L135.5 51.3 L136.2 49.0 L137.8 45.5 L139.0 43.7 L142.5 39.7 L142.5 38.7Z", "blue_dot": "M78.5 92.0 L76.3 94.0 L75.2 95.8 L74.7 98.2 L75.0 101.0 L76.5 103.3 L79.2 105.0 L80.8 105.3 L83.0 105.3 L84.3 105.0 L86.2 103.8 L87.5 102.5 L88.2 101.3 L88.8 98.8 L88.7 96.8 L88.2 95.5 L87.2 94.0 L85.2 92.0 L83.2 91.7 L80.3 91.7Z", "gold_s": "M204.2 15.2 L197.5 15.3 L192.3 16.3 L190.3 17.0 L184.5 19.7 L181.3 21.7 L177.8 24.5 L173.3 29.0 L169.0 35.0 L167.2 38.2 L165.2 42.3 L164.8 43.7 L164.2 44.7 L163.2 47.7 L163.2 48.3 L162.0 52.2 L162.0 53.3 L161.2 57.5 L161.0 65.8 L162.0 73.3 L164.2 80.5 L167.0 86.7 L167.8 87.7 L169.0 90.0 L171.0 92.3 L171.8 94.0 L177.0 100.0 L179.7 102.7 L193.3 114.7 L202.0 123.8 L206.0 129.7 L206.2 130.3 L207.8 132.8 L209.8 137.5 L211.8 144.5 L212.2 147.5 L212.2 154.3 L211.8 158.3 L210.7 164.3 L207.7 173.2 L204.8 179.0 L200.8 185.0 L197.0 189.5 L192.2 194.0 L189.0 196.3 L188.8 196.8 L189.3 197.5 L193.0 195.8 L193.5 195.3 L198.0 192.8 L204.8 187.5 L209.8 182.3 L215.3 175.2 L219.8 167.0 L222.8 158.3 L224.0 150.8 L224.0 144.7 L223.7 141.5 L223.0 139.2 L222.7 136.5 L221.5 132.8 L218.7 126.7 L214.3 119.7 L211.8 116.3 L207.7 111.5 L190.3 94.7 L188.8 92.5 L187.3 91.2 L185.8 89.2 L182.0 83.0 L181.7 81.7 L180.0 78.3 L178.0 72.2 L177.7 70.0 L177.0 68.0 L176.7 64.5 L176.2 62.3 L176.0 53.7 L177.0 47.2 L178.2 42.5 L180.2 36.7 L180.5 36.3 L181.0 34.5 L182.0 32.5 L184.3 29.0 L187.0 25.7 L190.7 22.3 L194.8 20.0 L200.0 18.7 L205.7 18.7 L208.2 19.2 L212.0 20.3 L217.0 23.0 L221.2 26.3 L223.8 29.0 L226.7 32.8 L228.2 36.0 L228.8 36.8 L231.0 42.7 L231.2 44.2 L231.8 46.2 L232.2 49.5 L232.2 56.3 L231.8 59.2 L230.5 64.2 L229.5 67.0 L227.5 71.0 L224.5 75.2 L221.2 78.5 L221.2 79.7 L221.5 80.0 L222.7 80.2 L224.7 78.8 L227.5 75.7 L229.8 72.2 L231.3 69.2 L232.8 65.2 L233.7 62.2 L234.7 55.7 L234.5 47.2 L233.0 40.5 L230.7 34.5 L226.8 28.5 L224.7 25.8 L221.2 22.5 L217.7 20.0 L213.3 17.7 L211.2 16.8 L207.2 15.7Z", "gold_plus": "M251.2 75.8 L250.3 76.5 L250.0 77.3 L250.0 95.8 L249.3 96.5 L232.7 96.5 L231.5 97.3 L231.3 98.2 L231.7 98.8 L232.5 99.3 L249.2 99.2 L249.8 99.7 L250.2 102.2 L250.0 117.8 L250.8 119.0 L251.7 119.2 L252.7 118.5 L253.0 117.7 L253.0 100.0 L253.7 99.3 L254.5 99.2 L270.2 99.3 L271.5 98.5 L271.5 97.3 L270.5 96.5 L253.5 96.5 L253.0 96.0 L253.0 77.7 L252.5 76.3 L251.7 75.8Z", "blue_skel": "M126.2 124.7 L125.3 123.0 L124.2 121.3 L122.7 119.7 L121.0 118.3 L119.3 117.0 L117.7 116.3 L116.0 115.5 L114.3 115.0 L112.7 114.5 L111.0 114.3 L109.3 114.2 L107.7 114.0 L106.0 114.0 L104.3 114.0 L102.7 114.3 L101.0 114.7 L99.3 115.2 L97.7 115.7 L96.0 116.3 L94.3 117.2 L92.7 118.0 L91.0 119.0 L89.3 120.2 L87.7 121.5 L86.0 123.0 L84.3 124.7 L82.8 126.3 L81.7 128.0 L80.3 129.7 L79.2 131.3 L78.2 133.0 L77.5 134.7 L76.7 136.3 L76.0 138.0 L75.3 139.7 L74.7 141.3 L74.3 143.0 L74.0 144.7 L73.7 146.3 L73.3 148.0 L73.3 149.7 L73.2 151.3 L73.2 153.0 L73.2 154.7 L73.2 156.3 L73.3 158.0 L73.5 159.7 L73.7 161.3 L74.0 163.0 L74.3 164.7 L74.8 166.3 L75.2 168.0 L75.7 169.7 L76.3 171.3 L77.0 173.0 L77.7 174.7 L78.5 176.3 L79.5 178.0 L80.5 179.7 L81.5 181.3 L82.8 183.0 L84.0 184.7 L85.5 186.3 L87.2 188.0 L88.8 189.7 L90.5 191.2 L92.2 192.5 L93.8 193.5 L95.5 194.7 L97.2 195.7 L98.8 196.5 L100.5 197.3 L102.2 198.0 L103.8 198.7 L105.5 199.3 L107.2 200.0 L108.8 200.5 L110.5 200.8 L112.2 201.2 L113.8 201.5 L115.5 201.7 L117.2 201.8 L118.8 202.0 L120.5 202.2 L122.2 202.0 L123.8 202.0 L125.5 201.8 L127.2 201.7 L128.8 201.5 L130.5 201.2 L132.2 200.8 L133.8 200.5 L135.5 200.0 L137.2 199.5 L138.8 198.8 L140.5 198.2 L142.2 197.3 L143.8 196.5 L145.5 195.5 L147.2 194.5 L148.8 193.3 L150.5 192.0 L152.2 190.5 L153.8 188.8 L155.3 187.2 L156.8 185.5 L158.0 183.8 L159.0 182.2 L160.0 180.5 L161.0 178.8 L161.8 177.2 L162.5 175.5 L163.2 173.8 L163.8 172.2 L164.3 170.5 L164.8 168.8 L165.3 167.2 L165.7 165.5 L166.0 163.8 L166.2 162.2 L166.5 160.5 L166.7 158.8 L166.7 157.2 L166.7 155.5 L166.7 153.8 L166.7 152.2 L166.5 150.5 L166.3 148.8 L166.2 147.2 L166.0 145.5 L165.5 143.8 L165.3 142.2 L164.8 140.5 L164.7 138.8 L164.8 137.2 L166.5 135.5 L168.2 133.8 L169.8 132.2 L169.0 130.5 L168.0 128.8 L167.0 127.2 L166.0 125.5 L164.7 123.8 L163.3 122.2 L161.8 120.5 L160.3 118.8 L158.8 117.2 L157.2 115.7 L155.5 114.2 L153.8 112.7 L152.2 111.0 L150.5 109.3 L148.8 107.7 L147.2 106.0 L145.5 104.3 L144.0 102.7 L142.5 101.0 L141.2 99.3 L139.8 97.7 L138.5 96.0 L137.3 94.3 L136.3 92.7 L135.3 91.0 L134.3 89.3 L133.5 87.7 L132.7 86.0 L132.0 84.3 L131.3 82.7 L130.7 81.0 L130.2 79.3 L129.7 77.7 L129.3 76.0 L129.0 74.3 L128.7 72.7 L128.7 71.0 L128.7 69.3 L128.8 67.7 L129.0 66.0 L129.2 64.3 L129.3 62.7 L129.5 61.0 L129.8 59.3 L130.2 57.7 L130.7 56.0 L131.0 54.3 L131.7 52.7 L132.3 51.0 L133.3 49.3 L134.2 47.7 L135.2 46.0 L136.5 44.3 L137.8 42.7 L139.5 41.0 L141.2 39.8 L142.2 39.0", "gold_skel": "M189.2 197.0 L190.8 196.0 L192.5 194.8 L194.2 193.7 L195.8 192.5 L197.5 191.2 L199.0 189.8 L200.5 188.3 L202.0 186.8 L203.5 185.3 L204.8 183.7 L206.2 182.0 L207.3 180.3 L208.3 178.7 L209.5 177.0 L210.5 175.3 L211.3 173.7 L212.2 172.0 L213.0 170.3 L213.7 168.7 L214.3 167.0 L214.8 165.3 L215.3 163.7 L216.0 162.0 L216.3 160.3 L216.7 158.7 L216.8 157.0 L217.2 155.3 L217.3 153.7 L217.5 152.0 L217.7 150.3 L217.8 148.7 L217.8 147.0 L217.7 145.3 L217.5 143.7 L217.3 142.0 L217.0 140.3 L216.7 138.7 L216.0 137.0 L215.5 135.3 L214.8 133.7 L214.2 132.0 L213.3 130.3 L212.5 128.7 L211.5 127.0 L210.5 125.3 L209.3 123.7 L208.2 122.0 L207.0 120.3 L205.7 118.7 L204.2 117.0 L202.7 115.3 L201.0 113.7 L199.3 112.0 L197.7 110.3 L196.0 108.8 L194.3 107.2 L192.7 105.7 L191.0 104.2 L189.3 102.7 L187.7 101.2 L186.0 99.5 L184.3 97.8 L182.8 96.2 L181.3 94.5 L180.0 92.8 L178.7 91.2 L177.5 89.5 L176.5 87.8 L175.7 86.2 L174.7 84.5 L174.0 82.8 L173.2 81.2 L172.5 79.5 L171.8 77.8 L171.3 76.2 L170.7 74.5 L170.3 72.8 L170.0 71.2 L169.5 69.5 L169.3 67.8 L169.0 66.2 L168.8 64.5 L168.7 62.8 L168.8 61.2 L169.0 59.5 L169.2 57.8 L169.3 56.2 L169.5 54.5 L169.8 52.8 L170.0 51.2 L170.3 49.5 L170.7 47.8 L171.2 46.2 L171.7 44.5 L172.2 42.8 L172.8 41.2 L173.3 39.5 L174.2 37.8 L175.0 36.2 L175.8 34.5 L176.8 32.8 L177.8 31.2 L179.0 29.5 L180.3 27.8 L181.7 26.3 L183.2 24.7 L184.8 23.2 L186.5 22.0 L188.2 20.8 L189.8 19.8 L191.5 19.0 L193.2 18.3 L194.8 17.8 L196.5 17.5 L198.2 17.2 L199.8 17.0 L201.5 16.8 L203.2 17.0 L204.8 17.2 L206.5 17.3 L208.2 17.7 L209.8 18.0 L211.5 18.7 L213.2 19.3 L214.8 20.2 L216.5 21.0 L218.2 22.2 L219.8 23.3 L221.5 24.8 L223.2 26.3 L224.7 28.0 L226.0 29.7 L227.2 31.3 L228.2 33.0 L229.0 34.7 L230.0 36.3 L230.7 38.0 L231.3 39.7 L231.8 41.3 L232.2 43.0 L232.7 44.7 L232.8 46.3 L233.2 48.0 L233.3 49.7 L233.3 51.3 L233.3 53.0 L233.3 54.7 L233.3 56.3 L233.0 58.0 L232.8 59.7 L232.5 61.3 L232.0 63.0 L231.5 64.7 L231.0 66.3 L230.3 68.0 L229.5 69.7 L228.7 71.3 L227.7 73.0 L226.5 74.7 L225.2 76.3 L223.5 78.0 L222.2 79.2", "plus_c": [251.5, 97.58333333333333, 40.333333333333336, 43.5], "dot": [81.83333333333334, 98.58333333333334, 7.166666666666667]};
function pts(d){var a=[],re=/(-?\d+\.?\d*) (-?\d+\.?\d*)/g,m;while((m=re.exec(d)))a.push([+m[1],+m[2]]);return a}
function dashPath(p,w,parent){var e=mk('path',{d:p,pathLength:1,fill:'none',stroke:'#fff','stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round'},parent);e.style.strokeDasharray='1 1';e.style.strokeDashoffset='1';return e}
function maskOf(id,defs){return mk('mask',{id:id,maskUnits:'userSpaceOnUse',x:0,y:0,width:334,height:259},defs)}
function setD(e,v){e.style.strokeDashoffset=String(1-v)}
var LABELS=['顧客','案件','連絡','予定','売上','資料','申請'];
var SCAT=[[.12,.30],[.30,.72],[.46,.16],[.62,.78],[.80,.26],[.88,.66],[.20,.52]];
var EXTRA=[[.08,.62],[.24,.16],[.38,.56],[.52,.30],[.68,.60],[.82,.14],[.92,.40],[.56,.88],[.14,.84]];
function makeLogo(withChips){return{
 build:function(){
  var sc=(H*(mobile?.40:.50))/259,tx=W/2-167*sc,ty=H*(mobile?.10:.06)-12*sc;
  S.sc=sc;S.tx=tx;S.ty=ty;
  var defs=mk('defs',{});
  var rg=mk('radialGradient',{id:'glow'},defs);
  mk('stop',{offset:'0','stop-color':GOLD,'stop-opacity':'.32'},rg);mk('stop',{offset:'.55','stop-color':GOLD,'stop-opacity':'.10'},rg);mk('stop',{offset:'1','stop-color':GOLD,'stop-opacity':'0'},rg);
  var mBl=maskOf('mBl',defs),mGo=maskOf('mGo',defs),mPl=maskOf('mPl',defs);
  S.mA=dashPath(LG.blue_skel,26,mBl);S.mB=dashPath('M163 133 C188 150 192 178 172 200 S150 212 146 213',36,mBl);
  S.mG=dashPath(LG.gold_skel,36,mGo);S.mP1=dashPath('M251.5 74 L251.5 121',12,mPl);S.mP2=dashPath('M229 97.6 L274 97.6',12,mPl);
  S.gl=mk('circle',{cx:tx+166*sc,cy:ty+122*sc,r:Math.min(W,H)*.22,fill:'url(#glow)',opacity:0});
  S.ring=mk('circle',{cx:tx+166*sc,cy:ty+122*sc,r:14,fill:'none',stroke:GOLD,'stroke-width':2,opacity:0});
  var root=mk('g',{transform:'translate('+tx+' '+ty+') scale('+sc+')'});
  S.dot=mk('path',{d:LG.blue_dot,fill:BLUE,'fill-rule':'evenodd'},root);
  var gB=mk('g',{mask:'url(#mBl)'},root);mk('path',{d:LG.blue_main,fill:BLUE,'fill-rule':'evenodd'},gB);
  var gG=mk('g',{mask:'url(#mGo)'},root);mk('path',{d:LG.gold_s,fill:GOLD,'fill-rule':'evenodd'},gG);
  var gP=mk('g',{mask:'url(#mPl)'},root);mk('path',{d:LG.gold_plus,fill:GOLD,'fill-rule':'evenodd'},gP);
  S.txt=mk('text',{x:167,y:243,'text-anchor':'middle','font-size':27,textLength:293,lengthAdjust:'spacingAndGlyphs',fill:'#333333','font-family':'"Times New Roman","Noto Serif JP",Georgia,serif','font-weight':500,opacity:0},root);
  S.txt.textContent='SALON FLOW LAB.';
  if(withChips){
    var pa=pts(LG.blue_skel),pg=pts(LG.gold_skel);
    S.chips=LABELS.map(function(t,i){
      var blue=i<4,arr=blue?pa:pg,f=blue?[.10,.35,.60,.85][i]:[.25,.55,.85][i-4];
      var q=arr[Math.min(arr.length-1,Math.round(f*(arr.length-1)))];
      var t0=blue?(.44+f*.14):(.60+f*.16);
      var g=mk('g',{}),w=t.length*14+26;
      mk('rect',{x:-w/2,y:-14,width:w,height:28,rx:14,fill:'#fff',stroke:'#E3DDD1','stroke-width':1.5},g);
      var x=mk('text',{x:0,y:1,'text-anchor':'middle','dominant-baseline':'central','font-size':13,'font-weight':700,fill:NAVY,'font-family':'Noto Sans JP,sans-serif'},g);x.textContent=t;
      g._sp=SCAT[i];g._tx=tx+q[0]*sc;g._ty=ty+q[1]*sc;g._t0=t0;g._blue=blue;return g});
    var cx0=tx+166*sc,cy0=ty+122*sc;S.cx0=cx0;S.cy0=cy0;
    S.stk=[];
    S.ex=EXTRA.map(function(f){var c=mk('circle',{r:mobile?3:4,fill:'rgba(16,58,113,.35)'});c._p=f;return c});
  }
 },
 render:function(p,E){
  var k=ease((p-.40)/.05),dx=LG.dot[0],dy=LG.dot[1];
  S.dot.setAttribute('transform','translate('+dx+' '+dy+') scale('+k+') translate('+(-dx)+' '+(-dy)+')');
  setD(S.mA,ease((p-.44)/.14));setD(S.mB,ease((p-.57)/.08));setD(S.mG,ease((p-.60)/.16));
  setD(S.mP1,ease((p-.76)/.04));setD(S.mP2,ease((p-.79)/.04));
  S.txt.setAttribute('opacity',String(ease((p-.80)/.08)));
  S.gl.setAttribute('opacity',String(E));S.ring.setAttribute('opacity',String(E*.45));S.ring.setAttribute('r',String(14+34*E));
  if(S.chips){
    var appear=ease((p-.26)/.06);
    S.chips.forEach(function(g){
      var m=ease((p-(g._t0-.13))/.13),sx=W*g._sp[0],sy=H*g._sp[1];
      var x=lerp(sx,g._tx,m),y=lerp(sy,g._ty,m),sc2=1-.55*m;
      g.setAttribute('transform','translate('+x+' '+y+') scale('+sc2+')');
      g.setAttribute('opacity',String(appear*(1-ease((m-.7)/.3))));
    });
    var R=Math.hypot(W,H)*.55;
    S.stk.forEach(function(l,i){
      var m=cl((p-.30-(i%7)*.012)/.50),e2=ease(m),head=lerp(R*l._d,R*.07,e2),tail=head+R*.22*(1-e2)+10,ca=Math.cos(l._a),sa=Math.sin(l._a);
      l.setAttribute('x1',S.cx0+ca*head);l.setAttribute('y1',S.cy0+sa*head);l.setAttribute('x2',S.cx0+ca*tail);l.setAttribute('y2',S.cy0+sa*tail);
      l.setAttribute('opacity',String(.5*Math.sin(Math.PI*m)));
    });
    S.ex.forEach(function(c,i){
      var f=c._p,px=W*f[0],py=H*f[1],m=ease((p-.44-i*.012)/.16);
      c.setAttribute('cx',lerp(px,S.tx+166*S.sc,m));c.setAttribute('cy',lerp(py,S.ty+122*S.sc,m));
      c.setAttribute('opacity',String(appear*(1-ease((m-.6)/.4))));
    });
  }
 }
}}
var V=makeLogo(true);


/* ---------- 第2幕：ダッシュボード ---------- */
var vis=document.getElementById('vis'),dashEl=document.getElementById('dash'),tiltEl=document.getElementById('tilt'),winEl=document.getElementById('win'),kpisEl=document.getElementById('kpis'),capEl=document.getElementById('cap'),glowEl=document.getElementById('glow'),linksEl=document.getElementById('links');
var PN=[1,2,3,4].map(function(i){return document.getElementById('p'+i)});
var h1El=copy.querySelector('h1'),subEl=copy.querySelector('.sub'),btnEl=copy.querySelector('.btn');
var DF=[[14,96],[316,96],[14,248],[316,248]],DS=[[-60,40,-900,-14],[420,30,-1100,12],[-40,260,-1000,10],[430,280,-1200,-12]];
var dln=[];
[['M155 244 L465 244'],['M310 100 L310 396']].forEach(function(d){var q=document.createElementNS(NS,'path');q.setAttribute('d',d[0]);q.setAttribute('stroke',GOLD);q.setAttribute('stroke-width','1.6');q.setAttribute('fill','none');q.setAttribute('stroke-linecap','round');q.setAttribute('pathLength','1');q.style.strokeDasharray='1';q.style.strokeDashoffset='1';linksEl.appendChild(q);dln.push(q)});
var dnode=document.createElementNS(NS,'circle');dnode.setAttribute('cx',310);dnode.setAttribute('cy',244);dnode.setAttribute('r','0');dnode.setAttribute('fill',GOLD);dnode.setAttribute('stroke','#fff');dnode.setAttribute('stroke-width','3');linksEl.appendChild(dnode);
var dring=document.createElementNS(NS,'circle');dring.setAttribute('cx',310);dring.setAttribute('cy',244);dring.setAttribute('r','8');dring.setAttribute('fill','none');dring.setAttribute('stroke',GOLD);dring.setAttribute('opacity','0');linksEl.appendChild(dring);
var LT=null;
function calcLT(){
  var sr=stage.getBoundingClientRect(),cr=copy.getBoundingClientRect(),sc=S.sc,vw=334*sc,vh=238*sc;
  var vcx=S.tx+167*sc,vcy=S.ty+131*sc,Ox=S.tx+166*sc,Oy=S.ty+122*sc,k,top,left=cr.left-sr.left;
  if(W<860){top=cr.bottom-sr.top+10;var avail=parseFloat(vis.style.top)-10-top;k=Math.min(.36,Math.max(.12,avail/vh))}
  else{k=.38;top=cr.top-sr.top-vh*k-22;if(top<12){k=Math.max(.2,(cr.top-sr.top-34)/vh);top=cr.top-sr.top-vh*k-22}}
  var tcx=left+vw*k/2,tcy=top+vh*k/2;
  LT={k:k,dx:tcx-Ox-k*(vcx-Ox),dy:tcy-Oy-k*(vcy-Oy)};
}
function fitDash(){
  var mob=W<860,aw=mob?W-32:W*.52,ah=mob?H*.46:H*.78,sc=Math.min(aw/620,ah/410,1.35);
  dashEl.style.transform='scale('+sc+')';vis.style.width=620*sc+'px';vis.style.height=410*sc+'px';
  var left,top;
  if(mob){left=(W-620*sc)/2;top=H-410*sc-64}else{left=W-620*sc-W*.05;top=(H-410*sc)/2-6}
  vis.style.left=left+'px';vis.style.top=top+'px';
  var gs=Math.max(W,H)*.6;glowEl.style.width=glowEl.style.height=gs+'px';glowEl.style.left=(left+310*sc-gs/2)+'px';glowEl.style.top=(top+205*sc-gs/2)+'px';
}
function eo(t){t=cl(t);return 1-Math.pow(1-t,3)}
function renderDash(q){
  var tt=ease(q/.8);
  tiltEl.style.transform='rotateX('+lerp(24,0,tt)+'deg) rotateY('+lerp(-28,0,tt)+'deg)';
  PN.forEach(function(p,i){
    var m=eo((q-i*.05)/.55),s2=DS[i],f=DF[i];
    p.style.opacity=String(ease((q-i*.02)/.08));
    p.style.transform='translate3d('+lerp(s2[0],f[0],m)+'px,'+lerp(s2[1],f[1],m)+'px,'+lerp(s2[2],0,m)+'px) rotateZ('+lerp(s2[3],0,m)+'deg)';
    p.style.filter=(1-m)>.02?'blur('+(2.5*(1-m)).toFixed(2)+'px)':'none';
  });
  var w=ease((q-.40)/.20);winEl.style.opacity=String(w);winEl.style.transform='scale('+lerp(.96,1,w)+')';
  var k=ease((q-.62)/.16);kpisEl.style.opacity=String(k);kpisEl.style.transform='translateY('+(8*(1-k))+'px)';
  var l=ease((q-.52)/.20);dln.forEach(function(p){p.style.strokeDashoffset=String(1-l)});
  var n=ease((q-.72)/.10);dnode.setAttribute('r',String(7*n));
  var rp=cl((q-.78)/.22);dring.setAttribute('opacity',String(n*(1-rp)*.8));dring.setAttribute('r',String(8+34*rp));
  glowEl.style.opacity=String(ease((q-.74)/.22)*.9);
  capEl.style.opacity=String(ease((q-.9)/.1));
}
function phase2(g){
  var x=ease((g-.508)/.183);
  scene.style.opacity='1';scene.style.filter='none';
  if(LT&&x>0){scene.style.transform='translate('+(LT.dx*x)+'px,'+(LT.dy*x)+'px) scale('+lerp(1,LT.k,x)+')'}else{scene.style.transform='none'}
  if(S.gl){S.gl.setAttribute('opacity',String(ease((g/.583-.80)/.16)*(1-x)));S.ring.setAttribute('opacity','0')}
  /* ロゴを抜ける光の筋（外向き＝前へ進む感じ） */
  if(S.stk&&g>.50){
    var R=Math.hypot(W,H)*.6,m2=cl((g-.52)/.30);
    S.stk.forEach(function(l,i){
      var e2=ease(m2),head=lerp(R*.05,R*(.7+l._d*.5),e2),tail=head+R*.2*Math.sin(Math.PI*m2)+6,ca=Math.cos(l._a),sa=Math.sin(l._a);
      l.setAttribute('x1',S.cx0+ca*head);l.setAttribute('y1',S.cy0+sa*head);l.setAttribute('x2',S.cx0+ca*tail);l.setAttribute('y2',S.cy0+sa*tail);
      l.setAttribute('opacity',String(.6*Math.sin(Math.PI*m2)));
    });
  }
  renderDash(cl((g-.467)/.433));
  copy.style.opacity='1';
  var a=ease((g-.617)/.083);h1El.style.opacity=String(a);h1El.style.transform='translateY('+(14*(1-a))+'px)';
  var b=ease((g-.717)/.067);subEl.style.opacity=String(b);subEl.style.transform='translateY('+(12*(1-b))+'px)';
  var c=ease((g-.783)/.067);btnEl.style.opacity=String(c);btnEl.style.transform='translateY('+(10*(1-c))+'px)';
}

/* ---------- 共通の描画 ---------- */
function build(){
  W=stage.clientWidth;H=stage.clientHeight;mobile=W<720;
  scene.setAttribute('viewBox','0 0 '+W+' '+H);scene.innerHTML='';S={};
  V.build();
  scene.style.transformOrigin=(S.tx+166*S.sc)+'px '+(S.ty+122*S.sc)+'px';
  fitDash();calcLT();render(cur);
}
function render(g){
  cur=g;var p=cl(g/.583);
  var t1=ease((p-.16)/.17),E=ease((p-.80)/.16);
  ct.style.transform='translateY('+(-101*t1)+'%)';cb.style.transform='translateY('+(101*t1)+'%)';
  vt.style.opacity=String(1-ease((p-.08)/.09));
  V.render(p,E);
  phase2(g);
  if(!reduce){playLabel.textContent=playing?'一時停止':(g>.995?'もう一度':(g>.005?'再開':'再生'));playBtn.classList.toggle('on',playing)}
}
var playing=false,raf=0,last=0,DURATION=12000,t0=0;
function stop(){playing=false;cancelAnimationFrame(raf);render(cur)}
function tick(ts){
  if(!playing)return;var dt=Math.min(64,ts-last);last=ts;
  var p=cur+dt/DURATION;
  if(p>=1){playing=false;render(1);return}
  render(p);raf=requestAnimationFrame(tick);
}
function play(){if(cur>.995){cur=0}playing=true;last=performance.now();raf=requestAnimationFrame(tick);render(cur)}
playBtn.addEventListener('click',function(){playing?stop():play()});
var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){build()},120)});
vp.innerHTML='<span>'+TEXT[0]+'</span><span>'+TEXT[1]+'</span>';
build();
function seen(){try{if(sessionStorage.getItem('sflfv6'))return true;sessionStorage.setItem('sflfv6','1')}catch(e){}return false}
function start(){cur=0;build();if(reduce||seen()){render(1);if(reduce)playBtn.style.display='none'}else{render(0);setTimeout(play,350)}}
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(start);else start();
})();
