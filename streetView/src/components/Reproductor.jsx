import { useContext, useRef, useState } from 'react';
import song1 from './../assets/songs/Aylex - Heaven (freetouse.com).mp3';
import song2 from '../assets/songs/Hazelwood - Maui (freetouse.com).mp3';
import song3 from '../assets/songs/Luke Bergs & Waesto - Homesick (freetouse.com).mp3';
import song4 from '../assets/songs/Lukrembo - Donut (freetouse.com).mp3';
import song5 from '../assets/songs/massobeats - gingersweet (freetouse.com).mp3';
import { MusicContext } from '../contextos/MusicaContext';

const songs = [song1, song2, song3, song4, song5];

const Reproductor = () => {
    const { play, pause, next, prev, isPlaying } = useContext(MusicContext);

    return (
        <div className='col-span-2 border bg-[#00000099] rounded-full py-4 px-8 flex justify-evenly items-center'>
            <div onClick={prev} className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20}><path fill="#FFBD54" d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3l0-57.7 96 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-96 0 0-57.7c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z" /></svg>
            </div>
            <div onClick={isPlaying ? pause : play} className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={20} height={20}><path fill="#FFBD54" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
            </div>
            <div onClick={next} className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={20} height={20}><path fill='#FFBD54' d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 151.2c-4.2-4.6-10.1-7.2-16.4-7.2C266 144 256 154 256 166.3l0 41.7-96 0c-17.7 0-32 14.3-32 32l0 32c0 17.7 14.3 32 32 32l96 0 0 41.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.4-7.2l84-91c3.5-3.8 5.4-8.7 5.4-13.9s-1.9-10.1-5.4-13.9l-84-91z" /></svg>
            </div>
        </div>
   
    );
};

export default Reproductor;
