# Classes and Objects (कक्षाएं और वस्तुएं)
**क्लास** एक ब्लूप्रिंट है, **ऑब्जेक्ट** उसका भौतिक रूप।

उदाहरण:
```java
class Car { // क्लास
    String color;
    
    void start() {
        System.out.println("कार शुरू हुई");
    }
}

Car myCar = new Car(); // ऑब्जेक्ट

## 📁 `notes/oop/inheritance.md`
```markdown
# Inheritance (विरासत)
एक क्लास दूसरी क्लास के गुणों को inherit कर सकती है।

```java
class Animal { // पैरेंट क्लास
    void eat() {
        System.out.println("खा रहा हूँ");
    }
}

class Dog extends Animal { // चाइल्ड क्लास
    void bark() {
        System.out.println("भौंक रहा हूँ");
    }
}

## 📁 `notes/oop/polymorphism.md`
```markdown
# Polymorphism (बहुरूपता)
एक ही नाम के अलग-अलग रूप।

## प्रकार:
1. **कम्पाइल टाइम** - मेथड ओवरलोडिंग
2. **रनटाइम** - मेथड ओवरराइडिंग

उदाहरण:
```java
// ओवरलोडिंग
class Calculator {
    int add(int a, int b) { return a+b; }
    int add(int a, int b, int c) { return a+b+c; }
}

## 📁 `notes/advanced/collections.md`
```markdown
# Collections (संग्रह)
डेटा स्ट्रक्चर जो ऑब्जेक्ट्स को स्टोर और मैनेज करते हैं।

## मुख्य इंटरफेस:
- List (सूची)
- Set (समुच्चय)
- Map (मानचित्र)

उदाहरण:
```java
ArrayList<String> list = new ArrayList<>();
list.add("नमस्ते");
list.add("दुनिया");

## 📁 `notes/advanced/multithreading.md`
```markdown
# Multithreading (बहु-थ्रेडिंग)
एक साथ कई थ्रेड्स का execution।

## थ्रेड बनाने के तरीके:
1. Thread क्लास extend करके
2. Runnable इंटरफेस implement करके

उदाहरण:
```java
class MyThread extends Thread {
    public void run() {
        System.out.println("थ्रेड चल रहा है");
    }
}

## 📁 `notes/advanced/exception-handling.md`
```markdown
# Exception Handling (अपवाद प्रबंधन)
प्रोग्राम में errors को handle करना।

## कीवर्ड:
- try
- catch
- finally
- throw
- throws

उदाहरण:
```java
try {
    int result = 10/0;
} catch (ArithmeticException e) {
    System.out.println("शून्य से भाग नहीं कर सकते");
}
