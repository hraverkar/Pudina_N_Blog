#### 05 January 2025

#### Author: Harshal Raverkar
# Building and Implementing an Azure Function App with a Timer Trigger [GitHub Link](https://github.com/hraverkar/Function-App-TimeTrigger-Example)

This article explains how I created a simple yet powerful Azure Function App using a Timer Trigger. The goal is to provide step-by-step guidance on implementing the app and understanding its use cases.

---

#### **Overview of the Function App**

The Timer Trigger Function App is designed to perform tasks on a predefined schedule, such as daily data cleanup, sending reminders, or running batch processes. This specific implementation uses .NET Core, showcasing:

- Dependency injection for extensibility
- Logging for observability
- Configuration management using Azure App Settings

The source code for this project is hosted on [GitHub](https://github.com/hraverkar/Function-App-TimeTrigger-Example).

---

#### **How I Created the Function App**

1. **Setting up the Project**
   - Created a new Azure Function App project using the Visual Studio template for Azure Functions.
   - Selected “Timer Trigger” as the template for the function.
   - Configured the project to use .NET 8 or any version for compatibility and performance.

2. **Function Implementation**
   - Defined the Timer Trigger using a CRON expression in `function.json` for scheduling.
   - Added business logic to the `Run` method to perform the desired operations.

   Example snippet:
   ```csharp
   [FunctionName("JobExecution")]
   public void Run([TimerTrigger("0 */5 * * * *")] TimerInfo myTimer, ILogger log){
    log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
    var employee = new Employee
    {
        Name = "John",
        IsActive = true,
        AddMinutes = DateTime.Now
    };

    _context.Employees.Add(employee);
    _context.SaveChanges();
    _logger.BeginScope($"Employee added at {DateTime.Now}");
   }
   ```

3. **Dependency Injection**
   - Configured dependency injection in `Startup.cs` to make the function modular and testable.
   - Used interfaces and services to separate concerns.

   Example service registration:
   ```csharp
    internal class Startup : FunctionsStartup {
    public override void Configure(IFunctionsHostBuilder builder)
    {
        var context = builder.GetContext().Configuration.GetSection("ConnectionStrings:DefaultConnection").Value;
        builder.Services.AddDbContext<TAppDbContext>(options => options.UseSqlServer(context));
    }
    }
    ```

4. **Configuration Management**
   - Used Azure App Settings for environment-specific configurations like connection strings and API keys.
   - Added these settings to `local.settings.json` for local development.

5. **Logging**
   - Integrated Serilog for structured logging.
   - Configured Application Insights for real-time telemetry in the Azure portal.

---

#### **How to Use This Function App**

1. **Clone the Repository**
   - Clone the [GitHub repository](https://github.com/hraverkar/Function-App-TimeTrigger-Example) to your local machine.

     ```bash
     git clone https://github.com/hraverkar/Function-App-TimeTrigger-Example.git
     ```

2. **Run Locally**
   - Install the Azure Functions Core Tools for local testing.
   - Navigate to the project directory and run the function app:

     ```bash
     func start
     ```

   - Test the timer trigger execution by observing logs in the terminal.

3. **Deploy to Azure**
   - Publish the project to Azure using Visual Studio or the Azure CLI:

     ```bash
     func azure functionapp publish <FunctionAppName>
     ```

4. **Monitor the App**
   - Use Application Insights to monitor execution logs and identify errors.
   - Verify the schedule using the CRON expression in the Azure portal.

---

#### **Use Cases**

This Timer Trigger Function App can be used for:

- **Data Cleanup**: Automatically purge old data from a database or storage.
- **Scheduled Notifications**: Send daily or weekly notifications via email or SMS.
- **Batch Processing**: Run scheduled reports or process large data sets at specific intervals.

---

#### **Key Takeaways**

This implementation demonstrates:

- The power of Azure Timer Triggers for scheduling tasks.
- How to make the function extensible and testable using dependency injection.
- The importance of structured logging and configuration management.

You can access the complete codebase and further details in the [GitHub repository](https://github.com/hraverkar/Function-App-TimeTrigger-Example). Feel free to explore and adapt it to your own needs!