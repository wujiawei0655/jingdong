window.onload = function () {
    // let big = document.querySelector('.big')
    // console.log(big);

    class enlarge {
        constructor(ele) {
            this.ele = ele
            this.init()
            this.change()
        }

        init() {
            this.big = $(this.ele);
            this.show = $('#main .img');
            this.mask = $('.mask');
            this.enlarge = $('.enlarge')
            this.p = $('.img_list img')

            // console.log(this.p.attr('bigImg'));


            // console.log(this.show.find('img').attr('bigImg'));

            //鼠标移入事件
            this.show.mouseover(() => {
                this.mask.css({
                    display: 'block'
                })
                this.enlarge.css({
                    display: 'block'
                })
            })

            //鼠标移出事件
            this.show.mouseout(() => {
                this.mask.css({
                    display: 'none'
                })
                this.enlarge.css({
                    display: 'none'
                })
            })

            // 鼠标移动事件
            this.show.mousemove((e) => {
                this.move(e)
                this.get()
            })
        }

        //放大镜盒子的大小
        get() {
            //  mask/show==盒子大小/放大图大小
            let res = this.enlarge.css('backgroundSize')
            this.bgx = parseInt(res.split(' ')[0])
            this.bgy = parseInt(res.split(' ')[1])
            this.X = this.mask.width() * this.bgx / this.show.width()
            this.Y = this.mask.height() * this.bgy / this.show.height()

            this.enlarge.width(this.X)
            this.enlarge.height(this.Y)
        }
        //移动函数
        move(e) {
            //mask盒子移动得左右值

            let left = e.clientX - 120 - this.mask.width() / 2;
            let top = e.pageY - 270 - this.mask.height() / 2;


            if (left <= 0) {
                left = 0
            }

            if (left >= this.show.width() - this.mask.width()) {
                left = this.show.width() - this.mask.width()
            }

            if (top <= 0) {
                top = 0
            }


            if (top >= this.show.height() - this.mask.height()) {
                top = this.show.height() - this.mask.height()
            }
            this.mask.css({
                position: 'absolute',
                left: left,
                top: top
            })

            //  mask移动的距离/show的大小==position属性/enlarge大小
            let x = left * this.bgx / this.show.width()
            let y = top * this.bgy / this.show.height()

            //放大的图片移动
            this.enlarge.css({
                backgroundPositionX: -x,
                backgroundPositionY: -y,
                backgroundImage: `url(${this.p.attr('bigImg')})`
            })

        }


        change() {
            this.p.click(function () {
                $(this).addClass('active').siblings().removeClass('active')


                let big = $(this).attr('bigImg');

                $('.enlarge').css({
                    backgroundImage: `url(${big})`
                })
            })
        }
    }

    new enlarge('.big')
}

