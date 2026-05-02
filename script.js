function getThumbnail() {
    const url = document.getElementById("ytlink").value;

    let videoId = "";

    // Extract video ID
    if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
    } else {
        alert("Invalid YouTube URL");
        return;
    }

    // High quality thumbnail
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    document.getElementById("thumb").src = thumbnailUrl;

    const downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.href = thumbnailUrl;

    document.getElementById("result").classList.remove("hidden");
}
