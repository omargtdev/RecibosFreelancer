using System.ComponentModel.DataAnnotations;
using RecibosFreelancer.Backend.Utils.CustomDataAnnotations;

namespace RecibosFreelancer.Backend.DTOs
{
    public class ReceiptDTO
    {
        [Required(ErrorMessage = "El titulo es requerido")]
        [StringLength(20, ErrorMessage = "El titulo no puede tener más de 20 caracteres")]
        public string? Title { get; set; }

        [Required(ErrorMessage = "La descripcion es requerida")]
        [StringLength(150, ErrorMessage = "La descripción no puede tener más de 150 caracteres")]
        public string? Description { get; set; }

        [EnumDataType(typeof(CurrencyType), ErrorMessage = "El tipo de moneda no es válido")]
        public CurrencyType CurrencyType { get; set; }

        [Required(ErrorMessage = "El monto es requerido")]
        [Range(1, 10000, ErrorMessage = "El monto va desde 1 a 10000")]
        public decimal? Amount { get; set; }

        [Required(ErrorMessage = "El archivo es requerido")]
        [DataType(DataType.Upload)]
        [AllowedFileExtensions(".png", ".jpg", ".jpeg")]
        public IFormFile? Logo { get; set; }

        [Required(ErrorMessage = "El nombre completo es requerido")]
        public string? FullName { get; set; }

        [Required(ErrorMessage = "La dirección es requerida")]
        public string? Address { get; set; }

        [EnumDataType(typeof(DocumentType), ErrorMessage = "El tipo de documento no es válido")]
        public DocumentType DocumentType { get; set; }

        [Required(ErrorMessage = "El numero de documento es requerido")]
        [RegularExpression(@"^\d+$", ErrorMessage = "El numero de documento debe tener solo números enteros")]
        public string? DocumentNumber { get; set; }
    }

    public enum CurrencyType 
    {
        PEN, // Soles
        USD, // Dolares
        EUR // Euros
    }

    public enum DocumentType
    {
        DNI,
        RUC,
        ForeignerCard // Carnet de extranjeria 
    }
}