function getThumbnail() {
    const url = document.getElementById("ytlink").value.trim();

    let videoId = "";

    // Extract video ID safely
    if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
    } else {
        alert("Invalid YouTube URL");
        return;
    }

    // Thumbnail quality list (best → worst)
    const qualities = [
        "maxresdefault",
        "sddefault",
        "hqdefault",
        "mqdefault",
        "default"
    ];

    const imgElement = document.getElementById("thumb");
    const downloadBtn = document.getElementById("downloadBtn");

    let index = 0;

    function tryNext() {
        if (index >= qualities.length) {
            alert("Thumbnail not found.");
            return;
        }

        const testUrl = `https://img.youtube.com/vi/${videoId}/${qualities[index]}.jpg`;

        const testImage = new Image();

        testImage.onload = function () {
            // Found working thumbnail
            imgElement.src = testUrl;
            downloadBtn.href = testUrl;
            document.getElementById("result").classList.remove("hidden");
        };

        testImage.onerror = function () {
            index++;
            tryNext(); // try next quality
        };

        testImage.src = testUrl;
    }

    tryNext();
}
