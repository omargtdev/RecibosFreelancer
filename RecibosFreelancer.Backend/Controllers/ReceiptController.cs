using System.ComponentModel.DataAnnotations;
using iText.Forms;
using iText.IO.Image;
using iText.Kernel.Colors;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using RecibosFreelancer.Backend.DTOs;
using RecibosFreelancer.Backend.Models;
using RecibosFreelancer.Backend.Models.Mappers;
using RecibosFreelancer.Backend.Utils;

namespace RecibosFreelancer.Backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptController : ControllerBase
    {
        private readonly ILogger<ReceiptController> _logger;
        private readonly RecibosFreelancerContext _context;
        public ReceiptController(ILogger<ReceiptController> logger, RecibosFreelancerContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost("Generate")]
        public async Task<IActionResult> Generate([FromForm] ReceiptDTO receipt)
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

            // Adding to database
            var receiptEntity = ReceiptMapper.MapToEntity(receipt);
            var addTask = _context.Receipts.AddAsync(receiptEntity);
            var saveTask = _context.SaveChangesAsync();

            // Generating the pdf
            byte[] pdfBytes = GetPDFInMemory(receipt).ToArray();

            await addTask;
            await saveTask;

            return File(pdfBytes, "application/pdf", "receipt.pdf");
        }

        [HttpGet("")]
        public async Task<IEnumerable<ReceiptDTO>> GetRecipts()
        {
            return await _context.Receipts.Select(r => ReceiptMapper.MapToDTO(r)).ToListAsync();
        }

        private MemoryStream GetPDFInMemory(ReceiptDTO receipt)
        {
            MemoryStream memoryStream = new MemoryStream();
            using PdfWriter writer = new PdfWriter(memoryStream);
            using PdfDocument pdfDocument = new PdfDocument(writer);
            pdfDocument.SetDefaultPageSize(PageSize.A7);
            using Document pdfPage = new Document(pdfDocument);
            pdfPage.SetFontSize(9);
            pdfPage.SetMargins(0, 5, 0, 5);

            /**************** HEADER *****************/
            var receiptWord = new Paragraph("RECIBO");
            receiptWord.SetFontSize(15);
            receiptWord.SetBold();
            receiptWord.SetMarginBottom(-5);
            receiptWord.SetItalic();
            pdfPage.Add(receiptWord);

            var date = new Paragraph(DateTime.Now.ToString("dd/MM/yyyy hh:mm tt"));
            date.SetMarginBottom(1);
            pdfPage.Add(date);


            var imageData = ImageDataFactory.Create(FileConverter.ConvertFormFileToByteArray(receipt.Logo!));

            var image = new Image(imageData);
            image.ScaleToFit(35, 35);
            image.SetFixedPosition(pdfDocument.GetDefaultPageSize().GetWidth() - 40, pdfDocument.GetDefaultPageSize().GetHeight() - 38);
            pdfPage.Add(image);

            /**************** CONTENT *****************/
            var title = new Paragraph(receipt.Title);
            title.SetFontSize(16);
            title.SetFontColor(new DeviceRgb(255, 255, 255));
            title.SetBackgroundColor(new DeviceRgb(0, 160, 5));
            title.SetTextAlignment(TextAlignment.CENTER);
            title.SetBold();
            pdfPage.Add(title);

            var description = new Paragraph(receipt.Description);
            pdfPage.Add(description);

            var name = PDFElement.GenerateKeyValue("Nombre", receipt.FullName ?? ""); 
            pdfPage.Add(name);

            var documentNumber = PDFElement.GenerateKeyValue("Documento", $"{Enum.GetName(typeof(DocumentType), receipt.DocumentType)} - {receipt.DocumentNumber}");
            pdfPage.Add(documentNumber);

            var address = PDFElement.GenerateKeyValue("Dirección", receipt.Address ?? "", withBreakLine: true);
            pdfPage.Add(address);

            /**************** PRICE *****************/
            var amount = PDFElement.GenerateKeyValue($"Cantidad ({Enum.GetName(typeof(CurrencyType), receipt.CurrencyType)})", receipt.Amount?.ToString("0.00") ?? "");
            amount.SetFontSize(12);
            amount.SetItalic();
            amount.SetFixedPosition(pdfDocument.GetDefaultPageSize().GetWidth() - 180, 5, null);
            pdfPage.Add(amount);

            return memoryStream;
        }
    }
}