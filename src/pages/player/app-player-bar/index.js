import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { Slider, message } from 'antd';
import {
  getSongDetailAction,
  changeSequenceAction,
  changeCurrentIndexAndSongAction,
  changeLyricIndexAction
} from "../store/actionCreators";

import {
  getSizeImage,
  formatDate,
  getPlaySong
} from "@/utils/format-utils";

import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
} from "./style";



const RHAppPlayerBar = memo(() => {
  // state and props
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // redux hooks
  const {
    currentSong,
    sequence,
    playList,
    lyricList,
    currentLyricIndex
  } = useSelector(state => ({
    currentSong: state.getIn(["player", "currentSong"]),
    sequence: state.getIn(["player", "sequence"]),
    playList: state.getIn(["player", "playList"]),
    lyricList: state.getIn(["player", "lyricList"]),
    currentLyricIndex: state.getIn(["player", "currentLyricIndex"])
  }), shallowEqual);

  const dispatch = useDispatch();
  // other hooks
  useEffect(() => {
    dispatch(getSongDetailAction(1407551413))
  },[dispatch]);

  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id);
    audioRef.current.play().then(res => {
      setIsPlaying(true)
    }).catch(err => {
      setIsPlaying(false)
    });
  }, [currentSong]);

  const audioRef = useRef();

  // other handle
  const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
  const singerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手";
  const duration = currentSong.dt || 0;
  const showDuration = formatDate(duration, "mm:ss");
  const showCurrentTime = formatDate(currentTime, "mm:ss");


  // handle function
  const playMusic = useCallback(() => {
    isPlaying? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  },[isPlaying]);

  const showTipCurrentTime = () => {
    return showCurrentTime;
  };

  const timeUpdate = e => {
    if (!isChanging) {
      setCurrentTime(e.target.currentTime * 1000);
      setProgress(currentTime / duration * 100);
    }

    // 获取当前歌词
    let i = 0;
    for (; i < lyricList.length; i++) {
      if (e.target.currentTime * 1000 < lyricList[i].time) {
        break;
      }
    }

    if (currentLyricIndex !== i - 1) {
      dispatch(changeLyricIndexAction(i - 1));
      message.open({
        key: "lyric",
        content: lyricList[i - 1] && lyricList[i - 1].content,
        duration: 0
      })
    }

  };

  const handleMusicEnded = e => {
    if (sequence === 2) { // 单曲循环
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(changeCurrentIndexAndSongAction(1))
    }

  };



  const sliderChange = useCallback(value => {
    setIsChanging(true);
    const currentTime = value / 100 * duration;
    setCurrentTime(currentTime);
    setProgress(value);
  },[duration]);

  const sliderAfterChange = useCallback(value => {
    const currentTime = value / 100 * duration / 1000;
    audioRef.current.currentTime = currentTime;
    setCurrentTime(currentTime * 1000);
    setIsChanging(false);

    if (!isPlaying) {
      playMusic();
    }
  },[duration, isPlaying, playMusic]);

  const changeSequence = () => {
    let currentSequence = sequence + 1;
    if (currentSequence > 2) {
      currentSequence = 0;
    }
    dispatch(changeSequenceAction(currentSequence))
  };

  const changeMusic = tag => {
    dispatch(changeCurrentIndexAndSongAction(tag))
  };


  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_playbar prev" onClick={e => changeMusic(-1)}></button>
          <button className="sprite_playbar play" onClick={e => playMusic()}></button>
          <button className="sprite_playbar next" onClick={e => changeMusic(1)}></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src={getSizeImage(picUrl, 35)} alt=""/>
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <a href="/#" className="singer-name">{singerName}</a>
            </div>
            <div className="progress">
              <Slider tipFormatter={showTipCurrentTime} value={progress}  onChange={sliderChange} onAfterChange={sliderAfterChange} />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{showDuration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop" onClick={e => changeSequence()}></button>
            <button className="sprite_playbar btn playlist">
              <span>{playList.length}</span>
            </button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={handleMusicEnded}/>
    </PlaybarWrapper>
  );
});

export default RHAppPlayerBar;