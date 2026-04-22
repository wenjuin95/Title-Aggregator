const proxy = 'https://cors-anywhere.herokuapp.com/';

async function fetchRss() {
    const res = await fetch(proxy + `https://www.theverge.com/rss/index.xml`);
    const str = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "application/xml");
    let allEntry = doc.querySelectorAll("entry");
    allEntry.forEach(entry => {
        const titleTag = document.createElement("p");
        titleTag.textContent = entry.querySelector("title").textContent;
        const linkTag = document.createElement("a");
        linkTag.setAttribute("href", entry.querySelector("link").getAttribute("href"));
        linkTag.appendChild(titleTag);
        document.body.appendChild(linkTag);
    });
}

fetchRss();