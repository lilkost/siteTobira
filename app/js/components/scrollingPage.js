export const scrollingPage = () => {
    const header = document.querySelector(".header"),
        mainNode = document.querySelector(".main"),
        mainMenu = document.querySelector(".mobile-menu")

    if (header && mainNode) {
        mainNode.style.setProperty("--top", `${header.clientHeight}px`);
        mainMenu.style.setProperty("--top", `${header.clientHeight}px`);
    };


    let lastScrollTop = 0;

    window.addEventListener("scroll", function (event) {
        if (document.querySelector("body").classList.contains("is-hidden")) return
        
        if(window.pageYOffset <=100) {
            header.style.top = "0";
            header.classList.remove("is-blur")
            return;
        } else {
            header.classList.add("is-blur")
        }

        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.style.top = `${header.clientHeight * -2}px`;
        } else {
            header.style.top = "0";
        }
        lastScrollTop = scrollTop;
    });
}