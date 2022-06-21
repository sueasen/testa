'use strict';

apiPerson();
apiPersonAsync();

/**
 * 人情報取得 api を実行して json を処理します
 */
function apiPerson() {

    fetch('https://randomuser.me/api')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status + ':' + response.statusText);
            }
            return response.json();
        })
        .then(json => {
            console.log(json);
            appendPerson(json, document.getElementById('work1'));
        })
        .catch((error) => {
            console.log(error);
            alert(error)
        });
}

/**
 * 人情報取得結果 json を element に追加します
 * @param {JSON} json 人情報Json
 * @param {Element} element 情報追加するDOM
 */
function appendPerson(json, element) {
    let img = document.createElement('img')
    img.src = json.results[0].picture.large;

    element.innerHTML = '';
    element.append(img);
}


/**
 * 人情報取得 api を実行して json を処理します
 */
async function apiPersonAsync() {
    let json = await apiJsonAsync('https://randomuser.me/api');

    console.log(json);
    appendPerson(json, document.getElementById('work2'));
}

/**
 * api を実行して json を返します
 * @param {String} requestUrl リクエストURL
 * @param {Array} options リクエストURL実行時のオプション
 * @returns json結果
 */
async function apiJsonAsync(requestUrl, options = {}) {
    let json = await fetch(requestUrl, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status + ':' + response.statusText);
            }
            return response.json();
        })
        .catch((error) => {
            console.log(error);
            alert(error)
        });
    return json;
}

