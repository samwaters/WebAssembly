#include <emscripten.h>
#include <stdio.h>
#include <math.h>
#include "prime.h"

int main() {
  return 0;
}

EMSCRIPTEN_KEEPALIVE
int isPrime(double num) {
  double root = sqrt(num);
  for(double i=2; i<root; i++) {
    if(fmod(num, i) == 0) {
      return 0;
    }
  }
  return 1;
}
