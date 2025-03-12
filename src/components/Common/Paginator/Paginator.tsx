import React, {useEffect, useState} from 'react'
import style from './Paginator.module.css'

type Props = {
    totalItemsCount: number,
    pageSize: number,
    onPageChanged: (arg0: number) => void,
    currentPage: number,
    portionSize: number,
}

const Paginator: React.FC<Props> = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    useEffect(() => {
        setPortionNumber(Math.ceil(currentPage / portionSize));
    }, [currentPage, portionSize])

    return (
        <div className={style.pagesBtnArea}>

            {portionNumber > 1
                ? <button className={style.backBtn} onClick={() => setPortionNumber((portionNumber - 1))}>back</button>
                : <button disabled className={style.backBtn} onClick={() => setPortionNumber((portionNumber - 1))}>back</button>
            }

            {pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map((page) => {
                    return <button key={page} onClick={(event) => onPageChanged(page)}
                                   className={currentPage === page ? style.selectedPage : style.pagesBtn}>{page}</button>
                })}


            {portionCount > portionNumber
                ? <button className={style.forwardBtn} onClick={() => setPortionNumber((portionNumber + 1))}>forward</button>
                : <button disabled className={style.forwardBtn} onClick={() => setPortionNumber((portionNumber + 1))}>forward</button>
            }

        </div>
    )
}

export default Paginator
