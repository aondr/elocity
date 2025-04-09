const SPOTIFY_API_URL =
    "https://elocity-api.tadam.space/spotify_api/now_playing";
// const SPOTIFY_API_URL = "http://localhost:8000/spotify_api/now_playing";

const container = document.getElementById("nowPlaying");
const max_width = container.offsetWidth - 96;

const title = document.getElementById("nowPlayingTitle");
const artist = document.getElementById("nowPlayingArtist");

const cover = document.getElementById("nowPlayingCover");

const current = document.getElementById("nowPlayingCurrent");
const progress = document.getElementById("nowPlayingProgress");
const duration = document.getElementById("nowPlayingDuration");

function marquee_title() {
    if (title.offsetWidth > max_width) {
        if (!title.classList.contains("marquee-active")) {
            title.classList.add("marquee-active");
        }
    } else {
        if (title.classList.contains("marquee-active")) {
            title.classList.remove("marquee-active");
        }
    }
}

function marquee_artist() {
    if (
        artist.offsetWidth > max_width
    ) {
        if (!artist.classList.contains("marquee-active")) {
            artist.classList.add("marquee-active");
        }
    } else {
        if (artist.classList.contains("marquee-active")) {
            artist.classList.remove("marquee-active");
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setInterval(() => {
        fetch(SPOTIFY_API_URL)
            .then((resp) => {
                if (resp.status != 200) {
                    title.innerHTML = "Error while loading ;c";
                    artist.innerHTML =
                        "Check the console for an error and report it to me please!";

                    marquee_title();
                    marquee_artist();

                    return;
                }

                resp.json().then((json) => {
                    if (!json["is_playing"]) {
                        title.innerHTML = "I'm not playing anything currently!";
                        artist.innerHTML =
                            "Feel free to check out my playlist though!";

                        marquee_title();
                        marquee_artist();
                        return;
                    }

                    title.innerHTML = json.title;
                    artist.innerHTML = json.artist;

                    marquee_artist();
                    marquee_title();

                    cover.setAttribute("src", json.album_cover);

                    current.innerHTML = json.current;
                    progress.setAttribute("value", json.progress);
                    duration.innerHTML = json.duration;
                });
            })
            .catch((err) => {
                title.innerHTML = "Error while loading ;c";
                artist.innerHTML =
                    "Check the console for an error and report it to me please!";

                marquee_title();
                marquee_artist();

                return;
            });
    }, 1000);
});
