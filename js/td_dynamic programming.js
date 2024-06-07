function showAttractionsDP() {
    // Ambil nilai input
    var day = document.getElementById("current-day").value;
    var money = parseFloat(document.getElementById("money").value);
    var arrivalTime = document.getElementById("arrival-time").value.trim();
    var leftTime = document.getElementById("left-time").value.trim();

    // Periksa apakah semua nilai input telah diisi
    if (day === "" || isNaN(money) || arrivalTime === "" || leftTime === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Periksa apakah kedua waktu berada dalam rentang yang diizinkan
    var arrivalHour = parseInt(arrivalTime.split(":")[0]);
    var leftHour = parseInt(leftTime.split(":")[0]);

    if (arrivalHour < 8 || arrivalHour > 21 || leftHour < 8 || leftHour > 21) {
        alert("Tokyo Disneyland is open from 8:00 AM until 10:00 PM");
        return;
    }

    // Array atraksi, acuan titik pusat berada di main entrance
    var attractions = [
        { number: '0', name: "Main Entrance", popularity: 0, price: 0, duration: 0, daysOpen: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], location: { x: 0, y: 0 } },
        { number: '50', name: "Country Bear Theater", popularity: 7, price: 3000, duration: 20, daysOpen: ["Monday", "Thursday", "Friday", "Saturday", "Sunday"], location: { x: -26, y: 54 } },
        { number: '51', name: "Mark Twain Riverboat", popularity: 6, price: 2000, duration: 30, daysOpen: ["Monday", "Thursday", "Friday", "Saturday", "Sunday"], location: { x: -24, y: 65 } },
        { number: '53', name: "Big Thunder Mountain", popularity: 9, price: 4000, duration: 35, daysOpen: ["Monday", "Thursday", "Friday", "Saturday", "Sunday"], location: { x: -42.5, y: 56.8 } },
        { number: '68', name: "Splash Mountain", popularity: 8, price: 4500, duration: 40, daysOpen: ["Monday", "Thursday", "Friday", "Saturday", "Sunday"], location: { x: -16.6, y: 78.8 } },
        { number: '69', name: "Beaver Brothers Explorer Canoes", popularity: 7, price: 3500, duration: 25, daysOpen: ["Monday", "Thursday", "Friday", "Saturday", "Sunday"], location: { x: -33, y: 77.7 } },
        { number: '72', name: "Grandma Sara's Kitchen", popularity: 5, price: 2500, duration: 30, daysOpen: ["Monday", "Thursday", "Friday", "Saturday", "Sunday"], location: { x: -15, y: 75 } },
        { number: '80', name: "Peter Pan's Flight", popularity: 8, price: 3000, duration: 20, daysOpen: ["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"], location: { x: -13.5, y: 60 } },
        { number: '77', name: "Snow White's Adventures", popularity: 7, price: 2500, duration: 15, daysOpen: ["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"], location: { x: -6.8, y: 59.3 } },
        { number: '78', name: "Cinderella's Fairy Tale Hall", popularity: 9, price: 4000, duration: 25, daysOpen: ["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"], location: { x: 2.5, y: 56 } },
        { number: '75', name: "\"It's a Small World\"", popularity: 8, price: 3500, duration: 20, daysOpen: ["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"], location: { x: 8.5, y: 73 } },
        { number: '74', name: "Alice's Tea Party", popularity: 6, price: 3000, duration: 15, daysOpen: ["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"], location: { x: 5.5, y: 63.9 } },
        { number: '81', name: "Enchanted Tale of Beauty and the Beast", popularity: 9, price: 4500, duration: 35, daysOpen: ["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"], location: { x: 36, y: 52.5 } },
        { number: '82', name: "Pinocchio's Daring Journey", popularity: 7, price: 2500, duration: 20, daysOpen: ["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"], location: { x: 16, y: 61 } },
        { number: '83', name: "Pooh's Hunny Hunt", popularity: 8, price: 3000, duration: 25, daysOpen: ["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"], location: { x: 19, y: 65 } },
        { number: '109', name: "Minnie's House", popularity: 7, price: 2500, duration: 15, daysOpen: ["Friday", "Saturday", "Sunday"], location: { x: 22, y: 65 } },
        { number: '110', name: "Roger Rabbit's Car Toon Spin", popularity: 8, price: 3500, duration: 20, daysOpen: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"], location: { x: 25, y: 78.8 } },
        { number: '104', name: "Gadget's Go Coaster", popularity: 7, price: 2500, duration: 15, daysOpen: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"], location: { x: 29, y: 57 } },
        { number: '108', name: "Donald's Boat", popularity: 6, price: 2000, duration: 10, daysOpen: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"], location: { x: 27, y: 59 } },
        { number: '122', name: "Space Mountain", popularity: 9, price: 5000, duration: 30, daysOpen: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"], location: { x: 31, y: 30 } },
        { number: '123', name: "Buzz Lightyear's Astro Blasters", popularity: 8, price: 3500, duration: 25, daysOpen: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"], location: { x: 17, y: 30 } },
        { number: '120', name: "Star Tours", popularity: 9, price: 4000, duration: 30, daysOpen: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], location: { x: 22, y: 18 } },
        { number: '125', name: "Monsters, Inc. Ride & Go Seek", popularity: 8, price: 3500, duration: 25, daysOpen: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], location: { x: 20, y: 15 } },
        { number: '24', name: "Pirates of the Caribbean", popularity: 9, price: 4000, duration: 30, daysOpen: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], location: { x: -15, y: 21 } },
        { number: '25', name: "Jungle Cruise", popularity: 8, price: 3500, duration: 25, daysOpen: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], location: { x: -30, y: 33} },
        { number: '27', name: "Enchanted Tiki Room", popularity: 7, price: 3000, duration: 20, daysOpen: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], location: { x: -28, y: 39.5 } },
        { number: '26', name: "Swiss Family Treehouse", popularity: 6, price: 2000, duration: 15, daysOpen: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], location: { x: -23.4, y: 36 } },
        { number: '23', name: "Western River Railroad", popularity: 8, price: 3500, duration: 25, daysOpen: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], location: { x: -34.8, y: 38 } },
        { number: '28', name: "Cafe Orleans", popularity: 7, price: 3000, duration: 20, daysOpen: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], location: { x: -30, y: 35 } }
    ];
    

    // Ambil atraksi yang buka pada hari ini
    var openAttractions = attractions.filter(attraction => attraction.daysOpen.includes(day));

    // Fungsi untuk menghitung jarak antara dua titik
    function findAttractionRouteDP(start, money, time) {
        var n = openAttractions.length;
        var dp = Array.from({ length: time + 1 }, () => Array(money + 1).fill({ attractions: [], popularity: 0 }));
        
        // Tambahkan start atraksi ke dalam tabel DP
        dp[time][money].attractions.push(start);
        
        for (var t = 0; t <= time; t++) {
            for (var m = 0; m <= money; m++) {
                for (var i = 0; i < n; i++) { // Perbaiki indeks awal menjadi 0
                    var attraction = openAttractions[i];
                    if (attraction.price <= m && attraction.duration <= t) {
                        var remainingTime = t - attraction.duration;
                        var remainingMoney = m - attraction.price;
                        var prevPopularity = dp[remainingTime][remainingMoney].popularity;
                        var newPopularity = prevPopularity + attraction.popularity;
    
                        // Periksa apakah atraksi sudah termasuk dalam rute sebelumnya
                        var attractionIncluded = dp[remainingTime][remainingMoney].attractions.some(function (a) {
                            return a.number === attraction.number;
                        });
    
                        if (!attractionIncluded && (newPopularity > dp[t][m].popularity || (newPopularity === dp[t][m].popularity && dp[t][m].attractions.length === 0))) {
                            dp[t][m] = {
                                attractions: dp[remainingTime][remainingMoney].attractions.concat([attraction]),
                                popularity: newPopularity
                            };
                        } else if (!attractionIncluded && newPopularity === dp[t][m].popularity && dp[t][m].attractions.length > 0) {
                            // Jika popularitas sama, prioritaskan atraksi dengan biaya tiket yang lebih rendah
                            if (attraction.price < dp[t][m].attractions[dp[t][m].attractions.length - 1].price) {
                                dp[t][m] = {
                                    attractions: dp[remainingTime][remainingMoney].attractions.concat([attraction]),
                                    popularity: newPopularity
                                };
                            }
                        }
                    }
                }
            }
        }
        
        // Pastikan wahana terakhir berada di pintu masuk utama jika memungkinkan
        var lastAttraction = dp[0][0].attractions[dp[0][0].attractions.length - 1];
        if (lastAttraction.number !== "0") {
            // Hapus wahana terakhir jika bukan pintu masuk utama
            dp[0][0].attractions.pop();
        }
        
        // Pastikan rute berakhir di Main Entrance jika waktu yang tersisa cukup
        if (time >= 0 && money >= 0) {
            dp[0][0].attractions.push(attractions[0]);
        }
        
        return dp[time][money].attractions;
    }
    
    // Tandai waktu sebelum eksekusi algoritma
    var startTime = performance.now();

    // Inisialisasi variabel untuk rute terbaik
    var bestRoute = [];
    var maxPopularity = -1;

    // Cari rute terbaik dengan algoritma DP
    var remainingMoney = money;
    var remainingTime = (parseInt(leftTime.split(":")[0]) * 60 + parseInt(leftTime.split(":")[1])) -
                        (parseInt(arrivalTime.split(":")[0]) * 60 + parseInt(arrivalTime.split(":")[1]));

    var route = findAttractionRouteDP(attractions[0], remainingMoney, remainingTime);
    var popularity = route.reduce((total, attraction) => total + attraction.popularity, 0);

    if (popularity > maxPopularity) {
        bestRoute = route;
        maxPopularity = popularity;
    }

    console.log(bestRoute);

    // Tandai waktu setelah eksekusi algoritma
    var endTime = performance.now();

    // Hitung dan tampilkan waktu yang diperlukan
    var runningTime = endTime - startTime;
    console.log("Running time: " + runningTime + " milliseconds");

    // Tampilkan hasil rute atraksi
    var attractionsDiv = document.getElementById("attractions");
    var tableContent = "<h2>Attraction Lists - Greedy</h2><table><tr><th>Number</th><th>Name</th><th>Popularity</th><th>Price</th><th>Duration</th></tr>";

    for (var j = 1; j < bestRoute.length; j++) {
        var attraction = bestRoute[j];
        tableContent += "<tr><td>" + attraction.number + "</td><td>" + attraction.name + "</td><td>" + attraction.popularity + "</td><td>" + attraction.price + "</td><td>" + attraction.duration + "</td></tr>";
    }

    tableContent += "</table>";
    attractionsDiv.innerHTML = tableContent;
}
