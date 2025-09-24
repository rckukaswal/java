class Bank {
    double getRateOfInterest() {
        return 0.0;
    }
}

class SBI extends Bank {
    @Override
    double getRateOfInterest() {
        return 8.4;
    }
}

class ICICI extends Bank {
    @Override
    double getRateOfInterest() {
        return 7.3;
    }
}

class AXIS extends Bank {
    @Override
    double getRateOfInterest() {
        return 9.7;
    }
}

public class Main {
    public static void main(String[] args) {
        Bank b;
        
        b = new SBI();
        System.out.println("SBI Rate of Interest: " + b.getRateOfInterest());
        
        b = new ICICI();
        System.out.println("ICICI Rate of Interest: " + b.getRateOfInterest());
        
        b = new AXIS();
        System.out.println("AXIS Rate of Interest: " + b.getRateOfInterest());
    }
}
