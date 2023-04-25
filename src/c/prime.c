#include "prime.h"

double squareRoot(double number) {
   double x = number;
   double y = 1.0;
   double e = 1.0; /* error tolerance */

   while (x - y > e) {
      x = (x + y) / 2;
      y = number / x;
   }
   return x;
}

double fmod(double x, double y) {
    int quotient = (int)(x / y);
    double remainder = x - quotient * y;
    return remainder;
}

int isPrime(double num) {
  double root = squareRoot(num);
  for(double i=2; i<root; i++) {
    if(fmod(num, i) == 0) {
      return 0;
    }
  }
  return 1;
}
