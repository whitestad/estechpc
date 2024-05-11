import { useState, useRef } from 'react';
import styles from './Player.module.css';

import PlayIcon from '@/assets/Play.svg?react';
import PauseIcon from '@/assets/Pause.svg?react';
import NextIcon from '@/assets/Fast Fwd.svg?react';
import PreviousIcon from '@/assets/Rewind.svg?react';

import {Container} from "@components/common/layouts/Layouts.jsx";
import {FieldsGroup} from "@components/layout/fieldsGroup/FieldGroup.jsx";

const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

function Player({song, onNext, onPrevious}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    const handleLoadedData = () => {
        setDuration(audioRef.current.duration);
        if (isPlaying) audioRef.current.play();
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleProgressClick = (event) => {
        const progressBar = event.target;
        const newTime = ((event.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    return (
        <Container>
            <div className={styles.wrapper}>
                <div className={[styles.player, styles.backgroundImage].join(' ')}
                     style={{ backgroundImage: `url(${song.avatar})` }}>
                    <div className={styles.glass}>
                        <img src={song.avatar} alt="Album Cover" className={styles.albumCover}/>

                        <span className={styles.title}>{song.title}</span>
                        <span className={styles.artist}>{song.artist}</span>

                        <audio
                            ref={audioRef}
                            src={song.sound}
                            onLoadedData={handleLoadedData}
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={() => setIsPlaying(false)}
                        />
                        <FieldsGroup>
                            <button className={styles.iconButton} onClick={onPrevious}>
                                <PreviousIcon className={styles.icon}></PreviousIcon>
                            </button>

                            <button className={styles.iconButton} onClick={togglePlayPause}>
                                {!isPlaying ?
                                    <PlayIcon className={styles.icon}></PlayIcon>
                                    :
                                    <PauseIcon className={styles.icon}></PauseIcon>
                                }
                            </button>
                            <button className={styles.iconButton} onClick={onNext}>
                                <NextIcon className={styles.icon}></NextIcon>
                            </button>

                        </FieldsGroup>
                        <div className={styles.progressBar} onClick={handleProgressClick}>
                            <div className={styles.progress}
                                 style={{width: `${(currentTime / duration) * 100}%`}}></div>
                        </div>
                        <div className={styles.info}>
                            <p className={styles.timerText}>{formatTime(currentTime)}</p>
                            <p className={styles.timerText}>{formatTime(duration)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Player;
