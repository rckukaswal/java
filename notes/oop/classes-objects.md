Classes and Objects in Java
Classes and objects are the fundamental building blocks of object-oriented programming in Java.
What is a Class?
A class is a blueprint or template for creating objects. It defines the properties (attributes) and behaviors (methods) that the objects created from the class will have.
// Class definition
public class Car {
    // Attributes (fields)
    String brand;
    String color;
    int year;
    
    // Methods
    void start() {
        System.out.println("Car is starting...");
    }
    
    void stop() {
        System.out.println("Car is stopping...");
    }
}

What is an Object?
An object is an instance of a class. When a class is defined, no memory is allocated until objects are created.
// Creating objects
Car myCar = new Car();
Car yourCar = new Car();

The 'new' Keyword
The new keyword is used to allocate memory for an object at runtime. All objects get memory in the Heap area.
Accessing Class Members
// Setting attributes
myCar.brand = "Toyota";
myCar.color = "Red";
myCar.year = 2020;

// Calling methods
myCar.start();
myCar.stop();

Constructors
Constructors are special methods used to initialize objects. They have the same name as the class and no return type.
public class Car {
    String brand;
    String color;
    int year;
    
    // Default constructor
    public Car() {
        brand = "Unknown";
        color = "White";
        year = 2023;
    }
    
    // Parameterized constructor
    public Car(String brand, String color, int year) {
        this.brand = brand;
        this.color = color;
        this.year = year;
    }
}

// Using constructors
Car car1 = new Car(); // Uses default constructor
Car car2 = new Car("Honda", "Blue", 2021); // Uses parameterized constructor

The 'this' Keyword
this refers to the current object in a method or constructor. It's used to differentiate between instance variables and parameters with the same name.
Class vs Object



Class
Object



Template/blueprint
Instance of a class


Logical entity
Physical entity


Doesn't occupy memory
Occupies memory


Declared once
Can be created multiple times


Group of similar objects
Member of a class


Method Overloading
Multiple methods can have the same name with different parameters:
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
}

Access Modifiers
Control the visibility of classes, methods, and variables:

public: Accessible from any other class
private: Accessible only within the declared class
protected: Accessible within the package and subclasses
default: Accessible only within the package

Example: Student Class
public class Student {
    // Attributes
    private String name;
    private int rollNumber;
    private double marks;
    
    // Constructor
    public Student(String name, int rollNumber, double marks) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.marks = marks;
    }
    
    // Methods
    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Marks: " + marks);
    }
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public int getRollNumber() { return rollNumber; }
    public void setRollNumber(int rollNumber) { this.rollNumber = rollNumber; }
    
    public double getMarks() { return marks; }
    public void setMarks(double marks) { this.marks = marks; }
}

// Using the Student class
public class Main {
    public static void main(String[] args) {
        Student student1 = new Student("John", 101, 85.5);
        student1.displayInfo();
    }
}

Classes and objects form the foundation of Java's object-oriented programming paradigm, enabling code organization, reusability, and maintainability.
