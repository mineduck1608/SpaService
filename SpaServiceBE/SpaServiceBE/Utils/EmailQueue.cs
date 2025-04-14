namespace SpaServiceBE.Utils
{
    public class EmailQueue
    {
        private readonly Queue<Func<Task>> _emailTasks = new();
        private readonly SemaphoreSlim _signal = new(0);

        public void QueueEmail(Func<Task> emailTask)
        {
            lock (_emailTasks)
            {
                _emailTasks.Enqueue(emailTask);
            }
            _signal.Release();
        }

        public async Task<Func<Task>> DequeueEmailAsync(CancellationToken cancellationToken)
        {
            await _signal.WaitAsync(cancellationToken);
            lock (_emailTasks)
            {
                return _emailTasks.Dequeue();
            }
        }
    }
}
