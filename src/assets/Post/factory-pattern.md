#### 05 January 2025

#### Author: Harshal Raverkar

# Implementing the Factory Design Pattern [Github Link](https://github.com/hraverkar/Factory-Design-Pattern)
## What is the Factory Design Pattern? 

Factory Design Pattern is a part of the Creational Design Patterns. This pattern provides the best way to create objects by encapsulating the object creation logic. Using the Factory Design Pattern, the object of a class can be created without exposing the instantiation logic to the user. The newly created object is returned using a common interface implemented by the class.

### Key Features:
- Encapsulation of object creation logic.
- Promotes loose coupling between client code and the concrete classes.
- Simplifies object creation and maintenance.

![Alt text](https://dotnettutorials.net/wp-content/uploads/2018/11/word-image-106.png?ezimgfmt=ng:webp/ngcb8 "Example to understand factory concept")

### Example:
We will consider a **Credit Card** example. Assume we have three types of credit cards:
1. **MoneyBack**
2. **Platinum**
3. **Titanium**

### Credit Card Interface
The `ICreditCard` interface defines the following methods:
- `string GetCardType();`
- `int GetCreditLimit();`
- `int GetAnnualCharge();`

### Implementation
1. **Define the `ICreditCard` Interface**
2. **Create Classes for Each Card Type**
   - `MoneyBack`
   - `Titanium`
   - `Platinum`
   Each class implements the `ICreditCard` interface and provides specific implementations for its methods.
3. **Create the Factory Class**
   - Define a `CardFactory` class with a method `GetCard`.
   - The method takes a `cardType` parameter and returns an object of type `ICreditCard`.

Below is the implementation structure:

#### ICreditCard Interface:
```csharp
public interface ICreditCard
{
    string GetCardType();
    int GetCreditLimit();
    int GetAnnualCharge();
}
```

#### MoneyBack Class:
```csharp
public class MoneyBack : ICreditCard
{
    public string GetCardType()
    {
        return "MoneyBack";
    }

    public int GetCreditLimit()
    {
        return 15000;
    }

    public int GetAnnualCharge()
    {
        return 500;
    }
}
```

#### Titanium Class:
```csharp
public class Titanium : ICreditCard
{
    public string GetCardType()
    {
        return "Titanium";
    }

    public int GetCreditLimit()
    {
        return 25000;
    }

    public int GetAnnualCharge()
    {
        return 1000;
    }
}
```

#### Platinum Class:
```csharp
public class Platinum : ICreditCard
{
    public string GetCardType()
    {
        return "Platinum";
    }

    public int GetCreditLimit()
    {
        return 35000;
    }

    public int GetAnnualCharge()
    {
        return 2000;
    }
}
```

#### CardFactory Class:
```csharp
public class CardFactory
{
    public ICreditCard GetCard(string cardType)
    {
        switch (cardType)
        {
            case "MoneyBack":
                return new MoneyBack();
            case "Titanium":
                return new Titanium();
            case "Platinum":
                return new Platinum();
            default:
                return null;
        }
    }
}
```

#### Console Application:
```csharp
class Program
{
    static void Main(string[] args)
    {
        CardFactory factory = new CardFactory();

        Console.WriteLine("Enter the type of card you want (MoneyBack/Titanium/Platinum):");
        string cardType = Console.ReadLine();

        ICreditCard card = factory.GetCard(cardType);

        if (card != null)
        {
            Console.WriteLine($"Card Type: {card.GetCardType()}");
            Console.WriteLine($"Credit Limit: {card.GetCreditLimit()}");
            Console.WriteLine($"Annual Charge: {card.GetAnnualCharge()}");
        }
        else
        {
            Console.WriteLine("Invalid card type!");
        }
    }
}
```

### Explanation
- The `CardFactory` class encapsulates the logic for creating objects of different card types.
- The client code simply calls the `GetCard` method with the desired card type, and the factory returns the appropriate card object.
- This pattern ensures that the client code remains decoupled from the implementation details of the card types.

### Benefits
- **Encapsulation:** Hides object creation details.
- **Flexibility:** Easy to add new card types without modifying existing code.
- **Reusability:** Common interface promotes code reuse.

By implementing the Factory Design Pattern, we achieve a modular and maintainable design that simplifies object creation and promotes scalability.

