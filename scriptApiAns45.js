'use strict';

/***********************************************************************************************************************************************/
/** 振返 DOM追加, アニメーション設定 ************************************************************************************************************************************/
/***********************************************************************************************************************************************/

/**
 * ボタンクリック時の処理です
 * @param {HTMLElement} element DOM属性(クリックしたボタン)
 */
function onClickBtn1(element) {

    // input1 のDOM の 入力値を取得
    let input1 = document.getElementById('input1').value;
    // input1 を表示するDOMを生成
    let divElement = createDivElement('scriptApi ' + '実行!!' + input1);
    // work1 の DOM に input1 を表示する DOM を追加
    document.getElementById('work1').append(divElement);
}

/**
 * text を表示する DOM属性(div) を生成します
 * @param {String} text 文字列
 * @param {String} backgroundColor 背景色
 * @return {HTMLElement} DOM属性(div)
 */
function createDivElement(text, backgroundColor = 'skyblue') {
    // div の DOM を生成
    let element = document.createElement('div');
    // text を設定
    element.innerText = text;
    // 背景色 を設定
    element.style.backgroundColor = backgroundColor;
    // アニメーションを設定
    setAnimat(element);
    // クリック時のアニメーションを設定
    setAnimatOnclic(element);
    // 生成した DOM を返す
    return element;
}

/**
 * DOMにアニメーションを設定します
 * @param {HTMLElement} element DOM属性
 */
function setAnimat(element) {
    element.animate(
        {
            backgroundColor: ['white', element.style.backgroundColor]
            , transform: ['rotateX(0deg)', 'rotateX(360deg)']
        }
        , {
            duration: 2000,
            iterations: 1
        }
    );
}

/**
 * DOMにクリック時のアニメーションを設定します
 * @param {HTMLElement} element DOM属性
 */
function setAnimatOnclic(element) {
    element.addEventListener('click', () => {
        element.animate(
            {
                backgroundColor: ['white', element.style.backgroundColor]
                , width: ['50%', '100%']
                , opacity: [0.2, 1]
            }
            , {
                duration: 1000,
                iterations: 1
            }
        );
    });
}

/***********************************************************************************************************************************************/
/** Web API ************************************************************************************************************************************/
/***********************************************************************************************************************************************/

/**
 * api を実行して json を処理します
 * @param {String} url リクエストURL
 * @param {function}} functionJson json に対する処理
 * @param {Array} params リクエストURL実行時のパラメータ
 * @param {Array} options リクエストURL実行時のオプション
 */
function apiJson(url, functionJson, params = {}, options = {}) {
    let requestUrl = url;
    if (!params?.length) {
        requestUrl = url + '?' + new URLSearchParams(params);
    }
    fetch(requestUrl, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status + ':' + response.statusText);
            }
            return response.json();
        })
        .then(json => functionJson(json))
        .catch((error) => {
            console.log(error);
            alert(error)
        });
}

/**
 * 人情報取得 api を実行して work1 に画像を表示
 */
window.addEventListener('load', (e) => {
    let url = 'https://randomuser.me/api';
    // params はなくてもOK
    let params = {
        results: 2
    }
    apiJson(url
        , (json) => {
            // ここに処理を記載
            console.log(json);
            let img = document.createElement('img')
            img.src = json.results[0].picture.large;
            img.height = 150;
            document.querySelector('#work1').append(img);
        }
        , params); // params ない時は引数も不要

    // param 不要のときの参考
    // let url = 'https://randomuser.me/api';
    // apiJson(url
    //     , (json) => {
    //         console.log(json);
    //         let img = document.createElement('img')
    //         img.src = json.results[0].picture.large;
    //         img.height = 150;
    //         document.querySelector('#work1').append(img);
    //     });

});

/**
 * ボタン押下時に人情報取得 api を実行して json の情報を work1 に出力します
 * (パラメータなし)
 */
function onClickBtn2(element) {

    let requestUrl = 'https://randomuser.me/api';
    fetch(requestUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status + ':' + response.statusText);
            }
            return response.json();
        })
        .then(json => {
            console.log(json);
            document.querySelector('#work1').textContent = JSON.stringify(json);
        })
        .catch((error) => {
            console.log(error);
            alert(error)
        });
}

/**
 * ボタン押下時に人情報取得 api を実行して json の情報を work1 に出力します
 * (パラメータあり)
 */
function onClickBtn3(element) {

    let params = {
        gender: 'female'
        , results: 4
    }
    let requestUrl = 'https://randomuser.me/api' + '?' + new URLSearchParams(params);

    fetch(requestUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status + ':' + response.statusText);
            }
            return response.json();
        })
        .then(json => {
            console.log(json);
            document.querySelector('#work1').textContent = JSON.stringify(json);
        })
        .catch((error) => {
            console.log(error);
            alert(error)
        });
}

/**
 * ボタン押下時に キツネ画像取得 api を実行して以下をおこなう
 * ・json の情報を log 出力
 * ・取得した画像を work1 に表示(画像のDOM生成は122-125行目参照)
 * 
 * # キツネ画像取得のURL(パラメータ不要)
 * https://randomfox.ca/floof/
 */
function onClickBtn4() {
    let url = 'https://randomfox.ca/floof/';
    apiJson(url
        , (json) => {
            console.log(json);
            let img = document.createElement('img')
            img.src = json.image;
            img.height = 150;
            document.querySelector('#work1').append(img);
        });
}

/**
 * ボタン押下時に input1 の入力に応じて api を実行して 4 と同じ処理をおこなう
 * ・input1 の入力 : api の URL(すべてパラメータは不要)
 * 　cat : https://aws.random.cat/meow
 *   fox : https://randomfox.ca/floof/
 *   person : https://randomuser.me/api  ※パラメータ指定してもOK
 */
function onClickBtn5() {
    let input1 = document.querySelector("#input1").value;
    if (input1 === 'cat') {
        let url = 'https://aws.random.cat/meow';
        apiJson(url
            , (json) => {
                console.log(json);
                let img = document.createElement('img')
                img.src = json.file;
                img.height = 150;
                document.querySelector('#work1').append(img);
            });
    } else if (input1 === 'fox') {
        let url = 'https://randomfox.ca/floof/';
        apiJson(url
            , (json) => {
                console.log(json);
                let img = document.createElement('img')
                img.src = json.image;
                img.height = 150;
                document.querySelector('#work1').append(img);
            });
    } else if (input1 === 'person') {
        let url = 'https://randomuser.me/api';
        apiJson(url
            , (json) => {
                console.log(json);
                let img = document.createElement('img')
                img.src = json.results[0].picture.large;
                img.height = 150;
                document.querySelector('#work1').append(img);
            });
    } else {
        alert('入力は cat / fox / person でお願いします');
    }
}

/**
 * ボタン押下時に 天気情報取得 api を実行して天気を表示してみよう
 * 
 * # 天気情報取得 api OpenWeatherMapのURL, パラメータ例
 * 1日：https://api.openweathermap.org/data/2.5/weather
 * 1週間：https://api.openweathermap.org/data/2.5/forecast
 * 
 * - パラメータ
 * let params = {
 * 　　　appid : '取得した API キー'
 * 　　, units: 'metric'
 *     , lang: 'ja'
 *     , q: '検索都市名' ex)chiba
 * };
 */
function onClickBtn6() {
}

/**
 * ボタン押下時に Pixabay api を実行して画像を表示してみよう
 * 
 * # Pixabay api URL, パラメータ例
 * https://pixabay.com/api/
 * 
 * - パラメータ
 * let params = {
 * 　　　key : '取得した API キー'
 * 　　, units: 'metric'
 *     , lang: 'ja'
 *     , q: '検索ワード'
 * };
 */
function onClickBtn7() {
}
