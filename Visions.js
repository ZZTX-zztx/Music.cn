document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('playBtn');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    const audioPlayer = document.getElementById('audioPlayer');
    const musicCover = document.querySelector('.music-cover');
    let isPlaying = false;

    // 播放/暂停
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            playBtn.textContent = '▶';
        } else {
            audioPlayer.play()
                .catch(error => {
                    alert('播放失败！请检查音乐文件路径是否正确');
                    console.error('播放错误：', error);
                });
            playBtn.textContent = '❚❚';
        }
        isPlaying = !isPlaying;
    });

    // 音频元数据加载
    audioPlayer.addEventListener('loadedmetadata', () => {
        console.log('音频加载完成，总时长：', audioPlayer.duration);
    });

    // 进度条同步
    audioPlayer.addEventListener('timeupdate', () => {
        if (!isNaN(audioPlayer.duration)) {
            const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;

            if (progressPercent >= 100) {
                playBtn.textContent = '▶';
                isPlaying = false;
                progressBar.style.width = '0%';
            }
        }
    });

    // 进度条跳转
    progressContainer.addEventListener('click', (e) => {
        const containerWidth = progressContainer.offsetWidth;
        const clickPosition = e.offsetX;
        const progressPercent = (clickPosition / containerWidth) * 100;

        progressBar.style.width = `${progressPercent}%`;
        audioPlayer.currentTime = (progressPercent / 100) * audioPlayer.duration;
    });

    // 音频状态同步
    audioPlayer.addEventListener('play', () => {
        isPlaying = true;
        playBtn.textContent = '❚❚';
    });
    audioPlayer.addEventListener('pause', () => {
        isPlaying = false;
        playBtn.textContent = '▶';
    });

    // 图片加载状态提示
    musicCover.addEventListener('error', () => {
        alert('封面图加载失败！请确认 ./Visions.jpg 文件是否在同一文件夹');
    });
    musicCover.addEventListener('load', () => {
        console.log('封面图 ./Visions.jpg 加载成功');
    });
});
