"use strict";


const URL = 'https://uc-music-service.herokuapp.com';


(async () => {
    try{
        const albumList = document.getElementById('albums')
        const response = await fetch(`${URL}/album`);
        const albums = await response.json()

        albums.forEach(function(album){
            const li = document.createElement('li')

            li.innerText = album.name

            li.onclick = async function () {
                try{
                    const response = await fetch(`${URL}/album/${album.id}`)
                    const albumDetails = await response.json();

                    console.log(albumDetails);
                }
                catch(err){
                    console.log(err);
                }
            };
            albumList.appendChild(li);
        })

    }
    catch(err){
        console.log(err);
    }


})();