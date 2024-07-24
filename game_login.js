function addUser() {
    let player1_name = document.getElementById("player1_name_input").value.trim();
    let player2_name = document.getElementById("player2_name_input").value.trim();

    if (player1_name !== "" && player2_name !== "") {
        localStorage.setItem("player1Name", player1_name);
        localStorage.setItem("player2Name", player2_name);
        window.location.href = "game_page.html"; // Redirect to the game page
    } else {
        alert("Please enter names for both players.");
    }
}