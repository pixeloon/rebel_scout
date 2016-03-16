window.onload = function() {



    main();



};

function main() {

    // declarations
    var score, width, height, uncovered, locations, physicalClick,
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


    var map = [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0];

    console.log(map.length);

    //to reveal the adjacent sectors fromthe physically clicked one, control base case
    var simulatedClick = false;

    var mapLength = Math.sqrt(sectors.length); //16

    // set up initial game board
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


    function simulateClick(sectorClicked) {
        // robo click
        simulatedClick = true;

        sectormapX = sectors[sectorClicked] % 16;
        sectormapY = Math.floor(sectors[sectorClicked] / 16);

        //for click event --> need to get actual X and Y coords, NOT sector coordinates, multiplying them with sector width
        var xPosition = sectormapX * SECTOR_W;
        var yPosition = sectormapY * SECTOR_H;

        var event = jQuery.Event("click", { offsetX: xPosition, offsetY: yPosition });
        $('canvas').trigger(event);
        // console.log(ev.type + " event fired at coords: " + ev.offsetX + ", " + ev.offsetY);

        // converting X and Y coordinates back to setor coordinates for game board action
        var sectormapX = Math.floor(xPosition / SECTOR_W);
        var sectormapY = Math.floor(yPosition / SECTOR_H);

        revealClickedSector(sectorClicked, sectormapX, sectormapY);
    }


    // click event listener
    $gameCanvas.on("click", getSectorClicked);

    function getSectorClicked(e) {
        //human click
        if (simulatedClick === false) {
            //get coordinates relative to the game canvas

            var xPosition = Math.floor(e.offsetX);
            var yPosition = Math.floor(e.offsetY);
            // calculate sector number from coordinates
            var sectormapX = Math.floor(xPosition / SECTOR_W);
            var sectormapY = Math.floor(yPosition / SECTOR_H);
            var sectorClicked = (sectormapY * mapLength) + sectormapX;

            console.log("X: " + xPosition + " " + sectormapX + ", Y: " + yPosition + " " + sectormapY + ", sector: " + sectorClicked);

            // take the sector ID that was clicked, with the x and y coordinates and run a function to reveal the sector
            revealClickedSector(sectorClicked, sectormapX, sectormapY);

            // get IDs of the sectors around this clicked one
            // debugger
            checkAdjSectors(sectormapX, sectormapY);
        } else {
            //reset robo click if true
            simulatedClick = false;
        }

    }


    function revealClickedSector(sectorClicked, sectormapX, sectormapY) {

        //checking index of map array 
        if (map[sectorClicked] === 1) {
            $('canvas').drawImage({
                source: 'images/death-star-sm.png',
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

        }

    }

    function checkAdjSectors(x, y) {

        var sectorClicked = (y * mapLength) + x;
        console.log("inside checkAdj, Sector: " + sectorClicked + " x:" + x + " and y:" + y);


        // adjacent sector numbering
        // |0|1|2|
        // |3|X|4|
        // |5|6|7|

        // TODO: EDGE CASES

        // sectors adjacent to clicked sector
        var adj0 = sectorClicked - (mapLength + 1);
        var adj1 = sectorClicked - mapLength;
        var adj2 = sectorClicked - (mapLength - 1);
        var adj3 = sectorClicked - 1;
        var adj4 = sectorClicked + 1;
        var adj5 = sectorClicked + (mapLength - 1);
        var adj6 = sectorClicked + (mapLength);
        var adj7 = sectorClicked + (mapLength + 1);
        console.log(adj0 + " " + adj1 + " " + adj2 + " " + adj3 + " " + adj4 + " " + adj5 + " " + adj6 + " " + adj7);

        // 2 nd level adjacent sectors
        var adjadj0, adjadj1, adjadj2, adjadj3, adjadj4, adjadj5, adjadj6, adjadj7;





        var adjArr = [adj0, adj1, adj2, adj3, adj4, adj5, adj6, adj7];

        console.log("adj: " + adjArr);


        for (i = 0; i < adjArr.length; i++) {
            //only reveal sector if it is empty (has 0 in map array)
            if (map[adjArr[i]] === 0) {
                simulateClick(adjArr[i]);
                // debugger
                console.log("Clicking like a robot at: " + adjArr[i]);
            }

            // getting the adjacent sectors of each 1st level adjacent sectors
            adjadj0 = adjArr[i] - (mapLength + 1);
            adjadj1 = adjArr[i] - mapLength;
            adjadj2 = adjArr[i] - (mapLength - 1);
            adjadj3 = adjArr[i] - 1;
            adjadj4 = adjArr[i] + 1;
            adjadj5 = adjArr[i] + (mapLength - 1);
            adjadj6 = adjArr[i] + (mapLength);
            adjadj7 = adjArr[i] + (mapLength + 1);

            // array to loop through and check agains map array
            var adjadjArr = [adjadj0, adjadj1, adjadj2, adjadj3, adjadj4, adjadj5, adjadj6, adjadj7];

            console.log("adjadj: " + adjadjArr);

            for (j = 0; j < adjadjArr.length; j++) {
                // if we find a danger in the second level put marker on the 1st level sector
                if (map[adjadjArr[j]] === 1) {
                    //calculating current 1st level adjacent sectors' x and y coordinates
                    x = sectors[[adjArr[i]]] % 16;
                    y = Math.floor(sectors[[adjArr[i]]] / 16);

                    console.log("WARNING: x: " + x + ", y " + y + ", adjadj " + map[adjadjArr[j]]);

                    $('canvas').drawImage({
                        source: 'images/danger.png',
                        layer: true,
                        visible: true,
                        x: x * 30,
                        y: y * 30,
                        width: 30,
                        height: 30,
                        fromCenter: false,

                    });

                } // end if
            } //end for

        } //and for

        // else if (map[adjArr[i]] === 1) {

        //     $('canvas').drawImage({
        //         source: 'images/danger.png',
        //         layer: true,
        //         visible: true,
        //         x: x * 30,
        //         y: y * 30,
        //         width: 30,
        //         height: 30,
        //         fromCenter: false,

        //     });

        // }

        // }
        // console.log("ADJ:" + map[adj0]);



        // console.log(adjadj0 + " " + adjadj1 + " " + adjadj2 + " " + adjadj3 + " " + adjadj4 + " " + adjadj5 + " " + adjadj6 + " " + adjadj7);

        // var adjsectorX = sectors[adj] % 16;
        // var adjsectorY = Math.floor(sectors[adj] / 16);
        // console.log(adjSectors);
        // var adjadjArr = [];

        // //check if map shows any bogeys in adjacent sector adj0
        // if ((map[adj0] === 0)) {
        //     // use adjacent sector IDs from sectors array to calculate x and y coordinates
        //     calcAdjSect(adj0, adjadj0);

        //     // adjadjArr.push(adjadj0);

        //     // console.log("Adj0 - x: " + adjsectorX + " y: " + adjsectorY);
        // }
        // //check if map shows any bogeys in adjacent sector adj1
        // if ((map[adj1] === 0)) {

        //     calcAdjSect(adj1, adjadj1);


        // }
        // //check if map shows any bogeys in adjacent sector adj2
        // if ((map[adj2] === 0)) {
        //     calcAdjSect(adj2, adjadj2);

        // }
        // //check if map shows any bogeys in adjacent sector adj3
        // if ((map[adj3] === 0)) {
        //     calcAdjSect(adj3, adjadj3);


        // }
        // //check if map shows any bogeys in adjacent sector adj4
        // if ((map[adj4] === 0)) {
        //     calcAdjSect(adj4, adjadj4);

        // }
        // //check if map shows any bogeys in adjacent sector adj5
        // if ((map[adj5] === 0)) {
        //     calcAdjSect(adj5, adjadj5);


        // }
        // //check if map shows any bogeys in adjacent sector adj6
        // if ((map[adj6] === 0)) {
        //     calcAdjSect(adj6, adjadj6);

        // }
        // //check if map shows any bogeys in adjacent sector adj7
        // if ((map[adj7] === 0)) {
        //     calcAdjSect(adj7, adjadj7);

        // }



    }

    function calcAdjSect(adj, adjadj) {
        // use adjacent sector IDs from sectors array to calculate x and y coordinates
        adjsectorX = sectors[adj] % 16;
        adjsectorY = Math.floor(sectors[adj] / 16);


        $('canvas').drawImage({
            source: 'images/target2.png',
            layer: true,
            visible: true,
            x: adjsectorX * 30,
            y: adjsectorY * 30,
            width: 30,
            height: 30,
            fromCenter: false
        });

    }



    // function getAPI() {

    $.ajax({
        url: "http://swapi.co/api/starships",
        method: "GET",
        dataType: "json",

        success: function(scan) {
            console.log(scan.results);
            var scanResult = Math.floor(Math.random() * 9);
            $(".info").append("<br><h1>SCAN DATA</h1>");
            $(".info").append("<div><strong>Name: </strong><br>--- " + scan.results[scanResult].name + "</div>");
            $(".info").append("<div><strong>Model: </strong><br>--- " + scan.results[scanResult].model + "</div>");
            $(".info").append("<div><strong>Starship Class: </strong><br>--- " + scan.results[scanResult].starship_class + "</div>");
            $(".info").append("<div><strong>Manufacturer: </strong><br>--- " + scan.results[scanResult].manufacturer + "</div>");
            $(".info").append("<div><strong>Crew: </strong><br>--- " + scan.results[scanResult].crew + "</div>");
            $(".info").append("<div><strong>Passengers: </strong><br>--- " + scan.results[scanResult].passengers + "</div>");
            $(".info").append("<div><strong>Cargo Capacity: </strong><br>--- " + (scan.results[scanResult].cargo_capacity / 1000) + " metric tons</div>");
        },
        error: function() {
            console.log("SYSTEM ERROR");
        },
    });
    // }




} // end main
