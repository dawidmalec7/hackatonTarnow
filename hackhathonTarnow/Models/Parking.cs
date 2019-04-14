using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace hackhathonTarnow.Models
{
    public class Parking
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Address { get; set; }
        public int NumberOfPlaces { get; set; }
        public int NumberOfFreePlaces { get; set; }
        public int NumberOfFreeCarsPlaces { get; set; }        
        public int NumberOfFreeDisabledPlaces { get; set; }
        public int NumberOfFreeCyclesPlaces { get; set; }
        public float Longtitude { get; set; }
        public float Latitude { get; set; }

    }
}
