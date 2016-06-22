# Merge-comments

## What is it?

Merge-comments is a tool that merges single-line comments into multi-line ones.

## Example

file.js
````javascript
// alone comment
var a = 'b';
// first comment
// second comment
// third comment
````

````sh
$ merge-commits ./file.js
Done: file.js:
// alone comment
var a = 'b';
/**
 * first comment
 * second comment
 * third comment
 */
````

## Usage

Install with [npm](https://npmjs.org/package/merge-comments):
```sh
    $ [sudo] npm install merge-comments --save
```

If you want to use `merge-comments` on your cli install with:
```sh
    $ [sudo] npm install merge-comments -g
```

### CLI

Usage:
```sh
    $ merge-comments [OPTIONS]
```
Options:
```sh
    -i INPUT, --input=INPUT : Glob string(s) or file path(s) to process, "-" for STDIN
    -o, --output : Output directory path, "-" for STDOUT
    -m, --mask : Mask for output file name, '_?' by defaults
```
Arguments:
```sh
    INPUT : Alias to --input
```
Example:
* with files:
```sh
    $ merge-comments test.js

or
 
    $ merge-comments test.js -o ./merged/
    
or
    
    $ merge-comments test.js test2.js -o ./merged/
    
or
    
    $ merge-comments *.js -o ./merged/ -m merged_?
```
* with STDIN / STDOUT:
```sh
    $ cat test.js | merge-comments -i - -o - > test.merged.js
```
