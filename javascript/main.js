const urlEndpoint = 'http://localhost:3000/films'
const mainMovieConatiner = document.querySelector('.main-movie')
const otherMoviesconatiner = document.querySelector('.other-movies')

const displayMainMovie = (moviedata)=>{
    mainMovieConatiner.innerHTML = ''
    // 1. create image element
    const posterImg = document.createElement('img')
    // 2. Add src to image
    posterImg.src = moviedata.posterImg
    // 3. place image in conatiner
    mainMovieConatiner.appendChild(posterImg)
    // 4. create h2 element for title
    const movieTitle = document.createElement('h2')
    movieTitle.innerText = moviedata.title
    mainMovieConatiner.appendChild(movieTitle)

    //5. create p tag for description
    const description = document.createElement('p')
    description.innerText = moviedata.description
    mainMovieConatiner.appendChild(description)

    // 6. create a ul for tickets sold
    const list = document.createElement('ul')
    // 7.Create Li for  list above
    const ticket = document.createElement('li')
    ticket.innerText = `Tickets sold: ${moviedata.tickets_sold}`
    // 8.place li in UL and UL to the container
    list.appendChild(ticket)
    mainMovieConatiner.appendChild(list)
    // 9. Create button for purchasing tickets
    const Button = document.createElement('button')
    // 10. displaying different test depending on tickets available
    if(moviedata.tickets_sold>=moviedata.capacity){
        Button.innerText = 'Tickets Sold Out'
        Button.disabled = true
    }
    else{
        Button.innerText = 'Buy Ticket'
    }

    // 11. adding a click event listener on the button
    Button.addEventListener('click',(e)=>{
        e.preventDefault()
        let newTicketsSold = {
            tickets_sold:moviedata.tickets_sold+1
        }
        fetch(`${urlEndpoint}/${moviedata.id}`,{
            method:'PATCH',
            body:JSON.stringify(newTicketsSold)
        })
        .then(res=>{
            if(!res.ok) throw new Error('request failed')
                return res.json()
        })
        .then(data=>{
            console.log(data)
        })
        .catch(err=> console.warn(err.message))
    })
    // 12. add Button to container
    mainMovieConatiner.appendChild(Button)

}

const fetchMovies = async()=>{
    try{
        let res = await fetch(urlEndpoint)
        if(!res.ok) throw new Error('request failed')
        let data = await res.json()
        displayMainMovie(data[0])
        displayOtherMovies(data)

    }
    catch(error){
        console.warn(error.message)
    }
}
fetchMovies()