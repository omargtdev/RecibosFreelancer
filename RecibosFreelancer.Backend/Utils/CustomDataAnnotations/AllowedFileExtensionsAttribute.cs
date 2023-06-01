
using System.ComponentModel.DataAnnotations;

namespace RecibosFreelancer.Backend.Utils.CustomDataAnnotations
{
    public class AllowedFileExtensionsAttribute : ValidationAttribute
    {
        private readonly string[] _extensions;

        public AllowedFileExtensionsAttribute(params string[] extensions)
        {
            _extensions = extensions;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if(value is IFormFile file) // if value is IFormFile type, then create and variable called file with that type
            {
                string fileExtension = Path.GetExtension(file.FileName).ToLower();
                if(!_extensions.Contains(fileExtension))
                    return new ValidationResult($"El tipo de archivo no está permitido. Debe ser {string.Join(", ", _extensions)}");
            }

            return ValidationResult.Success;
        }
    }
}