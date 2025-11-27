function animateProgressBar(duration = 7000) {
    const bar = document.getElementById('progress-bar');
    bar.style.transition = 'none';
    bar.style.width = '0%';
  
    setTimeout(() => {
      bar.style.transition = `width ${duration}ms linear`;
      bar.style.width = '100%';
    }, 50);
  }

  