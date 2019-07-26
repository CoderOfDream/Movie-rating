class Carousel {
    constructor() {
        this.imgArrPrev = ['svg/movie-type.svg', 'svg/products/actions/gradelessWhite.svg', 'svg/play-button.svg']
        this.imgArrNav = ['svg/products/actions/share.svg', 'svg/products/actions/comment.svg', 'svg/products/actions/gradeless.svg', 'svg/products/actions/heart.svg']
        this.newCards()
        this.moveSlider()
        this.listViewItems()

    }

    newCards() {
        fetch('https://api.myjson.com/bins/p2dnz')
            .then(json => json.json())
            .then(cards => {

                const wrapper = document.querySelector('.list-films')

                cards.forEach(card => {
                    const newCard = document.createElement('li')
                    newCard.classList.add('card')
                    newCard.setAttribute('filter', `${card.type} list`)
                    wrapper.appendChild(newCard)

                    const filmName = document.createElement('h3')
                    filmName.classList.add('film-name')
                    filmName.innerHTML = card.title
                    newCard.appendChild(filmName)

                    const date = document.createElement('h3')
                    date.classList.add('date')
                    date.innerHTML = card.year
                    newCard.appendChild(date)

                    const video = document.createElement('div')
                    video.style.background = `url(${card.poster}), rgba(0,0,0,0.5)`
                    video.classList.add('video')

                    const videoTopBtns = document.createElement('div')
                    videoTopBtns.classList.add('video-top-btns')
                    video.appendChild(videoTopBtns)

                    const leftImg = document.createElement('img')
                    leftImg.classList.add('left-img')
                    leftImg.src = this.imgArrPrev[0]
                    videoTopBtns.appendChild(leftImg)

                    const rightImg = document.createElement('img')
                    rightImg.classList.add('right-img')
                    rightImg.src = this.imgArrPrev[1]
                    videoTopBtns.appendChild(rightImg)

                    const playBtn = document.createElement('div')
                    playBtn.classList.add('play-btn')
                    video.appendChild(playBtn)

                    const playImg = document.createElement('img')
                    playImg.src = this.imgArrPrev[2]
                    playBtn.appendChild(playImg)

                    newCard.appendChild(video)

                    const cardNav = document.createElement('div')
                    cardNav.classList.add('card-nav')

                    const shareBtn = document.createElement('img')
                    shareBtn.classList.add('share')
                    shareBtn.src = this.imgArrNav[0]
                    cardNav.appendChild(shareBtn)

                    const comments = document.createElement('div')
                    comments.classList.add('comments')

                    const commentsValue = document.createElement('p')
                    commentsValue.innerHTML = card.comments_count
                    comments.appendChild(commentsValue)

                    const commentsImg = document.createElement('img')
                    commentsImg.src = this.imgArrNav[1]
                    comments.appendChild(commentsImg)

                    const gradeless = document.createElement('div')
                    gradeless.classList.add('gradeless')

                    const gradelessValue = document.createElement('p')
                    gradelessValue.innerHTML = 623
                    gradeless.appendChild(gradelessValue)

                    const gradelessImg = document.createElement('img')
                    gradelessImg.src = this.imgArrNav[2]
                    gradeless.appendChild(gradelessImg)

                    const like = document.createElement('div')
                    like.classList.add('like')

                    const likeValue = document.createElement('p')
                    likeValue.innerHTML = card.likes_count
                    like.appendChild(likeValue)

                    const likeImg = document.createElement('img')
                    likeImg.src = this.imgArrNav[3]
                    like.appendChild(likeImg)

                    cardNav.appendChild(comments)
                    cardNav.appendChild(gradeless)
                    cardNav.appendChild(like)

                    newCard.appendChild(cardNav)

                })
            })
            .then(() => this.filter('first-filter', 'list'))
    }

    filter(filter, key, slider) {
        let content = $(`.${filter} > li`)

        $(`button[filter="Movie ${key}"]`).click(function () {
            if ($(this).attr('val') == 'off') {
                $('button[filter]').attr('val', 'off')
                $(this).attr('val', 'on')
                $(`.${filter} > li`).remove()
                for (let i = 0; i < content.length; i++) {
                    if (content[i].getAttribute('filter') === `Movie ${key}`) {
                        $(`.${filter}`).append(content[i])
                    }
                }
                (filter === 'items') ? slider.reloadSlider() : false
            }
        })

        $(`button[filter="TV-Show ${key}"]`).click(function () {

            if ($(this).attr('val') == 'off') {
                $('button[filter]').attr('val', 'off')
                $(this).attr('val', 'on')
                $(`.${filter} > li`).remove()
                for (let i = 0; i < content.length; i++) {
                    if (content[i].getAttribute('filter') === `TV-Show ${key}`) {
                        $(`.${filter}`).append(content[i])
                    }
                }
                (filter === 'items') ? slider.reloadSlider() : false
            }
        })

        $(`button[filter="all ${key}"]`).click(function () {
            if ($(this).attr('val') == 'off') {
                $('button[filter]').attr('val', 'off')
                $(this).attr('val', 'on')
                for (let i = 0; i < content.length; i++) {
                    $(`.${filter}`).append(content[i])
                }
            }
            (filter === 'items') ? slider.reloadSlider() : false
        })


    }

    moveSlider() {
        const slider = document.querySelector('.list-films')
        let isDown = false
        let startX
        let scrollLeft

        slider.addEventListener('mousedown', (e) => {
            isDown = true
            slider.classList.add('active')
            startX = e.pageX - slider.offsetLeft
            scrollLeft = slider.scrollLeft
        })
        slider.addEventListener('mouseleave', () => {
            isDown = false
            slider.classList.remove('active')
        })
        slider.addEventListener('mouseup', () => {
            isDown = false
            slider.classList.remove('active')
        })
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return
            e.preventDefault()
            const x = e.pageX - slider.offsetLeft
            const walk = (x - startX) * 0.6
            slider.scrollLeft = scrollLeft - walk
        })
    }

    listViewItems() {
        const wrapper = document.querySelector('.items ')

        fetch('https://api.myjson.com/bins/p2dnz')
            .then(json => json.json())
            .then(cards => {
                cards.forEach(card => {
                    const newItem = document.createElement('li')
                    newItem.classList.add('list-view-item')
                    newItem.setAttribute('filter', `${card.type} most`)

                    const prevImg = document.createElement('div')
                    prevImg.classList.add('prev-img')
                    prevImg.style.backgroundImage = `url(${card.poster})`

                    const playBtn = document.createElement('div')
                    playBtn.classList.add('play-btn')
                    prevImg.appendChild(playBtn)

                    const playImg = document.createElement('img')
                    playImg.src = this.imgArrPrev[2]
                    playBtn.appendChild(playImg)

                    newItem.appendChild(prevImg)

                    const rating = document.createElement('div')
                    rating.classList.add('rating')
                    newItem.appendChild(rating)
                    if (card.rank === undefined) {
                        const ratingImg = document.createElement('img')
                        ratingImg.src = this.imgArrNav[2]
                        rating.appendChild(ratingImg)

                        const rank = document.createElement('p')
                        rank.classList.add('rank')
                        rating.appendChild(rank)
                    } else {
                        const circle = document.createElement('div')
                        circle.classList.add('circle')
                        rating.appendChild(circle)
                        const rank = document.createElement('p')
                        rank.classList.add('rank')
                        rank.innerHTML = card.rank
                        rating.appendChild(rank)
                    }

                    const listViewItemInfo = document.createElement('div')
                    listViewItemInfo.classList.add('list-view-item-info')
                    newItem.appendChild(listViewItemInfo)

                    const filmName = document.createElement('div')
                    filmName.innerHTML = card.title
                    filmName.classList.add('film-name')
                    listViewItemInfo.appendChild(filmName)

                    const details = document.createElement('div')
                    details.classList.add('details')
                    listViewItemInfo.appendChild(details)

                    const dateFilm = document.createElement('p')
                    dateFilm.innerHTML = `${card.year} |`
                    dateFilm.classList.add('date-film')
                    details.appendChild(dateFilm)

                    const director = document.createElement('p')
                    director.innerHTML = `${card.director} |`
                    director.classList.add('director')
                    details.appendChild(director)

                    const writer = document.createElement('p')
                    writer.innerHTML = `${card.writer}`
                    writer.classList.add('writer')
                    details.appendChild(writer)

                    const description = document.createElement('div')

                    description.classList.add('description')
                    listViewItemInfo.appendChild(description)

                    const descriptionP = document.createElement('p')
                    descriptionP.innerHTML = card.content
                    description.appendChild(descriptionP)

                    const itemNav = document.createElement('div')
                    itemNav.classList.add('item-nav')
                    listViewItemInfo.appendChild(itemNav)

                    const shareBtn = document.createElement('img')
                    shareBtn.classList.add('share')
                    shareBtn.src = this.imgArrNav[0]
                    itemNav.appendChild(shareBtn)

                    const comments = document.createElement('div')
                    comments.classList.add('comments')

                    const commentsValue = document.createElement('p')
                    commentsValue.innerHTML = `${card.comments_count} |`
                    comments.appendChild(commentsValue)

                    const commentsImg = document.createElement('img')
                    commentsImg.src = this.imgArrNav[1]
                    comments.appendChild(commentsImg)

                    const gradeless = document.createElement('div')
                    gradeless.classList.add('gradeless')

                    const gradelessValue = document.createElement('p')
                    gradelessValue.innerHTML = `623 |`
                    gradeless.appendChild(gradelessValue)

                    const gradelessImg = document.createElement('img')
                    gradelessImg.src = this.imgArrNav[2]
                    gradeless.appendChild(gradelessImg)

                    const like = document.createElement('div')
                    like.classList.add('like')

                    const likeValue = document.createElement('p')
                    likeValue.innerHTML = `${card.likes_count} |`
                    like.appendChild(likeValue)

                    const likeImg = document.createElement('img')
                    likeImg.src = this.imgArrNav[3]
                    like.appendChild(likeImg)

                    const readMore = document.createElement('a')
                    readMore.classList.add('read-more')
                    readMore.innerHTML = 'Read more'
                    readMore.href = '#'

                    itemNav.appendChild(comments)
                    itemNav.appendChild(gradeless)
                    itemNav.appendChild(like)
                    itemNav.appendChild(readMore)
                    wrapper.appendChild(newItem)
                })
            })
            .then(() => this.listViewSlider())
            .then((slider) => this.filter('items', 'most', slider))
    }

    listViewSlider() {
        const slider = $('.items').bxSlider({
            mode: 'vertical',
            minSlides: 3,
            slideMargin: 0,
            moveSlides: 1,
            controls: false,
            pager: false,
            infiniteLoop: false,
            captions: true
        })
        $('.next').click(function () {
            slider.goToNextSlide()
        })

        $('.prev').click(function () {
            slider.goToPrevSlide()
        })
        return slider
    }
}

const carousel = new Carousel()