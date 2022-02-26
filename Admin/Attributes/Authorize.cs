using Admin.Common;
using Admin.Common.Constants;
using Admin.Common.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;

namespace Admin.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class Authorize : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(MemCache.JwtSettings.Secret);

                if (token != null)
                {
                    string jwtToken = Decrypt.DecryptData(MemCache.AppSettings.EncryptionKey, token);

                    tokenHandler.ValidateToken(jwtToken, new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ClockSkew = TimeSpan.Zero
                    }, out SecurityToken validatedToken);

                    var jwtSecurityToken = (JwtSecurityToken)validatedToken;

                    if (jwtSecurityToken.ValidTo <= DateTime.UtcNow)
                    {
                        context.HttpContext.Response.StatusCode = 401;
                        context.Result = new JsonResult(new
                        {
                            Success = false,
                            Message = Messages.MSG_SESSION_TIMEOUT
                        });
                    }
                }
                else
                {
                    context.HttpContext.Response.StatusCode = 401;
                    context.Result = new JsonResult(new
                    {
                        Success = false,
                        Message = Messages.MSG_AUTH_FAILED
                    });
                }
            }
            catch (Exception ex)
            {
                context.HttpContext.Response.StatusCode = 401;
                context.Result = new JsonResult(new
                {
                    Success = false,
                    Data = ex.Message,
                    Message = Messages.MSG_AUTH_FAILED
                });
            }
        }
    }
}
