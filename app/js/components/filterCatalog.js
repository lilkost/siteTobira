export const filterCatalog = () =>{
    const btnReset = document.querySelector(".catalog__filter-reset");
    const accordion = document.querySelectorAll(".catalog__filter-accordion");

    if(btnReset){// перезагрузка страницы
        btnReset.addEventListener("click", ()=> window.location.reload());
    }

    if(accordion) {
        accordion.forEach(acc=>{
            const accordionTop = acc.querySelector(".catalog__filter-accordion-top");

            accordionTop.addEventListener("click", ()=>{
                accordion.forEach(a=>{
                    if(a != acc) a.classList.remove("is-active");
                    if(a == acc) a.classList.toggle("is-active");
                });
            })
        });
    }
}