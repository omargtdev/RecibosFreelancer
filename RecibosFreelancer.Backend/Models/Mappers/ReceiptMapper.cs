using RecibosFreelancer.Backend.DTOs;
using RecibosFreelancer.Backend.Utils;

namespace RecibosFreelancer.Backend.Models.Mappers
{
    public static class ReceiptMapper
    {
        public static ReceiptDTO MapToDTO(Receipt receipt)
        {
            return new ReceiptDTO
            {
                Title = receipt.Title,
                Description = receipt.Description,
                CurrencyType = (CurrencyType)receipt.CurrencyType,
                Amount = receipt.Amount,
                // TODO: Change to an file to json
                //Logo = FileMapper.ConvertByteArrayToFormFile(receipt.Logo, "receipt", receipt.ReceiptId, "pdf"),
                FullName = receipt.FullName,
                Address = receipt.Address,
                DocumentType = (DocumentType)receipt.DocumentType,
                DocumentNumber = receipt.DocumentNumber
            };
        }

        public static Receipt MapToEntity(ReceiptDTO receiptDTO)
        {
            return new Receipt
            {
                ReceiptId = 0,
                Title = receiptDTO.Title!,
                Description = receiptDTO.Description!,
                CurrencyType = (short)receiptDTO.CurrencyType,
                Amount = (decimal)receiptDTO.Amount!,
                Logo = FileConverter.ConvertFormFileToByteArray(receiptDTO.Logo!),
                FullName = receiptDTO.FullName!,
                Address = receiptDTO.Address!,
                DocumentType = (short)receiptDTO.DocumentType,
                DocumentNumber = receiptDTO.DocumentNumber!
            };
        }


    }
}