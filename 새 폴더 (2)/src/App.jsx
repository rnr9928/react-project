import React from 'react';
import {
    Cart,
    Detail,
    Footer,
    Teemo,
    Navbar,
    Sales,
    BigSale
} from './components';
import {
    teemoWorld,
    kingTeemo,
    top3,
    blackcow,
    omegateemo,
    big,
    footerAPI
} from './data/data.js';

const App = () => {
    return (
        <> < Navbar /> <Cart/>
        <main className='flex flex-col gap-16 relative'>
            <Teemo teemoWorld={teemoWorld}/>
            <Sales point={kingTeemo} ifExists="ifExists"/>
            <Detail point={blackcow} ifExists="ifExists"/>
            <Sales point={top3}/>
            <Detail point={omegateemo}/>
            <BigSale big={big}/>
        </main>
        <Footer footerAPI={footerAPI}/>
    </>
    )
}

export default App;