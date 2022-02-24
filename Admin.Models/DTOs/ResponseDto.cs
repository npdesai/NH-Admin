namespace Admin.Models.DTOs
{
    public class ResponseDto<T>
    {
        public bool Success { get; set; }
        public T Data { get; set; }
        public string Message { get; set; }
    }
}
