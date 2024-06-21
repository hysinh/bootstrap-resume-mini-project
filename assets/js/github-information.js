function userInformationHTML(user) { // user is the object that is returned from the GitHub API
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            
            <p>Followers: ${user.followers} - Following: ${user.following} <br> Repos: ${user.public_repos}</p>
            </div>`;
}

function fetchGitHubInformation(event) {
    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`) // will list the repositories of that user
    ).then(
        function(firstResponse, secondResponse) { // response = response we get back from our getJSON() method
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData)); // use jQuery selects to select the gh-user-data div and set the HTML to the results of another function - userInformationHTML()
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        }, function(errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
    
}
