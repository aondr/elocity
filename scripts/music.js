const SPOTIFY_API_URL = "https://elocity-api.tadam.space/spotify_api/now_playing";
// const SPOTIFY_API_URL = "http://localhost:8000/spotify_api/now_playing";

const container = document.getElementById("nowPlaying");
const max_width = container.offsetWidth - 96;

const title = document.getElementById("nowPlayingTitle");
const artist = document.getElementById("nowPlayingArtist");

const cover = document.getElementById("nowPlayingCover");

const current = document.getElementById("nowPlayingCurrent");
const progress = document.getElementById("nowPlayingProgress");
const duration = document.getElementById("nowPlayingDuration");

let last_is_error = false;
let last_is_playing = false;
let last_title = "";
let last_artist = "";

function marquee_title() {
    if (title.offsetWidth > max_width) {
        title.classList.add("marquee-active");
    }
}

function marquee_artist() {
    if (artist.offsetWidth > max_width) {
        artist.classList.add("marquee-active");
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

                    if (!last_is_error) {
                        marquee_title();
                        marquee_artist();
                    }

                    last_is_error = true;
                    return;
                }

                resp.json().then((json) => {
                    if (!json["is_playing"]) {
                        title.innerHTML = "I'm not playing anything currently!";
                        artist.innerHTML =
                            "Feel free to check out my playlist though!";

                        if (json.is_playing != last_is_playing) {
                            marquee_title();
                            marquee_artist();
                        }

                        last_is_playing = false;
                        last_is_error = false;
                        return;
                    }
                    last_is_playing = true;
                    last_is_error = false;

                    title.innerHTML = json.title;
                    if (json.title != last_title) {
                        marquee_title();
                    }
                    last_title = json.title;

                    artist.innerHTML = json.artist;
                    if (json.artist != last_artist) {
                        marquee_artist();
                    }
                    last_artist = json.artist;

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

                if (!last_is_error) {
                    marquee_title();
                    marquee_artist();
                }

                last_is_error = true;
                return;
            });
    }, 1000);
});
