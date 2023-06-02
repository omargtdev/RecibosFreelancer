namespace RecibosFreelancer.Backend.Models;

public partial class Receipt
{
    public int ReceiptId { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public short CurrencyType { get; set; }

    public decimal Amount { get; set; }

    public byte[] Logo { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Address { get; set; } = null!;

    public short DocumentType { get; set; }

    public string DocumentNumber { get; set; } = null!;
}
