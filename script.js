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

            // Show thumbnail
            imgElement.src = testUrl;

            // Show result section
            document.getElementById("result").classList.remove("hidden");

            // Download button functionality
            downloadBtn.onclick = async function (e) {

                e.preventDefault();

                try {

                    // Fetch image
                    const response = await fetch(testUrl);

                    // Convert image to blob
                    const blob = await response.blob();

                    // Create local blob URL
                    const blobUrl = window.URL.createObjectURL(blob);

                    // Create hidden download link
                    const a = document.createElement("a");
                    a.href = blobUrl;
                    a.download = `youtube-thumbnail-${videoId}.jpg`;

                    // Trigger download
                    document.body.appendChild(a);
                    a.click();

                    // Cleanup
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(blobUrl);

                } catch (error) {

                    console.error(error);
                    alert("Download failed.");

                }

            };

        };

        testImage.onerror = function () {

            index++;
            tryNext();

        };

        testImage.src = testUrl;
    }

    tryNext();
}
