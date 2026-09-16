public class Method {

    public static void calculator(int x, int y, char cal) { // parameters

        if (cal == '+') {
            System.out.println(x + y);
        } else if (cal == '-') {
            System.out.println(x - y);
        } else if (cal == '*') {
            System.out.println(x * y);
        } else if (cal == '/') {
            if (y == 0) {
                System.out.println("Invalid !");
            } else {
                System.out.println(x / y);
            }
        } else {
            System.out.println("Invalid Operation !");
        }

    }

    public static String checkeven_odd(int a) {
        if (a % 2 == 0) {
            return "Even";
        } else {
            return "Odd";
        }
    }

    public static int largenum(int a, int b, int c) {
        if (a > b && a > c) {
            return a;
        } else if (b > a && b > c) {
            return b;
        } else {
            return c;
        }
    }

    public static int max_num(int... arr) {// var args = no of variable arguments

        int max = arr[0];

        for (int i = 0; i <= arr.length - 1; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }

    public int min_num(int arr[]) {

        int min = arr[0];

        for (int i = 0; i <= arr.length - 1; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }
        return min;
    }

    public static int update_val(int x) {
        return x;
    }

    public static double result_percentage(double marks , double total){
        return ( marks / total ) * 100 ;
    }

    public static boolean isPrime(int n ){

       if(n <= 1){
        return false;
       }

       for(int i=2;i*i <= n; i++){
        if(n % i == 0){
            return false;
        }
       }
       return true;
    }

    public static void main(String[] args) {

        int x = 100;
        System.out.println(update_val(x));
        System.out.println(result_percentage(145.0, 150.0));

      System.out.println(isPrime(1));

        // int x = 100;
        // System.out.println(update_val(x));

        // int arr[] = {1,3,5,10,6,90};

        // System.out.println(max_num(3,5,6,7,81));

        // Java is always pass-by-value.
        // non-static method
        // Method obj = new Method();
        // System.out.println(obj.min_num(arr));

        // calculator(10, 8, '*');//argumnets
        // calculator(2, 0, '&');

        // System.out.println(checkeven_odd(1));

        // System.out.println(largenum(19, 7, 30));
        // System.out.println(largenum(19, 7, 3));

    }
}
