using System.Runtime.InteropServices.JavaScript;
using iText.Layout.Element;

namespace RecibosFreelancer.Backend.Utils
{
    public static class PDFElement
    {
        
        /// <summary>
        /// Generate a <c>Paragraph</c> like key: value. The key is in bold
        /// <example>Name: Omar Gutierrez</example>
        /// </summary>
        public static Paragraph GenerateKeyValue(string key, string value, bool withBreakLine = false)
        {
            var keyText = new Text(key);
            keyText.SetBold();

            var paragraph = new Paragraph();
            paragraph.SetFontSize(9);
            paragraph.Add(keyText);
            paragraph.Add(withBreakLine ? $":\n" : $": ");
            paragraph.Add(value);

            return paragraph;
        }
        
    }
}