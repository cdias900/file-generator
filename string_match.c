#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include "omp.h"
#define BUFFER_SIZE 100

int searchInFile(char *filename, char *string) {
    FILE *f = fopen(filename, "r");
    int occurences = 0, i = 0;
    char buffer[BUFFER_SIZE];
    if(f == NULL) return -1;

    while(fgets(buffer, sizeof(buffer), f) != NULL) {
        if(strstr(buffer, string)) {
            printf("buffer: %s\n", buffer);
            printf("String: %s\n", string);
            occurences++;
        }
    }
    fclose(f);
    return occurences;
}

int main(int argc, char *argv[]) {
	int result;

	result = searchInFile(argv[1], argv[2]);
    printf("Result: %i\n", result);
	return(0);
}
