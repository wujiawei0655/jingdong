//  轮播
var swiper0 = new Swiper('.swiper-container', {
    grabCursor: true,
    // autoplay: {
    //     delay: 2000,
    //     stopOnLastSlide: false,
    //     disableOnInteraction: false,
    // },
    //  mousewheel: true,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    keyboard: {
        enabled: true,
    },
    pagination: {
        el: '.swiper-container .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-container .swiper-button-next',
        prevEl: '.swiper-container .swiper-button-prev',
    },

});

var Swiper1 = new Swiper('#swiper-container1', {
    loop: true
});
var Swiper3 = new Swiper('#swiper-container3', {
    loop: true
})

var Swiper2 = new Swiper('#swiper-container2', {
    loop: true,
    // autoplay: {
    //     delay: 500,
    //     stopOnLastSlide: false,
    //     disableOnInteraction: false,
    // },
    controller: {
        control: [Swiper1, Swiper3], //控制Swiper1和Swiper2
    },
    navigation: {
        nextEl: '#swiper-container2 .swiper-button-next',
        prevEl: '#swiper-container2 .swiper-button-prev',
    },
})


// 倒计时

showTime();

function showTime() {
    var endtime = new Date("2021/02/23,00:00:00") //结束时间
    var nowtime = new Date(); //获取当前时间
    var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
    // var d = parseInt(lefttime / (24 * 60 * 60));
    var h = parseInt(lefttime / (60 * 60) % 24);
    var m = parseInt(lefttime / 60 % 60);
    var s = (lefttime % 60);
    document.querySelector('.hour').innerHTML = h
    document.querySelector('.min').innerHTML = m
    document.querySelector('.second').innerHTML = s
    setTimeout(showTime, 1000);
}


//下方轮播
var swiper4 = new Swiper('#shouji', {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: '#shouji .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '#shouji .swiper-button-next',
        prevEl: '#shouji .swiper-button-prev',
    },
});

//右侧导航
let r_nav = $('.r_nav');
let li = $('.r_nav li');
let last = $('.r_nav .last')

// 回到顶部
last.click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 600);

})

$('.r_nav_nianhuo').click(function () {
    $('body,html').animate({
        scrollTop: 1300
    }, 600);

})

$('.r_nav .three').click(function () {
    $('body,html').animate({
        scrollTop: 2000
    }, 600);

})

$('.r_nav .one').click(function () {
    $('body,html').animate({
        scrollTop: 700
    }, 600);
})

$('.r_nav .four').click(function () {
    $('body,html').animate({
        scrollTop: 2700
    }, 600);
})



window.onscroll = function () {
    if (scrollY >= 700) {
        // $('.r_nav .one span').css({
        //     color: 'red'
        // })
        r_nav.fadeIn();

    }
    if (scrollY >= 1900) {

    } else if (scrollY <700) {
        r_nav.fadeOut();
    }
    console.log(scrollY);
}

// 特色优选ajax
async function gets() {
    let data = await pAjax({
        url: '../php/teseyouxuan.php',
    })
    data = JSON.parse(data)
    // console.log(data);
    rendertwo(data)
}
gets()

let goods_list = document.querySelector('.main_tese .goods_list')

function rendertwo(data) {
    let str = ''
    data.forEach(item => {
        str += `<a href="#" class="good">
        <div class="good_name">${item.cat_id}</div>
        <div class="good_img">
            <div class="img">
                <img src="${item.goods_small_logo}" alt="${item.cat_id}" height=150px>
            </div>
        </div>
    </a>`
    })
    goods_list.innerHTML = str + str
}
let x = 0
let timer = setInterval(function () {
    goods_list.style.transform = "translate" + "(" + `${-x}` + "px" + ")"
    x += 1
    if (x == 2000) {
        goods_list.style.transform = "translate" + "(" + 0 + "px" + ")"
        x = 0
    }
}, 20)

// goods_list.onmouseenter=function(){
//     clearInterval(timer)
// }



// 年货ajax
async function get() {
    let data = await pAjax({
        url: '../php/nianhuo.php',
    })
    data = JSON.parse(data)
    // console.log(data);
    render(data)
}
get()

let con = document.querySelector('#main .con')

function render(data) {
    let str = ''
    data.forEach(item => {
        str += `<div class="nianhuo_list fl">
        <div>
            <img src="${item.goods_big_logo}">
        </div>
        <div style="background-color: #ffecba; ">
            <h3>${item.cat_one_id}</h3>
            <p>${item.goods_price}</p>
        </div>
    </div> `
    })
    con.innerHTML = str
    // console.log(data);
}

// 排行榜的table变换
let a = $('.main_tese .jd_container .box1 .head a');
a.mouseover(function () {
    $(this).addClass('active').siblings().removeClass('active')
});


// 新品首发轮播
window.onload = function () {
    let swiper = new Swiper('.pc-banner .swiper-container', {
        autoplay: 3000,
        speed: 1000,
        autoplayDisableOnInteraction: false,
        loop: true,
        centeredSlides: true,
        slidesPerView: 2,
        pagination: '.pc-banner .swiper-pagination',
        paginationClickable: true,
        // prevButton: '.pc-banner .swiper-button-prev',
        // nextButton: '.pc-banner .swiper-button-next',
        onInit: function (swiper) {
            swiper.slides[2].className = ".pc-banner swiper-slide swiper-slide-active"; //第一次打开不要动画
        },
        breakpoints: {
            668: {
                slidesPerView: 1,
            }
        }
    });
}