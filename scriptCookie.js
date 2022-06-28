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
    let divElement = createDivElement('scriptCookie ' + '実行!!' + input1);
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
/** cookie, storage ************************************************************************************************************************************/
/***********************************************************************************************************************************************/

/**
 * ボタンクリック時に cookie, storage を操作をする
 * @param {HTMLElement} element DOM属性(クリックしたボタン)
 */
function onClickBtn2(element) {
    // cookie に情報を追加して work1 に値を表示
    document.cookie = 'key1=値1';
    document.cookie = 'key2=値2;max-age=10'; // max-ageは秒数
    let divElement1 = createDivElement(document.cookie);
    document.querySelector('#work1').appendChild(divElement1);
    console.log(document.cookie);

    // cookie の情報を全件 key = value で work1 に表示
    document.cookie.split(';').forEach(c => { // ; で分割
        let [k, v] = c.split('=');
        console.log(k + ':' + v);
        // key にはスペース入ってくるので trim する
        let divElement11 = createDivElement(k.trim() + ':' + v);
        document.querySelector('#work1').appendChild(divElement11);
    });

    // cookie の情報から key が一致する value を work1 に表示
    document.cookie.split(';').forEach(c => { // ; で分割
        let [k, v] = c.split('=');
        // key にはスペース入ってくるので trim する
        if (k.trim() === 'key2') {
            let divElement12 = createDivElement(k.trim() + ':' + v);
            document.querySelector('#work1').appendChild(divElement12);
        }
    });

    // storage に情報を追加して work1 に値を表示
    localStorage.setItem('key1', '値1');
    localStorage.setItem('key2', '値2');
    let divElement2 = createDivElement(Object.entries(localStorage), 'pink');
    document.querySelector('#work1').appendChild(divElement2);
    console.log(localStorage);

    // storage の情報を全件 key = value の形で work1 に表示
    for (const [k, v] of Object.entries(localStorage)) {
        console.log(k + ':' + v);
        let divElement21 = createDivElement(k + ':' + v, 'pink');
        document.querySelector('#work1').appendChild(divElement21);
    }

    // storage の情報から key が一致する value を work1 に表示
    let value = localStorage.getItem('key2')
    let divElement22 = createDivElement('key2' + ':' + value, 'pink');
    document.querySelector('#work1').appendChild(divElement22);

    // storage key 指定クリア
    localStorage.removeItem('key1');
    console.log(localStorage.getItem('key1'));

    // storage 全クリア
    localStorage.clear();
    console.log(localStorage);
}

/**
 * ボタンクリック時に以下の処理をする
 * ・cookie操作
 *   - cookie に以下3つを設定
 * 　　- test1 = 'cookie設定した1'
 * 　　- test2 = 'cookie設定した2'
 * 　　- test3 = 'cookie設定した3' (max-age=15)
 *   - wokr1 に cookie から test2 の値を取得して表示
 */
function onClickBtn3(element) {
    document.cookie = 'test1=cookie設定した1';
    document.cookie = 'test2=cookie設定した2';
    document.cookie = 'test3=cookie設定した3;max-age=15';

    document.cookie.split(';').forEach(c => {
        let [k, v] = c.split('=');
        if (k.trim() === 'test2') {
            let divElement = createDivElement(k.trim() + ':' + v);
            document.querySelector('#work1').appendChild(divElement);
        }
    });
}

/**
 * ボタンクリック時に以下の処理をする
 * ・storage操作
 *   - local storage に以下3つを設定
 * 　　- test1 = 'storage設定した1'
 * 　　- test2 = 'storage設定した2'
 * 　　- test3 = 'storage設定した3'
 *   - wokr1 に local storage から test3 の値を取得して表示
 */
function onClickBtn4(element) {
    localStorage.setItem('test1', 'storage設定した1');
    localStorage.setItem('test2', 'storage設定した2');
    localStorage.setItem('test3', 'storage設定した3');

    let value = localStorage.getItem('test2')
    let divElement = createDivElement('test2' + ':' + value, 'pink');
    document.querySelector('#work1').appendChild(divElement);
}


/**
 * ボタンクリック時に cookie を利用してパネルの表示を削除しよう
 */
window.addEventListener('load', (e) => {
    let panel = document.createElement('div');
    panel.id = "privacy-panel";
    let text = document.createElement('p');
    text.textContent = 'ユーザーエクスペリエンス向上のためクッキーを使用しています。匿名でアクセス状況のデータを収集しています。';
    let button = document.createElement('button');
    button.id = 'agreebtn';
    button.textContent = '承認する'
    panel.append(text);
    panel.append(button);
    document.body.append(panel);

    // 追加したボタンのクリックで以下の処理を追加
    // ・cookie に aggree = yes を設定 (max-age=5)
    button.addEventListener("click", () => {
        document.cookie = 'aggree=yes;max-age=5'

    });

    // 定期的(300ミリ秒)に以下の処理を追加
    // ・cookie を確認し aggree に yes が設定されてれば panel を削除する
    // 　※ panel の削除方法：panel.remove()
    // ・panel を削除後、定期的に行ってる処理を停止する
    //   ※ 定期的に行ってる処理を停止する方法：clearInterval(id)
    //   　 id は setInterval を作成したときの戻り値
    let id = setInterval(
        () => {
            document.cookie.split(';').forEach(c => {
                let [k, v] = c.split('=');
                if (k.trim() === 'aggree' && v === 'yes') {
                    panel.remove();
                    clearInterval(id);
                }
            });
        }
        , 300
    )
});
