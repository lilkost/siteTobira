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
    // Проверяем, кликнули ли мы на сам фильтр или его заголовок
    const isFilterTop = e.target.closest('.detail__filter-top');
    const isFilterBody = e.target.closest('.detail__filter-bodys');
    
    // Если кликнули не на фильтр - не начинаем перетаскивание
    if (!isFilterTop && !isFilterBody) {
        // Проверяем, кликнули ли мы вообще на фильтр
        const clickedFilter = e.target.closest('.detail__filter');
        if (!clickedFilter) return;
    }
    
    if (!filterElement) return;
    
    isDragging = true;
    startY = e.touches[0].clientY;
    
    const currentHeight = parseFloat(getComputedStyle(filterElement).height);
    startHeight = (currentHeight / window.innerHeight) * 100;
    
    filterElement.style.transition = 'none';
}, { passive: true });

document.addEventListener('touchmove', function(e) {
    if (!isDragging || !filterElement) return;
    
    // Проверяем, движемся ли мы по вертикали достаточно для изменения высоты
    const currentY = e.touches[0].clientY;
    const deltaY = startY - currentY;
    
    // Минимальный порог для начала изменения высоты (чтобы не блокировать мелкие движения)
    if (Math.abs(deltaY) < 5) {
        return; // Не блокируем нативную прокрутку при мелких движениях
    }
    
    // Только если движение достаточно большое - блокируем прокрутку страницы
    e.preventDefault();
    
    const deltaVH = (deltaY / window.innerHeight) * 100;
    
    let newHeight = startHeight + deltaVH;
    newHeight = Math.max(20, Math.min(90, newHeight));
    
    filterElement.style.height = newHeight + 'svh';
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
    filterElement.style.height = finalHeight + 'svh';

    if(finalHeight <= 20){
        document.querySelector(".detail__filter-parent").classList.remove("is-open");
        filterElement.style.height = "70svh";
    }
}, { passive: true });

// Дополнительно: предотвращаем клики на заднем фоне при закрытии
document.querySelector('.detail__filter')?.addEventListener('click', function(e) {
    e.stopPropagation();
});

// Альтернативный вариант: обработчик только для заголовка фильтра
document.querySelector('.detail__filter-top')?.addEventListener('touchstart', function(e) {
    if (!filterElement) return;
    
    isDragging = true;
    startY = e.touches[0].clientY;
    
    const currentHeight = parseFloat(getComputedStyle(filterElement).height);
    startHeight = (currentHeight / window.innerHeight) * 100;
    
    filterElement.style.transition = 'none';
    e.stopPropagation(); // Не даем событию всплыть к документу
}, { passive: true });

document.querySelector('.detail__filter-top')?.addEventListener('touchmove', function(e) {
    if (!isDragging || !filterElement) return;
    
    e.preventDefault();
    
    const currentY = e.touches[0].clientY;
    const deltaY = startY - currentY;
    const deltaVH = (deltaY / window.innerHeight) * 100;
    
    let newHeight = startHeight + deltaVH;
    newHeight = Math.max(20, Math.min(90, newHeight));
    
    filterElement.style.height = newHeight + 'svh';
}, { passive: false });

document.querySelector('.detail__filter-top')?.addEventListener('touchend', function() {
    if (!isDragging) return;
    
    isDragging = false;
    
    if (!filterElement) return;
    
    filterElement.style.transition = 'height 0.3s ease';
    
    const currentHeight = parseFloat(getComputedStyle(filterElement).height);
    const currentHeightVH = (currentHeight / window.innerHeight) * 100;
    
    const finalHeight = Math.max(20, Math.min(90, currentHeightVH));
    filterElement.style.height = finalHeight + 'svh';

    if(finalHeight <= 20){
        document.querySelector(".detail__filter-parent").classList.remove("is-open");
        filterElement.style.height = "70svh";
    }
}, { passive: true });

}