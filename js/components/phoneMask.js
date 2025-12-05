export const phoneMask = () => {
    const nodes = document.querySelectorAll(".input-phone-mask");
    if(!nodes) return;
    
    const createMask = (el) => {
        const element = el;
        const maskOptions = {
            mask: '+{7}(000)000-00-00'
        };
        const mask = IMask(element, maskOptions);
    }

    nodes.forEach(node=> createMask(node));
}
