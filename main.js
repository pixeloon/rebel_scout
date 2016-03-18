window.onload = function() {

    main();

};

function main() {

    // declarations
    var width, height, locations, physicalClick,
        currentState, scannedTargets,
        states = {
            splash: 0,
            game: 1,
            score: 2
        },

        $game = $('.game'),
        $gameCanvas = $('#gameCanvas'),
        $score = $(".score");
    $info = $(".info");
    var score = 0;
    var SECTOR_W = 30;
    var SECTOR_H = 30;

    var scanSound = new Audio("assets/scan.mp3"); // buffers automatically when created
    var targetSound = new Audio("assets/target.mp3");
    var dangerSound = new Audio("assets/danger.mp3");
    var beep = new Audio("assets/beep.mp3");
    var beep2 = new Audio("assets/beep.mp3");
    var cantinaSong = new Audio("assets/star-wars-cantina-song.mp3");



    var sectors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255];


    var map = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


    // 1: danger / 2: target / 3: empty / 4: next to danger
    var scanLog = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    //to reveal the adjacent sectors from the physically clicked one, control base case
    var simulatedClick = false;
    currentState = states.splash;

    // mathematically derived map length for future, more capable, generations of scout scanners
    var mapLength = Math.sqrt(sectors.length); //16

    // move starships 
    map = _.shuffle(map);

    if (currentState === states.splash) {

        $gameCanvas.drawText({
            fillStyle: '#000000',
            strokeStyle: '#FF0000',
            strokeWidth: 2,
            x: 60,
            y: 0,
            fontSize: 48,
            fromCenter: false,
            fontFamily: 'Courier, sans-serif',
            text: 'REBEL SCOUT'
        });

        $gameCanvas.drawText({
            fillStyle: '#000000',
            strokeStyle: '#51F251',
            strokeWidth: 2,
            x: 30,
            y: 70,
            fontSize: 30,
            align: "left",
            fromCenter: false,
            fontFamily: 'Courier, sans-serif',
            maxWidth: 450,
            text: 'Welcome, captain. \n\nYou are a Scout on a mission to discover the locations of any vessels in this sector and collect intelligence. \n\nTry to avoid detection by any of the Empire\'s many Death Stars!'
        });

        $gameCanvas.drawText({
            fillStyle: '#000000',
            strokeStyle: '#FF0000',
            strokeWidth: 2,
            x: 60,
            y: 450,
            fontSize: 30,
            fromCenter: false,
            fontFamily: 'Courier, sans-serif',
            text: 'PUSH THE START BUTTON'
        });

    }


    function simulateClick(sectorClicked) {
        if (currentState === states.game) {
            // robo click
            simulatedClick = true;

            sectormapX = sectors[sectorClicked] % 16;
            sectormapY = Math.floor(sectors[sectorClicked] / 16);

            //for click event --> need to get actual X and Y coords, NOT sector coordinates, multiplying them with sector width
            var xPosition = sectormapX * SECTOR_W;
            var yPosition = sectormapY * SECTOR_H;

            var event = jQuery.Event("click", { offsetX: xPosition, offsetY: yPosition });
            $('canvas').trigger(event);

            // converting X and Y coordinates back to sector coordinates for game board action
            var sectormapX = Math.floor(xPosition / SECTOR_W);
            var sectormapY = Math.floor(yPosition / SECTOR_H);

            revealClickedSector(sectorClicked, sectormapX, sectormapY);
        }
    }

    function getSectorClicked(e) {
        if (currentState === states.game) {
            //human click
            if (simulatedClick === false) {
                scanSound.play();

                //get coordinates relative to the game canvas
                var xPosition = Math.floor(e.offsetX);
                var yPosition = Math.floor(e.offsetY);
                // calculate sector number from coordinates
                var sectormapX = Math.floor(xPosition / SECTOR_W);
                var sectormapY = Math.floor(yPosition / SECTOR_H);
                var sectorClicked = (sectormapY * mapLength) + sectormapX;

                // take the sector ID that was clicked, with the x and y coordinates and run a function to reveal the sector
                revealClickedSector(sectorClicked, sectormapX, sectormapY);

                // get IDs of the sectors around this clicked one
                // if (scanLog[sectorClicked] === 0) {
                checkAdjSectors(sectormapX, sectormapY);
                // }
            } else {
                //reset robo click if true
                simulatedClick = false;
            }
        } //end game state check

    }

    function revealClickedSector(sectorClicked, sectormapX, sectormapY) {
        if (currentState === states.game) {

            //if sector is unexplored
            if (scanLog[sectorClicked] === 0) {
                // if Death Star found
                if (map[sectorClicked] === 1) {

                    $gameCanvas.drawImage({
                        source: 'images/death-star.png',
                        layer: true,
                        visible: true,
                        //get current top left coordinate
                        x: sectormapX * 30,
                        y: sectormapY * 30,
                        width: 30,
                        height: 30,
                        fromCenter: false

                    });
                    // make a note in the log
                    scanLog[sectorClicked] = 1;
                    dangerSound.play();
                    getAPI(1);

                } else if (map[sectorClicked] === 2) {
                    $gameCanvas.drawImage({
                        source: 'images/star30.png',
                        layer: true,
                        visible: true,
                        x: sectormapX * 30,
                        y: sectormapY * 30,
                        width: 30,
                        height: 30,
                        fromCenter: false

                    });
                    // make a note in the log
                    scanLog[sectorClicked] = 2;
                    targetSound.play();
                    //check how many targets were found
                    scannedTargets = scanLog.filter(function(el) {
                        return el === 2;
                    });
                    //NOTE: set winning score to 3 for the DEMO
                    if (scannedTargets.length === 3) {
                        currentState = states.score;
                    }
                    //grab data
                    getAPI();

                } else {
                    if (scanLog[sectorClicked] === 0) {

                        $gameCanvas.drawImage({
                            source: 'images/scanned.png',
                            layer: true,
                            visible: true,
                            x: sectormapX * 30,
                            y: sectormapY * 30,
                            width: 30,
                            height: 30,
                            fromCenter: false

                        });
                        // make a note in the log
                        scanLog[sectorClicked] = 3;
                    } // end internal if
                } // end outer if
            } // end scanLog if
        } // end game state check

    } // end function

    function checkAdjSectors(x, y) {
        if (currentState === states.game) {

            var sectorClicked = (y * mapLength) + x;

            // adjacent sector numbering
            // |0|1|2|
            // |3|X|4|
            // |5|6|7|

            // sectors adjacent to clicked sector

            var adj0 = sectorClicked - (mapLength + 1);
            var adj1 = sectorClicked - mapLength;
            var adj2 = sectorClicked - (mapLength - 1);
            var adj3 = sectorClicked - 1;
            var adj4 = sectorClicked + 1;
            var adj5 = sectorClicked + (mapLength - 1);
            var adj6 = sectorClicked + (mapLength);
            var adj7 = sectorClicked + (mapLength + 1);

            // initiating 2nd level adjacent sectors
            var adjadj0, adjadj1, adjadj2, adjadj3, adjadj4, adjadj5, adjadj6, adjadj7;

            // array of 1st level adjacent sectors
            var adjArr = [adj0, adj1, adj2, adj3, adj4, adj5, adj6, adj7];


            for (i = 0; i < adjArr.length; i++) {
                //only reveal sector if it is empty (has 0 in map array), 
                if (map[adjArr[i]] === 0) {
                    //edge cases
                    if ((sectorClicked % 16 !== 0) && ((sectorClicked + 1) % 16 !== 0)) {
                        simulateClick(adjArr[i]);
                        //if click is on the left edge of the map, don't auto-click adjacents 0, 3, an 5
                    } else if ((sectorClicked % 16 === 0) && ((i !== 0) && (i !== 3) && (i !== 5))) {
                        simulateClick(adjArr[i]);
                        // if click is on the right edge of the map, don't aut-click adjacents 2, 4 and 7 
                    } else if (((sectorClicked + 1) % 16 === 0) && ((i !== 2) && (i !== 4) && (i !== 7))) {
                        simulateClick(adjArr[i]);
                    }
                    //------

                    // getting the adjacent sectors of each 1st level adjacent sectors
                    adjadj0 = adjArr[i] - (mapLength + 1);
                    adjadj1 = adjArr[i] - mapLength;
                    adjadj2 = adjArr[i] - (mapLength - 1);
                    adjadj3 = adjArr[i] - 1;
                    adjadj4 = adjArr[i] + 1;
                    adjadj5 = adjArr[i] + (mapLength - 1);
                    adjadj6 = adjArr[i] + (mapLength);
                    adjadj7 = adjArr[i] + (mapLength + 1);

                    // array of 2nd level adjacents, to loop through and check against map array
                    var adjadjArr = [adjadj0, adjadj1, adjadj2, adjadj3, adjadj4, adjadj5, adjadj6, adjadj7];

                    for (j = 0; j < adjadjArr.length; j++) {
                        // if we find a danger in the second level put marker on the 1st level sector
                        // unless a target was found in this sector has already
                        if ((map[adjadjArr[j]] === 1) && (scanLog[adjadjArr[j]] !== 2) && (map[adjArr[i]] === 0)) {
                            //calculating current 1st level adjacent sectors' x and y coordinates
                            x = sectors[[adjArr[i]]] % 16;
                            y = Math.floor(sectors[[adjArr[i]]] / 16);

                            $gameCanvas.drawImage({
                                source: 'images/empire.png',
                                layer: true,
                                visible: true,
                                x: x * 30,
                                y: y * 30,
                                width: 30,
                                height: 30,
                                fromCenter: false,

                            });
                            //make a note in the Log
                            scanLog[adjArr[i]] = 4;

                        } // end if
                    } //end for
                }

            } //and for
        } // end game state check

    } // function end


    function getAPI(starship) {
        // Not the Death Star
        if (starship !== 1) {

            $.ajax({
                url: "http://swapi.co/api/starships",
                method: "GET",
                dataType: "json",

                success: function(scan) {
                    // pick a random ship from the API
                    var scanResult = Math.floor(Math.random() * 9);

                    $info.text("");
                    $info.append("<br><h1>SCAN DATA</h1>");
                    $info.append("<div><strong>Name: </strong><br>--- " + scan.results[scanResult].name + "</div>");
                    $info.append("<div><strong>Model: </strong><br>--- " + scan.results[scanResult].model + "</div>");
                    $info.append("<div><strong>Starship Class: </strong><br>--- " + scan.results[scanResult].starship_class + "</div>");
                    $info.append("<div><strong>Manufacturer: </strong><br>--- " + scan.results[scanResult].manufacturer + "</div>");
                    $info.append("<div><strong>Crew: </strong><br>--- " + scan.results[scanResult].crew + "</div>");
                    $info.append("<div><strong>Passengers: </strong><br>--- " + scan.results[scanResult].passengers + "</div>");
                    $info.append("<div><strong>Cargo Capacity: </strong><br>--- " + (scan.results[scanResult].cargo_capacity / 1000) + " metric tons</div>");
                },
                error: function() {
                    console.log("SYSTEM ERROR");
                }

            });

            score += 20;

        } else {

            $.ajax({
                url: "http://swapi.co/api/starships",
                method: "GET",
                dataType: "json",

                success: function(scan) {

                    $info.text("");
                    $info.append("<br><h1>DANGER</h1>");
                    $info.append("<div><strong>Name: </strong><br>--- " + scan.results[1].name + "</div>");
                    $info.append("<div><strong>Model: </strong><br>--- " + scan.results[1].model + "</div>");
                    $info.append("<div><strong>Starship Class: </strong><br>--- " + scan.results[1].starship_class + "</div>");
                    $info.append("<div><strong>Manufacturer: </strong><br>--- " + scan.results[1].manufacturer + "</div>");
                    $info.append("<div><strong>Crew: </strong><br>--- " + scan.results[1].crew + "</div>");
                    $info.append("<div><strong>Passengers: </strong><br>--- " + scan.results[1].passengers + "</div>");
                    $info.append("<div><strong>Cargo Capacity: </strong><br>--- " + (scan.results[1].cargo_capacity / 1000) + " metric tons</div>");
                },
                error: function() {
                    console.log("SYSTEM ERROR");
                }
            });

            score -= 10;

        } // end if

        $score.text("");
        $score.append("<div>MISSION CREDITS: " + score.toString() + "</div>");

        if (currentState === states.score) {
            $(".info").text("");
            $gameCanvas.clearCanvas();

            $gameCanvas.drawText({
                fillStyle: '#000000',
                strokeStyle: '#FF0000',
                strokeWidth: 2,
                x: 20,
                y: 50,
                fontSize: 48,
                fromCenter: false,
                fontFamily: 'Courier, sans-serif',
                text: 'CONGRATULATIONS\nREBEL SCOUT\nMission\ncomplete!'
            });

            cantinaSong.play();
        } // end game state check

    } // end API function 

    // event handlers
    // click event listener
    $gameCanvas.on("click", getSectorClicked);

    $("nav1-1").mousedown(function(){
        $(this).addClass("mousedown");
    });

    $(".nav1-1").on("click", startClick);
    $(".nav2-2").on("click", resetClick);


    $(".nav1-1").hover(function() {
        $(this).addClass("hoverStart");
    }, function() {
        $(this).removeClass("hoverStart");

    });

    $(".nav2-2").hover(function() {
        $(this).addClass("hoverReset");
    }, function() {
        $(this).removeClass("hoverReset");

    });

    function startClick() {
        $gameCanvas.drawImage({
            source: 'images/space1.png',
            layer: true,
            visible: true,
            x: 0,
            y: 0,
            width: 480,
            height: 480,
            fromCenter: false
        });

        currentState = states.game;
        beep.play();
    }

    function resetClick() {
        beep2.play();

        setTimeout(function() {
            document.location.reload(true);
        }, 100);

    }


    // function playTime() {
    //     for (var i = 5; i >= 0; i--) {
    //         (function(j) {
    //             setTimeout(function() {
    //                 return "Time: " + j + " seconds";
    //             }, 1000 * j);
    //         })(i);
    //     }
    // }

} // end main
