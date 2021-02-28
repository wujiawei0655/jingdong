let btn = document.querySelector('.btn')
// console.log(btn);



let id = document.querySelector('#name');
let pwd = document.querySelector('#password');

// console.log(id, pwd);


btn.onclick = function () {
    pAjax({
        type: 'post',
        url: '../php/login.php',
        data: {
            username: id.value,
            password: pwd.value
        }
    }).then(res => {
        res = JSON.parse(res);
        if (res.code == 1) {
            // 登录成功存储 登录的状态
            setCookie('login', id.value);
            // 跳转页面 如果从购物车过来的时候登录成功去购物车页面
            // 否则就去到首页
            let url = localStorage.getItem('url');
            if (url) {
                location.href = url;
                // 登录成功的时候把url的这个localstorage值清除
                localStorage.removeItem('url');
            } else {
                location.href = '../index1.html';
            }
        }
    })
}