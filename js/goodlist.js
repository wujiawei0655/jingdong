let list = document.querySelector(".list");
let page = document.querySelector('.page');

// console.log(list, page);

let defaultInfo = {
    len: 25,
    num: 1
}
pAjax({
    url: '../php/getData.php',
    data: {
        start: defaultInfo.num,
        len: defaultInfo.len
    }
}).then((res) => {
    res = JSON.parse(res);
    new Pagination(page, {
        pageInfo: {
            pagenum: 1,
            pagesize: defaultInfo.len,
            total: res.total,
            totalpage: Math.ceil(res.total / defaultInfo.len)
        },
        textInfo: {
            first: 'hpage',
            prev: 'pevious',
            list: '',
            next: 'next',
            last: 'last'
        },
        change: function (num) {
            defaultInfo.num = num;
            getData();
            scrollTo(0, 0)
        }
    });
})

async function getData() {
    let res = await pAjax({
        url: '../php/getData.php',
        data: {
            start: defaultInfo.num,
            len: defaultInfo.len
        }
    });
    res = JSON.parse(res)
    renderHtml(res.list);
}

function renderHtml(data) {
    let str = '';

    data.forEach((item) => {
        str += ` <div class="row"  id=${item.goods_id}>
        <img src="${item.goods_small_logo}" alt="">
        <div class="cap">
            <span class="god">好评率95%</span>
            <h3 class="con">
               ${item.goods_name}
            </h3>
            <i class="glyphicon glyphicon-yen"></i>
            <span class="price">${item.goods_price}</span>
        </div>
    </div>`;
    })

    list.innerHTML = str;
}





let search = $('#search');
let middle = $('.middle_con');
// console.log(search);
window.onscroll = function () {
    if (scrollY >= 40) {
        middle.css({
                height: 100
            }),
            search.css({
                position: 'fixed',
                top: 0
            })
    } else {
        middle.css({
                height: 0
            }),
            search.css({
                position: '',
            })
    }
}


list.onclick = e => {
    if (e.target.nodeName == "IMG") {
        location.href = `../html/detail.html?id=${e.target.parentNode.getAttribute("id")}`
        // console.log(e.target.parentNode.getAttribute("id"));
    }
}


let to_car = document.querySelector('.to_car');
let login = getCookie('login');
to_car.onclick = function () {
    let login = getCookie('login');
    if (!login) {
        localStorage.setItem('url', location.href);
        location.href = '../html/car.html';
    }

    if (login) {
        location.href = '../html/car.html';
    }
}


let count = document.querySelector('.to_car .count');
console.log(count);


async function getCount() {
    let res = await pAjax({
        url: '../php/getCarData.php',
        data: {
            userName: login
        }
    });
    res = JSON.parse(res)
    let count_num = res.reduce((pre, cur) => {
        return pre + cur.goods_num * 1;
    }, 0);
    // console.log(count);
    count.innerHTML = count_num
}

getCount()