using System.ComponentModel.DataAnnotations;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using Microsoft.AspNetCore.Mvc;
using RecibosFreelancer.Backend.DTOs;

namespace RecibosFreelancer.Backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptController : ControllerBase
    {
        private readonly ILogger<ReceiptController> _logger;

        public ReceiptController(ILogger<ReceiptController> logger)
        {
            _logger = logger;
        }

        [HttpPost("Generate")]
        public IActionResult Generate([FromForm] ReceiptDTO receipt)
        {
            // Validate
            var validationContext = new ValidationContext(receipt, null, null);
            var validationResults = new List<ValidationResult>();
            bool isValid = Validator.TryValidateObject(receipt, validationContext, validationResults, validateAllProperties: true);

            if(!isValid)
            {
                var errors = validationResults.Select(e => e.ErrorMessage);
                return BadRequest(errors);
            }

            /*using (MemoryStream memoryStream = new MemoryStream())
            {
                PdfWriter pdfWriter = new PdfWriter(memoryStream);
                PdfDocument pdfDocument = new PdfDocument(pdfWriter);
                Document document = new Document(pdfDocument);

                // Genera el contenido del PDF
                Paragraph paragraph = new Paragraph("¡Hola, mundo!");
                document.Add(paragraph);

                // Cierra el documento
                document.Close();

                Response.ContentType = "application/pdf";
                // Establece el nombre del archivo para la descarga
                Response.Headers.Add("Content-Disposition", "attachment; filename=receipt.pdf");
                // Send file as http response
                memoryStream.Position = 0;
                return File(memoryStream, "application/pdf");
            }*/

            return Ok(new { Message = "Genereated!" });

        }
    }

}