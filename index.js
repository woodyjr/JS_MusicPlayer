"use strict";


const URL = 'https://uc-music-service.herokuapp.com';


(async () => {
    try{
        const albumList = document.getElementById('albums')
        const response = await fetch(`${URL}/album`);
        const albums = await response.json()

        albums.forEach(function(album){
            const li = document.createElement('li')

            //li.innerText = album.name

            var albumCover = document.createElement("IMG");
            albumCover.setAttribute("src", album.cover);
            albumCover.setAttribute("width", "150");
            albumCover.setAttribute("height", "150");
            li.appendChild(albumCover);

            li.onclick = async function () {
                try{
                    const response = await fetch(`${URL}/album/${album.id}`)
                    const albumDetails = await response.json();
                    var songsList = document.createElement("ul");

                    document.getElementById("songs").innerHTML = "";
                    const songList = document.getElementById('songs')

                    let s = document.createElement('ul');
                    for(let i=0; i < albumDetails.songs.length; i++)
                    {
                        let d = document.createElement('li');
                        d.innerText = albumDetails.songs[i].name;
                        s.appendChild(d);
                        songList.appendChild(s);
                    }

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