using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace hackhathonTarnow.Models
{
    public class Space
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public bool IsBusy { get; set; }
        public string Plate { get; set; }
        public Guid ParkingId { get; set; }
        public float Longtitude { get; set; }
        public float Latitude { get; set; }
        public string SpaceType { get; set; }
    }
}
