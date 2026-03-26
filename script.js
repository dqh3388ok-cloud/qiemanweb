document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-split-text]').forEach((title) => {
    const lines = Array.from(title.children);
    lines.forEach((line, lineIndex) => {
      const text = line.textContent;
      line.textContent = '';
      Array.from(text).forEach((char, charIndex) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${lineIndex * 0.28 + charIndex * 0.04}s`;
        line.appendChild(span);
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.site-header'); // 请确保选择器与您的 HTML 类名一致
  const scrollThreshold = 100; // 滚动超过 50px 后触发变化

  window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
      // 滚动距离大于阈值，添加类名（变不透明）
      navbar.classList.add('scrolled');
    } else {
      // 滚动距离小于阈值（接近顶部），移除类名（变透明）
      navbar.classList.remove('scrolled');
    }
  });
});

// 在 script.js 中添加

document.addEventListener('DOMContentLoaded', () => {
  // 原有的 split-text 逻辑保持不变
  document.querySelectorAll('[data-split-text]').forEach((title) => {
    const lines = Array.from(title.children);
    lines.forEach((line, lineIndex) => {
      const text = line.textContent;
      line.textContent = '';
      Array.from(text).forEach((char, charIndex) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${lineIndex * 0.28 + charIndex * 0.04}s`;
        line.appendChild(span);
      });
    });
  });

  // 【新增】视频背景处理逻辑
  const video = document.getElementById('hero-video');
  const container = document.querySelector('.hero-video-container');

  if (video && container) {
    // 禁止下载：移除 controls 属性（虽然 HTML 里没写，但保险起见），并禁用右键菜单中的保存选项
    video.removeAttribute('controls');
    video.addEventListener('contextmenu', (e) => e.preventDefault());

    // 尝试播放视频
    const playVideo = () => {
      video.muted = true; // 确保静音
      video.play().then(() => {
        // 播放成功，标记容器状态，CSS 会据此隐藏静态图
        container.classList.add('video-ready');
      }).catch((error) => {
        console.warn('视频自动播放失败，可能受浏览器策略限制，将显示静态图:', error);
        // 如果自动播放失败，保持静态图显示
      });
    };

    // 检查视频是否已缓存或可立即播放
    if (video.readyState >= 3) { // HAVE_FUTURE_DATA
      playVideo();
    } else {
      // 监听数据加载完成事件
      video.addEventListener('loadeddata', playVideo);
      
      // 监听可以开始播放的事件
      video.addEventListener('canplay', () => {
         if (!container.classList.contains('video-ready')) {
            playVideo();
         }
      });
    }
    
    // 错误处理：如果视频加载失败，确保静态图可见
    video.addEventListener('error', () => {
      console.error('视频加载失败，显示静态背景图');
      container.classList.remove('video-ready');
    });
  }
});

