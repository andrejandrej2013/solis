let answers=[];
let cards = document.querySelectorAll(".card");
const taskDiv = document.getElementById("taskDiv");
let cardOne = null, cardTwo = null;
function pickCard(card){
    let clickedCard = card.target;
    console.log(clickedCard);
    // if (cardOne===null){

    // }
    // else if (clickedCard!==cardOne ){

    // }
}

const addAnswer = (answers, answer)=>{
    answers.push(answer);
}

const getTask=(levelId)=>{
    addAnswer(answers,"something")
    console.log("answers.length")
    console.log(answers.length)
    if (answers.length==3){
        sendLevel(answers);
        return;
    }
    axios.get(`/getTask`,{
        params: {
            levelId: levelId
        }
    }).then(function (response) {
        
        taskDiv.innerHTML = response.data; 
        cards = document.querySelectorAll(".card");
        console.log(cards)

        cards.forEach(card => {
            card.addEventListener("click",pickCard(card))
        });
        console.log(cards)

        // console.log(response.data);
    }).catch(function (error) {
        console.log(error);
    })
}
const sendLevel=(level)=>{
    axios.post(`/checkLevel`,{
        params: {
            level: level
        }
    }).then(function (response) {
        taskDiv.innerHTML = response.data;

        // console.log(response.data);
    }).catch(function (error) {
        console.log(error);
    })
}
getTask(1);


// const saveAnswer=(levelId)=>{
//     let taskDiv = document.getElementById("taskDiv")
//     axios.post(`/getTask`,{
//         params: {
//             levelId: levelId
//         }
//     }).then(function (response) {
//         taskDiv.innerHTML = response.data; 
//         console.log(response.data);
//     }).catch(function (error) {
//         console.log(error);
//     })
// }

