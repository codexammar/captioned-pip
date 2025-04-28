Captioned PiP

Captioned PiP is a lightweight Firefox extension that enables subtitles and captions to appear inside Picture-in-Picture (PiP) mode — even on websites like anime streaming sites, where captions are usually HTML overlays that are otherwise invisible in standard PiP.
Features

    🖥️ Capture both the video and dynamic subtitles into a single Picture-in-Picture window

    🔄 Automatically tracks subtitle changes using a MutationObserver

    🎬 Simple one-click activation — no need for automatic site detection

    ⚡ Lightweight and runs efficiently alongside your videos

    🎨 Future improvements planned for customizable caption styles

Why This Extension?

By default, Firefox Picture-in-Picture mode only extracts the video element, ignoring any floating caption overlays (like subtitles rendered in HTML by many anime streaming sites).
This extension fixes that by drawing both the video and the live captions onto a canvas, and sending the canvas into Picture-in-Picture.

This allows you to watch anime (or other videos) in PiP mode without missing any dialogue.
How It Works

    When you click the extension button, it detects the video and subtitle elements on the page.

    It creates an off-screen <canvas>.

    It continuously draws the video frame and current subtitles onto the canvas.

    It sends the canvas into Picture-in-Picture mode instead of the raw video.

    The captions are updated live even if the subtitles change dynamically during playback.

Installation (Temporary Testing)

    Clone or download this repository.

    Open Firefox and navigate to about:debugging#/runtime/this-firefox.

    Click "Load Temporary Add-on".

    Select the manifest.json file inside the project folder.

    Navigate to a video website (such as hianime.to or zoro.to).

    Click the extension icon in your toolbar to activate Captioned PiP!

File Structure

```
firefox-captioned-pip/
├── manifest.json   # Firefox extension configuration
├── content.js      # Handles video/caption capture and canvas drawing
├── background.js   # Handles user click and messaging
├── icon.png        # Extension icon (48x48px)
└── README.md       # Project documentation
```
Planned Improvements

    Better font styling and outline effects for the subtitles

    Settings page to customize subtitle appearance (size, color, background)

    Support for multiple subtitle layers (e.g., dual subtitles)

    Error handling for missing videos or captions

    Optimized frame rate to reduce CPU usage

    Optional support for specific streaming sites for faster detection

License

This project is licensed under the MIT License — feel free to use, modify, and distribute it!
Acknowledgements

    Firefox Developer Tools for easy extension testing

    Community feedback from anime fans and PiP users