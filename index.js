"use strict";


const URL = 'https://uc-music-service.herokuapp.com';


(async () => {
    try{
        const albumList = document.getElementById('albums')
        const response = await fetch(`${URL}/album`);
        const albums = await response.json()

        albums.forEach(function(album){
            const li = document.createElement('li')


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

                    let song = document.createElement('ul');
                    for(let i=0; i < albumDetails.songs.length; i++)
                    {
                        let d = document.createElement('li');
                        d.innerText = albumDetails.songs[i].name;
                        song.appendChild(d);
                        songList.appendChild(song);
                        

                        song.onclick = async function () {
                            const songUrl = albumDetails.songs[i].url;

                            //Create the audio tag
                            var soundFile = document.createElement("audio");

                            //Load the sound file (using a source element for expandability)
                            var src = document.createElement("source");
                            src.src = songUrl;
                            soundFile.appendChild(src);

                            soundFile.play();
                            console.log(songUrl)
                        }
                        
                        
                        
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