using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Entities
{
    public record TokenResponse(
    
    string AccessToken,
    int ExpiresIn,
    string TokenType,
    string Scope);
    
}
