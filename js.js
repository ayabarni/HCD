const knop = document.getElementById("opslaan");

knop.addEventListener("click", () => {
    const gekozen = document.querySelector('input[name="startpunt"]:checked');

    if (!gekozen) return;

    const section = document.getElementById(gekozen.value);

    if (section) {
        section.focus();
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
});