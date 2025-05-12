fetch("https://status.cafe/users/elocity/status.json")
    .then((r) => r.json())
    .then((r) => {
        if (!r.content.length) {
            document.getElementById("statuscafe-content").innerHTML =
                "No status yet.";
            return;
        }
        document.getElementById("statuscafe-username").innerHTML =
            '<a href="https://status.cafe/users/elocity" target="_blank">' +
            r.author +
            "</a> <span>says: </span>";
        document.getElementById("statuscafe-content").innerHTML =
            r.content + " " + r.face;
        document.getElementById("statuscafe-timeAgo").innerHTML =
            "(" + r.timeAgo + ")";
    });
