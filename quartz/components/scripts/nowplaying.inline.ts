function updateNowPlaying() {
  fetch("https://ellie-nowplaying.web.val.run/")
    .then((response) => response.json())
    .then((data) => {
      const nowplaying = document.getElementById("nowplaying")
      if (!nowplaying) return

      nowplaying.innerHTML = `
        <div style="font-family: system-ui, sans-serif;">
          <span>Recent listening:</span>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img
              src="${data.artwork}"
              alt="Album artwork"
              style="width: 3rem; height: 3rem; object-fit: cover; border-radius: 0.125rem;"
            />
            <div>
              <div style="color: #333; font-weight: 500;">${data.trackName}</div>
              <div style="color: #666; font-size: 0.875rem;">${data.artist}</div>
            </div>
          </div>
        </div>
      `
    })
    .catch(() => {
      const nowplaying = document.getElementById("nowplaying")
      if (!nowplaying) return

      nowplaying.innerHTML = ""
    })
}

// Update immediately and then every 30 seconds
updateNowPlaying()
setInterval(updateNowPlaying, 30000)
