export const scrollingPage = () =>{
    const header = document.querySelector(".header"),
        mainNode = document.querySelector(".main"),
        mainMenu = document.querySelector(".mobile-menu")

    if(header && mainNode) {
        setTimeout(()=>{
            mainNode.style.setProperty("--top", `${header.clientHeight}px`);
            mainMenu.style.setProperty("--top", `${header.clientHeight}px`);
        }, 200);
    };
}