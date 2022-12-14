import { PositionBanner } from './components/PositionBanner';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import './styles/main.css';
import logo from './assets/tol.png';
import { ListPlayer } from './components/ListPlayer';
import { ListPlayerModal } from './components/ListPlayerModal';
import axios from 'axios';
import { PlayersList } from './components/PlayersList';

interface Position {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    players: number;
  }
}


function App() {

  const [positions, setPositions] = useState<Position[]>([])

  useEffect(() => {
    axios('http://127.0.0.1:3333/positions')
      .then(response => {
        setPositions(response.data)
      })
  }, [])


  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="TOL Logo" />
      <p className='p-4 text-white'>See more info at <a className='font-bold text-transparent bg-tol-gradient bg-clip-text' href="https://www.theopenleague.com">The Open League</a></p>

      <h1 className="text-6xl text-white font-black mt-20 p-4">Your next <span className='text-transparent bg-tol-gradient bg-clip-text'>player</span> is here.</h1>
      <p className='text-white text-lg m-4'>Find players listed for transfer here! Select a position:</p>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-6 mt-16'>

        {positions.map(position => {
          return (
            <Dialog.Root>
            <PositionBanner 
              key={position.id}
              bannerUrl={position.bannerUrl} 
              title={position.title} 
              playersCount={position._count.players}
            />
            <PlayersList position={position.id}/>
            </Dialog.Root>
          )
        })}

  
      </div>

      

      <Dialog.Root>
        <ListPlayer />
        <ListPlayerModal />

      </Dialog.Root>
      <footer className='text-white mt-10 text-sm'>Created by <a className='font-bold hover:text-transparent hover:bg-tol-gradient hover:bg-clip-text' href='https://github.com/msilvafreitas'>Matheus Freitas</a> in <a className='font-bold hover:text-transparent hover:bg-tol-gradient hover:bg-clip-text' href="http://rocketseat.com.br">Rocketseat NLW</a></footer>
    </div>
    
  )
}

export default App
