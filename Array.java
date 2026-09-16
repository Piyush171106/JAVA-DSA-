import java.util.Scanner;

public class Array {

    public static boolean search_element(int arr[][],int target){

for(int i=0;i<=arr.length-1;i++){
    for(int j=0;j<=arr[i].length-1;j++){

        if(arr[i][j] == target){
            return true;
        }
       
    }
  
}
return false;
    }
    public static void main(String[] args) {


        Scanner sc = new Scanner(System.in);

        // int arr[] = new int[3];

        // arr[0] = sc.nextInt();
        // arr[1] = sc.nextInt();
        // arr[2] = sc.nextInt();

        // for(int val : arr){
        // System.out.println("Array Element :"+val);
        // }

        // int arr[][] = {
        //         { 1, 2, 3 },
        //         { 4, 5, 6 },
        //         { 7, 8, 9 }
        // };

        // System.out.println(search_element(arr, 1));

//         int max = arr[0][0];

//         for (int i = 0; i <= arr.length - 1; i++) {
//             for (int j = 0; j <= arr[i].length - 1; j++) {

//                 if (arr[i][j] > max) {
//                     max = arr[i][j];
//                 }

//             }

//         }
//         System.out.println(max);
//     }
// }


//row - wise sum 
// for(int i=0;i<=arr.length-1;i++){
//     int sum =0;
//     for(int j=0;j<=arr[i].length-1;j++){
//         sum = sum + arr[i][j];

//     }
//     System.out.println(sum);
// }

//col - wise sum 
// for(int i=0;i<=arr[i].length-1;i++){
//     int sum =0;
//     for(int j=0;j<=arr.length-1;j++){
//         sum = sum + arr[j][i];

//     }
//     System.out.println(sum);
// }


//Transpose of matrix 
// for(int i=0;i<=arr.length-1;i++){
//     for(int j=0;j<=arr[i].length-1;j++){
//         System.out.print(arr[j][i]+" ");
//     }
//     System.out.println();
// }

// int sum = 0;
// int n = arr.length;
// for(int i=0;i<=arr.length-1;i++){
// sum = sum + arr[i][i];
// sum = sum + arr[i][n-i-1];
// }

// System.out.println(sum);



// int nums [] = {0,0,1,1,1,2,2,3,3,4};

// int left =0;

// for(int right=0; right<= nums.length-1;right++){

//     if(nums[left] != nums[right]){
//         left++;
//         nums[left] = nums[right];
//     }
// }

// System.out.println(left+1);



// int n = 1234;
// int rev =0;
// int sum =0;

//reverse a no
// while(n >  0){
//     int lastdigit = n % 10 ;
//     rev = rev * 10 + lastdigit;
//     n = n / 10;
// }

// System.out.println(rev);

//sum of no

// while( n > 0){
//     int lastdigit = n % 10;
//     sum = sum + lastdigit;
//     n = n / 10;
// }

// System.out.println(sum);

//Print numbers from 1 to N
// for(int i=0;i<=10;i++){
//     System.out.println(i);
// }

//Print numbers from N to 1
// for(int i=10;i>=1;i--){
//     System.out.println(i);
// }

// int s = 0;
// for(int i=0;i<=10;i++){
//     if(i % 2 == 0){

//         s = s + i;
//     }
// }

// System.out.println(s);


// int s = 0;
// for(int i=0;i<=10;i++){
//     if(i % 2 != 0){

//         s = s + i;
//     }
// }

// System.out.println(s);


// int fact =1;

// for(int i=1;i<=10;i++){
//     fact = fact*i;
// }
// System.out.println(fact);


// for(int i=1;i<=10;i++){
//     if(i % 3 == 0){
//         System.out.println(i);
//     }
// }

// int n = 1234;

// int ld = n % 10;
// n = n/10;
// System.out.println(n);
    
// int n = 1234;
// int rev =0;

// while( n > 0){

//     int ld= n % 10;
//     rev = rev * 10 +ld ;
//     n = n /10;
// }

// System.out.println(rev);

// rev = rev / 10;
// System.out.println(rev);


// int revv=0;

// while( rev >0){
//     int ldd = rev % 10;
//     revv = revv * 10 + ldd;
//     rev = rev /10;
    
// }

// System.out.println(revv);


int n = 12223456;

int digit = 1 ;
int count =0;

while(n > 0){

    int lastdigit = n % 10;

    if(lastdigit == digit){
        count++;
    }
    n = n/10;
}

System.out.println(count);







    }
    
}