Variables and Data Types in Java
Variables are containers for storing data values in Java. Each variable has a specific type, which determines the size and layout of the variable's memory.
Variable Declaration
// Syntax: type variableName = value;
int age = 25;
String name = "John";
double salary = 50000.50;

Java Data Types
Java has two categories of data types:
1. Primitive Data Types



Type
Size
Description
Example



byte
1 byte
Whole numbers from -128 to 127
byte b = 100;


short
2 bytes
Whole numbers from -32,768 to 32,767
short s = 1000;


int
4 bytes
Whole numbers from -2^31 to 2^31-1
int i = 100000;


long
8 bytes
Whole numbers from -2^63 to 2^63-1
long l = 100000L;


float
4 bytes
Fractional numbers (6-7 decimal digits)
float f = 3.14f;


double
8 bytes
Fractional numbers (15 decimal digits)
double d = 3.14159;


boolean
1 bit
true or false values
boolean flag = true;


char
2 bytes
Single character/letter
char c = 'A';


2. Reference Data Types

Strings: Sequence of characters
Arrays: Collection of similar type elements
Classes: User-defined data types
Interfaces: Blueprint of classes

Type Casting
Converting one data type to another:
// Widening Casting (automatically)
int myInt = 9;
double myDouble = myInt; // Automatic casting: int to double

// Narrowing Casting (manually)
double myDouble = 9.78;
int myInt = (int) myDouble; // Manual casting: double to int

Variable Naming Conventions

Must begin with a letter, $, or _
Cannot start with a number
Case sensitive
Cannot be a Java keyword
Use camelCase for variable names

Constants
Use the final keyword to create constants:
final double PI = 3.14159;
final int MAX_USERS = 100;

Variable Scope

Class level (instance variables) - Available to all methods in class
Method level (local variables) - Available only within the method
Block level - Available only within the block {}

public class ScopeExample {
    int classVariable = 10; // Class level
    
    public void method() {
        int localVariable = 20; // Method level
        
        if (true) {
            int blockVariable = 30; // Block level
        }
        // blockVariable not accessible here
    }
}

Best Practices

Use meaningful variable names
Initialize variables before use
Use final for constants
Follow naming conventions
Limit variable scope as much as possible
