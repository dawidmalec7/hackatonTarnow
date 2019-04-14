using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace hackhathonTarnow.Email.EmailController
{
    public class EmailController
    {
        private IConfiguration _configuration { get; set; }
 

        public EmailController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public EmailController()
        {
        }

        public async void SendEmail(string address, string title, string body, Guid id)
        {
            try
            {
                SmtpClient smtpClient = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(_configuration["Email"], _configuration["Password "])
                };
                using (var message = new MailMessage(_configuration["EmailLogin"], address)
                {
                    Subject = title,
                    Body = "http://localhost:4200/api/activation/" + id,
                    IsBodyHtml = true
                })
                {
                    await smtpClient.SendMailAsync(message);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
        }
    }
}