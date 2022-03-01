namespace Admin.Models.DTOs
{
    public class AddCarouselRequestDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
    }
}
