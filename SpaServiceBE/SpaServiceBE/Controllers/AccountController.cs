using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entities;
using Services.IServices;

namespace SpaServiceBE.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccountService _service;

        public AccountController(IAccountService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("Account/GetAll")]
        public async Task<ActionResult<IEnumerable<Account>>> GetAllAccounts() => Ok(_service.GetAllAccounts());
    }
}
