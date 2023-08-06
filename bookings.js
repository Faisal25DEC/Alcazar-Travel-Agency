var bookings=[
    {img:"https://images.unsplash.com/photo-1688673698367-e8f0274e11d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
sdate:"2 Aug",edate:"4 Aug",
name:"The Radisson Blue"},
{img: "https://images.unsplash.com/photo-1688673698367-e8f0274e11d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
sdate:"3 Aug",edate:"9 Aug",name:"Tulip"},{img: "https://images.unsplash.com/photo-1688673698367-e8f0274e11d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
sdate:"3 Aug",edate:"9 Aug",
name:"Orient Plaza"}]
var close=[
    {img:"https://images.unsplash.com/photo-1688649721020-0b0364b2dab9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
sdate:"2 Aug",edate:"4 Aug"},
{img: "https://images.unsplash.com/photo-1688673698367-e8f0274e11d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
sdate:"3 Aug",edate:"9 Aug"},]
document.querySelector("#btnradio1").addEventListener("click",function(){
    updateDisplay(bookings);
}) 
document.querySelector("#btnradio2").addEventListener("click",function(){
   updateDisplay(close);

}) 
var main=document.querySelector("#content");
function updateDisplay(arr){
    main.innerHTML="";
    arr.forEach(element => {
    var card=document.createElement("div");
    var img=document.createElement("img");
    img.setAttribute("src",element.img);
    var name=document.createElement("h3");
    name.innerText=element.name;
    var p=document.createElement("p");
    p.innerText=`From: ${element.sdate} - ${element.edate}`;
    var rev=document.createElement("div");
    review(rev);
    card.append(img,name,p,rev);
    main.append(card);

    });

}

function review(rev) {
    for (let i = 1; i <= 5; i++) {
        var st = document.createElement("span");
        st.setAttribute("class", "fa fa-star");
        st.setAttribute("id", `star-${i}`);
        rev.appendChild(st);

        st.addEventListener("click", function(event) {
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
