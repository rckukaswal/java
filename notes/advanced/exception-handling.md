Exception Handling in Java
Exception handling is a mechanism to handle runtime errors such as ClassNotFoundException, IOException, SQLException, etc. It helps maintain the normal flow of the application.
What is an Exception?
An exception is an unwanted or unexpected event that occurs during the execution of a program, which disrupts the normal flow of the program's instructions.
Exception Hierarchy
Throwable
    ├── Error (e.g., OutOfMemoryError, StackOverflowError)
    └── Exception
          ├── RuntimeException (Unchecked Exceptions)
          └── Other Exceptions (Checked Exceptions)

Types of Exceptions
1. Checked Exceptions

Checked at compile-time
Must be handled using try-catch or declared with throws
Examples: IOException, SQLException, ClassNotFoundException

2. Unchecked Exceptions

Checked at runtime
Examples: NullPointerException, ArrayIndexOutOfBoundsException

3. Errors

Serious problems that applications should not try to catch
Examples: OutOfMemoryError, StackOverflowError

try-catch Block
public class BasicExceptionHandling {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // This will throw ArithmeticException
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Cannot divide by zero!");
            System.out.println("Exception message: " + e.getMessage());
        }
        
        System.out.println("Program continues after exception handling");
    }
}

Multiple catch Blocks
public class MultipleCatchExample {
    public static void main(String[] args) {
        try {
            int[] numbers = new int[5];
            numbers[10] = 50; // ArrayIndexOutOfBoundsException
            int result = 10 / 0; // ArithmeticException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index is out of bounds!");
        } catch (ArithmeticException e) {
            System.out.println("Arithmetic exception occurred!");
        } catch (Exception e) {
            System.out.println("Some other exception occurred: " + e.getMessage());
        }
    }
}

Multi-catch Block (Java 7+)
public class MultiCatchExample {
    public static void main(String[] args) {
        try {
            // Code that might throw multiple exceptions
            String str = null;
            System.out.println(str.length()); // NullPointerException
        } catch (NullPointerException | ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught exception: " + e.getClass().getSimpleName());
        }
    }
}

finally Block
public class FinallyExample {
    public static void main(String[] args) {
        try {
            int result = 10 / 2;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Exception: " + e.getMessage());
        } finally {
            System.out.println("This block is always executed.");
        }
    }
}

throw Keyword
Used to explicitly throw an exception.
public class ThrowExample {
    static void checkAge(int age) {
        if (age < 18) {
            throw new ArithmeticException("Access denied - You must be at least 18 years old.");
        } else {
            System.out.println("Access granted");
        }
    }
    
    public static void main(String[] args) {
        checkAge(15); // This will throw an exception
    }
}

throws Keyword
Used to declare an exception that might be thrown by a method.
import java.io.*;

public class ThrowsExample {
    // This method declares that it might throw an IOException
    public static void readFile() throws IOException {
        FileReader file = new FileReader("test.txt");
        BufferedReader fileInput = new BufferedReader(file);
        
        // Print first 3 lines of file
        for (int counter = 0; counter < 3; counter++) {
            System.out.println(fileInput.readLine());
        }
        
        fileInput.close();
    }
    
    public static void main(String[] args) {
        try {
            readFile();
        } catch (IOException e) {
            System.out.println("An I/O error occurred: " + e.getMessage());
        }
    }
}

Custom Exceptions
Creating your own exception classes.
// Custom exception class
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

class InsufficientFundsException extends Exception {
    private double amount;
    
    public InsufficientFundsException(double amount) {
        super("Insufficient funds. Required: " + amount);
        this.amount = amount;
    }
    
    public double getAmount() {
        return amount;
    }
}

public class CustomExceptionExample {
    static void validateAge(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("Age must be 18 or above");
        } else {
            System.out.println("Age is valid");
        }
    }
    
    static void withdraw(double balance, double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(amount - balance);
        } else {
            balance -= amount;
            System.out.println("Withdrawal successful. New balance: " + balance);
        }
    }
    
    public static void main(String[] args) {
        try {
            validateAge(15);
        } catch (InvalidAgeException e) {
            System.out.println("Exception: " + e.getMessage());
        }
        
        try {
            withdraw(1000, 1500);
        } catch (InsufficientFundsException e) {
            System.out.println("Exception: " + e.getMessage());
            System.out.println("You need: $" + e.getAmount() + " more");
        }
    }
}

try-with-resources (Java 7+)
Automatically closes resources that implement AutoCloseable.
import java.io.*;

public class TryWithResourcesExample {
    public static void main(String[] args) {
        // The FileReader will be closed automatically
        try (FileReader reader = new FileReader("file.txt");
             BufferedReader br = new BufferedReader(reader)) {
            
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
            
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
        // Resources are automatically closed here
    }
}

Exception Propagation
public class ExceptionPropagation {
    void method1() {
        method2();
    }
    
    void method2() {
        method3();
    }
    
    void method3() {
        int result = 10 / 0; // Exception occurs here
    }
    
    public static void main(String[] args) {
        ExceptionPropagation obj = new ExceptionPropagation();
        try {
            obj.method1();
        } catch (ArithmeticException e) {
            System.out.println("Exception handled in main: " + e.getMessage());
        }
    }
}

Best Practices for Exception Handling
1. Be Specific in Catch Blocks
// Good
try {
    // code
} catch (FileNotFoundException e) {
    // handle file not found
} catch (IOException e) {
    // handle other I/O errors
}

// Avoid
try {
    // code
} catch (Exception e) {
    // too generic
}

2. Don't Ignore Exceptions
// Bad
try {
    // code
} catch (Exception e) {
    // empty catch block - exception ignored
}

// Good
try {
    // code
} catch (Exception e) {
    logger.error("Exception occurred", e);
    // or rethrow, or handle appropriately
}

3. Use Finally for Cleanup
Connection conn = null;
try {
    conn = getConnection();
    // use connection
} catch (SQLException e) {
    // handle exception
} finally {
    if (conn != null) {
        try {
            conn.close();
        } catch (SQLException e) {
            logger.error("Error closing connection", e);
        }
    }
}

4. Prefer Try-with-Resources
// Good (Java 7+)
try (Connection conn = getConnection();
     PreparedStatement stmt = conn.prepareStatement(sql)) {
    // use resources
} catch (SQLException e) {
    // handle exception
}

5. Provide Useful Exception Messages
// Good
throw new IllegalArgumentException("Age cannot be negative: " + age);

// Avoid
throw new IllegalArgumentException("Invalid age");

6. Use Exception Chaining
try {
    // code that throws IOException
} catch (IOException e) {
    throw new DatabaseException("Failed to read configuration", e);
}

Common Java Exceptions



Exception
Description



NullPointerException
Attempt to use null reference


ArrayIndexOutOfBoundsException
Invalid array index


IllegalArgumentException
Illegal argument passed to method


IllegalStateException
Method called at illegal time


ClassCastException
Invalid cast


UnsupportedOperationException
Unsupported operation


Exception Handling in Real-World Applications
public class BankAccount {
    private double balance;
    
    public BankAccount(double initialBalance) {
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }
        this.balance = initialBalance;
    }
    
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive");
        }
        
        if (amount > balance) {
            throw new InsufficientFundsException(amount - balance);
        }
        
        balance -= amount;
        System.out.println("Withdrawn: " + amount + ", New balance: " + balance);
    }
    
    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        
        balance += amount;
        System.out.println("Deposited: " + amount + ", New balance: " + balance);
    }
    
    public double getBalance() {
        return balance;
    }
}

public class BankApplication {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(1000);
        
        try {
            account.deposit(500);
            account.withdraw(200);
            account.withdraw(2000); // This will throw exception
        } catch (InsufficientFundsException e) {
            System.out.println("Transaction failed: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid operation: " + e.getMessage());
        }
    }
}

Proper exception handling makes your code more robust, maintainable, and user-friendly by gracefully handling unexpected situations.
