import { Card, Inputfield, Songcard } from './components';
import logo from './logo.svg';
import styles from './style/app.module.css'
import axios from '../node_modules/axios/index'
import { useEffect, useState } from 'react';

function App() {
  const [isShown,setIsShown] = useState(false)
  const [index,setIndex]= useState(null)
  const [playlistArr, setPlaylistArr] = useState(null)
  const baseurl = 'http://localhost:3030/'
  useEffect(()=>{
    axios.get(baseurl + 'playlists')
    .then(res => {
      setPlaylistArr(res.data)
      console.log(res.data)
    })

  },[])
  const createPlaylist = () => {
    setIsShown(true)
  }
  return (
    <div className={styles.app}>
      <div className={styles.scroll}>
        {
        playlistArr ?
        playlistArr.map((x,i)=>{
          return(
          <Card index={i} setIndex={setIndex} songs={playlistArr[i].songs} description={playlistArr[i].description} title={playlistArr[i].title} key={i}/>
          )
        })
      :console.log('asd')
      }
      </div>
      <div>
      <button onClick={createPlaylist}>create</button>
      {isShown && (
        <Inputfield/>
      )}
      
      </div>
      <div className={styles.display}>
        {
          index !== null ?
          playlistArr[index].songs.map((x,i)=>{
            return(
              <Songcard artist={x.artist} duration = {x.duration} title={x.title} key = {i} />
            )
          })
          : console.log('asd')
        }
      </div>
      
    </div>
  );
}

export default App;