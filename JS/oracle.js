document.addEventListener('DOMContentLoaded', async () => {
    const reader = document.getElementById('story-reader');
    try {
        const res = await fetch('/oracle-story/stories/index.json');
        if (res.ok) {
            const data = await res.json();
            reader.innerHTML = `<p>Loaded stories successfully. Total available: ${data.stories ? data.stories.length : 0}</p>`;
        } else {
            reader.innerHTML = `<p>Welcome to Oracle Stories. Browse available chapters from the repository menu.</p>`;
        }
    } catch(e) {
        reader.innerHTML = `<p>Welcome to Oracle Stories.</p>`;
    }
});