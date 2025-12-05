export const mobileMenu = () =>{
    const burgerBtn = document.querySelector(".header__btn-burger"),
        mobileMenu = document.querySelector(".mobile-menu");

    burgerBtn.addEventListener("click", ()=>{
        burgerBtn.classList.toggle("is-active");
        mobileMenu.classList.toggle("is-open");
        
        document.querySelector("body").classList.toggle("is-hidden");
    });
}