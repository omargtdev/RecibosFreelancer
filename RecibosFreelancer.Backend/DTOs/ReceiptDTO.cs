using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace RecibosFreelancer.Backend.DTOs
{
    public class ReceiptDTO
    {
        [Required(ErrorMessage = "El titulo es requerido")]
        public string? Title { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "La descripción no puede tener más de 100 caracteres")]
        public string? Description { get; set; }

        [EnumDataType(typeof(CurrencyType), ErrorMessage = "El tipo de moneda no es válido")]
        public CurrencyType? CurrencyType { get; set; }

        [Range(1, 1000, ErrorMessage = "El monto va desde 1 a 1000")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "El archivo es requerido")]
        public IFormFile? Logo { get; set; }

        [Required(ErrorMessage = "El nombre completo es requerido")]
        public string? FullName { get; set; }

        [Required(ErrorMessage = "La dirección es requerida")]
        public string? Address { get; set; }

        [EnumDataType(typeof(DocumentType), ErrorMessage = "El tipo de moneda no es válido")]
        public DocumentType DocumentType { get; set; }

        [RegularExpression(@"^\d+$", ErrorMessage = "El numero de documento debe tener solo números")]
        public string? DocumentNumber { get; set; }
    }

    public enum CurrencyType 
    {
        PEN = 1, // Soles
        USD = 2, // Dolares
        EUR = 3 // Euros
    }

    public enum DocumentType
    {
        DNI,
        RUC,
        ForeignerCard // Carnet de extranjeria 
    }
}