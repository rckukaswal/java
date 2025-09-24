Collections Framework in Java
The Java Collections Framework provides a set of classes and interfaces for storing and manipulating groups of objects. It provides ready-made architectures for common data structures.
Overview of Collections Framework
The Java Collections Framework (JCF) is a unified architecture for representing and manipulating collections, allowing collections to be manipulated independently of the details of their representation. It is part of the java.util package.
Hierarchy of Collection Framework
The framework is based on a hierarchy of interfaces and classes:

Collection Interface: The root interface for all collections (extends Iterable).
List Interface: Ordered collections that can contain duplicates.
ArrayList: Resizable array implementation.
LinkedList: Doubly-linked list implementation.
Vector: Synchronized resizable array (legacy).


Set Interface: Collections that cannot contain duplicates.
HashSet: Hash table implementation (unordered).
LinkedHashSet: Hash table with linked list (maintains insertion order).
TreeSet: Red-black tree implementation (sorted).


Queue Interface: Collections designed for holding elements prior to processing (FIFO).
PriorityQueue: Priority heap implementation.
ArrayDeque: Resizable-array implementation of Deque.




Map Interface: Object that maps keys to values (not a true Collection, but part of the framework).
HashMap: Hash table implementation.
LinkedHashMap: Hash table with linked list (maintains insertion order).
TreeMap: Red-black tree implementation (sorted by keys).
Hashtable: Synchronized hash table (legacy).



Algorithms like sort, shuffle, and search are provided as static methods in the Collections class.
ArrayList Example
import java.util.*;

public class ArrayListExample {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        list.add("Orange");
        
        System.out.println("List: " + list);
        list.remove(1);
        System.out.println("After removal: " + list);
    }
}

LinkedList Example
import java.util.*;

public class LinkedListExample {
    public static void main(String[] args) {
        LinkedList<String> linkedList = new LinkedList<>();
        linkedList.add("Dog");
        linkedList.addFirst("Cat");
        linkedList.addLast("Bird");
        
        System.out.println("LinkedList: " + linkedList);
        linkedList.removeLast();
        System.out.println("After removal: " + linkedList);
    }
}

HashSet Example
import java.util.*;

public class HashSetExample {
    public static void main(String[] args) {
        HashSet<String> set = new HashSet<>();
        set.add("Red");
        set.add("Green");
        set.add("Blue");
        set.add("Red"); // Duplicate, ignored
        
        System.out.println("Set: " + set);
    }
}

TreeSet Example
import java.util.*;

public class TreeSetExample {
    public static void main(String[] args) {
        TreeSet<Integer> treeSet = new TreeSet<>();
        treeSet.add(5);
        treeSet.add(1);
        treeSet.add(3);
        
        System.out.println("TreeSet (sorted): " + treeSet);
    }
}

HashMap Example
import java.util.*;

public class HashMapExample {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("Alice", 25);
        map.put("Bob", 30);
        map.put("Charlie", 35);
        
        System.out.println("Map: " + map);
        System.out.println("Age of Bob: " + map.get("Bob"));
    }
}

TreeMap Example
import java.util.*;

public class TreeMapExample {
    public static void main(String[] args) {
        TreeMap<String, Integer> treeMap = new TreeMap<>();
        treeMap.put("Zoe", 28);
        treeMap.put("Alice", 25);
        treeMap.put("Bob", 30);
        
        System.out.println("TreeMap (sorted by key): " + treeMap);
    }
}

PriorityQueue Example
import java.util.*;

public class PriorityQueueExample {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.add(10);
        pq.add(5);
        pq.add(15);
        
        System.out.println("Peek: " + pq.peek()); // 5
        System.out.println("Poll: " + pq.poll()); // 5
        System.out.println("After poll: " + pq);
    }
}

Collections Utility Class
The Collections class provides static methods for operating on collections.
import java.util.*;

public class CollectionsUtilityExample {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();
        numbers.add(5);
        numbers.add(2);
        numbers.add(8);
        numbers.add(1);
        
        // Sorting
        Collections.sort(numbers);
        System.out.println("Sorted: " + numbers);
        
        // Reversing
        Collections.reverse(numbers);
        System.out.println("Reversed: " + numbers);
        
        // Shuffling
        Collections.shuffle(numbers);
        System.out.println("Shuffled: " + numbers);
        
        // Finding min/max
        System.out.println("Min: " + Collections.min(numbers));
        System.out.println("Max: " + Collections.max(numbers));
        
        // Binary search (list must be sorted)
        Collections.sort(numbers);
        int index = Collections.binarySearch(numbers, 5);
        System.out.println("Index of 5: " + index);
    }
}

Iterators
import java.util.*;

public class IteratorExample {
    public static void main(String[] args) {
        List<String> colors = new ArrayList<>();
        colors.add("Red");
        colors.add("Green");
        colors.add("Blue");
        
        // Using Iterator
        Iterator<String> iterator = colors.iterator();
        while (iterator.hasNext()) {
            String color = iterator.next();
            System.out.println(color);
            if (color.equals("Green")) {
                iterator.remove(); // Safe removal during iteration
            }
        }
        
        System.out.println("After removal: " + colors);
    }
}

Comparable and Comparator
Using Comparable
class Student implements Comparable<Student> {
    String name;
    int grade;
    
    public Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }
    
    @Override
    public int compareTo(Student other) {
        return this.grade - other.grade; // Sort by grade
    }
    
    @Override
    public String toString() {
        return name + " (" + grade + ")";
    }
}

public class ComparableExample {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Alice", 85));
        students.add(new Student("Bob", 92));
        students.add(new Student("Charlie", 78));
        
        Collections.sort(students);
        System.out.println("Sorted by grade: " + students);
    }
}

Using Comparator
import java.util.*;

class NameComparator implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        return s1.name.compareTo(s2.name);
    }
}

public class ComparatorExample {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Charlie", 78));
        students.add(new Student("Alice", 85));
        students.add(new Student("Bob", 92));
        
        // Sort by name using Comparator
        Collections.sort(students, new NameComparator());
        System.out.println("Sorted by name: " + students);
        
        // Using lambda expression
        Collections.sort(students, (s1, s2) -> s1.name.compareTo(s2.name));
    }
}

Best Practices

Use interface types for declarations (List, Set, Map instead of ArrayList, HashSet)
Choose the right collection type for your needs
Use generics for type safety
Consider thread safety (use ConcurrentHashMap, CopyOnWriteArrayList for multithreading)
Use enhanced for-loop or iterators for traversal

The Collections Framework is essential for efficient data management in Java applications.
