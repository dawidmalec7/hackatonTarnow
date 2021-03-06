﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace hackhathonTarnow.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$",
            ErrorMessage = "Nieprawidłowy email")]
        public string Email { get; set; }
        //[RegularExpression(@" ^ (?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$",
        // ErrorMessage = "Hasło nie spełnia wymagań.")]
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string CardId { get; set; }
        public string Role { get; set; }
        public bool IsActivated { get; set; }
        public string DefaultPlate { get; set; }
        public bool? IsPremium { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? ActivationDate { get; set; }
        public ICollection<Vehicle> Vehicles { get; set; }
    }
}
