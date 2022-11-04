const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function getPhotos(productId, ownerMemberId, totalPages) {
  //{ headless: false, defaultViewport: null }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  var photos = [];

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      const feedbackUrl = `https://feedback.aliexpress.com/display/productEvaluation.htm?v=2&page=${currentPage}&currentPage=${currentPage}&productId=${productId}&ownerMemberId=${ownerMemberId}&withPictures=true`;
      console.log(feedbackUrl)
      var cookies = [
        {
          "name": "ali_apache_id",
          "value": "33.3.24.203.1667365755562.196565.5",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1701925755.833547,
          "httpOnly": false,
          "secure": false
        },
        {
          "name": "acs_usuc_t",
          "value": "x_csrf=pvfs_ym4iop4&acs_rt=a6ef92514a934018b0c8b57a312e0972",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": -1,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "xman_t",
          "value": "AdW1/yakPn1NToJJpwggbwHVmCIG+BD+XVdMTOAVPEvJ3A8bPXygy8yoWxX5bceA",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1675141755.83366,
          "httpOnly": true,
          "secure": true
        },
        {
          "name": "xman_f",
          "value": "avNtMzr3ITI3j3/yj8ukvH8LN/e72gYOrwHtzzxp4tswppi2Q1CLbpBXNpiA2/jr6GVjHL9i+2ADn9yXXB9X/f9B1ELaE2tV9mP3IuWEcoFpxEW2BmHWWA==",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1701925755.833681,
          "httpOnly": true,
          "secure": true
        },
        {
          "name": "SLG_G_WPT_TO",
          "value": "pt",
          "domain": "feedback.aliexpress.com",
          "path": "/",
          "expires": -1,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "SLG_GWPT_Show_Hide_tmp",
          "value": "1",
          "domain": "feedback.aliexpress.com",
          "path": "/",
          "expires": -1,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "SLG_wptGlobTipTmp",
          "value": "1",
          "domain": "feedback.aliexpress.com",
          "path": "/",
          "expires": -1,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "intl_locale",
          "value": "pt_BR",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": -1,
          "httpOnly": false,
          "secure": false
        },
        {
          "name": "aep_usuc_f",
          "value": "site=bra&c_tp=BRL&region=BR&b_locale=pt_BR",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1701982526.905776,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "_m_h5_tk",
          "value": "244a3a3f8342f548c706438fe67810e7_1667423131005",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1668025680.498667,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "_m_h5_tk_enc",
          "value": "abaf8bbcd4c2a2736888288dee149aee",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1668025680.498751,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "ali_apache_track",
          "value": "",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1701980882.78084,
          "httpOnly": false,
          "secure": false
        },
        {
          "name": "ali_apache_tracktmp",
          "value": "",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": -1,
          "httpOnly": false,
          "secure": false
        },
        {
          "name": "e_id",
          "value": "pt30",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1701980882.780992,
          "httpOnly": false,
          "secure": false
        },
        {
          "name": "xman_us_f",
          "value": "x_locale=pt_BR&x_l=0&x_c_chg=1&x_as_i=%7B%22cookieCacheEffectTime%22%3A1667421186114%2C%22isCookieCache%22%3A%22Y%22%2C%22ms%22%3A%220%22%7D&acs_rt=a6ef92514a934018b0c8b57a312e0972",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1702060311.330331,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "aep_history",
          "value": "keywords%5E%0Akeywords%09%0A%0Aproduct_selloffer%5E%0Aproduct_selloffer%0932948518414%091005002970395482%091005002995386180%091005004272864039%091005002995551531%094000975689986%091005003114151882%091005002946837413",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1698958526,
          "httpOnly": false,
          "secure": false
        },
        {
          "name": "intl_common_forever",
          "value": "g64U1S36RQWkiWZ5HJRn+zt7y4AaNxRQmt6gsSPdaB17RheqjQDeLg==",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1701982526.905726,
          "httpOnly": true,
          "secure": false
        },
        {
          "name": "x5sec",
          "value": "7b2261656272696467653b32223a226332616334313435376232343161623733333065333065663033386162383062434e2b516b4a734745506e7331386e2f6c62446274414577324c337631414e4141773d3d227d",
          "domain": "feedback.aliexpress.com",
          "path": "/",
          "expires": 1667501931.682712,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "JSESSIONID",
          "value": "E14DB6C54C64830C816297A778A3908C",
          "domain": "feedback.aliexpress.com",
          "path": "/",
          "expires": -1,
          "httpOnly": true,
          "secure": false
        },
        {
          "name": "isg",
          "value": "BLq60Th9jVHprgDeE-mpdGyZG-Dcaz5FUtJdWcSzcc0Yt1rxrPkTV-COA1trJ7bd",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1683052183,
          "httpOnly": false,
          "secure": true
        },
        {
          "name": "l",
          "value": "eBaM9mCuLjWTkJ5xBOfwourza77tbKRAguPzaNbMiOCP9wfB5hShW6r8AyL6CnMNh6uvR3Wh0jdDBeYBq6CKnxvtP73nAVkmn",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1683052183,
          "httpOnly": false,
          "secure": false
        },
        {
          "name": "tfstk",
          "value": "cQodBKXVSCAnW9RubkLgUVskjORca-TLZBNV2mHPdEW9nQbAlsximmeKFMwYgWpO.",
          "domain": ".aliexpress.com",
          "path": "/",
          "expires": 1683052183,
          "httpOnly": false,
          "secure": false
        }
      ];

      await page.setCookie(...cookies);
      await page.goto(feedbackUrl, {timeout: 0});
      await new Promise(r => setTimeout(r, 2000));
      var data = await page.evaluate(() => document.querySelector('*').outerHTML);
      
      const $ = cheerio.load(data);
      $('.feedback-list-wrap .feedback-item').each((index, element) => {
        const $elm = $(element);
 
        $elm.find('.r-photo-list > ul > li').each((index, photo) => {
          const url = $(photo)
            .find('img')
            .attr('src');
          photos.push(url);
        });
      });
    }
    await browser.close(); 
    return photos
  }

module.exports = getPhotos;


