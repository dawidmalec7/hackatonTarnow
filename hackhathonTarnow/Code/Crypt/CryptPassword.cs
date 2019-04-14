using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace hackhathonTarnow.Code.Crypt
{
    public class CryptPassword
    {
        private MD5CryptoServiceProvider _md5;

        public string EncodeText(string textToEncode)
        {
            _md5 = new MD5CryptoServiceProvider();
            byte[] passwordByte = Encoding.UTF8.GetBytes(textToEncode);
            byte[] passwordByteCoded = _md5.ComputeHash(passwordByte);
            return Encoding.UTF8.GetString(passwordByteCoded);
        }
    }
}
