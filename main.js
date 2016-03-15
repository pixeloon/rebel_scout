window.onload = function() {

    main();



};

function main() {

    // declarations
    var score, width, height, uncovered, locations,
        currentState, targets, danger, quadrant, sectorId,
        state = {
            splash: 0,
            game: 1,
            score: 2
        },

        $game = $('.game'),
        $gameCanvas = $('#gameCanvas'),
        $sector, $row;

    var SECTOR_W = 30;
    var SECTOR_H = 30;

    targets = ["images/target1.png", "images/target2.png"];
    danger = "images/danger.png";

    var sectors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255];


    var map = [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0];

    console.log(map.length);

    var mapLength = Math.sqrt(sectors.length); //16


    // initial game board
    sectorId = 0;
    var y = 0;

    for (var i = 0; i < 16; i++) {
        var x = 0;
        for (var j = 0; j < 16; j++) {
            $('canvas').drawImage({
                source: 'images/space.png',
                layer: true,
                visible: true,
                x: x,
                y: y,
                width: 30,
                height: 30,
                fromCenter: false,

            });

            x += 30;
        }
        y += 30;
    }


    // event listener
    $gameCanvas.on("click", getSectorClicked);

    function getSectorClicked(e) {
        //get coordinates relative to the game canvas

        var xPosition = Math.floor(e.offsetX);
        var yPosition = Math.floor(e.offsetY);
        // calculate sector number from coordinates
        var sectormapX = Math.floor(xPosition / SECTOR_W);
        var sectormapY = Math.floor(yPosition / SECTOR_H);
        var sectorClicked = (sectormapY * mapLength) + sectormapX;

        //get position in map array from sector clicked
        // sectormapX = sectorClicked % 16;
        // sectormapY = Math.floor(sectorClicked / 16);

        console.log("X: " + xPosition + " " + sectormapX + ", Y: " + yPosition + " " + sectormapY + ", sector: " + sectorClicked);





        if (map[sectorClicked] === 1) {
            $('canvas').drawImage({
                source: 'images/danger.png',
                layer: true,
                visible: true,
                //get current top left coordinate
                x: sectormapX * 30,
                y: sectormapY * 30,
                width: 30,
                height: 30,
                fromCenter: false,

            });
        } else if (map[sectorClicked] === 2) {
            $('canvas').drawImage({
                source: 'images/target1.png',
                layer: true,
                visible: true,
                x: sectormapX * 30,
                y: sectormapY * 30,
                width: 30,
                height: 30,
                fromCenter: false,

            });
        } else {

            $('canvas').drawImage({
                source: 'images/target2.png',
                layer: true,
                visible: true,
                x: sectormapX * 30,
                y: sectormapY * 30,
                width: 30,
                height: 30,
                fromCenter: false,

            });

            checkAdj(sectormapX, sectormapY);


        }

    }

    function checkAdj(x, y) {

        var sectorClicked = (y * mapLength) + x;
        console.log("inside checkAdj, Sector: " + sectorClicked + " x:" + x + " and y:" + y);


        // adjacent sector numbering
        // |0|1|2|
        // |3|X|4|
        // |5|6|7|

        // TODO: EDGE CASES
        var adj0 = sectorClicked - (mapLength + 1);
        var adj1 = sectorClicked - mapLength;
        var adj2 = sectorClicked - (mapLength - 1);
        var adj3 = sectorClicked - 1;
        var adj4 = sectorClicked + 1;
        var adj5 = sectorClicked + (mapLength - 1);
        var adj6 = sectorClicked + (mapLength);
        var adj7 = sectorClicked + (mapLength + 1);
        console.log(adj0 + " " + adj1 + " " + adj2 + " " + adj3 + " " + adj4 + " " + adj5 + " " + adj6 + " " + adj7);
        console.log("ADJ:" + map[adj0]);

        //check if map shows any bogeys in adjacent sectors from adj0
        if ((map[adj0] === 0)) {
            // use adjacent sector IDs from sectors array to calculate x and y coordinates
            adjsectorX = sectors[adj0] % 16;
            adjsectorY = Math.floor(sectors[adj0] / 16);
            console.log("Adj0 - x: " + adjsectorX + " y: " + adjsectorY);

            $('canvas').drawImage({
                source: 'images/target2.png',
                layer: true,
                visible: true,
                x: adjsectorX * 30,
                y: adjsectorY * 30,
                width: 30,
                height: 30,
                fromCenter: false,

            });
        }
        //check if map shows any bogeys in adjacent sectors from adj1
        if ((map[adj1] === 0)) {
            // use adjacent sector IDs from sectors array to calculate x and y coordinates
            adjsectorX = sectors[adj1] % 16;
            adjsectorY = Math.floor(sectors[adj1] / 16);

            $('canvas').drawImage({
                source: 'images/target2.png',
                layer: true,
                visible: true,
                x: adjsectorX * 30,
                y: adjsectorY * 30,
                width: 30,
                height: 30,
                fromCenter: false,

            });
        }
        //check if map shows any bogeys in adjacent sectors from adj2
        if ((map[adj2] === 0)) {
            // use adjacent sector IDs from sectors array to calculate x and y coordinates
            adjsectorX = sectors[adj2] % 16;
            adjsectorY = Math.floor(sectors[adj2] / 16);
            console.log("Adj0 - x: " + adjsectorX + " y: " + adjsectorY);

            $('canvas').drawImage({
                source: 'images/target2.png',
                layer: true,
                visible: true,
                x: adjsectorX * 30,
                y: adjsectorY * 30,
                width: 30,
                height: 30,
                fromCenter: false,

            });
        }
        //check if map shows any bogeys in adjacent sectors from adj3
        if ((map[adj3] === 0)) {
            // use adjacent sector IDs from sectors array to calculate x and y coordinates
            adjsectorX = sectors[adj3] % 16;
            adjsectorY = Math.floor(sectors[adj3] / 16);
            console.log("Adj0 - x: " + adjsectorX + " y: " + adjsectorY);

            $('canvas').drawImage({
                source: 'images/target2.png',
                layer: true,
                visible: true,
                x: adjsectorX * 30,
                y: adjsectorY * 30,
                width: 30,
                height: 30,
                fromCenter: false,

            });
        }
        //check if map shows any bogeys in adjacent sectors from adj4
        if ((map[adj4] === 0)) {
            // use adjacent sector IDs from sectors array to calculate x and y coordinates
            adjsectorX = sectors[adj4] % 16;
            adjsectorY = Math.floor(sectors[adj4] / 16);
            console.log("Adj0 - x: " + adjsectorX + " y: " + adjsectorY);

            $('canvas').drawImage({
                source: 'images/target2.png',
                layer: true,
                visible: true,
                x: adjsectorX * 30,
                y: adjsectorY * 30,
                width: 30,
                height: 30,
                fromCenter: false,

            });
        }
        //check if map shows any bogeys in adjacent sectors from adj5
        if ((map[adj5] === 0)) {
            // use adjacent sector IDs from sectors array to calculate x and y coordinates
            adjsectorX = sectors[adj5] % 16;
            adjsectorY = Math.floor(sectors[adj5] / 16);
            console.log("Adj0 - x: " + adjsectorX + " y: " + adjsectorY);

            $('canvas').drawImage({
                source: 'images/target2.png',
                layer: true,
                visible: true,
                x: adjsectorX * 30,
                y: adjsectorY * 30,
                width: 30,
                height: 30,
                fromCenter: false,

            });
        }
        //check if map shows any bogeys in adjacent sectors from adj6
        if ((map[adj6] === 0)) {
            // use adjacent sector IDs from sectors array to calculate x and y coordinates
            adjsectorX = sectors[adj6] % 16;
            adjsectorY = Math.floor(sectors[adj6] / 16);
            console.log("Adj0 - x: " + adjsectorX + " y: " + adjsectorY);

            $('canvas').drawImage({
                source: 'images/target2.png',
                layer: true,
                visible: true,
                x: adjsectorX * 30,
                y: adjsectorY * 30,
                width: 30,
                height: 30,
                fromCenter: false,

            });
        }
        //check if map shows any bogeys in adjacent sectors from adj7
        if ((map[adj7] === 0)) {
            // use adjacent sector IDs from sectors array to calculate x and y coordinates
            adjsectorX = sectors[adj7] % 16;
            adjsectorY = Math.floor(sectors[adj7] / 16);
            console.log("Adj0 - x: " + adjsectorX + " y: " + adjsectorY);

            $('canvas').drawImage({
                source: 'images/target2.png',
                layer: true,
                visible: true,
                x: adjsectorX * 30,
                y: adjsectorY * 30,
                width: 30,
                height: 30,
                fromCenter: false,

            });
        }
    }




} // end main
