Multithreading in Java
Multithreading is a Java feature that allows concurrent execution of two or more parts of a program for maximum utilization of CPU. Each part of such a program is called a thread.
What is a Thread?
A thread is a lightweight sub-process, the smallest unit of processing. Threads are independent, and if an exception occurs in one thread, it doesn't affect other threads.
Main Thread
When a Java program starts up, one thread begins running immediately. This is usually called the main thread.
public class MainThreadExample {
    public static void main(String[] args) {
        Thread mainThread = Thread.currentThread();
        System.out.println("Current thread: " + mainThread.getName());
        
        // Change the name of the thread
        mainThread.setName("MyMainThread");
        System.out.println("After name change: " + mainThread.getName());
    }
}

Creating Threads
There are two ways to create a thread:
1. By Extending Thread Class
class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
            try {
                Thread.sleep(1000); // Pause for 1 second
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted");
            }
        }
    }
}

public class ThreadExample {
    public static void main(String[] args) {
        MyThread thread1 = new MyThread();
        MyThread thread2 = new MyThread();
        
        thread1.setName("Thread-1");
        thread2.setName("Thread-2");
        
        thread1.start(); // Start thread1
        thread2.start(); // Start thread2
    }
}

2. By Implementing Runnable Interface
class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted");
            }
        }
    }
}

public class RunnableExample {
    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        
        Thread thread1 = new Thread(myRunnable, "Thread-1");
        Thread thread2 = new Thread(myRunnable, "Thread-2");
        
        thread1.start();
        thread2.start();
    }
}

Thread Lifecycle
A thread can be in one of these states:

New: Thread created but not started
Runnable: Thread is ready to run
Running: Thread is executing
Blocked/Waiting: Thread is waiting for a resource
Terminated: Thread has finished execution

Thread Methods
Basic Thread Methods
public class ThreadMethodsExample {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println("Count: " + i);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    System.out.println("Thread interrupted");
                    return;
                }
            }
        });
        
        thread.start();
        
        // Main thread waits for 'thread' to complete
        thread.join();
        
        System.out.println("Thread state: " + thread.getState());
        System.out.println("Thread is alive: " + thread.isAlive());
    }
}

Thread Synchronization
Synchronization is needed when multiple threads access shared resources.
Without Synchronization (Problem)
class Counter {
    private int count = 0;
    
    public void increment() {
        count++;
    }
    
    public int getCount() {
        return count;
    }
}

public class WithoutSyncExample {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();
        
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        
        t1.start();
        t2.start();
        
        t1.join();
        t2.join();
        
        System.out.println("Final count: " + counter.getCount()); // May not be 2000
    }
}

With Synchronization (Solution)
class SynchronizedCounter {
    private int count = 0;
    
    // Synchronized method
    public synchronized void increment() {
        count++;
    }
    
    // Synchronized block
    public void incrementWithBlock() {
        synchronized(this) {
            count++;
        }
    }
    
    public int getCount() {
        return count;
    }
}

Thread Communication (wait(), notify(), notifyAll())
class SharedResource {
    private int data;
    private boolean available = false;
    
    public synchronized void produce(int value) {
        while (available) {
            try {
                wait(); // Wait for consumer to consume
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        data = value;
        available = true;
        System.out.println("Produced: " + data);
        notify(); // Notify waiting consumer
    }
    
    public synchronized void consume() {
        while (!available) {
            try {
                wait(); // Wait for producer to produce
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        System.out.println("Consumed: " + data);
        available = false;
        notify(); // Notify waiting producer
    }
}

Thread Pools with ExecutorService
import java.util.concurrent.*;

public class ThreadPoolExample {
    public static void main(String[] args) {
        // Create a thread pool with 3 threads
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        // Submit tasks to the thread pool
        for (int i = 1; i <= 10; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("Task " + taskId + " executed by " + 
                                 Thread.currentThread().getName());
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }
        
        // Shutdown the executor
        executor.shutdown();
        
        try {
            // Wait for all tasks to complete
            if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
                executor.shutdownNow();
            }
        } catch (InterruptedException e) {
            executor.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }
}

Callable and Future
import java.util.concurrent.*;

public class CallableExample {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        
        // Submit a Callable task
        Future<Integer> future = executor.submit(() -> {
            Thread.sleep(2000);
            return 42;
        });
        
        // Do other work while task is executing
        
        // Get the result (blocks until available)
        Integer result = future.get();
        System.out.println("Result: " + result);
        
        executor.shutdown();
    }
}

Thread Safety with Atomic Variables
import java.util.concurrent.atomic.AtomicInteger;

class AtomicCounter {
    private AtomicInteger count = new AtomicInteger(0);
    
    public void increment() {
        count.incrementAndGet();
    }
    
    public int getCount() {
        return count.get();
    }
}

Deadlock Example and Prevention
public class DeadlockExample {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();
    
    public void method1() {
        synchronized(lock1) {
            System.out.println("Acquired lock1 in method1");
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            
            synchronized(lock2) {
                System.out.println("Acquired lock2 in method1");
            }
        }
    }
    
    public void method2() {
        synchronized(lock2) {
            System.out.println("Acquired lock2 in method2");
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            
            synchronized(lock1) {
                System.out.println("Acquired lock1 in method2");
            }
        }
    }
    
    public static void main(String[] args) {
        DeadlockExample example = new DeadlockExample();
        
        Thread t1 = new Thread(example::method1);
        Thread t2 = new Thread(example::method2);
        
        t1.start();
        t2.start();
    }
}

Best Practices for Multithreading

Use high-level concurrency utilities (ExecutorService, ConcurrentHashMap)
Prefer immutability where possible
Use synchronized collections when needed
Avoid deadlocks by acquiring locks in consistent order
Use thread pools instead of creating new threads manually
Handle InterruptedException properly
Use volatile for visibility between threads
Prefer atomic variables for simple atomic operations

Common Multithreading Issues

Race Conditions: When multiple threads access shared data
Deadlocks: When threads wait for each other indefinitely
Starvation: When a thread cannot access shared resources
Livelock: When threads keep responding to each other but make no progress

Multithreading can significantly improve application performance but requires careful design to avoid concurrency issues.
