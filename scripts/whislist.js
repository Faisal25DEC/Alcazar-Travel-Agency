var wishlist = [
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
    },    {
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
    }]

    console.log(wishlist)
    var content=document.querySelector("#wishlist-content")
    function updateDisplay(arr){
        content.innerHTML="";
        arr.forEach(element => {
        var card=document.createElement("div");
        card.setAttribute("class","card1");
        var card_img=document.createElement("div");
        card_img.setAttribute("class","card-img");
        var card_det=document.createElement("div");
        card_det.setAttribute("class","card-det");
        var card_btn=document.createElement("div");
        card_btn.setAttribute("class","card-btn");
        var btn=document.createElement("button");
        btn.setAttribute("class","book");
        btn.innerText="BOOK NOW";
        card_btn.append(btn);
        var img=document.createElement("img");
        img.src=element.images;
        var name=document.createElement("h2");
        name.innerText=element.name;
        card_img.append(name,img)
        var details=document.createElement("h2");
        details.innerText="Price Rs."+element.price;
        card_det.append(details);
        btn.addEventListener("click",function(){
            window.location.href="./page"
        })
        card.append(card_img,card_det,card_btn);
        content.append(card);   
    });
    }
    updateDisplay(wishlist);