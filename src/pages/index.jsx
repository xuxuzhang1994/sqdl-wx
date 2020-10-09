import React, { useEffect, useState } from 'react';
import request from '../../request'
import styles from './index.less';
// import Swiper from 'swiper'

export default () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showOtherLoginErrorModal, setShowOtherLoginErrorModal] = useState(false)
  const [showRuleModal, setShowRuleModal] = useState(false)
  const [showYuyueSuccessModal, setShowYuyueSuccessModal] = useState(false)
  const [showLoginErrorModal, setShowLoginErrorModal] = useState(false)
  const [swiperIndex, setSwiperIndex] = useState(0)

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
      loop: true, autoplay: true,
      loopedSlides: 5,
      autoplay: true,
      pagination: {
        el: '.swiper-pagination',
        //clickable :true,
      },
      on: {
        progress: function (progress) {
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
            slide.transform('translateX(' + translate + ') scale(' + scale + ')');
            slide.css('zIndex', zIndex);
            slide.css('opacity', 1);
            if (Math.abs(slideProgress) > 3) {
              slide.css('opacity', 0);
            }
          }
        },
        setTransition: function (transition) {
          for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides.eq(i)
            slide.transition(transition);
          }

        }
      }
    });
    getIndexData()
  }, []);

  const getIndexData = () => {
    request('/api/homeIndex').then(data => {
      console.log({data})
    })
  }

  return (
    <div className={styles.app}>
      <div className={styles.topbar}>
        <div className={styles.func}>
          <div className={styles.item}></div>
          <div className={styles.item}></div>
        </div>
      </div>
      {
        <img onClick={() => setShowRuleModal(true)} className={styles.tips} src={require('../images/kv/tips.png')} />
      }
      {
        <img onClick={() => setShowOtherLoginErrorModal(true)} className={styles.loginbtn} src={require('../images/login/login.png')} />
      }
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
      {
        showLoginModal && <div className={styles.modal}>
          <div className={styles.mask} onClick={() => setShowLoginModal(false)}></div>
          <div className={styles.container}>
            <img className={styles.close} onClick={() => setShowLoginModal(false)} src={require('../images/01/close.png')} />
            <div className={styles.formlist}>
              <div className={styles.item}>
                <select name="" id="">
                  <option value="">台湾886</option>
                </select>
                <input className={styles.phone} placeholder="請輸入手機號碼" type="text" />
              </div>
              <div className={styles.item}>
                <input className={styles.num} placeholder="請輸入驗證碼" type="text" />
                <div className={styles.code}>獲取驗證碼</div>
              </div>
              <div className={styles.item + ' ' + styles.rule}>
                <img src={require('../images/01/radio.png')} alt="" />
                <div>我同意《使用者協議》、《隱私權政策》並接受測試相關資訊</div>
              </div>
              <img onClick={() => setShowYuyueSuccessModal(true)} className={styles.submit} src={require('../images/01/yuyue.png')} alt="" />
            </div>
          </div>
        </div>
      }
      {
        showYuyueSuccessModal && <div className={styles.modal + ' ' + styles.success}>
          <div className={styles.mask} onClick={() => setShowYuyueSuccessModal(false)}></div>
          <div className={styles.container}>
            <img className={styles.close} onClick={() => setShowYuyueSuccessModal(false)} src={require('../images/01/close.png')} />
            <div className={styles.successtext}>恭喜您，預約成功！</div>
            <img className={styles.submit} src={require('../images/01/qr.png')} alt="" />
          </div>
        </div>
      }
      {
        showLoginErrorModal && <div className={styles.modal + ' ' + styles.success}>
          <div className={styles.mask} onClick={() => setShowLoginErrorModal(false)}></div>
          <div className={styles.container}>
            <img className={styles.close} onClick={() => setShowLoginErrorModal(false)} src={require('../images/01/close.png')} />
            <div className={styles.successtext}>登錄失敗o(╥﹏╥)o，請再試一次~</div>
            <img className={styles.submit} src={require('../images/01/qr.png')} alt="" />
          </div>
        </div>
      }
      {
        showOtherLoginErrorModal && <div className={styles.modal + ' ' + styles.login}>
          <div className={styles.mask} onClick={() => setShowOtherLoginErrorModal(false)}></div>
          <div className={styles.container}>
            <img className={styles.close} onClick={() => setShowOtherLoginErrorModal(false)} src={require('../images/01/close.png')} />
            <div className={styles.text}>使用以下第三方帳號登錄</div>
            <div className={styles.list}>
              <img className={styles.item} src={require('../images/login/APPLE.png')} alt="" />
              <img className={styles.item} src={require('../images/login/fb.png')} alt="" />
              <img className={styles.item} src={require('../images/login/google.png')} alt="" />
            </div>
          </div>
        </div>
      }
      {
        showRuleModal && <div className={styles.modal + ' ' + styles.rule}>
          <div className={styles.mask} onClick={() => setShowRuleModal(false)}></div>
          <div className={styles.container}>
            <img className={styles.close} onClick={() => setShowRuleModal(false)} src={require('../images/01/close.png')} />
            <img className={styles.ruleimg} src={require('../images/login/rule.png')} />
          </div>
        </div>
      }
    </div>
  );
}
