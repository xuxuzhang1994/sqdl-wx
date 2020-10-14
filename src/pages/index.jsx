import React, { useEffect, useState } from 'react';
import request from '../../request';
import styles from './index.less';
// import Swiper from 'swiper'
import { history } from 'umi';

const formData = {};

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
  let [time, setTime] = useState(0);
  const [uid, setUid] = useState('');
  const [userInfo, setUserInfo] = useState({});

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

  const getIndexData = () => {
    request('/api/homeIndex').then(data => {
      setIndexData(data.data);
      console.log(data.data);
    });
  };

  const sendCode = () => {
    setTime(60);
    // reduceTime()
    request
      .post('/api/sendCode', {
        data: {
          mobile: formData.phone,
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
    if (!formData.phone) {
      alert('請填寫驗證碼!');
      return;
    }
    if (!radioStatus) {
      alert('請先同意協議!');
      return;
    }
    request
      .post('/api/reg', {
        data: {
          uid: formData.share_id,
          mobile: formData.phone,
          code: formData.code,
          source: 1,
        },
      })
      .then(data => {
        if (data.code == 0) {
          showYuyueSuccessModal(true);
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
        <div className={styles.func}>
          <a href="https://www.facebook.com/TheThroneOfGirlTW/">
            <div className={styles.item}></div>
          </a>
          <a href="https://www.facebook.com/TheThroneOfGirlTW/">
            <div className={styles.item}></div>
          </a>
        </div>
      </div>
      {
        <img
          onClick={() => setShowRuleModal(true)}
          className={styles.tips}
          src={require('../images/kv/tips.png')}
        />
      }
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
          <img
            onClick={() => setShowLoginModal(true)}
            className={styles.yuyue}
            src={require('../images/kv/yuyue.png')}
            alt=""
          />
          <div className={styles.numbers}>
            已有{indexData.total}位公主蒞臨米德加爾特大陸
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
        </div>
        <img
          className={styles.bg}
          src={require('../images/kv/BG.png')}
          alt=""
        />
      </div>
      <div className={'swiper-slide ' + styles.slide2}>
        <div className={styles.numbers}>
          <div className={styles.top}>已加入/per-registration</div>
          <div className={styles.bottom}>{indexData.total}位公主</div>
        </div>
        <div className={styles.process}>
          <div
            style={{ top: indexData.total / 30000 + '%' }}
            className={styles.jd}
          ></div>
        </div>
        <div className={styles.leftlist}>
          <div className={styles.item}>
            {indexData.number > 3000000 && (
              <img src={require('../images/02/yidacheng.png')} alt="" />
            )}
          </div>
          <div className={styles.item}>
            {indexData.number > 1000000 && (
              <img src={require('../images/02/yidacheng.png')} alt="" />
            )}
          </div>
          <div className={styles.item}>
            {indexData.number > 200000 && (
              <img src={require('../images/02/yidacheng.png')} alt="" />
            )}
          </div>
        </div>
        <div className={styles.rightlist}>
          <div className={styles.item}>
            {indexData.number > 2000000 && (
              <img src={require('../images/02/yidacheng.png')} alt="" />
            )}
          </div>
          <div className={styles.item}>
            {indexData.number > 500000 && (
              <img src={require('../images/02/yidacheng.png')} alt="" />
            )}
          </div>
        </div>
        <img
          onClick={() => setShowLoginModal(true)}
          className={styles.yuyue}
          src={require('../images/01/yuyue.png')}
          alt=""
        />
        <img
          className={styles.bg}
          src={require('../images/01/02.png')}
          alt=""
        />
      </div>
      <div className={'swiper-slide ' + styles.slide3}>
        <div className={styles.numbers}>
          <div className={styles.top}>已召集/invitation</div>
          <div className={styles.bottom}>{userInfo.number}位好友</div>
        </div>
        <div className={styles.list}>
          {[0, 1, 2].map(item => (
            <div className={styles.item}>
              {item < userInfo.number && (
                <img src={require('../images/02/yidacheng.png')} alt="" />
              )}
            </div>
          ))}
        </div>
        <img
          onClick={() => setShowCopyModal(true)}
          className={styles.zj}
          src={require('../images/02/zj.png')}
          alt=""
        />
        <img
          className={styles.bg}
          src={require('../images/02/bg.png')}
          alt=""
        />
      </div>
      <div className={'swiper-slide ' + styles.slide4}>
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
                  <option value="2">香港886</option>
                  <option value="3">澳门886</option>
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
            <div className={styles.successtext}>
              登錄失敗o(╥﹏╥)o，請再試一次~
            </div>
            <img
              className={styles.submit}
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
            <img
              className={styles.ruleimg}
              src={require('../images/login/rule.png')}
            />
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
    </div>
  );
};

function copyToClipboard(text) {
  if (text.indexOf('-') !== -1) {
    let arr = text.split('-');
    text = arr[0] + arr[1];
  }
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
    alert(msg);
  } catch (err) {
    alert('该浏览器不支持点击复制到剪贴板');
  }

  document.body.removeChild(textArea);
}
