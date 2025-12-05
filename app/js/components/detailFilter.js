export const detailFilter = () => {
    const filterButton = document.querySelectorAll(".detail__filter-button");
    const filterBody = document.querySelectorAll(".detail__filter-body");
    const filterTop = document.querySelector(".detail__filter-top");
    const currentActiveBtn = document.querySelector(".detail__filter-button.is-active");
    const dataFilterParent = document.querySelector(".detail__filter");

    if (!filterButton || !filterBody || !filterTop) return;

    const setPositionLine = (btn) => {
        let left = btn.offsetLeft ? btn.offsetLeft : 0;
        let width = btn.clientWidth ? btn.clientWidth : 0;


        filterTop.style.setProperty('--left', `${left}px`);
        filterTop.style.setProperty('--width', `${width}px`);

    }

    setPositionLine(currentActiveBtn);

    filterButton.forEach(btn => {
        btn.addEventListener("click", () => {
            setPositionLine(btn);
            const attrBtn = btn.getAttribute("data-type");

            filterButton.forEach(b => b.classList.remove("is-active"));
            btn.classList.add("is-active");

            filterBody.forEach(body => {
                const attrBody = body.getAttribute("data-type");

                if (attrBtn === attrBody) {
                    body.classList.add("is-active");
                } else {
                    body.classList.remove("is-active");
                }
            })
        });
    });


// let isDragging = false;
// let startY = 0;
// let startHeight = 70;

// document.addEventListener('DOMContentLoaded', function() {
//     const filterElement = document.querySelector(".detail__filter");
//     if (filterElement) {
//         filterElement.style.height = '70vh';
//         filterElement.style.transition = 'height 0.3s ease';
//     }
// });

// document.addEventListener('touchstart', function(e) {
//     if (e.target.closest('.detail__filter-bodys') || e.target.closest('.detail__filter-top')) return;
    
//     const filterElement = document.querySelector(".detail__filter");
//     if (!filterElement) return;
    
//     isDragging = true;
//     startY = e.touches[0].clientY;
    
//     const currentHeight = parseFloat(getComputedStyle(filterElement).height);
//     startHeight = (currentHeight / window.innerHeight) * 100;
    
//     filterElement.style.transition = 'none';
// }, { passive: true });

// document.addEventListener('touchmove', function(e) {
//     if (!isDragging || e.target.closest('.detail__filter-bodys')  || e.target.closest('.detail__filter-top')) return;
    
//     const filterElement = document.querySelector(".detail__filter");
//     if (!filterElement) return;
    
//     e.preventDefault();
    
//     const currentY = e.touches[0].clientY;
//     const deltaY = startY - currentY; // Инвертируем для интуитивного управления
//     const deltaVH = (deltaY / window.innerHeight) * 100;
    
//     let newHeight = startHeight + deltaVH;
//     newHeight = Math.max(20, Math.min(90, newHeight));
    
//     filterElement.style.height = newHeight + 'vh';
// }, { passive: false });

// document.addEventListener('touchend', function() {
//     if (!isDragging) return;
    
//     isDragging = false;
    
//     const filterElement = document.querySelector(".detail__filter");
//     if (!filterElement) return;
    
//     filterElement.style.transition = 'height 0.3s ease';
    
//     // Сохраняем текущую высоту без изменений
//     const currentHeight = parseFloat(getComputedStyle(filterElement).height);
//     const currentHeightVH = (currentHeight / window.innerHeight) * 100;
    
//     // Только корректируем если вышли за пределы
//     const finalHeight = Math.max(20, Math.min(90, currentHeightVH));
//     filterElement.style.height = finalHeight + 'vh';

//     if(finalHeight <= 20){
//         document.querySelector(".detail__filter-parent").classList.remove("is-open")
//         document.querySelector(".detail__filter").style.height = "70vh";
//     }
// }, { passive: true });

    let isDragging = false;
let startY = 0;
let startHeight = 70;
let filterElement = null;

document.addEventListener('DOMContentLoaded', function() {
    filterElement = document.querySelector(".detail__filter");
    if (filterElement) {
        filterElement.style.height = '70vh';
        filterElement.style.transition = 'height 0.3s ease';
    }
});

document.addEventListener('touchstart', function(e) {
    // Проверяем, кликнули ли мы на элементы с собственной прокруткой
    const isScrollableElement = e.target.closest('.detail__filter-bodys') || 
                                e.target.closest('.detail__filter-top');
    
    // Если кликнули на элемент с прокруткой - не начинаем перетаскивание
    if (isScrollableElement) return;
    
    // Проверяем, кликнули ли мы вообще на фильтр (но не на его внутренние скроллящиеся части)
    const clickedFilter = e.target.closest('.detail__filter');
    if (!clickedFilter) return;
    
    if (!filterElement) return;
    
    isDragging = true;
    startY = e.touches[0].clientY;
    
    const currentHeight = parseFloat(getComputedStyle(filterElement).height);
    startHeight = (currentHeight / window.innerHeight) * 100;
    
    filterElement.style.transition = 'none';
    
    // console.log('Начало перетаскивания фильтра');
}, { passive: true });

document.addEventListener('touchmove', function(e) {
    if (!isDragging || !filterElement) return;
    
    // Проверяем, не перемещаем ли мы палец по скроллящимся элементам
    const isScrollableElement = e.target.closest('.detail__filter-bodys') || 
                                e.target.closest('.detail__filter-top');
    
    // Если палец перемещается по скроллящемуся элементу - не блокируем
    if (isScrollableElement) {
        isDragging = false;
        return;
    }
    
    // Проверяем минимальное движение, чтобы случайно не блокировать мелкие касания
    const currentY = e.touches[0].clientY;
    const deltaY = Math.abs(startY - currentY);
    
    if (deltaY < 5) {
        // Слишком маленькое движение - возможно это начало скролла
        return;
    }
    
    // Блокируем нативную прокрутку только для изменения высоты фильтра
    e.preventDefault();
    
    const deltaYTotal = startY - currentY;
    const deltaVH = (deltaYTotal / window.innerHeight) * 100;
    
    let newHeight = startHeight + deltaVH;
    newHeight = Math.max(20, Math.min(90, newHeight));
    
    filterElement.style.height = newHeight + 'vh';
    
    // console.log(`Новая высота: ${newHeight}vh`);
}, { passive: false });

document.addEventListener('touchend', function() {
    if (!isDragging) return;
    
    isDragging = false;
    
    if (!filterElement) return;
    
    filterElement.style.transition = 'height 0.3s ease';
    
    // Сохраняем текущую высоту без изменений
    const currentHeight = parseFloat(getComputedStyle(filterElement).height);
    const currentHeightVH = (currentHeight / window.innerHeight) * 100;
    
    // Только корректируем если вышли за пределы
    const finalHeight = Math.max(20, Math.min(90, currentHeightVH));
    filterElement.style.height = finalHeight + 'vh';

    if(finalHeight <= 20){
        document.querySelector(".detail__filter-parent").classList.remove("is-open");
        filterElement.style.height = "70vh";
        // console.log('Фильтр закрыт');
    }
    
    // console.log(`Фильтр установлен на ${finalHeight}vh`);
}, { passive: true });

// ДОПОЛНИТЕЛЬНО: Обработка скролла внутри .detail__filter-bodys
document.querySelector('.detail__filter-bodys')?.addEventListener('touchstart', function(e) {
    // Разрешаем скролл внутри этого элемента
    e.stopPropagation();
}, { passive: true });

document.querySelector('.detail__filter-bodys')?.addEventListener('touchmove', function(e) {
    // Разрешаем скролл внутри этого элемента
    e.stopPropagation();
}, { passive: true });

// ДОПОЛНИТЕЛЬНО: Обработка скролла внутри .detail__filter-top
document.querySelector('.detail__filter-top')?.addEventListener('touchstart', function(e) {
    // Разрешаем скролл внутри этого элемента
    e.stopPropagation();
}, { passive: true });

document.querySelector('.detail__filter-top')?.addEventListener('touchmove', function(e) {
    // Разрешаем скролл внутри этого элемента
    e.stopPropagation();
}, { passive: true });
}