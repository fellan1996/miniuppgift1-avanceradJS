export async function showLeaderboard() {
    
    const url = 'https://firsttest-23538-default-rtdb.europe-west1.firebasedatabase.app/Highscore.json';
    
    const response = await fetch(url);
    const data = await response.json();
    const leaderboard = data.leaderboard;
    
    document.getElementById('first-place').innerText = leaderboard[0].name + ': ' + leaderboard[0].score + ' points';
    document.getElementById('second-place').innerText = leaderboard[1].name + ': ' + leaderboard[1].score + ' points';
    document.getElementById('third-place').innerText = leaderboard[2].name + ': ' + leaderboard[2].score + ' points';
    document.getElementById('fourth-place').innerText = leaderboard[3].name + ': ' + leaderboard[3].score + ' points';
    document.getElementById('fifth-place').innerText = leaderboard[4].name + ': ' + leaderboard[4].score + ' points';

}

export async function updateLeaderboard(playerName, playerScore) {

        const sixthPlaceForNow = {5:{name: playerName, score: playerScore}}
        const url = 'https://firsttest-23538-default-rtdb.europe-west1.firebasedatabase.app/Highscore/leaderboard.json';
    const options = {
        method: 'PATCH',
        body: JSON.stringify(sixthPlaceForNow),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }
    const response = await fetch(url, options);
    // const data = await response.json();
    // console.log(data)
    
    sortTheLeaderboard();
}

export async function sortTheLeaderboard() {
    const url = 'https://firsttest-23538-default-rtdb.europe-west1.firebasedatabase.app/Highscore.json';
    
    const response = await fetch(url);
    const data = await response.json();

    data.leaderboard.sort((a, b) => b.score - a.score);
    const options = {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }
    const response2 = await fetch(url, options);
    // const data2 = await response2.json();

    showLeaderboard();
}