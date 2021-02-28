let list = document.querySelector('.main_tese .jd_container .box1 .head .one');
// console.log(list);

let list2 = document.querySelector('.main_tese .jd_container .box1 .head .two');

list.onmouseover = function () {
    async function get() {
        let data = await pAjax({
            type: 'post',
            data: 'goods_price=29.00',
            url: '../php/tese_paihang.php',
        })
        data = JSON.parse(data)
        // console.log(data);
        reden(data)
    }
    get()
}
let paihang = document.querySelector('.paihang')

function reden(data) {
    let str = '';
    for (let n = 0; n < 3; n++) {
        str += `
        <div class="top">
            <img src="./img/top1.png" alt="">
            <img src="${data[n].goods_small_logo}" alt="">
            <span>${data[n].goods_name}</span>
        </div>  
    `
    }
    paihang.innerHTML = str
}


list2.onmouseover = function () {
    async function get() {
        let data = await pAjax({
            type: 'post',
            data: 'goods_price=88.00',
            url: '../php/tese_paihang.php',
        })
        data = JSON.parse(data)
        // console.log(data);
        reden(data)
    }
    get()
}