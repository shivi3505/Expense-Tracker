const apiURL= 'http://localhost:3000';

document.addEventListener('DOMContentLoaded',async ()=>{
    try{
    userLeaderBoard= await axios.get(apiURL+'/premiumfeature/leaderboard');
    // console.log(userLeaderBoard.data);
    userLeaderBoard.data.forEach((data) => {
        displayLeaderboardData(data);
    });
    }catch(err){
        console.log(err)
    }
});
document.getElementById('back-btn').addEventListener('click',()=>{
    window.location.href='../dashboard.html'
})
let srNo= 1;
function displayLeaderboardData(data){
    
    const tableBody=  document.getElementById('table-body');
    const tableRow= document.createElement('tr');
    const srData= document.createElement('td');
    srData.textContent= srNo++;
    const tDataName= document.createElement('td');
    tDataName.textContent= data.name;
    const tDataAmount= document.createElement('td');
    tDataAmount.textContent= data.totalExpenses||0;


    tableRow.appendChild(srData);
    tableRow.appendChild(tDataName);
    tableRow.appendChild(tDataAmount);

    tableBody.appendChild(tableRow);


}