/* ==========================================================================
   SHARED SEAMLESS BACKGROUND MUSIC CONTROLLER
   Maintains continuous playback between index.html and galaxy.html
   Auto-starts on site load
   ========================================================================== */

class ContinuousMusicController {
  constructor() {
    this.tracks = [
      { name: "song.mpeg", title: "Aayush's Song", src: "music/song.mpeg" },
      { name: "haareya.mp3", title: "Haareya", src: "music/haareya.mp3" }
    ];
    
    // Read saved state
    this.currentTrackIdx = parseInt(localStorage.getItem('bgm_track_idx') || '0', 10);
    if (this.currentTrackIdx >= this.tracks.length || this.currentTrackIdx < 0) {
      this.currentTrackIdx = 0;
    }
    
    this.savedTime = parseFloat(localStorage.getItem('bgm_time') || '0');
    const storedPlaying = localStorage.getItem('bgm_playing');
    // Default to true so music auto-plays on site load
    this.wasPlaying = storedPlaying === null ? true : (storedPlaying === 'true');
    this.volume = parseFloat(localStorage.getItem('bgm_volume') || '0.75');
    
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.audio.loop = true;
    this.audio.volume = this.volume;
    
    this.listeners = [];
    this.isInitialized = false;

    this.initAudioElement();
    this.bindEvents();
    this.attemptAutoplay();
  }

  initAudioElement() {
    const track = this.tracks[this.currentTrackIdx];
    this.audio.src = track.src;

    // When audio metadata is loaded, restore timestamp
    this.audio.addEventListener('loadedmetadata', () => {
      if (this.savedTime && this.savedTime < this.audio.duration) {
        this.audio.currentTime = this.savedTime;
      }
    });

    // Save timestamp periodically
    this.audio.addEventListener('timeupdate', () => {
      if (!this.audio.paused && this.audio.currentTime > 0) {
        localStorage.setItem('bgm_time', this.audio.currentTime.toString());
      }
    });

    this.audio.addEventListener('play', () => {
      localStorage.setItem('bgm_playing', 'true');
      this.notifyListeners(true);
    });

    this.audio.addEventListener('pause', () => {
      localStorage.setItem('bgm_playing', 'false');
      this.notifyListeners(false);
    });
  }

  attemptAutoplay() {
    // 1. Immediate play attempt
    const tryPlay = () => {
      if (this.wasPlaying && this.audio.paused) {
        this.audio.play().then(() => {
          this.notifyListeners(true);
        }).catch(() => {
          // Autoplay policy prevented immediate playback; waiting for first interaction
        });
      }
    };

    tryPlay();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tryPlay);
    }
    window.addEventListener('load', tryPlay);

    // 2. Immediate user interaction unlocker (captures any touch, click, scroll, key, movement)
    const gestureEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'scroll', 'keydown', 'wheel'];
    const unlocker = () => {
      if (this.wasPlaying && this.audio.paused) {
        this.play().catch(() => {});
      }
      gestureEvents.forEach(evt => window.removeEventListener(evt, unlocker, { capture: true }));
      gestureEvents.forEach(evt => document.removeEventListener(evt, unlocker, { capture: true }));
    };

    gestureEvents.forEach(evt => window.addEventListener(evt, unlocker, { capture: true, passive: true }));
    gestureEvents.forEach(evt => document.addEventListener(evt, unlocker, { capture: true, passive: true }));
  }

  bindEvents() {
    // Save state before leaving page
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('bgm_time', this.audio.currentTime.toString());
      localStorage.setItem('bgm_playing', (!this.audio.paused).toString());
      localStorage.setItem('bgm_track_idx', this.currentTrackIdx.toString());
    });

    // When page becomes visible, verify state
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.wasPlaying && this.audio.paused) {
        this.play().catch(() => {});
      }
    });
  }

  play() {
    this.wasPlaying = true;
    localStorage.setItem('bgm_playing', 'true');
    return this.audio.play().then(() => {
      this.notifyListeners(true);
    });
  }

  pause() {
    this.wasPlaying = false;
    localStorage.setItem('bgm_playing', 'false');
    this.audio.pause();
    this.notifyListeners(false);
  }

  toggle() {
    if (this.audio.paused) {
      return this.play();
    } else {
      this.pause();
      return Promise.resolve();
    }
  }

  switchTrack(newIdx = null) {
    if (newIdx === null) {
      this.currentTrackIdx = (this.currentTrackIdx + 1) % this.tracks.length;
    } else {
      this.currentTrackIdx = newIdx % this.tracks.length;
    }
    
    localStorage.setItem('bgm_track_idx', this.currentTrackIdx.toString());
    localStorage.setItem('bgm_time', '0');
    this.savedTime = 0;

    const isCurrentlyPlaying = !this.audio.paused || this.wasPlaying;
    const track = this.tracks[this.currentTrackIdx];
    this.audio.src = track.src;

    if (isCurrentlyPlaying) {
      this.play().catch(() => {});
    } else {
      this.notifyListeners(false);
    }
  }

  getCurrentTrack() {
    return this.tracks[this.currentTrackIdx];
  }

  isPlaying() {
    return !this.audio.paused;
  }

  onStateChange(cb) {
    this.listeners.push(cb);
    cb(!this.audio.paused, this.getCurrentTrack());
  }

  notifyListeners(playing) {
    const track = this.getCurrentTrack();
    this.listeners.forEach(cb => {
      try { cb(playing, track); } catch (e) {}
    });
  }
}

// Create singleton instance
window.bgMusic = new ContinuousMusicController();
