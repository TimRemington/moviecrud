document.addEventListener('DOMContentLoaded', function(ev) {
  //console.log('The DOM is working!');

  getMovies()
  addMovie()
});

// Function to fill the table with the current data in the blog table
function getMovies() {
  axios.get('/movies')
    .then((response) => {
      let update_form = document.getElementById('edit-movie')
      update_form.style.display = "none"
      console.log(response.data)

      let tbody = document.querySelector('#movies-table tbody')

      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
      }

      // DOM Manipulation, need to create TRs, TDs
      response.data.forEach((movies) => {
        let tr = document.createElement('tr')
        let title = document.createElement('tr')
        let director = document.createElement('td')
        let year = document.createElement('td')
        let rating = document.createElement('td')
        let del_td = document.createElement('td')
        let del_button = document.createElement('button')
        let edit_td = document.createElement('td')
        let edit_button = document.createElement('button')


        title.innerText = movies.title
        director.innerText = movies.director
        year.innerText = movies.year
        rating.innerText = movies.rating

        del_button.innerText = "X"
        del_button.setAttribute('data-id', movies.id)
        del_button.addEventListener('click', (ev) => {
          ev.preventDefault()
          let recordId = ev.target.getAttribute('data-id')
          console.log('id', recordId);

          // DELETE THIS RECORD!
          axios.delete(`/movies/${recordId}`)
            .then((response) => {
              console.log(response)
              ev.target.parentElement.parentElement.remove()
            })
            .catch((err) => {
              console.log(err)
            })
        })

        edit_button.innerText = "Edit Movie"
        edit_button.setAttribute('edit-id', movies.id)
        edit_button.addEventListener('click', (ev) => {
          ev.preventDefault()
          let editId = ev.target.getAttribute('edit-id')

          let createMovie = document.getElementById('create-movie')

          update_form.style.display = "block"
          createMovie.style.display = "none"

          //target all text areas in update form
          let title = document.getElementById('edit_title')
          let director = document.getElementById('edit_director')
          let year = document.getElementById('edit_year')
          let rating = document.getElementById('edit_rating')

          //fill all text areas with the value of each key from the table when update is clicked
          title.value = movies.title
          director.value = movies.director
          year.value = movies.year
          rating.value = movies.rating

          let submit_edit = document.getElementById('edit-form')
          //add event listener to update the row on click
          submit_edit.addEventListener('click', (event) => {
            event.preventDefault()
            //make data object to be used with axios put
            let data = {
              title: title.value,
              director: director.value,
              year: year.value,
              rating: rating.value
            }

            axios.put(`/movies/${editId}`, data)
              .then((response) => {

              })
            location.reload()
              .catch((err) => {
                console.log(err)
              })

          })

        })

        // append IMG, to the TD, append TDs to the TR, the TR to the TBODY
        del_td.appendChild(del_button)
        edit_td.appendChild(edit_button)
        tr.appendChild(title)
        tr.appendChild(director)
        tr.appendChild(year)
        tr.appendChild(rating)
        tr.appendChild(del_td)
        tr.appendChild(edit_td)
        tbody.appendChild(tr)

      })

    })
    .catch((error) => {
      console.log(error)
    })
}

function addMovie() {

  let submitMovie = document.getElementById('create-movie')

  submitMovie.addEventListener('submit', (ev) => {

    ev.preventDefault()

    let movieData = {}

    let formElements = ev.target.elements

    for (var i = 0; i < formElements.length; i++) {
      let inputElements = formElements[i].name
      if (inputElements) {
        movieData[inputElements] = formElements[i].value
      }
    }
    console.log('reeee', movieData);

    axios.post('/movies', movieData)
      .then((response) => {
        console.log(response);
        getMovies()
        location.reload()
      })
      .catch((error) => {
        console.log(error);
      })

  })
}
