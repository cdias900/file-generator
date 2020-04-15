# File Generator

Generate files of the desired size, filled with random words.

## Usage
 - Run ```npm run generate [file_size]``` in this folder to generate a file, the ```file_size``` argument is the size of the file in MB (Note that it is the approximate size of the file, so if you need a file with an exact size, you'll have to figure out the right size you should input).
 - If you want to increase the size of an existing text file, write the ```--append``` argument after the ```file_size```, and the filename right after ```--append```. (E.g.: ```npm run generate 1000 --append ./file.txt```)
 - If the filename is not especified, the default filename is ```out.txt```