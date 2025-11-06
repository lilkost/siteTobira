export const detailFilter = () =>{
    const filterButton = document.querySelectorAll(".detail__filter-button");
    const filterBody = document.querySelectorAll(".detail__filter-body");
    const filterTop = document.querySelector(".detail__filter-top");
    const currentActiveBtn = document.querySelector(".detail__filter-button.is-active");

    if(!filterButton || !filterBody) return;

    const setPositionLine = (btn) =>{
        let left = btn.offsetLeft ? btn.offsetLeft : 0;
        let width = btn.clientWidth ? btn.clientWidth : 0;


        filterTop.style.setProperty('--left', `${left}px`);
        filterTop.style.setProperty('--width', `${width}px`);

    }

    setPositionLine(currentActiveBtn);

    filterButton.forEach(btn=>{
        btn.addEventListener("click", ()=>{
            setPositionLine(btn);
            const attrBtn = btn.getAttribute("data-type");

            filterButton.forEach(b=>b.classList.remove("is-active"));
            btn.classList.add("is-active");

            filterBody.forEach(body=>{
                const attrBody = body.getAttribute("data-type");

                if(attrBtn === attrBody) {
                    body.classList.add("is-active");
                } else {
                    body.classList.remove("is-active");
                }
            })
        });
    })
}