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
