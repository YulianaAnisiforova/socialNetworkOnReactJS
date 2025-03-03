import React from 'react'
import style from './Paginator.module.css'

const Paginator = ({totalUsersCount, pageSize, onPageChanged, currentPage}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={style.pagesBtnArea}>
            {pages.map((page) => {
                return <button key={page} onClick={(event) => onPageChanged(page)}
                               className={currentPage === page ?
                                   style.selectedPage : style.pagesBtn}>{page}</button>
            })}
        </div>
    )
}

export default Paginator
