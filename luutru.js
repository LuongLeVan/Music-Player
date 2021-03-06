const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'USER_PLAYER'

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const currentnum = $('.currentTimes')
const durationnum = $('.durationTimes')
const volumeBtn = $('.volume_slider')
const volChange = $('.icon-vol')
const volUp = $('.icon-up')
const volDown = $('.icon-down')
const volOff = $('.icon-off')
const control = $('.controling')
let valueNumOld = 100
let max = 0
let valueNumOld1 = 0
let valueNumOld2 = 0
let valueNumOld3 = 0
const app = {
    indexSongs: [],
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config:JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) ||{},
    songs:[
         {
            name: 'Cho Tôi Tình Yêu',
            singer: 'Denn',
            path:'./assets/song/song7.mp3',
            image:'./assets/img/chotoitinhyeu.jpg'
        },
        {
            name: 'HongKong1',
            singer: 'Nguyễn Trọng Tài',
            path:'./assets/song/song5.mp3',
            image:'./assets/img/hongkong1.jpg'
        },
        {
            name: 'Trốn Tìm',
            singer: 'Đen Vâu',
            path:'./assets/song/song3.mp3',
            image:'./assets/img/trontim.jpg'
        },
        {
            name: 'Em Bỏ Hút Thuốc Chưa',
            singer: 'Bích Phương',
            path:'./assets/song/song4.mp3',
            image:'./assets/img/embohutthuocchua.jpg'
        },
        {
            name: 'Đi Qua Mùa Hạ',
            singer: 'Thái Dinh',
            path:'./assets/song/song1.mp3',
            image:'./assets/img/diquamuaha.jpg'
        },
        {
            name: 'Bước Qua Mùa Cô Đơn',
            singer: 'Vũ',
            path:'./assets/song/song2.mp3',
            image:'./assets/img/buocquamuacodon.jpg'
        },
        {
            name: 'Cảm Ơn Vì Tất Cả',
            singer: 'Anh Quân Idol x Freak D',
            path:'./assets/song/song6.mp3',
            image:'./assets/img/camonvitatca.jpg'
        },
        {
            name: 'Not About Love',
            singer: 'Khôi Vũ',
            path:'./assets/song/song8.mp3',
            image:'./assets/img/notaboutlove.jpg'
        },
        {
            name: '3107 3',
            singer: 'W/n ft. Nâu, Duongg, Titie',
            path:'./assets/song/song9.mp3',
            image:'./assets/img/31073.jpg'
        },
        {
            name: 'Phi Hành Gia',
            singer: 'RENJA x SLOW T x LIL WUYN x KAIN x SUGAR CANE',
            path:'./assets/song/song10.mp3',
            image:'./assets/img/phihanhgia.jpg'
        },
        {
            name: 'Bước Qua Nhau',
            singer: 'Vũ',
            path:'./assets/song/song11.mp3',
            image:'./assets/img/buocquanhau.jpg'
        },
        {
            name: 'Già Cùng Nhau Là Được',
            singer: 'Tùng TeA ft PC',
            path:'./assets/song/song12.mp3',
            image:'./assets/img/giacungnhau.jpg'
        },
        {
            name: 'Tháng Tư Là Lời Nói Dối Của Em',
            singer: 'Hà Anh Tuấn',
            path:'./assets/song/song13.mp3',
            image:'./assets/img/thangtulaloinoidoi.jpg'
        },
        {
            name: 'Nàng Thơ',
            singer: 'Hoàng Dũng',
            path:'./assets/song/song14.mp3',
            image:'./assets/img/nangtho.jpg'
        },
        {
            name: 'Tháng Mấy Em Nhớ Anh',
            singer: 'Hà Anh Tuấn',
            path:'./assets/song/song15.mp3',
            image:'./assets/img/thangmayemnhoanh.jpg'
        },   
        {
            name: 'Quá Khứ Của Anh',
            singer: 'Đại Mèo Remix',
            path:'./assets/song/song16.mp3',
            image:'./assets/img/quakhucuaanh.jpg'
        },
        {
            name: 'Tệ Thật Anh Nhớ Em',
            singer: 'Thanh Hưng',
            path:'./assets/song/song17.mp3',
            image:'./assets/img/tethat.jpg'
        },
        {
            name: 'Anh Mệt Rồi',
            singer: 'Anh Quân Idol x Freak D',
            path:'./assets/song/song18.mp3',
            image:'./assets/img/anhmetroi.jpg'
        },
        {
            name: 'Chưa Bao Giờ',
            singer: 'Trung Quân Idol',
            path:'./assets/song/song19.mp3',
            image:'./assets/img/chuabaogio.jpg'
        },
        {
            name: 'Có Anh Ở Đây Rồi',
            singer: 'Anh Quân Idol',
            path:'./assets/song/song20.mp3',
            image:'./assets/img/coanhdayroi.jpg'
        },
        {
            name: 'Hạnh Phúc Đơn Giản Lắm',
            singer: 'Anh Quân Idol x Khắc Anh x Freak D',
            path:'./assets/song/song21.mp3',
            image:'./assets/img/hanhphucdongian.jpg'
        },
        {
            name: 'Ừ Có Anh Đây',
            singer: 'Tino',
            path:'./assets/song/song22.mp3',
            image:'./assets/img/ucoanhday.jpg'
        },
        {
            name: 'Là Do Em Xui Thôi',
            singer: 'SOFIA × KHÓI × CHÂU ĐĂNG KHOA',
            path:'./assets/song/song23.mp3',
            image:'./assets/img/ladoemxui.jpg'
        },
        
        
    ],
    setConfig: function(key, value){
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function(){
        const htmls = this.songs.map((song, index) =>{
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>
            `
        })
        playlist.innerHTML  = htmls.join('');
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
        get: function () {
            return this.songs[this.currentIndex];
        }
        });
    },
    handleEvents: function(){
        _this  = this   
        const cdWidth = cd.offsetWidth

        document.onscroll = function(){
            const scrollTop = window.scrollY;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }
        // xử lí đĩa quay/dừng
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],
            {
                duration:10000,
                iterations: Infinity
            }
        )
        //xử lí repeat bài hát 
        repeatBtn.onclick = function(){
            if(_this.isRepeat){
                _this.isRepeat = false 
                _this.setConfig('isRepeat', _this.isRepeat)
                repeatBtn.classList.remove('active')

            }else{
                _this.isRepeat = true
                _this.setConfig('isRepeat', _this.isRepeat)
                repeatBtn.classList.add('active')
            }
        }
        //xử lí next bài hát
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong()
            }else{
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        //xử lí quay lại bài trước
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong()
            }else{
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()

        }
        
        cdThumbAnimate.pause()
        playBtn.onclick = function(){
            if (_this.isPlaying){
               audio.pause()
                
            }else{
              audio.play()
            }
          
        }

        //xử lí random
        randomBtn.onclick = function(){
            if(_this.isRandom){
                _this.isRandom = false
                randomBtn.classList.remove('active')
                _this.setConfig('isRandom', _this.isRandom)

            }else{
                _this.isRandom = true
                _this.setConfig('isRandom', _this.isRandom)

                randomBtn.classList.add('active')
            } 
        }
        //xử lí đang chạy
        audio.onplay = function(){
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
            
        }
        //xử lí chưa chạy
        audio.onpause = function(){
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()

        }



    

        //xử lí thanh volume
        volumeBtn.oninput = function(){
            audio.volume = (volumeBtn.value / 100)
            if(audio.volume <0.14 ){
                valueNumOld3 = volumeBtn.value 
                valueNumOld = valueNumOld3

                control.classList.add('mute')
                control.classList.remove('hideup')
                control.classList.remove('showup')
            }else if(audio.volume >= 0.14 && audio.volume <0.7){
                valueNumOld2 = volumeBtn.value 
                valueNumOld = valueNumOld2

                control.classList.add('hideup')
                control.classList.remove('showup')
                control.classList.remove('mute')

            }else if(audio.volume >= 0.7){
                valueNumOld1 = volumeBtn.value 
                valueNumOld = valueNumOld1

                control.classList.add('showup')
                control.classList.remove('hideup')
                control.classList.remove('mute')
            }


            // xử lí bật tắt icon
            if (audio.volume <0.14){
                valueNumOld3 = volumeBtn.value  
                console.log('valueNumOld1',valueNumOld3)


            }else if(audio.volume >= 0.14 && audio.volume <0.7 ){
                valueNumOld2 = volumeBtn.value  
                console.log('valueNumOld2',valueNumOld2)

            }else if (audio.volume >= 0.7 ){
                valueNumOld1 = volumeBtn.value
                if(valueNumOld1) {
                    /* control.classList.add('showup')
                    control.classList.remove('hideup')
                    control.classList.remove('mute') */
                    console.log('valueNumOld1',valueNumOld1)
                }


            }
        }
        volChange.onclick = function(){
            volumeBtn.value = 0
            audio.volume = (volumeBtn.value / 100)
            control.classList.add('mute')
            control.classList.remove('hideup')
            control.classList.remove('showup')
        }

        volOff.onclick = function(){
            
            if(volumeBtn.value ==0){
                volumeBtn.value = valueNumOld 
                audio.volume = (volumeBtn.value / 100)
                
            }else{
                volumeBtn.value = 0
                audio.volume = (volumeBtn.value / 100)
                control.classList.add('mute')
                control.classList.remove('hideup')
                control.classList.remove('showup')
            }
            
        }

        volDown.onclick = function(){
           
                volumeBtn.value = 0
                audio.volume = (volumeBtn.value / 100)
                control.classList.add('mute')
                control.classList.remove('hideup')
                control.classList.remove('showup')    
           
        }  
        //thanh tiến độ thay đổi theo bài hát
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent

                 //hiện thời lượng bài hát
             let currentTimes = audio.currentTime
             let currentMins = Math.floor(currentTimes / 60)
             let currentSeconds = Math.floor(currentTimes % 60)
             currentnum.innerText = `${currentMins}:${currentSeconds}`
             if(currentSeconds < 10){
                currentnum.innerText = `${currentMins}:0${currentSeconds}`
             }
               
            }

        }
        audio.addEventListener("loadeddata", ()=>{

            
                
            
            //hiện thời gian tổng bài hát
            let durationTime = audio.duration
            let mins = Math.floor(durationTime / 60)
            let seconds = Math.floor(durationTime % 60)
            durationnum.innerText = `${mins}:${seconds}`

            if(seconds < 10){
                seconds = `0${seconds}`
                durationnum.innerText = `${mins}:${seconds}`
            }else{
                durationnum.innerText = `${mins}:${seconds}`
            }


          
        })
/*         audio.addEventListener("loadeddata", ()=>{
            
            //hiện thời lượng bài hát
            let currentTimes = audio.currentTime
            let currentMins = Math.floor(currentTimes / 60)
            let currentSeconds = Math.floor(currentTimes % 60)
            currentnum.innerText = `${currentMins}:${currentSeconds}`
            if(currentSeconds < 10){
                currentSeconds = `0${currentSeconds}`
                durationnum.innerText = `${currentMins}:${currentSeconds}`
            }else{
                durationnum.innerText = `${currentMins}:${currentSeconds}`

            }

          
        }) */

        //next khi hết bài 
        audio.onended = function () {
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBtn.click()
            }
        }
 /*       volumeBtn.oninput = function(){
            audio.volume  = volumeBtn.value
       } */
        // tua bài hát 
        progress.oninput = function(e){
            const seekTime =  audio.duration / 100 * e.target.value 
            audio.currentTime = seekTime
        }
        // xử lí khi click vào bài hát thì phát
        playlist.onclick = function(e){
            const node = e.target.closest('.song:not(.active)')
            if(node || e.target.closest('.option')){
                if(node){
                    _this.currentIndex = Number(node.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                    
                }else{

                }
            }
        }
    },
    loadCurrentSong: function () {
            heading.textContent = this.currentSong.name;
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
            audio.src = this.currentSong.path;
    },
    //random songs
    playRandomSong() {
        let newIndex
        if (this.indexSongs.length === this.songs.length) {
            this.indexSongs = []
        }
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)

        } while (this.indexSongs.includes(newIndex) || newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.indexSongs.push(newIndex)
        this.loadCurrentSong()
    },
    loadConfig: function(){
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong: function(){
        this.currentIndex ++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    //scroll into view with active song
    scrollToActiveSong: function () {
        setTimeout(() => {
            if(this.currentIndex <= 2){
                $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "end"
            });
            }else{
                $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
            }
       
        }, 300);
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
        start: function(){
        this.loadConfig()
        //định nghĩa thuộc tính cho obj
        this.defineProperties();
        //lắng nghe các sự kiện
        this.handleEvents();
        //load bài đầu tiên
       this.loadCurrentSong();

        //render playlist
        this.render();
       
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)

    }
        

}
app.start();