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


let isDragging = false;
let startY = 0;
let startHeight = 70;

document.addEventListener('DOMContentLoaded', function() {
    const filterElement = document.querySelector(".detail__filter");
    if (filterElement) {
        filterElement.style.height = '70vh';
        filterElement.style.transition = 'height 0.3s ease';
    }
});

document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.detail__filter-bodys') || e.target.closest('.detail__filter-top')) return;
    
    const filterElement = document.querySelector(".detail__filter");
    if (!filterElement) return;
    
    isDragging = true;
    startY = e.touches[0].clientY;
    
    const currentHeight = parseFloat(getComputedStyle(filterElement).height);
    startHeight = (currentHeight / window.innerHeight) * 100;
    
    filterElement.style.transition = 'none';
}, { passive: true });

document.addEventListener('touchmove', function(e) {
    if (!isDragging || e.target.closest('.detail__filter-bodys')  || e.target.closest('.detail__filter-top')) return;
    
    const filterElement = document.querySelector(".detail__filter");
    if (!filterElement) return;
    
    e.preventDefault();
    
    const currentY = e.touches[0].clientY;
    const deltaY = startY - currentY; // Инвертируем для интуитивного управления
    const deltaVH = (deltaY / window.innerHeight) * 100;
    
    let newHeight = startHeight + deltaVH;
    newHeight = Math.max(20, Math.min(90, newHeight));
    
    filterElement.style.height = newHeight + 'vh';
}, { passive: false });

document.addEventListener('touchend', function() {
    if (!isDragging) return;
    
    isDragging = false;
    
    const filterElement = document.querySelector(".detail__filter");
    if (!filterElement) return;
    
    filterElement.style.transition = 'height 0.3s ease';
    
    // Сохраняем текущую высоту без изменений
    const currentHeight = parseFloat(getComputedStyle(filterElement).height);
    const currentHeightVH = (currentHeight / window.innerHeight) * 100;
    
    // Только корректируем если вышли за пределы
    const finalHeight = Math.max(20, Math.min(90, currentHeightVH));
    filterElement.style.height = finalHeight + 'vh';

    if(finalHeight <= 20){
        document.querySelector(".detail__filter-parent").classList.remove("is-open")
        document.querySelector(".detail__filter").style.height = "70vh";
    }
}, { passive: true });

    
}