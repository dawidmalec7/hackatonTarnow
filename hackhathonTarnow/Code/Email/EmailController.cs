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
                    Credentials = new NetworkCredential(_configuration["Email"], _configuration["Password"])
                };
                using (var message = new MailMessage(_configuration["Email"], address)
                {
                    Subject = title,
                    Body = "" +
                    "<h1>Witaj</h1>" +
                    "<p>Aby aktywować konto kliknij w link <a href='http://localhost:4200/activation/" + id + "'>Link</a></p>",
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