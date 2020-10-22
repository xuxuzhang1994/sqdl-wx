import React, { useEffect, useState } from 'react';
import request from '../../request';
import styles from './index.less';
// import Swiper from 'swiper'
import { history } from 'umi';

const formData = {
  source: 1,
};

let videoIndex = 0;

export default () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOtherLoginErrorModal, setShowOtherLoginErrorModal] = useState(
    false,
  );
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showYuyueSuccessModal, setShowYuyueSuccessModal] = useState(false);
  const [showLoginErrorModal, setShowLoginErrorModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [indexData, setIndexData] = useState({});
  const [radioStatus, setRadioStatus] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showGift, setShowGift] = useState(false);

  let [time, setTime] = useState(0);
  const [uid, setUid] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [errText, setErrText] = useState('登錄失敗o(╥﹏╥)o，請再試一次~');

  const ruleText = [
    '',
    `<p>
    <span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">活動時間：</span> </span>
</p>
<p>
    <span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">2020</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">/10/</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">2</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">6 </span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">1</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">4</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">:00 ~&nbsp;</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px;background: #FFFFFF">2020/</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px;background: #FFFFFF">11</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px;background: #FFFFFF">/</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px;background: #FFFFFF">23</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px;background: #FFFFFF">&nbsp;1</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px;background: #FFFFFF">8</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px;background: #FFFFFF">:00</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">&nbsp;&nbsp;</span>
</p>
<p>
    <span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">活動規則：</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">1. 事前登錄活動期間，網頁將統計預約人數。遊戲正式上市後，</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">所有進入游戲的</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">公主殿下，</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">均</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">可在遊戲</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">内</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">領取對應的累計預約獎勵。</span>&nbsp;</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">2. 最終獎勵將根據【事前登錄預約累計人數】所對應的獎勵發放。</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">累計預約獎勵具體如下：</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">累計預約</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">5</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">萬人，</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">遊戲正式上市</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">時將贈送：體力</span>*200、中級強化液*10</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">；</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">累計預約</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">10</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">萬人</span>, </span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">遊戲正式上市</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">時將贈送：熊耳</span>*1、中級思念精華*20</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">；</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">累計預約</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">15</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">萬人，</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">遊戲正式上市</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">時將贈送：</span>SSR帽子灰王子（阿爾貝）*1、記憶碎片*20</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">；</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">累計預約</span>20萬人，</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">遊戲正式上市</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">時將贈送：魔法能量石</span>*30、幻水晶*200</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">；</span></span>
</p>
<p>
    <span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">累計預約</span>30萬人，</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">遊戲正式上市</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">時將贈送：</span>SSR衣服灰王子（阿爾貝）*1、預約專屬徽章+頭像框</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">。</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">3. 獎勵將會在遊戲正式上市後</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">開始</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">發放，屆時請</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">及時在</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">遊戲內</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">的</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">信箱</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">中</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">領取</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">。</span></span>
</p>
<p>
    <span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">&nbsp;</span>
</p>
<p>
    <span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">&nbsp;</span>
</p>
<p>
    <span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">如果您在遊戲體驗的過程有任何的意見或者建議，均可通過</span>FB官方粉絲團（FB: @TheThroneOfGirlTW）以及客服信箱（thethroneofgirlcs@yahoo.com）將您寶貴的建議提供給我們。</span>
</p>
<p>
    <span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br clear="all" style="page-break-before:always"/></span>
</p>
<p>
    <br/>
</p>`,
    `<p>
<span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">活動時間：</span></span>
</p>
<p>
<span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">2020/10/26 14:00 ~&nbsp;2020/11/23 18:00&nbsp;</span>
</p>
<p>
<span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">活動規則：</span>&nbsp;</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">1.</span><span style="font-family: 微软雅黑;color: #C00000;letter-spacing: 0;font-size: 14px">&nbsp;</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">好友召集活動活動期間，各位</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">公主殿下</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">可</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">透過</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">登錄後</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">點擊【召集好友】獲取您的</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">【專屬網址】。好友打開您的【專屬網址】後，完成事前登錄，</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">即計算爲</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">成功召集一位好友。</span>&nbsp;</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">2.&nbsp;最終獎勵將根據</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">本</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">頁面上【您所召集的好友數量】所對應的獎勵</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">進行</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">發放。</span></span>
</p>
<p>
<span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">累計獎勵具體如下：</span>&nbsp;</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">累計召集</span>1人,&nbsp;</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">遊戲正式上市</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">時贈送：</span>&nbsp;幻水晶*100、中級強化液*10</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">；</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">累計召集</span>2人，</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">遊戲正式上市</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">時贈送：</span>&nbsp;魔法能量石*5、拉卡*50000</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">；</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">累計召集</span>3人，</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">遊戲正式上市</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">時贈送：</span>&nbsp;SR衣服秋季陽光（阿爾貝）、SR衣服初春戀人曲（女主）</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">。</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><br/></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">3.&nbsp;獎勵將會在遊戲正式上市後</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">開始</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">發放，屆時</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">請使用【與本次登錄相同的第三方賬號】登錄游戲，即可在</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">遊戲內</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">的</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">信箱</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">中</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">領取</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">。</span></span>
</p>
<p>
<span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">&nbsp;</span>
</p>
<p>
<span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">&nbsp;</span>
</p>
<p>
<span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">如果您在遊戲體驗的過程有任何的意見或者建議，均可通過</span>FB官方粉絲團（FB: @TheThroneOfGirlTW）以及客服信箱（thethroneofgirlcs@yahoo.com）將您寶貴的建議提供給我們。</span>
</p>
<p>
<br/>
</p>`,
    `<p style="margin-left:0;text-indent:0">
<span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">請</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">各位</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">公主殿下</span></span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">按照以下步驟：</span>&nbsp;</span>
</p>
<p style="margin-left:0;text-indent:0">
<span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">1. 追蹤按讚粉絲團&nbsp;</span>
</p>
<p style="margin-left:0;text-indent:0">
<span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">2</span><span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">. 公開分享貼文&nbsp;</span>
</p>
<p style="margin-left:0;text-indent:0">
<span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">即完成</span>Facebook粉絲團抽獎活動。&nbsp;</span>
</p>
<p style="margin-left:0;text-indent:0">
<span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">抽獎活動後續將全部在官方</span>Facebook粉絲團舉行，具體細則請參考粉絲團相關貼文。</span>
</p>
<p style="margin-left:0;text-indent:0">
<span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px">&nbsp;</span>
</p>
<p>
<span style="font-family: 微软雅黑;letter-spacing: 0;font-size: 14px"><span style="font-family:微软雅黑">如果您在遊戲體驗的過程有任何的意見或者建議，均可通過</span>FB官方粉絲團（FB: @TheThroneOfGirlTW）以及客服信箱（thethroneofgirlcs@yahoo.com）將您寶貴的建議提供給我們。</span>
</p>
<p>
<br/>
</p>`,
    '',
  ];
  useEffect(() => {
    // var swiper = new Swiper('.swiper-container', {
    //   direction: 'vertical',
    //   slidesPerView: 'auto',
    //   spaceBetween: 0,
    //   // mousewheel: true,
    //   // allowTouchMove: false,
    //   on: {
    //     transitionEnd: function () {
    //       setSwiperIndex(this.activeIndex)
    //     },
    //   }
    // });
    const teseSwiper = new Swiper('.swiper-tese', {
      watchSlidesProgress: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: true,
      autoplay: true,
      loopedSlides: 5,
      autoplay: true,
      pagination: {
        el: '.swiper-pagination',
        //clickable :true,
      },
      on: {
        progress: function(progress) {
          for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides.eq(i);
            var slideProgress = this.slides[i].progress;
            var modify = 1;
            if (Math.abs(slideProgress) > 1) {
              modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
            }
            var translate = slideProgress * modify * 60 + 'px';
            var scale = 1 - Math.abs(slideProgress) / 6;
            var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
            slide.transform(
              'translateX(' + translate + ') scale(' + scale + ')',
            );
            slide.css('zIndex', zIndex);
            slide.css('opacity', 1);
            if (Math.abs(slideProgress) > 3) {
              slide.css('opacity', 0);
            }
          }
        },
        setTransition: function(transition) {
          for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides.eq(i);
            slide.transition(transition);
          }
        },
      },
    });
    getIndexData();
    const id = history.location.query.uid;
    const share_id = history.location.query.share_id;
    formData.share_id = share_id;
    setUid(id);
  }, []);

  useEffect(() => {
    let timerId = null;
    const time2 = time;
    const run = () => {
      if (time2 <= 0) {
        return () => {
          timerId && clearTimeout(timerId);
        };
      }
      setTime(time2 - 1);
      timerId = setTimeout(run, 1000);
    };
    timerId = setTimeout(run, 1000);
    return () => {
      timerId && clearTimeout(timerId);
    };
  }, [time]);

  useEffect(() => {
    getUserInfo(uid);
  }, [uid]);

  const parseNumber = number => {
    const string = String(number);
    let list = [];
    if (string.length > 3) {
      for (let i = 3; i < string.length; i = i + 3) {
        const str = string.substring(i - 3, i);
        list.push(str);
        if (i >= string.length - 3) {
          list.push(string.substring(i, string.length));
        }
      }
    } else {
      list.push(string);
    }
    // const list = number.
    console.log({ list });
    return list.join();
  };

  const getIndexData = () => {
    request('/api/homeIndex').then(data => {
      data.data.number_text = parseNumber(data.data.total);
      setIndexData(data.data);
      console.log(data.data);
    });
  };

  const sendCode = () => {
    if (!formData.phone) {
      setErrText('請填寫手機號！');
      setShowLoginErrorModal(true);
      return;
    }
    if (!radioStatus) {
      setErrText('請先閱讀並同意用戶條款和隱私協議~');
      setShowLoginErrorModal(true);
      return;
    }
    if (time > 0) {
      return;
    }
    setTime(60);
    // reduceTime()
    request
      .get('/api/sendCode', {
        params: {
          mobile: formData.phone,
          source: formData.source,
        },
      })
      .then(data => {});
  };

  const changeInput = (val, key) => {
    formData[key] = val;
  };

  const changeSource = e => {
    formData.source = e.target.value;
  };

  const login = () => {
    if (!formData.phone) {
      alert('請填寫手機號!');
      return;
    }
    if (!formData.code) {
      alert('請填寫驗證碼!');
      return;
    }
    if (!radioStatus) {
      alert('請先同意協議!');
      return;
    }
    request
      .get('/api/reg', {
        params: {
          uid: formData.share_id,
          mobile: formData.phone,
          code: formData.code,
          source: formData.source,
        },
      })
      .then(data => {
        if (data.code == 0) {
          setShowYuyueSuccessModal(true);
        } else {
          alert(data.msg);
        }
      });
  };

  const getUserInfo = uid => {
    request('/api/getUserInfo?uid=' + uid).then(data => {
      if (data.code == 0) {
        setUserInfo(data.data);
      }
    });
  };

  const copyText = () => {
    copyToClipboard(userInfo.share_url);
    setShowCopyModal(false);
    setShowCopySuccess(true);
  };

  return (
    <div className={styles.app}>
      <div className={styles.topbar}>
        <img
          className={styles.avatar}
          src={require('../images/avatar.png')}
          alt=""
        />
        <div className={styles.func}>
          <a href="https://www.facebook.com/TheThroneOfGirlTW/">
            <div className={styles.item}></div>
          </a>
          <a href="https://www.facebook.com/TheThroneOfGirlTW/">
            <div className={styles.item}></div>
          </a>
        </div>
      </div>
      {uid ? (
        <div onClick={() => setUid('')} className={styles.logout}>
          <img
            className={styles.loginbtn}
            src={require('../images/login/logout.png')}
          />
          <div>{userInfo.name}</div>
        </div>
      ) : (
        <img
          onClick={() => setShowOtherLoginErrorModal(true)}
          className={styles.loginbtn}
          src={require('../images/login/login.png')}
        />
      )}
      {/* <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className={'swiper-slide ' + styles.slide1}>
            <div className={styles.hotbox}>
              <img className={styles.logo} src={require('../images/kv/LOGO.png')} alt="" />
              <img className={styles.yuyue} src={require('../images/kv/yuyue.png')} alt="" />
              <div className={styles.numbers}>已有123456位公主蒞臨米德加爾特大陸</div>
              <div className={styles.download}>
                <img src={require('../images/kv/IOS.png')} alt="" className={styles.ios} />
                <img src={require('../images/kv/GP.png')} alt="" className={styles.gp} />
              </div>
            </div>
            <img className={styles.bg} src={require('../images/kv/BG.png')} alt="" />
          </div>
          <div className={'swiper-slide ' + styles.slide2}>
            <div className={styles.numbers}>
              <div className={styles.top}>已加入/per-registration</div>
              <div className={styles.bottom}>256,356,0位公主</div>
            </div>
            <div className={styles.process}>
              <div className={styles.jd}></div>
            </div>
            <img className={styles.yuyue} src={require('../images/01/yuyue.png')} alt="" />
            <img className={styles.bg} src={require('../images/01/02.png')} alt="" />
          </div>
          <div className={'swiper-slide ' + styles.slide3}>
            <div className={styles.numbers}>
              <div className={styles.top}>已召集/invitation</div>
              <div className={styles.bottom}>1位好友</div>
            </div>
            <img className={styles.zj} src={require('../images/02/zj.png')} alt="" />
            <img className={styles.bg} src={require('../images/02/bg.png')} alt="" />
          </div>
          <div className={'swiper-slide ' + styles.slide4}>
            <img className={styles.fb} src={require('../images/03/fb.png')} alt="" />
            <img className={styles.bg} src={require('../images/03/bg.png')} alt="" />
          </div>
          <div className={'swiper-slide ' + styles.slide5}>
            <div className={styles.tese}>
              <div className="swiper-container2 swiper-tese">
                <div className="swiper-wrapper">
                  <div className={"swiper-slide " + styles.slide}>
                    <img className="" src={require('../images/04/001.jpg')} alt="" />
                  </div>
                  <div className={"swiper-slide " + styles.slide}>
                    <img className="" src={require('../images/04/002.jpg')} alt="" />
                  </div>
                  <div className={"swiper-slide " + styles.slide}>
                    <img className="" src={require('../images/04/003.jpg')} alt="" />
                  </div>
                  <div className={"swiper-slide " + styles.slide}>
                    <img className="" src={require('../images/04/004.jpg')} alt="" />
                  </div>
                  <div className={"swiper-slide " + styles.slide}>
                    <img className="" src={require('../images/04/005.jpg')} alt="" />
                  </div>
                  <div className={"swiper-slide " + styles.slide}>
                    <img className="" src={require('../images/04/006.jpg')} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-pagination"></div>
            <img className={styles.bg} src={require('../images/04/bg.png')} alt="" />
          </div>
          <div className={'swiper-slide ' + styles.slide6}>
            <div className={styles.copyright}>
              <img src={require('../images/copyright.png')} alt="" />
            </div>
          </div>
        </div>
      </div> */}
      <div className={'swiper-slide ' + styles.slide1}>
        <div className={styles.hotbox}>
          <img
            className={styles.logo}
            src={require('../images/kv/LOGO.png')}
            alt=""
          />
          {indexData.login_status == 0 ? (
            <img
              className={styles.yuyue}
              src={require('../images/end.png')}
              alt=""
            />
          ) : (
            <img
              onClick={() => setShowLoginModal(true)}
              className={styles.yuyue}
              src={require('../images/kv/yuyue.png')}
              alt=""
            />
          )}
          <div className={styles.numbers}>
            已有<span></span>
            {indexData.number_text}位公主蒞臨米德加爾特大陸
          </div>
          <div className={styles.download}>
            <a href="https://cutt.ly/BfTbRjb">
              <img
                src={require('../images/kv/GP.png')}
                alt=""
                className={styles.gp}
              />
            </a>
            <a href="https://cutt.ly/5fTbEii">
              <img
                src={require('../images/kv/IOS.png')}
                alt=""
                className={styles.ios}
              />
            </a>
          </div>
          <img
            className={styles.play}
            onClick={() => setShowVideo(true)}
            src={require('../images/kv/play.png')}
          />
        </div>
        <img
          className={styles.bg}
          src={require('../images/kv/BG.png')}
          alt=""
        />
        <div className={styles.othder}>
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UC5j2wZ7N6xJ0cUv4O6gKf3Q"
          >
            <img src={require('../images/kv/youtobe.png')} alt="" />
          </a>
          <a target="_blank" href="https://www.facebook.com/TheThroneOfGirlTW/">
            <img src={require('../images/kv/FB.png')} alt="" />
          </a>
        </div>
      </div>
      <div className={'swiper-slide ' + styles.slide2}>
        <img
          onClick={() => {
            setSwiperIndex(1);
            setShowRuleModal(true);
          }}
          className={styles.tips}
          src={require('../images/kv/tips.png')}
        />
        <div className={styles.numbers}>
          <div className={styles.top}>已加入/per-registration</div>
          <div className={styles.bottom}>
            <span>{indexData.number_text}</span>位公主
          </div>
        </div>
        <div className={styles.process}>
          <div
            style={{ bottom: indexData.total / 3000 + '%' }}
            className={styles.jd}
          ></div>
        </div>
        <div className={styles.leftlist}>
          <div
            className={styles.item}
            onClick={() => {
              videoIndex = 1;
              setShowGift(true);
            }}
          >
            {indexData.total > 300000 && (
              <img src={require('../images/02/yidacheng.png')} alt="" />
            )}
          </div>
          <div className={styles.item}>
            {indexData.total > 200000 && (
              <img src={require('../images/yidacheng.png')} alt="" />
            )}
          </div>
          <div className={styles.item}>
            {indexData.total > 100000 && (
              <img src={require('../images/yidacheng.png')} alt="" />
            )}
          </div>
        </div>
        <div className={styles.rightlist}>
          <div className={styles.item}>
            {indexData.total > 150000 && (
              <img src={require('../images/yidacheng.png')} alt="" />
            )}
          </div>
          <div className={styles.item}>
            {indexData.total > 50000 && (
              <img src={require('../images/yidacheng.png')} alt="" />
            )}
          </div>
        </div>
        {indexData.share_status == 0 ? (
          <img
            className={styles.yuyue}
            src={require('../images/end.png')}
            alt=""
          />
        ) : (
          <img
            onClick={() => setShowLoginModal(true)}
            className={styles.yuyue}
            src={require('../images/01/yuyue.png')}
            alt=""
          />
        )}
        <img
          className={styles.bg}
          src={require('../images/01/02.png')}
          alt=""
        />
      </div>
      <div className={'swiper-slide ' + styles.slide3}>
        <img
          onClick={() => {
            setSwiperIndex(2);
            setShowRuleModal(true);
          }}
          className={styles.tips}
          src={require('../images/kv/tips.png')}
        />
        <div className={styles.numbers}>
          <div className={styles.top}>已召集/invitation</div>
          <div className={styles.bottom}>
            <span>{userInfo.number}</span>位好友
          </div>
        </div>
        <div className={styles.list}>
          {[0, 1, 2].map(item => (
            <div
              className={styles.item}
              onClick={() => {
                if (item != 2) {
                  return;
                }
                videoIndex = 2;
                setShowGift(true);
              }}
            >
              {item < userInfo.number && (
                <img src={require('../images/02/yidacheng.png')} alt="" />
              )}
            </div>
          ))}
        </div>
        {indexData.login_status == 0 ? (
          <img
            className={styles.zj}
            src={require('../images/end.png')}
            alt=""
          />
        ) : (
          <img
            onClick={() => {
              if (!uid) {
                setShowOtherLoginErrorModal(true);
                return;
              }
              setShowCopyModal(true);
            }}
            className={styles.zj}
            src={require('../images/02/zj.png')}
            alt=""
          />
        )}
        <img
          className={styles.bg}
          src={require('../images/02/bg.png')}
          alt=""
        />
      </div>
      <div className={'swiper-slide ' + styles.slide4}>
        <img
          onClick={() => {
            setSwiperIndex(3);
            setShowRuleModal(true);
          }}
          className={styles.tips}
          src={require('../images/kv/tips.png')}
        />
        <a href="https://www.facebook.com/TheThroneOfGirlTW/">
          <img
            className={styles.fb}
            src={require('../images/03/fb.png')}
            alt=""
          />
        </a>
        <img
          className={styles.bg}
          src={require('../images/03/bg.png')}
          alt=""
        />
      </div>
      <div className={'swiper-slide ' + styles.slide5}>
        <div className={styles.tese}>
          <div className="swiper-container2 swiper-tese">
            <div className="swiper-wrapper">
              <div className={'swiper-slide ' + styles.slide}>
                <img
                  className=""
                  src={require('../images/04/001.jpg')}
                  alt=""
                />
              </div>
              <div className={'swiper-slide ' + styles.slide}>
                <img
                  className=""
                  src={require('../images/04/002.jpg')}
                  alt=""
                />
              </div>
              <div className={'swiper-slide ' + styles.slide}>
                <img
                  className=""
                  src={require('../images/04/003.jpg')}
                  alt=""
                />
              </div>
              <div className={'swiper-slide ' + styles.slide}>
                <img
                  className=""
                  src={require('../images/04/004.jpg')}
                  alt=""
                />
              </div>
              <div className={'swiper-slide ' + styles.slide}>
                <img
                  className=""
                  src={require('../images/04/005.jpg')}
                  alt=""
                />
              </div>
              <div className={'swiper-slide ' + styles.slide}>
                <img
                  className=""
                  src={require('../images/04/006.jpg')}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-pagination"></div>
        <img
          className={styles.bg}
          src={require('../images/04/bg.png')}
          alt=""
        />
      </div>
      <div className={'swiper-slide ' + styles.slide6}>
        <div className={styles.copyright}>
          <img src={require('../images/copyright.png')} alt="" />
        </div>
      </div>
      {showLoginModal && (
        <div className={styles.modal}>
          <div
            className={styles.mask}
            onClick={() => setShowLoginModal(false)}
          ></div>
          <div className={styles.container}>
            <img
              className={styles.close}
              onClick={() => setShowLoginModal(false)}
              src={require('../images/01/close.png')}
            />
            <div className={styles.formlist}>
              <div className={styles.item}>
                <select name="" id="" onChange={changeSource}>
                  <option value="1">台湾886</option>
                  <option value="2">香港852</option>
                  <option value="3">澳门853</option>
                </select>
                <input
                  onChange={e => changeInput(e.target.value, 'phone')}
                  className={styles.phone}
                  placeholder="請輸入手機號碼"
                  type="text"
                />
              </div>
              <div className={styles.item}>
                <input
                  onChange={e => changeInput(e.target.value, 'code')}
                  className={styles.num}
                  placeholder="請輸入驗證碼"
                  type="text"
                />
                <div onClick={() => sendCode()} className={styles.code}>
                  {time <= 0 ? '獲取驗證碼' : time + 's'}
                </div>
              </div>
              <div className={styles.item + ' ' + styles.rule}>
                <img
                  onClick={() => setRadioStatus(!radioStatus)}
                  src={
                    radioStatus
                      ? require('../images/01/radio-s.png')
                      : require('../images/01/radio.png')
                  }
                  alt=""
                />
                <div>
                  我同意 <a>《使用者協議》</a>、<a>《隱私權政策》</a>
                  並接受測試相關資訊
                </div>
              </div>
              <img
                onClick={() => login()}
                className={styles.submit}
                src={require('../images/01/yuyue.png')}
                alt=""
              />
            </div>
          </div>
        </div>
      )}
      {showYuyueSuccessModal && (
        <div className={styles.modal + ' ' + styles.success}>
          <div
            className={styles.mask}
            onClick={() => setShowYuyueSuccessModal(false)}
          ></div>
          <div className={styles.container}>
            <img
              className={styles.close}
              onClick={() => setShowYuyueSuccessModal(false)}
              src={require('../images/01/close.png')}
            />
            <div className={styles.successtext}>恭喜您，預約成功！</div>
            <img
              className={styles.submit}
              src={require('../images/01/qr.png')}
              alt=""
            />
          </div>
        </div>
      )}
      {showLoginErrorModal && (
        <div className={styles.modal + ' ' + styles.success}>
          <div
            className={styles.mask}
            onClick={() => setShowLoginErrorModal(false)}
          ></div>
          <div className={styles.container}>
            <img
              className={styles.close}
              onClick={() => setShowLoginErrorModal(false)}
              src={require('../images/01/close.png')}
            />
            <div className={styles.successtext}>{errText}</div>
            <img
              className={styles.submit}
              onClick={() => setShowLoginErrorModal(false)}
              src={require('../images/01/qr.png')}
              alt=""
            />
          </div>
        </div>
      )}
      {showOtherLoginErrorModal && (
        <div className={styles.modal + ' ' + styles.login}>
          <div
            className={styles.mask}
            onClick={() => setShowOtherLoginErrorModal(false)}
          ></div>
          <div className={styles.container}>
            <img
              className={styles.close}
              onClick={() => setShowOtherLoginErrorModal(false)}
              src={require('../images/01/close.png')}
            />
            <div className={styles.text}>使用以下第三方帳號登錄</div>
            <div className={styles.list}>
              <a href={indexData.apple_url}>
                <img
                  className={styles.item}
                  src={require('../images/login/APPLE.png')}
                  alt=""
                />
              </a>
              <a href={indexData.facebook_url}>
                <img
                  className={styles.item}
                  src={require('../images/login/fb.png')}
                  alt=""
                />
              </a>
              <a href={indexData.google_url}>
                <img
                  className={styles.item}
                  src={require('../images/login/google.png')}
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      )}
      {showRuleModal && (
        <div className={styles.modal + ' ' + styles.rule}>
          <div
            className={styles.mask}
            onClick={() => setShowRuleModal(false)}
          ></div>
          <div className={styles.container}>
            <img
              className={styles.close}
              onClick={() => setShowRuleModal(false)}
              src={require('../images/01/close.png')}
            />
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: ruleText[swiperIndex] }}
            ></div>
          </div>
        </div>
      )}
      {showCopyModal && (
        <div className={styles.modal + ' ' + styles.copyModal}>
          <div
            className={styles.mask}
            onClick={() => setShowCopyModal(false)}
          ></div>
          <div className={styles.container}>
            <img
              className={styles.close}
              onClick={() => setShowCopyModal(false)}
              src={require('../images/01/close.png')}
            />
            <div className={styles.tip}>複製寧的專屬灣沚，召集好友拿好禮！</div>
            <div className={styles.code}>{userInfo.share_url}</div>
            <img
              onClick={() => copyText()}
              className={styles.submit}
              src={require('../images/02/copy.png')}
              alt=""
            />
          </div>
        </div>
      )}
      {showCopySuccess && (
        <div className={styles.modal + ' ' + styles.success}>
          <div
            className={styles.mask}
            onClick={() => setShowCopySuccess(false)}
          ></div>
          <div className={styles.container}>
            <img
              className={styles.close}
              onClick={() => setShowCopySuccess(false)}
              src={require('../images/01/close.png')}
            />
            <div className={styles.successtext}>
              複製成功，快去分享給好友吧~
            </div>
            <img
              className={styles.submit}
              onClick={() => setShowCopySuccess(false)}
              src={require('../images/01/qr.png')}
              alt=""
            />
          </div>
        </div>
      )}
      {showGift && (
        <div className={styles.modal + ' ' + styles.success}>
          <div className={styles.mask} onClick={() => setShowGift(false)}></div>
          <div className={styles.container}>
            <img
              className={styles.close}
              onClick={() => setShowGift(false)}
              src={require('../images/01/close.png')}
            />
            <div className={styles.videobox}>
              {videoIndex == 2 && <video loop autoPlay src={`./1.mp4`}></video>}
              <video autoPlay loop src={`./${videoIndex + 1}.mp4`}></video>
            </div>
          </div>
        </div>
      )}
      {showVideo && (
        <div className={styles.modal + ' ' + styles.video}>
          <div
            className={styles.mask}
            onClick={() => setShowVideo(false)}
          ></div>
          <div className={styles.container}>
            <img
              className={styles.close}
              onClick={() => setShowVideo(false)}
              src={require('../images/01/close.png')}
            />
            <video
              controls
              autoPlay
              loop
              src="https://thethroneofgirl.smartplay.com.tw/media/%E5%B0%91%E5%A5%B3CB-PV.mp4"
            ></video>
          </div>
        </div>
      )}
    </div>
  );
};

function copyToClipboard(text) {
  // if (text.indexOf('-') !== -1) {
  //   let arr = text.split('-');
  //   text = arr[0] + arr[1];
  // }
  var textArea = document.createElement('textarea');
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = '0';
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful
      ? '成功复制到剪贴板'
      : '该浏览器不支持点击复制到剪贴板';
    // alert(msg);
  } catch (err) {
    // alert('该浏览器不支持点击复制到剪贴板');
  }

  document.body.removeChild(textArea);
}
