export const scrollingPage = () =>{
    const header = document.querySelector(".header"),
        mainNode = document.querySelector(".main")

    if(header && mainNode) {
        mainNode.style.setProperty("--top", `${header.clientHeight}px`);
    };
}