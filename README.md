boxmaker
========

This is an Adobe Illustrator script to create Tab-and-Slot Boxes which can be cut out on a laser cutter.

Input, Length, Width, Height, and Material Thickness into a dialog. 

Outputs all six sides of the box on a new 12in x 24in CMYK canvas. All shapes have a 0.001 pt line thickness. These are the settings and sizes for my lab's lasercutter. 

It cannot create a box with L, W, or H less than 1 inch. 

Note on color theme:
This was written for the original 'light' Illustrator color theme. I've updated it for the CS6+ 'dark' theme. If you want to use it on a light themed Illustrator, change which color theme is being called in the var myBrush.