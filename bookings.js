var bookings = [
    {
        name: "NEIL ISLAND",
        info: "Neil Island is one of India’s Andaman Islands, in the Bay of Bengal. Bharatpur Beach has coral reefs teeming with tropical fish. Laxmanpur Beach is known for its sunset views. Howrah Bridge is a natural rock formation accessible at low tide. Near the island’s wharf is Neil Kendra village, with a curving, sandy bay dotted with boats. Off the southeast coast, the tiny Sir Hugh Rose Island is a sanctuary for turtles.",
        images: "https://www.tripsavvy.com/thmb/SF7NoKaUPvXKxBkDbmPrC-GSddU=/2121x1414/filters:fill(auto,1)/GettyImages-508601155-592e840f5f9b5859500d0724.jpg",
        "location": "https://www.google.co.in/maps/place/Samudrika+Marine+Museum/@11.6718057,92.7263692,15z/data=!4m2!3m1!1s0x0:0xd7352994a1c32fb8?sa=X&ved=2ahUKEwi64_yEu_PlAhWMILcAHYtnBf0Q_BIwC3oECBAQCA",
        location: "https://www.google.co.in/maps/place/Neill+Island,+Andaman+and+Nicobar+Islands+744104/data=!4m2!3m1!1s0x3088d9a13824c715:0xddd01ec98b4eb529?sa=X&ved=2ahUKEwjTjPqquvPlAhU56nMBHbmRBCAQ8gEwJXoECBAQBA",
        id: 1,
        price: "785.6",
        ratings: "3.3",
        recommended: false,
        trending: false,
        sdate: "2-Aug",
        edate: "5-Aug",
        guest: "4",
    },
    {
        name: "PORT BLAIR",
        info: "It has been an important historical part of Port Blair. Notable freedom fighters such as Veer Savarkar, Yogendra Shukla, Batukeshwar Dutt, and Babarao Savarkar were some of the inmates here. Don’t miss the light and sound show(Monday, Wednesday and Friday) when you visit Cellular jail. ",
        images: "https://www.holidify.com/images/cmsuploads/compressed/3616_20190213160612jpg",
        location: "https://www.google.co.in/maps/place/Cellular+Jail+National+Monument/@11.6738247,92.7479768,15z/data=!4m2!3m1!1s0x0:0x616a8c6623fdba3f?sa=X&ved=2ahUKEwihqtPEuvPlAhU4IbcAHThdBsAQ_BIwJnoECA4QCA",
        id: 2,
        price: "676.9",
        ratings: "1.6",
        recommended: true,
        trending: true,
        sdate: "2-Aug",
        edate: "5-Aug",
        guest: "4",
    },
    {
        name: "PORT BLAIR",
        info: "It has been an important historical part of Port Blair. Notable freedom fighters such as Veer Savarkar, Yogendra Shukla, Batukeshwar Dutt, and Babarao Savarkar were some of the inmates here. Don’t miss the light and sound show(Monday, Wednesday and Friday) when you visit Cellular jail. ",
        images: "https://www.holidify.com/images/cmsuploads/compressed/3616_20190213160612jpg",
        location: "https://www.google.co.in/maps/place/Cellular+Jail+National+Monument/@11.6738247,92.7479768,15z/data=!4m2!3m1!1s0x0:0x616a8c6623fdba3f?sa=X&ved=2ahUKEwihqtPEuvPlAhU4IbcAHThdBsAQ_BIwJnoECA4QCA",
        id: 2,
        price: "676.9",
        ratings: "1.6",
        recommended: true,
        trending: true,
        sdate: "2-Aug",
        edate: "5-Aug",
        guest: "4",
    },]
var close = [
    {
        "name": "SAMUDRIKA NAVAL",
        "info": "This museum is a perfect blend of historical and modern Andaman. A massive blue whale, in its skeletal form, of course, greets you as you enter the museum. There is also an aquarium with fish of all shapes and sizes, from a parrotfish to the rare and venomous species of stonefish and corals.",
        "images": "https://www.tripsavvy.com/thmb/SF7NoKaUPvXKxBkDbmPrC-GSddU=/2121x1414/filters:fill(auto,1)/GettyImages-508601155-592e840f5f9b5859500d0724.jpg",
        "location": "https://www.google.co.in/maps/place/Samudrika+Marine+Museum/@11.6718057,92.7263692,15z/data=!4m2!3m1!1s0x0:0xd7352994a1c32fb8?sa=X&ved=2ahUKEwi64_yEu_PlAhWMILcAHYtnBf0Q_BIwC3oECBAQCA",
        "id": 4,
        "price": "893.9",
        "ratings": "2.8",
        "recommended": false,
        "trending": false,
        sdate: "2-Aug",
        edate: "5-Aug",
        guest: "4",
    },
    {
        "name": "HAVELOCK ISLAND",
        "info": "Havelock Island is part of Ritchie’s Archipelago, in India’s Andaman Islands. It’s known for its dive sites and beaches, like Elephant Beach, with its coral reefs. Crescent-shaped Radhanagar Beach is a popular spot for watching the sunset. On the island’s east side, rocky sections mark long, tree-lined Vijaynagar Beach.",
        "images": "https://www.tripsavvy.com/thmb/SF7NoKaUPvXKxBkDbmPrC-GSddU=/2121x1414/filters:fill(auto,1)/GettyImages-508601155-592e840f5f9b5859500d0724.jpg",
        "location": "https://www.google.co.in/maps/place/Swaraj+Dweep/@11.9656084,92.9194242,12z/data=!3m1!4b1!4m5!3m4!1s0x3088d3d85e0fe039:0x25c8aaaa513ef4bf!8m2!3d11.9760503!4d92.9875565",
        "id": 5,
        "price": "513.3",
        ratings: "3.2",
        "recommended": false,
        trending: false,
        sdate: "2-Aug",
        edate: "5-Aug",
        guest: "4",
    }]
document.querySelector("#btnradio1").addEventListener("click", function () {
    updateDisplay(bookings);
    // var ratingsElements = document.querySelectorAll(".ratings");
    // ratingsElements.forEach(function (element) {
    //     element.style.display = "block";
    // });
})
document.querySelector("#btnradio2").addEventListener("click", function () {
    updateDisplay(close);
    var ratingsElements = document.querySelectorAll(".ratings");
    ratingsElements.forEach(function (element) {
        element.style.display = "block";
    });

})
var main = document.querySelector("#content");
function updateDisplay(arr) {
    main.innerHTML = "";
    arr.forEach(element => {
        console.log(element);
        var card = document.createElement("div");
        card.setAttribute("class", "cr")
        var img = document.createElement("img");
        img.setAttribute("src", element.images);
        var name = document.createElement("h3");
        name.innerText = element.name;
        var p = document.createElement("p");
        p.innerText = `From: ${element.sdate} - ${element.edate}`;
        var guest = document.createElement("p");
        guest.innerText = "Guests: " + element.guest;
        var bt_div = document.createElement("div");
        bt_div.setAttribute("class", "bt-div");
        var details = document.createElement("button");

        details.setAttribute("class", "b")
        details.setAttribute("id","openModalBtn")
        details.innerText = "Details";
        var cancel = document.createElement("button");
        cancel.innerText = "Cancel";
        cancel.setAttribute("class", "b");
        bt_div.append(details, cancel);
        var rev = document.createElement("div");
        rev.innerHTML = "Ratings :-  "
        rev.setAttribute("class", "ratings");
        rev.setAttribute("style","display:none;")
        review(rev);
        var price = document.createElement("h4");
        price.innerText = "Amount: Rs. " + element.price;


        details.addEventListener("click",function(){
            console.log(element);
        var title=document.querySelector("#modal-title");
        title.innerHTML="";
        title.innerText=element.name;
        var info=document.getElementById("modal-body");
        info.innerHTML="";
        info.innerText=`${element.info} \n \n Ratings:- ${element.ratings}`;
        $('#myModal').modal('show'); // Show the modal
        })
        card.append(img, name, price, guest, p, bt_div, rev);
        main.append(card);
    });

}

function review(rev) {
    for (let i = 1; i <= 5; i++) {
        var st = document.createElement("span");
        st.setAttribute("class", "fa fa-star");
        st.setAttribute("id", `star-${i}`);
        rev.appendChild(st);

        st.addEventListener("click", function (event) {
            event.preventDefault();
            let num = parseInt(event.target.id.split("-")[1]);

            for (let j = 1; j <= 5; j++) {
                const star = rev.querySelector(`#star-${j}`);
                if (j <= num) {
                    star.classList.add("checked");
                } else {
                    star.classList.remove("checked");
                }
            }

        });

    }
    return rev;
}
updateDisplay(bookings);
// console.log(bookings);

// Open the modal

  
  // Close the modal

  
