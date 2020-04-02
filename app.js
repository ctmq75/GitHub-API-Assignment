
'use strict';

function fetchRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(e => {
            displayError(e.message);
        });
}

function displayResults(responseJson) {
    console.log(responseJson)
    let user = responseJson[0].owner.login
    let card = `
        <h3>Username: <span class="name">${user}</span></h4>
        <h3><span class="user">Repos: ${responseJson.length}</span></h4>
        <ul class="results-list"></ul>
    `
    $('.searchResults').append(card)
    for (let i = 0; i < responseJson.length; i++) {
        $('.results-list').append(`
        <div class="list-item"><li><h4 class='uppercase'>Project Name: ${responseJson[i].name}</h4>
        <span>Link to Repo:</span> <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
        </li></div>`)
    }
    $('.searchResults').removeClass('hidden')

}


function displayError(error) {
    $('.searchResults').html(`<h3 class="error">Uh-oh! Error Occured: ${error}</h3>`)
    $('.searchResults').removeClass('hidden')
}

function watchForm() {
    $('#form').submit(e => {
        e.preventDefault();
        $('.searchResults').empty().addClass('hidden')
        const username = $('.user-input').val();
        setTimeout(function () {
            fetchRepos(username);
        }, 1000)
    });
}

$(watchForm);