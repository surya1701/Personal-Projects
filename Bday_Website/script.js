function shuffle(array) {
  // Create a copy so we don't mutate the original array
  const shuffled = [...array]; 
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements array[i] and array[j]
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

const INTRO_VIDEO_ID = "XStvbSqKvag";

const videos = shuffle([
    "ze4m1Ymalf0",
    "Y2KAnkYQN_Q",
    "jyMBetM7aKc",
    "ra2Lwhv1oR8",
    "EuuQx2O9T1U",
    "VZ_u73-Gzf0",
    "TZYuBjYNcJU",
    "DD9J-gy_QfQ",
    "LscLhAhkbGI",
    "IfERNNYnswU",
    "R322Xv8wHq4",
    "gpX_3jIGmMI",
    "FhMMW3SO-Wk",
    "s_Ic92yHakI",
    "U6EIMPI8ov0",
    "FX-DmCxSJak",
    "iI6_5bLTRcU",
    "mz5T2uhtjUY",
    "DjBwMPb-tGg",
    "b2mIpQ6GWwg",
    "_8w_xn9NkEo",
    "-RMnQDU6f58",
    "2Q_nZnyRI6I"
]);
videos.push("dbq2PwrBf7k");

let galleryShown = false;

function showGallery() {

    if (galleryShown) return;

    galleryShown = true;

    gallerySection.classList.remove("d-none");

    gallerySection.scrollIntoView({
        behavior: "smooth"
    });
}

document
    .getElementById("scrollBtn")
    .addEventListener("click", () => {

        showGallery();
        gallerySection.scrollIntoView({
            behavior: "smooth"
        });
    });

document
    .getElementById("closeIntroBtn")
    .addEventListener("click", () => {

        introModal.hide();

        introFrame.src = "";

        showGallery();
    });

const introModal =
    new bootstrap.Modal(
        document.getElementById("introVideoModal")
    );

const videoModal =
    new bootstrap.Modal(
        document.getElementById("videoModal")
    );

const startBtn =
    document.getElementById("startBtn");

const gallerySection =
    document.getElementById("gallerySection");

const introFrame =
    document.getElementById("introVideo");

const playerFrame =
    document.getElementById("playerFrame");

startBtn.addEventListener("click", () => {

    introFrame.src =
        `https://www.youtube.com/embed/${INTRO_VIDEO_ID}?autoplay=1&rel=0`;

    introModal.show();

    // Approximate intro duration
    // Change this to match your compilation
    setTimeout(() => {

        introModal.hide();

        introFrame.src = "";

        showGallery();

    }, 60000);

});

const grid =
    document.getElementById("videoGrid");

videos.forEach(id => {

    const card = document.createElement("div");

    card.className =
        "col-6 col-md-4 col-lg-3";

    card.innerHTML = `
        <div class="video-card">

            <img
                src="https://img.youtube.com/vi/${id}/hqdefault.jpg">

            <div class="play-overlay">
                <div class="play-icon">▶</div>
            </div>

        </div>
    `;

    card.addEventListener("click", () => {

        playerFrame.src =
            `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;

        videoModal.show();
    });

    grid.appendChild(card);
});

document
    .getElementById("videoModal")
    .addEventListener("hidden.bs.modal", () => {
        playerFrame.src = "";
    });

document
    .getElementById("introVideoModal")
    .addEventListener("hidden.bs.modal", () => {
        introFrame.src = "";
    });