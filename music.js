const releases = {
    "cinder-skies": {
      title: "Cinder Skies",
      year: "Release Date: 10/16/2024",
      type: "Release Type: Album",
      cover: "assets/images/CinderSkiesCover.webp",
      tracks: [
        { name: "Rapier", file: "assets/music/CinderSkies/01Rapier320mp3.mp3" },
        { name: "Diamond Pressure", file: "assets/music/CinderSkies/02DiamondPressure320mp3.mp3" },
        { name: "Sand Star", file: "assets/music/CinderSkies/03SandStar320mp3.mp3" },
        { name: "Spire", file: "assets/music/CinderSkies/04Spire320mp3.mp3" },
        { name: "Dejavu", file: "assets/music/CinderSkies/05Dejavu320mp3.mp3" },
        { name: "IV", file: "assets/music/CinderSkies/06IV320mp3.mp3" },
        { name: "Oracle Bone", file: "assets/music/CinderSkies/07OracleBone320mp3.mp3" },
        { name: "Ivory", file: "assets/music/CinderSkies/08Ivory320mp3.mp3" },
        { name: "Crestfallen", file: "assets/music/CinderSkies/09Crestfallen320mp3.mp3" },
        { name: "Chrono24", file: "assets/music/CinderSkies/10Chrono24320mp3.mp3" },
        { name: "Lion Serenade", file: "assets/music/CinderSkies/11LionSerenade320mp3.mp3" }
      ]
    },
    "angels-egg": {
      title: "Angel’s Egg",
      year: "Release Date: 7/10/2023",
      type: "Release Type: Single",
      cover: "assets/images/AngelsEggCover.webp",
      tracks: [
        { name: "Angel’s Egg", file: "assets/music/AngelsEgg/AngelsEgg320mp3.mp3" }
      ]
    },
    "scr-evangelion": {
      title: "::scr0evangelion.97//",
      year: "Release Date: 10/16/2023",
      type: "Release Type: EP",
      cover: "assets/images/ScrEvangelionCover.webp",
      tracks: [
        { name: "01", file: "assets/music/ScrEvangelion/0101320mp3.mp3" },
        { name: "Heartbleed", file: "assets/music/ScrEvangelion/02Heartbleed320mp3.mp3" },
        { name: "02", file: "assets/music/ScrEvangelion/0202320mp3.mp3" },
        { name: "Renatus", file: "assets/music/ScrEvangelion/04Renatus320mp3.mp3" }
      ]
    },
    "route-119": {
      title: "Route 119",
      year: "Release Date: 2022",
      type: "Release Type: Album",
      cover: "assets/images/Route119Cover.webp",
      tracks: [
        { name: "Absol", file: "assets/music/Route119/01Absol320mp3.mp3" },
        { name: "Jirachi", file: "assets/music/Route119/02Jirachi320mp3.mp3" },
        { name: "Beldum", file: "assets/music/Route119/03Beldum320mp3.mp3" },
        { name: "Salamence", file: "assets/music/Route119/04Salamence320mp3.mp3" },
        { name: "Mewtwo", file: "assets/music/Route119/05Mewtwo320mp3.mp3" },
        { name: "Umbreon", file: "assets/music/Route119/06Umbreon320mp3.mp3" },
        { name: "Deoxys", file: "assets/music/Route119/07Deoxys320mp3.mp3" },
        { name: "Gardevoir", file: "assets/music/Route119/08Gardevoir320mp3.mp3" },
        { name: "Rayquaza", file: "assets/music/Route119/09Rayquaza320mp3.mp3" },
        { name: "Suicune", file: "assets/music/Route119/10Suicune320mp3.mp3" },
        { name: "Celebi", file: "assets/music/Route119/10Suicune320mp3.mp3" }
      ]
    },
    "revenge": {
      title: "Revenge",
      year: "Release Date: 1/3/2023",
      type: "Release Type: EP",
      cover: "assets/images/RevengeCover.webp",
      tracks: [
        { name: "1", file: "assets/music/Revenge/REVENGE1.wav" },
        { name: "2", file: "assets/music/Revenge/REVENGE2.wav" }
      ]
    },
    "syne": {
      title: "Syne",
      year: "Release Date: 9/30/2021",
      type: "Release Type: EP",
      cover: "assets/images/SyneCover.webp",
      tracks: [
        { name: "EcoGenesis", file: "assets/music/Syne/01EcoGenesis320mp3.mp3" },
        { name: "Encephal", file: "assets/music/Syne/02Encephal320mp3.mp3" },
        { name: "Crystal Lattice", file: "assets/music/Syne/03CrystalLattice320mp3.mp3" },
        { name: "Cause Effect", file: "assets/music/Syne/04CauseEffect320mp3.mp3" },
        { name: "Glycogen", file: "assets/music/Syne/05Glycogen320mp3.mp3" }
      ]
    }
  };
  

// Create gradient once
const ctx = document.createElement('canvas').getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, 100);
gradient.addColorStop(0, "#000000");
gradient.addColorStop(1, "#ffffff");

// Wavesurfer setup
const wavesurfer = WaveSurfer.create({
    container: "#waveform",
    height: 75,
    width: 300,
    splitChannels: false,
    normalize: false,
    waveColor: gradient,
    progressColor: "#000",
    cursorColor: "#ffffff",
    cursorWidth: 0,
    barWidth: 1,
    barGap: 1,
    barRadius: 1,
    barHeight: 0.5,
    minPxPerSec: 1,
    fillParent: true,
    interact: true,
    dragToSeek: true,
    autoScroll: true,
    autoCenter: true,
    hideScrollbar: false,
    audioRate: 1,
    sampleRate: 8000,
});

// DOM elements
const releaseList = document.querySelectorAll('.release-list li');
const cover = document.getElementById('releaseCover');
const title = document.getElementById('releaseTitle');
const year = document.getElementById('releaseYear');
const label = document.getElementById('releaseLabel');
const tracksContainer = document.getElementById('releaseTracks');
const playPauseBtn = document.getElementById("playPauseBtn");
const playTimer = document.getElementById("playTimer");
const releaseContent = document.querySelector(".release-content");

// Hide release content initially to prevent flash
releaseContent.style.opacity = 0;

// Hover bar
const hoverBar = document.createElement('div');
hoverBar.classList.add('hover-bar');
tracksContainer.appendChild(hoverBar);

// Format seconds
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
}

// Wavesurfer timer updates
wavesurfer.on("audioprocess", () => {
    const current = wavesurfer.getCurrentTime();
    const duration = wavesurfer.getDuration();
    playTimer.textContent = `${formatTime(current)} // ${formatTime(duration)}`;
});

wavesurfer.on("ready", () => {
    const current = wavesurfer.getCurrentTime();
    const duration = wavesurfer.getDuration();
    playTimer.textContent = `${formatTime(current)} // ${formatTime(duration)}`;
});

wavesurfer.on("finish", () => {
    playPauseBtn.classList.remove("pause");
    playPauseBtn.classList.add("play");
    playTimer.textContent = `00:00 // ${formatTime(wavesurfer.getDuration())}`;
});

// Play/pause button
playPauseBtn.addEventListener("click", () => {
    if (wavesurfer.isPlaying()) {
        wavesurfer.pause();
        playPauseBtn.classList.remove("pause");
        playPauseBtn.classList.add("play");
    } else {
        wavesurfer.play();
        playPauseBtn.classList.remove("play");
        playPauseBtn.classList.add("pause");
    }
});

// Render tracks
function renderTracks(rel) {
    tracksContainer.innerHTML = "";
    tracksContainer.appendChild(hoverBar);

    rel.tracks.forEach(track => {
        const div = document.createElement("div");
        div.classList.add("track");
        div.textContent = track.name;
        div.dataset.file = track.file;

        div.addEventListener("click", () => {
            // Remove "playing" class from all tracks
            tracksContainer.querySelectorAll(".track").forEach(t => t.classList.remove("playing"));
            div.classList.add("playing");
        
            // Load and play track
            wavesurfer.load(track.file);
        
            wavesurfer.once("ready", () => {
                wavesurfer.play();
        
                // Update play/pause button to "pause" state
                playPauseBtn.classList.remove("play");
                playPauseBtn.classList.add("pause");
            });
        });

        div.addEventListener("mouseenter", e => {
            const rect = e.target.getBoundingClientRect();
            const parentRect = tracksContainer.getBoundingClientRect();
            hoverBar.style.top = rect.top - parentRect.top + "px";
            hoverBar.style.height = rect.height + "px";
            requestAnimationFrame(() => {
                hoverBar.style.width = e.target.scrollWidth + "px";
            });
            hoverBar.style.opacity = 1;
        });

        tracksContainer.appendChild(div);
    });

    // First track
    const firstTrackDiv = tracksContainer.querySelector(".track");
    if (firstTrackDiv) {
        firstTrackDiv.classList.add("playing");
        wavesurfer.load(rel.tracks[0].file);
        wavesurfer.once("ready", () => {
            wavesurfer.pause();
            playPauseBtn.classList.remove("pause");
            playPauseBtn.classList.add("play");
            playTimer.textContent = `00:00 // ${formatTime(wavesurfer.getDuration())}`;
        });
    }

    tracksContainer.addEventListener("mouseleave", () => {
        hoverBar.style.opacity = 0;
    });
}

// --- Switch release with 2.5s fade-out and 2.5s fade-in ---
function switchRelease(rel) {
    releaseContent.style.transition = "opacity 1s ease";

    // Fade out current content
    releaseContent.style.opacity = 0;

    // Wait for fade-out to complete
    releaseContent.addEventListener("transitionend", function handler() {
        releaseContent.removeEventListener("transitionend", handler);

        // Stop any playing audio
        if (wavesurfer.isPlaying()) wavesurfer.stop();

        // Update cover and release info
        cover.src = rel.cover;
        title.textContent = rel.title;
        year.textContent = rel.year;
        label.textContent = rel.type;

        // Render track list
        renderTracks(rel);

        // Load first track in Wavesurfer
        wavesurfer.load(rel.tracks[0].file);
        wavesurfer.once("ready", () => {
            wavesurfer.pause();
            playTimer.textContent = `00:00 // ${formatTime(wavesurfer.getDuration())}`;

            // Fade in the new release over 2.5s
            requestAnimationFrame(() => {
                releaseContent.style.opacity = 1;
            });
        });
    });
}

// Release tab clicks
releaseList.forEach(li => {
    li.addEventListener("click", () => {
        document.querySelector(".release-list li.active")?.classList.remove("active");
        li.classList.add("active");

        const key = li.getAttribute("data-release");
        const rel = releases[key];
        if (!rel) return;

        switchRelease(rel);
    });
});

// --- Load first release on page load without flash ---
const firstLi = document.querySelector(".release-list li.active");
if (firstLi) {
    const key = firstLi.getAttribute("data-release");
    const rel = releases[key];
    if (rel) {
        // Render tracks and content with opacity 0
        cover.src = rel.cover;
        title.textContent = rel.title;
        year.textContent = rel.year;
        label.textContent = rel.type;
        renderTracks(rel);

        wavesurfer.load(rel.tracks[0].file);
        wavesurfer.once("ready", () => {
            wavesurfer.pause();
            playTimer.textContent = `00:00 // ${formatTime(wavesurfer.getDuration())}`;

            // Fade in the first release
            requestAnimationFrame(() => {
                releaseContent.style.transition = "opacity 2.5s ease";
                releaseContent.style.opacity = 1;
            });
        });
    }
}

const volumeBar = document.getElementById("volumeBar");

wavesurfer.setVolume(1);
volumeBar.style.setProperty("--vol", "100%");

volumeBar.addEventListener("input", () => {
    const percent = volumeBar.value * 100 + "%";
    volumeBar.style.setProperty("--vol", percent);
    wavesurfer.setVolume(volumeBar.value);
});

