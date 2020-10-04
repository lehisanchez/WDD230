let date = new Date();
let modified = document.lastModified;

document.getElementById("copyright-year").innerHTML = date.getFullYear();
document.getElementById("modified-date").innerHTML = modified;