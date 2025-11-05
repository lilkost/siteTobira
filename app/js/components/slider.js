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
                effect: "fade",
                speed: 500,
                pagination: {
                    el: '.banner__slider-pagination',
                    type: 'bullets',
                    clickable: true,
                },
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