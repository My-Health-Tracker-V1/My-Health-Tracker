import React from 'react'
import {Link} from 'react-router-dom'
import Icons from './Icons'

export default function BottomNavbar() {
  return (
      <nav className='ba blue pv2 w-100 fixed bottom-0 bg-white'>

        <Link to='/dashboard' className="link blue hover-silver dib mh3 tc">
          <Icons icon="diary"/>
          <span className="f6 db">Diary</span>
        </Link>

        <Link to='/analysis' className="link blue hover-silver dib mh3 tc">
          <Icons icon="analysis"/>
          <span className="f6 db">Analysis</span>
        </Link>

        <Link to='/add-item' className="link blue hover-silver dib mh3 tc">
          <Icons icon="add"/>
          <span className="f6 db">add</span>
        </Link>

        <Link to='/add-frequent' className="link blue hover-silver dib mh3 tc">
          <Icons icon="frequent"/>
          <span className="f6 db">Frequent</span>
        </Link>

        <Link to='/more' className="link blue hover-silver dib mh3 tc">
          <Icons icon="more"/>
          <span className="f6 db">More</span>
        </Link>

      </nav>
  )
}
