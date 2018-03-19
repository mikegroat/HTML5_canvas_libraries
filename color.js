    // A library for colors
    // Set the colors in the colorArray, using a color wheel program (like Adobe Kuler)
    // Each palette is an object with the following structure:
    // { name: "name", colors: [array of colors]}
function Palettes() {

    this.palettes = [];

    this.createPalette = function(palette) {
        if (name in palette & colors in palette) {
            this.palettes.push(palette);
        }
    }

    this.randomPalette = function() {
        return palettes[randIntBetween(0, this.palettes.length)];
    }

    this.randomColor = function(palette) {
        var i = randIntBetween(0, palette.colors.length - 1);
        return palette[i];
    }

    this.getPalette = function(name) {
        return palettes.find(function(element) {
            return element.name == name; 
        });
    }

}
