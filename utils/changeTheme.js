export default function fn_change_theme() {
    let body = document.body;
    if (body.getAttribute("data-theme") === "dark") {
        body.removeAttribute("data-theme");
        body.setAttribute("data-theme", "cupcake");
    } else {
        body.removeAttribute("data-theme");
        body.setAttribute("data-theme", "dark");
    }
}