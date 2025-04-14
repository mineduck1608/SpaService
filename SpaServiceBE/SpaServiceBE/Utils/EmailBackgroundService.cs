namespace SpaServiceBE.Utils
{
    public class EmailBackgroundService : BackgroundService
    {
        private readonly EmailQueue _emailQueue;
        private readonly IServiceProvider _serviceProvider;

        public EmailBackgroundService(EmailQueue emailQueue, IServiceProvider serviceProvider)
        {
            _emailQueue = emailQueue;
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var emailTask = await _emailQueue.DequeueEmailAsync(stoppingToken);
                try
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        await emailTask();
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Email sending failed: {ex.Message}");
                }
            }
        }
    }

}
