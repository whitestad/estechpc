import Player from "@components/layout/player/Player.jsx";
import {Container} from "@components/common/layouts/Layouts.jsx";
import {useState} from "react";
import {SongList} from "@components/layout/player/SongsList.jsx";

import sound_1 from '@/assets/sound_1.mp3';
import sound_2 from '@/assets/sound_2.mp3';
import sound_3 from '@/assets/sound_3.mp3';
import sound_4 from '@/assets/sound_4.mp3';
import sound_5 from '@/assets/sound_5.mp3';
import sound_6 from '@/assets/sound_6.mp3';

import photo_1 from '@/assets/sound_photo_1.jpg';
import photo_2 from '@/assets/sound_photo_2.jpg';
import photo_3 from '@/assets/sound_photo_3.jpg';
import photo_4 from '@/assets/sound_photo_4.jpg';
import photo_5 from '@/assets/sound_photo_5.jpeg';
import photo_6 from '@/assets/sound_photo_6.jpg';

const songs = [
    { title: "Выключаю телефон", artist: "Инстасамка", sound: sound_1, avatar: photo_1 },
    { title: "Пампим нефть", artist: "Инстасамка", sound: sound_2, avatar: photo_2 },
    { title: "Тамада", artist: "Мияги", sound: sound_3, avatar: photo_3 },
    { title: "Как Mommy", artist: "Инстасамка", sound: sound_4, avatar: photo_4 },
    { title: "Memories", artist: "Xcho & Macan", sound: sound_5, avatar: photo_5 },
    { title: "Only You", artist: "Xcho feat. Пабло & Alemond", sound: sound_6, avatar: photo_6 },
];

function SoundPage(){

    const [currentSong, setCurrentSong] = useState(songs[0]);

    const handleSelectSong = (song) => {
        setCurrentSong(song);
    };

    const handleSetSongByDirection = (direction) => {
        let index = songs.indexOf(currentSong);

        index += direction
        if (index >= songs.length){
            index = 0;
        }
        else if (index < 0){
            index = songs.length - 1;
        }

        setCurrentSong(songs[index]);
    };

    return (
        <Container>
            <Player song={currentSong}
                    onNext={() => handleSetSongByDirection(1)}
                    onPrevious={() => handleSetSongByDirection(-1)}
            ></Player>

            <SongList songs={songs} onSelectSong={handleSelectSong} />
        </Container>
    );
}

export default SoundPage;
