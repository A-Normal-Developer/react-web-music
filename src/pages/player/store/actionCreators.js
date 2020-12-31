import * as actionTypes from "./constants";

import { getRandom } from "@/utils/math-utils";
import { parseLyric } from "@/utils/parse-lyric";

import {
  getSongDetail,
  getLyric
} from "@/services/player";

const changeCurrentSongAction = currentSong => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong
});

const changePlayListAction = playList => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList
});

const changeCurrentSongIndexAction = currentSongIndex => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  currentSongIndex
});


const changeLyricListAction = lyricList => ({
  type: actionTypes.CHANGE_LYRIC_LIST,
  lyricList
});


// 对外暴露的action
export const changeSequenceAction = sequence => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence
});

export const changeCurrentIndexAndSongAction = tag => {
  return (dispatch, getState) => {
    const sequence = getState().getIn(["player", "sequence"]);
    const playList = getState().getIn(["player", "playList"]);
    let currentSongIndex = getState().getIn(["player", "currentSongIndex"]);
    switch (sequence) {
      // 随机播放
      case 1:
        let randomIndex = -1;
        do {
           randomIndex = getRandom(playList.length);
        } while (currentSongIndex === randomIndex)
        currentSongIndex = randomIndex;
        break;
      // 顺序播放
      default:
        currentSongIndex += tag;
        if (currentSongIndex >= playList.length) currentSongIndex = 0;
        if (currentSongIndex < 0) currentSongIndex = playList.length - 1;
    }

    const currentSong = playList[currentSongIndex];
    dispatch(changeCurrentSongAction(currentSong));
    dispatch(changeCurrentSongIndexAction(currentSongIndex));

    // 请求歌词
    dispatch(getLyricAction(currentSong.id))
  }
};


export const getSongDetailAction = (ids) => {
  return (dispatch, getState) => {
    // 1. 根据id查找playList中是否已经有了该歌曲
    const playList = getState().getIn(["player", "playList"]);
    const songIndex = playList.findIndex(song => song.id === ids);
    // 2. 判断是否找到了歌曲
    let song = null;
    if (songIndex !== -1) { // 请求到歌曲
      dispatch(changeCurrentSongIndexAction(songIndex));
      song = playList[songIndex];
      dispatch(changeCurrentSongAction(song));
      dispatch(getLyricAction(song.id))

    } else { // 没有请求到歌曲
      getSongDetail(ids).then(res => {
        song = res.songs && res.songs[0];
        if (!song) return;
        // 1. 将最新请求到的歌曲添加到播放列表中
        const newPlayList = [...playList];
        newPlayList.push(song);
        // 2. 更新redux中的值
        dispatch(changePlayListAction(newPlayList));
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1));
        dispatch(changeCurrentSongAction(song))

        // 3. 请求歌词
        dispatch(getLyricAction(song.id))

      });
    }


  }
};


export const getLyricAction = id => {
  return dispatch => {
    getLyric(id).then(res => {
      const lyric = res.lrc.lyric;
      const lyricList = parseLyric(lyric);
      dispatch(changeLyricListAction(lyricList))
    })
  }
};




