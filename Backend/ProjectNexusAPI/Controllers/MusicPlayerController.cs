using Microsoft.AspNetCore.Mvc;
using ProjectNexusAPI.Models;
using Windows.Media.Control;

namespace ProjectNexusAPI.Controllers {

    [Route("[controller]")]
    public class MusicPlayerController : Controller {

        [HttpGet("GetSongInfo")]
        public async Task<SongInfo> GetSongInfo() {

            var manager = await GlobalSystemMediaTransportControlsSessionManager.RequestAsync();

            var currentSession = manager.GetCurrentSession();

            if (currentSession != null) {
                var playbackInfo = currentSession.GetPlaybackInfo();

                var mediaProperties = await currentSession.TryGetMediaPropertiesAsync();

                return new SongInfo(currentSession.SourceAppUserModelId, mediaProperties.Title, mediaProperties.Artist, playbackInfo.PlaybackStatus.ToString());
            }
            else {
                return new SongInfo("0", "Song Title", "Song Artist", "Paused");
            }
        }

        [HttpGet("GetThumbnail")]
        public async Task<IActionResult> GetThumbnail() {
            var session = await GlobalSystemMediaTransportControlsSessionManager
                .RequestAsync();

            var currentSession = session.GetCurrentSession();

            if (currentSession != null) {
                var media = await currentSession.TryGetMediaPropertiesAsync();

                if (media.Thumbnail == null)
                    return NotFound();

                var randomAccessStream = await media.Thumbnail.OpenReadAsync();

                using var stream = randomAccessStream.AsStreamForRead();

                var memoryStream = new MemoryStream();
                await stream.CopyToAsync(memoryStream);

                memoryStream.Position = 0;

                return File(memoryStream, "image/jpeg");
            }

            return NotFound();
        }
    }
}
