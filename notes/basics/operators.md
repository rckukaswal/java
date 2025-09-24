Operators in Java
Operators are special symbols that perform specific operations on one, two, or three operands, and then return a result.
Arithmetic Operators
Used for mathematical operations:
int a = 10, b = 5;

int sum = a + b;        // Addition: 15
int difference = a - b; // Subtraction: 5
int product = a * b;    // Multiplication: 50
int quotient = a / b;   // Division: 2
int remainder = a % b;  // Modulus: 0

Assignment Operators
Used to assign values to variables:
int x = 10;     // Simple assignment
x += 5;         // Equivalent to x = x + 5
x -= 3;         // Equivalent to x = x - 3
x *= 2;         // Equivalent to x = x * 2
x /= 4;         // Equivalent to x = x / 4
x %= 3;         // Equivalent to x = x % 3

Comparison Operators
Used to compare two values:
int a = 10, b = 5;

boolean isEqual = (a == b);        // false
boolean notEqual = (a != b);       // true
boolean greaterThan = (a > b);     // true
boolean lessThan = (a < b);        // false
boolean greaterEqual = (a >= b);   // true
boolean lessEqual = (a <= b);      // false

Logical Operators
Used to combine conditional statements:
boolean x = true, y = false;

boolean andResult = x && y;    // Logical AND: false
boolean orResult = x || y;     // Logical OR: true
boolean notResult = !x;        // Logical NOT: false

Unary Operators
Operate on single operand:
int a = 10;

a++;        // Post-increment: a becomes 11
++a;        // Pre-increment: a becomes 12
a--;        // Post-decrement: a becomes 11
--a;        // Pre-decrement: a becomes 10
int negative = -a; // Unary minus: -10

Ternary Operator
Short form of if-then-else statement:
int a = 10, b = 5;
int max = (a > b) ? a : b; // max = 10

Bitwise Operators
Work on individual bits:
int a = 5;  // binary: 0101
int b = 3;  // binary: 0011

int and = a & b;    // 0001 -> 1
int or = a | b;     // 0111 -> 7
int xor = a ^ b;    // 0110 -> 6
int complement = ~a; // 1010 -> -6 (in two's complement)

Operator Precedence
Operators are evaluated in this order:

Postfix: expr++ expr--
Unary: ++expr --expr +expr -expr ~ !
Multiplicative: * / %
Additive: + -
Shift: << >> >>>
Relational: < > <= >= instanceof
Equality: == !=
Bitwise AND: &
Bitwise XOR: ^
Bitwise OR: |
Logical AND: &&
Logical OR: ||
Ternary: ? :
Assignment: = += -= etc.

Examples
public class OperatorExamples {
    public static void main(String[] args) {
        // Arithmetic operators
        System.out.println("10 + 5 = " + (10 + 5));
        System.out.println("10 - 5 = " + (10 - 5));
        
        // Comparison operators
        System.out.println("10 > 5: " + (10 > 5));
        
        // Logical operators
        System.out.println("true && false: " + (true && false));
        
        // Ternary operator
        int number = 10;
        String result = (number % 2 == 0) ? "Even" : "Odd";
        System.out.println(number + " is " + result);
    }
}

Understanding operators is crucial for performing operations and making decisions in your Java programs.
