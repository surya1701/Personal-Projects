const INTRO_VIDEO_ID = "HmiEA8tpo7A";

const videos = [
    "ze4m1Ymalf0",
    "Y2KAnkYQN_Q",
    "VZ_u73-Gzf0",
    "TZYuBjYNcJU",
    "DD9J-gy_QfQ",
    "LscLhAhkbGI",
    "IfERNNYnswU",
    "gpX_3jIGmMI",
    "DD9J-gy_QfQ",
    "s_Ic92yHakI",
    "dbq2PwrBf7k"
];

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

        gallerySection.classList.remove("d-none");

        gallerySection.scrollIntoView({
            behavior: "smooth"
        });

    }, 5000);

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