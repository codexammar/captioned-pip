// content.js

let observer;
let canvas;
let ctx;
let video;
let subtitleElement;
let pipStarted = false;

async function startCaptionedPiP() {
    if (pipStarted) {
        console.log('Already running Captioned PiP.');
        return;
    }
    pipStarted = true;

    video = document.querySelector('video');
    if (!video) {
        alert('No video found on this page!');
        return;
    }

    // Find initial subtitle element
    subtitleElement = document.querySelector('.caption-container, .caption-layer, .subtitle, .vjs-text-track-display');
    if (!subtitleElement) {
        alert('No subtitles found. Start playing the video first.');
        return;
    }

    // Create and set up the canvas
    canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    canvas.style.display = 'none';
    document.body.appendChild(canvas);

    ctx = canvas.getContext('2d');

    function draw() {
        if (video.paused || video.ended) return requestAnimationFrame(draw);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        if (subtitleElement && subtitleElement.innerText.trim()) {
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 4;
            const text = subtitleElement.innerText.trim();
            ctx.strokeText(text, canvas.width / 2, canvas.height - 60);
            ctx.fillText(text, canvas.width / 2, canvas.height - 60);
        }

        requestAnimationFrame(draw);
    }

    draw();

    // Observe the subtitles for dynamic changes
    observer = new MutationObserver(() => {
        // Nothing specific to do, because we re-read subtitleElement.innerText in every draw()
    });

    observer.observe(subtitleElement, {
        childList: true,
        characterData: true,
        subtree: true
    });

    // Start PiP on canvas
    try {
        if ('requestPictureInPicture' in canvas) {
            await canvas.requestPictureInPicture();
        } else {
            alert('Canvas Picture-in-Picture not supported!');
        }
    } catch (e) {
        console.error('Failed to start PiP:', e);
    }
}

// Listen for messages from background when user clicks the icon
browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'start_captioned_pip') {
        startCaptionedPiP();
    }
});