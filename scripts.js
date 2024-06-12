document.getElementById('exploreButton').addEventListener('click', function() {
    alert('Thank you for exploring Gull and Bell!');
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
});

// Modal Gallery
let modal = document.getElementById("modal");
let modalImg = document.getElementById("modal-img");
let captionText = document.getElementById("caption");
let currentImgIndex = 0;
let images = document.querySelectorAll('.gallery-grid img, .team-member img');

images.forEach((img, index) => {
    img.addEventListener('click', function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
        currentImgIndex = index;
        updateModalImage();
    });
});

document.querySelector('.close').addEventListener('click', function() {
    modal.style.display = "none";
    modalImg.style.transform = 'scale(1)';
});

document.getElementById('prev').addEventListener('click', function() {
    currentImgIndex = (currentImgIndex > 0) ? currentImgIndex - 1 : images.length - 1;
    updateModalImage();
});

document.getElementById('next').addEventListener('click', function() {
    currentImgIndex = (currentImgIndex < images.length - 1) ? currentImgIndex + 1 : 0;
    updateModalImage();
});

document.getElementById('zoom-in').addEventListener('click', function() {
    modalImg.style.transform = `scale(${getZoomScale(modalImg.style.transform) + 0.1})`;
});

document.getElementById('zoom-out').addEventListener('click', function() {
    let newScale = getZoomScale(modalImg.style.transform) - 0.1;
    if (newScale > 0.1) {
        modalImg.style.transform = `scale(${newScale})`;
    }
});

document.getElementById('fullscreen').addEventListener('click', function() {
    if (!document.fullscreenElement) {
        modalImg.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

function updateModalImage() {
    modalImg.src = images[currentImgIndex].src;
    captionText.innerHTML = images[currentImgIndex].alt;
    modalImg.style.transform = 'scale(1)';
    // Adjust for vertical or horizontal images
    if (modalImg.naturalWidth > modalImg.naturalHeight) {
        modalImg.style.width = '80%';
        modalImg.style.height = 'auto';
    } else {
        modalImg.style.width = 'auto';
        modalImg.style.height = '80%';
    }
}

function getZoomScale(transform) {
    let match = /scale\(([^)]+)\)/.exec(transform);
    return match ? parseFloat(match[1]) : 1;
}
