const url = "https://vvri.pythonanywhere.com/api/courses";

function betoltKurzusok() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const kurzusLista = document.getElementById("kurzus-lista");
            data.forEach(kurzus => {
                const kurzusDiv = document.createElement("div");
                kurzusDiv.className = "kurzus";
                kurzusDiv.innerHTML = `
                    <button onclick="megjelenitKurzus(${kurzus.id})">Részletek</button>
                `;
                kurzusLista.appendChild(kurzusDiv);
            });
        })
        .catch(error => console.log("Hiba történt: " + error));
}

function megjelenitKurzus(kurzusId) {
    fetch(`${url}/${kurzusId}`)
        .then(response => response.json())
        .then(kurzus => {
            const egyKurzusDiv = document.getElementById("egy-kurzus");
            betoltDiakok(kurzusId);
        })
        .catch(error => console.log("Hiba történt: " + error));
}

function ujKurzus() {
    const kurzusNeve = prompt("Kurzus neve:");
    if (kurzusNeve) {
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: kurzusNeve })
        })
        .then(() => betoltKurzusok())
        .catch(error => console.log("Hiba történt: " + error));
    }
}

function betoltDiakok(kurzusId) {
    const diakLista = document.getElementById("diak-lista");
    diakLista.innerHTML = "";
    fetch(`${url}/${kurzusId}/students`)
        .then(response => response.json())
        .then(data => {
            data.forEach(diak => {
                const diakDiv = document.createElement("div");
                diakDiv.className = "diak";
                diakDiv.innerHTML = `
                    <button onclick="szerkesztDiak(${diak.id})">Szerkesztés</button>
                    <button onclick="torolDiak(${diak.id})">Törlés</button>
                `;
                diakLista.appendChild(diakDiv);
            });
        })
        .catch(error => console.log("Hiba történt: " + error));
}

function ujDiak() {
    const diakNeve = prompt("Diák neve:");
    const kurzusId = prompt("Kurzus ID:");
    if (diakNeve && kurzusId) {
        fetch(`${url}/${kurzusId}/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: diakNeve })
        })
        .then(() => betoltDiakok(kurzusId))
        .catch(error => console.log("Hiba történt: " + error));
    }
}

function szerkesztDiak(diakId) {
    const ujNev = prompt("Új név:");
    if (ujNev) {
        fetch(`${url}/students/${diakId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: ujNev })
        })
        .then(() => {
            const kurzusId = document.querySelector("#egy-kurzus p").textContent.split(": ")[1];
            betoltDiakok(kurzusId);
        })
        .catch(error => console.log("Hiba történt: " + error));
    }
}

function torolDiak(diakId) {
    fetch(`${url}/students/${diakId}`, {
        method: "DELETE"
    })
    .then(() => {
        const kurzusId = document.querySelector("#egy-kurzus p").textContent.split(": ")[1];
        betoltDiakok(kurzusId);
    })
    .catch(error => console.log("Hiba történt: " + error));
}

window.onload = betoltKurzusok;
