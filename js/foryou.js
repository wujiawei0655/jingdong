let detali = document.querySelector('.detali');
var n = 0;
// $detali = $('.detali');

anxu()

function anxu() {
    let limit = 21;
    let page = (limit - 1) * n;
    $.ajax({
        type: 'post',
        url: '../php/foryou.php',
        data: {
            'page': page,
            'limit': limit
        },
        async: true,
        success: function (data) {

            let res = JSON.parse(data);
            // console.log(res);
            read(res)
        }
    })
}


function read(res) {
    let str = '';
    res.forEach(item => {
        str = `<div class="del_good" idx=${item.goods_id}>
        <img src=${item.goods_small_logo} alt="">
        <p>${item.goods_name}</p>
        <span class="money"><i>￥</i>${item.goods_price}</span>
        <div class="like"><div>找相似</div>
    </div>`
        detali.innerHTML += str;
        n++;
    })
}


$(window).scroll(function () {
    var scroH = $(window).scrollTop(); //滚动高度
        if (scroH > 2800) {
            anxu()
    }
})