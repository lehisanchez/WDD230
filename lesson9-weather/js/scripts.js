// RESPONSIVE NAVIGATION
// ============================================

let nav = document.getElementById('navigation')
let menu = document.getElementById('hamburger')

function toggleMenu() {
    nav.classList.toggle('responsive');
    menu.classList.toggle('responsive');
}



// LAST UPDATED
// ============================================

let date = new Date();
let modified = document.lastModified;

document.getElementById("copyright-year").innerHTML = date.getFullYear();
document.getElementById("modified-date").innerHTML  = modified;