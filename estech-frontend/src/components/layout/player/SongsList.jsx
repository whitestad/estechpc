import styles from './SongList.module.css';
import {Container} from "@components/common/layouts/Layouts.jsx";
import PlayIcon from "@/assets/Play.svg?react";


const SongList = ({ songs, onSelectSong }) => {
    return (
        <div className={styles.wrapper}>
            <h1>Популярное</h1>
            <div className={styles.songList}>
                {songs.map((song, index) => (
                    <div key={index} className={styles.songItem} onClick={() => onSelectSong(song)}>
                        <img src={song.avatar} alt="Album Cover" className={styles.icon}/>
                        <div className={styles.info}>
                            <div className={styles.songTitle}>{song.title}</div>
                            <div className={styles.songArtist}>{song.artist}</div>
                        </div>

                        <button className={styles.playButton}>
                            <PlayIcon className={styles.playIcon}></PlayIcon>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export {SongList};
