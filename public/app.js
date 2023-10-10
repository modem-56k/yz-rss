async function fetchFeeds() {
    const response = await fetch('/feeds');
    const data = await response.json();

    const feedsDiv = document.getElementById('feeds');
    for (let feed of data) {
        const feedDiv = document.createElement('div');
        
        const title = document.createElement('h3');
        title.innerText = feed.title;

        const description = document.createElement('p');
        const truncatedDescription = feed.description.split('\n').slice(0, 5).join('\n');
        description.innerText = truncatedDescription;

        const feedName = document.createElement('span');
        feedName.innerText = `(${feed.feedName})`;
        feedName.addEventListener('click', () => {
            feedDiv.style.display = 'none';
        });

        feedDiv.appendChild(title);
        feedDiv.appendChild(description);
        feedDiv.appendChild(feedName);

        feedsDiv.appendChild(feedDiv);
    }
}

fetchFeeds();
