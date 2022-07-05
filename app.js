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
const curr_track = document.createElement('audio');
const app = {
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
        //xử lí volumn 

        //xử lí random
        randomBtn.onclick = function(){
/*                     _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom) */
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
    
              

            }

            


        }
        
        audio.addEventListener("loadeddata", ()=>{
          


            let durationTime = audio.duration
            let mins = Math.floor(durationTime / 60)
            let seconds = Math.floor(durationTime % 60)
            durationnum.innerText = `${mins}:${seconds}`
         
        })

        //next khi hết bài 
        audio.onended = function () {
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBtn.click()
            }
        }
        volumeBtn.onchange = function(){
            audio.volume()
        }
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
    loadConfig: function(){
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
 /*    setVolume: function(){
        volumeBtn.onchange = function(){

               }
    } */
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
    randomSong: function(){
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
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