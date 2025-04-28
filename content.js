let observer;
let canvas;
let ctx;
let video;
let subtitleElement;
let pipStarted = false;
let fullscreenListenerActive = false;

async function startCaptionedPiPFromVideo(selectedVideo) {
    if (pipStarted) {
        console.log('Already running Captioned PiP.');
        return;
    }
    pipStarted = true;

    video = selectedVideo;
    console.log('Using video element:', video);

    subtitleElement = document.querySelector('.caption-container, .caption-layer, .subtitle, .vjs-text-track-display');

    if (!subtitleElement) {
        alert('No subtitles found. Make sure subtitles are visible.');
        pipStarted = false;
        return;
    }

    console.log('Subtitle element found:', subtitleElement);

    // Create canvas
    canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    canvas.style.display = 'none'; // Hide canvas
    document.body.appendChild(canvas);

    ctx = canvas.getContext('2d');

    function draw() {
        if (!video || video.paused || video.ended) {
            requestAnimationFrame(draw);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        if (subtitleElement && subtitleElement.innerText.trim()) {
            const text = subtitleElement.innerText.trim();
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 4;
            ctx.strokeText(text, canvas.width / 2, canvas.height - 60);
            ctx.fillText(text, canvas.width / 2, canvas.height - 60);
        }

        requestAnimationFrame(draw);
    }

    draw();

    // Observe subtitle changes
    observer = new MutationObserver(() => {
        // No specific action needed, canvas updates every frame
    });

    observer.observe(subtitleElement, {
        childList: true,
        characterData: true,
        subtree: true
    });

    // Start PiP
    try {
        if ('requestPictureInPicture' in canvas) {
            await canvas.requestPictureInPicture();
            console.log('Entered Picture-in-Picture mode with canvas!');
        } else {
            alert('Picture-in-Picture not supported for canvas.');
        }
    } catch (e) {
        console.error('Error starting PiP:', e);
    }
}

function listenForFullscreenAndCapture() {
    if (fullscreenListenerActive) {
        console.log('Already listening for fullscreen changes.');
        return;
    }

    fullscreenListenerActive = true;

    document.addEventListener('fullscreenchange', async () => {
        console.log('Fullscreen change detected.');

        const fsElement = document.fullscreenElement;

        if (!fsElement) {
            console.log('Exited fullscreen.');
            return;
        }

        console.log('Fullscreen element is:', fsElement);

        if (fsElement.tagName === 'IFRAME') {
            try {
                const iframeDoc = fsElement.contentDocument || fsElement.contentWindow.document;
                const videoInsideIframe = iframeDoc.querySelector('video');

                if (videoInsideIframe) {
                    console.log('Video found inside fullscreened iframe!');
                    startCaptionedPiPFromVideo(videoInsideIframe);
                } else {
                    console.warn('No video found inside fullscreened iframe.');
                    alert('Fullscreen iframe detected, but no video found inside.');
                }
            } catch (e) {
                console.error('Cannot access fullscreened iframe (CORS restriction).');
                alert('Cannot access fullscreened iframe due to browser security restrictions.');
            }
        } else if (fsElement.tagName === 'VIDEO') {
            console.log('Fullscreened video directly!');
            startCaptionedPiPFromVideo(fsElement);
        } else {
            console.warn('Fullscreen element is neither a video nor an iframe.');
            alert('Fullscreen element is not a video or iframe.');
        }
    });

    console.log('Started listening for fullscreen changes.');
}

// When extension button is clicked
browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'start_captioned_pip') {
        console.log('Extension clicked, starting fullscreen listener.');
        listenForFullscreenAndCapture();
        alert('Now listening for fullscreen. Please fullscreen your video player.');
    }
});
