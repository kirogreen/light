document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const lightContainer = document.getElementById('light-container');
    const brightnessSlider = document.getElementById('brightness');
    const temperatureSlider = document.getElementById('temperature');
    
    // 初始化亮度和色温
    updateLight();
    
    // 监听滑块变化
    brightnessSlider.addEventListener('input', updateLight);
    temperatureSlider.addEventListener('input', updateLight);
    
    // 监听点击和按键事件以切换全屏
    document.addEventListener('click', toggleFullscreen);
    document.addEventListener('keydown', toggleFullscreen);
    
    // 更新光源
    function updateLight() {
        const brightness = brightnessSlider.value;
        const temperature = temperatureSlider.value;
        
        // 亮度: 0-100 映射到 rgb 值 100-255
        const brightnessValue = 100 + (brightness * 155 / 100);
        
        // 色温: 0-100 映射到冷色调(蓝色偏重)到暖色调(黄色偏重)
        // 冷色调: rgb(200, 200, 255) -> 暖色调: rgb(255, 240, 200)
        const redValue = temperature < 50 
            ? 200 + (temperature * 55 / 50) 
            : 255;
        const greenValue = temperature < 50 
            ? 200 + (temperature * 40 / 50) 
            : 240;
        const blueValue = temperature < 50 
            ? 255 
            : 255 - ((temperature - 50) * 55 / 50);
        
        // 应用亮度和色温
        const r = Math.min(255, Math.round(redValue * brightnessValue / 255));
        const g = Math.min(255, Math.round(greenValue * brightnessValue / 255));
        const b = Math.min(255, Math.round(blueValue * brightnessValue / 255));
        
        body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    
    // 切换全屏模式
    function toggleFullscreen(event) {
        // 如果是从滑块操作触发的事件，不切换全屏
        if (event.target === brightnessSlider || event.target === temperatureSlider) {
            return;
        }
        
        if (!document.fullscreenElement) {
            // 进入全屏模式
            if (lightContainer.requestFullscreen) {
                lightContainer.requestFullscreen();
            } else if (lightContainer.webkitRequestFullscreen) { /* Safari */
                lightContainer.webkitRequestFullscreen();
            } else if (lightContainer.msRequestFullscreen) { /* IE11 */
                lightContainer.msRequestFullscreen();
            }
            body.classList.add('fullscreen');
        } else {
            // 退出全屏模式
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
            body.classList.remove('fullscreen');
        }
    }
    
    // 监听全屏变化事件
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    function handleFullscreenChange() {
        if (!document.fullscreenElement && 
            !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && 
            !document.msFullscreenElement) {
            // 退出全屏时移除全屏类
            body.classList.remove('fullscreen');
        }
    }
});