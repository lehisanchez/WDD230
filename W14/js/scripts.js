function toggleNavigationVisibility() {
    let nav = document.getElementById('nav')
    let menu = document.getElementById('navigationToggleButton')
    nav.classList.toggle('nav--hidden');
    menu.classList.toggle('header__hamburger--active');
}
