// 打开详情页的时候先查看是否有携带id参数
// 如果没有id参数的时候 跳转到列表 
// 如果有id参数的时候 根据id去获取对象的数据 渲染

// http://gz2008.com/day06_code/project/html/detail.html?id=4
let reg = /id=(\d+)/;
if (!reg.test(location.search)) {
    location.href = '../html/goodlist.html'
}
let id = reg.exec(location.search)[1];

let container = document.querySelector('.main');
let ins = document.querySelector('#ins');
let goods_detail = document.querySelector('.goods_detail');

// 根据id获取数据
pAjax({
    url: '../php/detail.php',
    data: {
        id
    }
}).then(res => {
    res = JSON.parse(res);
    renderHtml(res.detail)
    inso(res.detail)
    gd(res.detail)
    // console.log(res.detail);
})


function renderHtml(data) {
    container.innerHTML = `
    <div class="big fl">
    <div class="img">
        <img src=${data.goods_big_logo} alt="">
        <i></i>
        <div class="mask"></div>
    </div>
    <div class="enlarge"></div>
    <div class="img_list">
    <i class="front"></i>
        <img src=${data.goods_small_logo} alt="" class="active" bigImg=${data.goods_big_logo}>
        <img src=${data.goods_small_logo} alt="" bigImg=${data.goods_big_logo}>
        <img src=${data.goods_small_logo} alt="" bigImg=${data.goods_big_logo}>
    <i class="last"></i>
    </div>
</div>

<div class="deli fl">
    <h3 class="title">
        <img src="../img/new.png">
        ${data.goods_name}
    </h3>
    <h5>
        【品质好物】小金刚品质保证，天玑800U处理器【note95G火热抢购中】
    </h5>
    <div class="price">
        <span class="one">京东价</span>
        <i>￥</i>
        <span class="two">${data.goods_price}</span>
    </div>

    <div class="work">
        <span>
            <i></i>
            增值业务
        </span>
        <span>高价回收，急速到账</span>
    </div>
    <div class="tip">
        温馨提示：7天无理由退货，合约版不支持
    </div>
    <div class="insert_car">
        <button class="btn btn_w btn_lg" id="goCar">查看购物车</button>
        <button class="btn btn_d btn_lg" id="addCar">加入购物车</button>
    </div>

    <div class="info">
        <span class="info_1">
            <i class="one"></i>
            <em>关注</em>
        </span>
        <span class="info_2">
            <i class="two"></i>
            <em>分享</em>
        </span>
        <span class="info_3">
            <i class="three"></i>
            <em>对比</em>
        </span>
    </div>
</div>
`

}


function inso(res) {
    ins.innerHTML = `
    <div class="ins content">
            <div class="left fl">
                <span>${res.cat_one_id}</span>
                <span>${res.cat_three_id}</span>
                <span>${res.cat_two_id}</span>
            </div>

            <div class="right fl">
                <em>自营</em>
                <span>京东自营旗舰店</span>
                <span><i></i>联系客服</span>
                <span><i></i>关注店铺</span>
            </div>
        </div> `
}

function gd(res) {
    goods_detail.innerHTML = ` 
    <div class="goods_detail">
        ${res.goods_introduce}
</div>
`
}



container.onclick = function () {
    let e = window.event;
    if (e.target.id == 'goCar') {
        location.href = '../html/car.html'
    }

    if (e.target.id == 'addCar') {
        // alert('添加购物车')
        // 把当前这个条商品的goods_id ，用户名 ，goods_num 添加到 购物车的表
        // goods_id = id
        // userName = getCookie('login)  如果没有登录的时候 不能添加数据，提示进行登录
        // goods_num  判断这个用户对应的这个goods_id 是否已经存在，如果存在 goods_num++，如果不存在操作添加商品到购物车，其中 goods_num = 1


        let login = getCookie('login');
        if (!login) {
            alert('没有登录请到登录页面进行登录');
            localStorage.setItem('url', location.href);
            location.href = '../html/login.html';
            return
        }

        // 发添加购物车的ajax请求
        pAjax({
            url: '../php/addCar.php',
            type: 'post',
            data: {
                'goods_id': id,
                'userName': login
            }
        }).then(function (res) {
            console.log(res);
        })
    }
}