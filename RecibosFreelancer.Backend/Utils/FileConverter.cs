using System.Text;

namespace RecibosFreelancer.Backend.Utils
{
    public static class FileConverter
    {
        public static IFormFile ConvertByteArrayToFormFile(byte[] file, string name, int id, string extension)
        {
            var stream = new MemoryStream(file);
            return new FormFile(stream, 0, file.Length, name, $"{name}_{id}.{extension.ToLower()}");
        }

        public static byte[] ConvertFormFileToByteArray(IFormFile formFile)
        {
            using MemoryStream fileInMemory = new MemoryStream();
            formFile.OpenReadStream().CopyTo(fileInMemory);
            return fileInMemory.ToArray();
        }
    }
}