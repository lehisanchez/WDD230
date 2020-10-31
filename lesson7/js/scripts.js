
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


// NOTIFICATION
// ============================================
let navigation = document.getElementById('notification');
let today = new Date();
let day = today.getDay();

if (day == 5 && navigation) {
    navigation.classList.toggle('show');
}



// GET IMAGES
// =====================================================
let images = document.querySelectorAll("img[data-src]");

// LOAD IMAGES FUNCTION
// =====================================================
let loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    };
};

let imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px -500px 0px"
};

// OBSERVER
// =====================================================
if ('IntersectionObserver' in window) {

    const imgObserver = new IntersectionObserver((items, imgObserver) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadImages(item.target);
                imgObserver.unobserve(item.target);
            }
        }, imgOptions);
    });

    images.forEach((img) => {
        imgObserver.observe(img);
    });

} else {

    images.forEach((img) => {
        loadImages(img);
    });

}