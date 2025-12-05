export const createSlider = () => {
    // массив всех слайдеров
    // для создания простых слайдеров без сложной логики
    const sliders = [
        // пример слайдера
        [
            document.querySelector(".banner__slider"),
            {
                direction: 'horizontal',
                loop: true,
                slidesPerView: 1,
                spaceBetween: 0,

                autoplay: {
                    delay: 5000,
                },

                speed: 700,

                pagination: {
                    el: '.banner__slider-pagination',
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active',
                },

                effect: 'fade',
                fadeEffect: {
                    crossFade: true,
                },
                simulateTouch: true,
                allowTouchMove: true,
                shortSwipes: true,
                longSwipes: true,
                // Добавьте обработчики событий
                on: {
                    init: function () {
                        this.pagination.bullets.forEach((bullet, index) => {
                            bullet.style.pointerEvents = 'auto';
                            bullet.addEventListener('click', () => {
                                this.slideTo(index);
                            });
                        });
                    },
                    slideChange: function () {
                        // Обновляем состояние пагинации
                        this.pagination.update();
                    }
                }
            }
        ],
    ]
    // функция конструктор для создания сладеров
    const createSlider = (node, options) => {
        if (node && options) {
            const swiper = new Swiper(node, options);
        }
        else {
            console.error("Ошибка генерации слайдера");
        }
    }
    // вызов конструктора для слайдеров
    if (sliders && sliders.length) {
        sliders.forEach(slider => {
            const sliderNode = slider[0];
            const sliderOptions = slider[1];

            if (sliderNode && sliderOptions) {
                createSlider(sliderNode, sliderOptions);
            }
            else { // опционально лучще выключить при окончании разработки чтобы в консоли не было лишних сообщений
                console.error(`Ошибка генерации, нету одной из двух частей слайдера: slider - ${sliderNode}, список опций - ${sliderOptions}`)
            }
        });
    }
}

export const mainSlider = () => {
    const mainSliderNode = document.querySelectorAll(".main-slider");

    if(!mainSliderNode) return;

    mainSliderNode.forEach(slider=>{
        const swiper = new Swiper(slider, {
            direction: 'horizontal',
            loop: false,
            speed: 200,
            slidesPerView: 3,
            spaceBetween: 20,

            scrollbar: {
                el: slider.querySelector(".main-slider__scrollbar"),
                hide: false,
                draggable: true,
            },
            navigation: {
                nextEl:slider.querySelector(".main-slider__slider-btn_next"),
                prevEl:slider.querySelector(".main-slider__slider-btn_prev")
            },
            breakpoints: {
                481:{
                    slidesPerView: 3,
                },
                280:{
                    slidesPerView: 1,
                }
            }
        });
    });
}