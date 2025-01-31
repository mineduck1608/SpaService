﻿using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SpaServiceBE.Utils
{
    public class Util
    {
        private static IConfiguration _config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", true, true).Build();

        public static string GenerateToken(string id, string name, string roleName)
        {
            // Lấy khóa bảo mật từ cấu hình
            var key = _config["AccessToken:Key"];
            if (string.IsNullOrEmpty(key))
                throw new InvalidOperationException("AccessToken:Key is missing.");

            // Kiểm tra và parse thời gian hết hạn token (phút)
            if (!int.TryParse(_config["AccessToken:ExpireTime"], out var expireMinutes) || expireMinutes <= 0)
                throw new InvalidOperationException("AccessToken:ExpireTime is invalid.");

            // Tạo khóa bảo mật và SigningCredentials
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Đảm bảo `name` không null
            name ??= string.Empty;

            // Tạo danh sách claims
            var claims = new[]
            {
        new Claim("UserId", id),
        new Claim("Username", name),
        new Claim("Role", roleName)
    };

            // Tạo token
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],       // Issuer từ cấu hình
                audience: _config["Jwt:Audience"],   // Audience từ cấu hình
                claims: claims,                      // Claims
                expires: DateTime.Now.AddMinutes(expireMinutes), // Hạn sử dụng token (UTC)
                signingCredentials: credentials      // Chữ ký
            );

            // Trả về token dưới dạng chuỗi
            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        public static string ToHashString(string s)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(s));
                StringBuilder result = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                    result.Append(bytes[i].ToString("x2"));
                return result.ToString();
            }
        }
    }
}
