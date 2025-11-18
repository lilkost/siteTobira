export const filterCatalog = () =>{
    const btnReset = document.querySelector(".catalog__filter-reset");
    const accordion = document.querySelectorAll(".catalog__filter-accordion");

    if (btnReset) {// перезагрузка страницы
        btnReset.addEventListener("click", () => window.location.reload());
    }

    if (accordion) {
        // Обработчик клика по документу
        document.addEventListener('click', (e) => {
            let isClickInsideAccordion = false;

            // Проверяем, был ли клик внутри любого аккордеона
            accordion.forEach(acc => {
                if (acc.contains(e.target)) {
                    isClickInsideAccordion = true;
                }
            });

            // Если клик был вне всех аккордеонов - закрываем их
            if (!isClickInsideAccordion) {
                accordion.forEach(a => {
                    a.classList.remove("is-active");
                });
            }
        });

        // Обработчик клика по заголовкам аккордеона
        accordion.forEach(acc => {
            const accordionTop = acc.querySelector(".catalog__filter-accordion-top");

            accordionTop.addEventListener("click", (e) => {
                e.stopPropagation(); // Останавливаем всплытие, чтобы клик не дошел до document

                accordion.forEach(a => {
                    if (a != acc) a.classList.remove("is-active");
                    if (a == acc) a.classList.toggle("is-active");
                });
            });
        });
    }
}