export const filterDetail = () =>{
    const btnOpen = document.querySelector(".detail__info-btn-filter"),
        filterParent = document.querySelector(".detail__filter-parent");

        if(!btnOpen || !filterParent) return;

    btnOpen.addEventListener("click", ()=>{
        filterParent.classList.add("is-open");
    });

    window.addEventListener("click",(event)=>{
        if(window.innerWidth > 480) return;

        
        const classCssValue = event.target?.classList?.value;

        if(classCssValue) {
            const isState = classCssValue.includes("detail-filter-close");

            if(isState) {
                filterParent.classList.remove("is-open");
            }
        }
    });
}