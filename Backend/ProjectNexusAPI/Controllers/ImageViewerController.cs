using Microsoft.AspNetCore.Mvc;

namespace ProjectNexusAPI.Controllers {
    
    [ApiController]
    [Route("[controller]")]
    public class ImageViewerController : Controller {

        [HttpPost("files")]
        public async Task<IActionResult> Upload(IFormFile file) {
            if (file == null || file.Length == 0)
                return BadRequest("No file received.");

            string folder = Path.Combine(
                Directory.GetCurrentDirectory(),
                "SavedFiles"
            );

            Directory.CreateDirectory(folder);

            string filePath = Path.Combine(folder, "thumbnail.jpg");

            using (var stream = new FileStream(filePath, FileMode.Create)) {
                await file.CopyToAsync(stream);
            }

            return Ok("File saved.");
        }

        [HttpGet("thumbnail")]
        public IActionResult GetThumbnail() {
            string path = Path.Combine(
                Directory.GetCurrentDirectory(),
                "SavedFiles",
                "thumbnail.jpg"
            );

            Console.WriteLine($"Looking for: {path}");

            if (!System.IO.File.Exists(path)) {
                Console.WriteLine("Thumbnail doesn't exist.");
                return NotFound();
            }

            Console.WriteLine("Sending thumbnail.");

            return PhysicalFile(path, "image/jpeg");
        }
    }
}
