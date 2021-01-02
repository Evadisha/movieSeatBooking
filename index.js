const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = parseInt(movieSelect.value);

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedSeatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem("seatsIndex", JSON.stringify(selectedSeatsIndex));
    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * movieSelect.value;
};

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('seatsIndex'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}

movieSelect.addEventListener('change', event => {
    ticketPrice = +(event.target.value);
    setMovieData(event.target.selectedIndex, event.target.value);
});

container.addEventListener('click', event => {
    if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
        event.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

updateSelectedCount();