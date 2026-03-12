$(document).ready(function () {

    // ===== Lazy Loading Videos =====
    function loadVideo(video) {
        var src = video.getAttribute('data-src');
        if (!src) return;
        var source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';
        video.appendChild(source);
        video.removeAttribute('data-src');
        video.load();
        if (video.classList.contains('lazy-autoplay')) {
            video.play().catch(function () {});
        }
    }

    function lazyLoadCheck() {
        document.querySelectorAll('video.lazy-video[data-src]').forEach(function (video) {
            var rect = video.getBoundingClientRect();
            if (rect.top < window.innerHeight + 400) {
                loadVideo(video);
            }
        });
    }

    // Use IntersectionObserver + scroll fallback
    if ('IntersectionObserver' in window) {
        var lazyObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                loadVideo(entry.target);
                lazyObserver.unobserve(entry.target);
            });
        }, { rootMargin: '400px' });

        document.querySelectorAll('video.lazy-video').forEach(function (video) {
            lazyObserver.observe(video);
        });
    }

    // Scroll fallback + initial check
    $(window).on('scroll resize', lazyLoadCheck);
    lazyLoadCheck();

    // ===== Video Placeholder Detection =====
    $('video').each(function () {
        var video = this;
        var wrapper = $(video).closest('.video-wrapper');

        $(video).on('loadeddata', function () {
            wrapper.addClass('video-loaded');
        });

        $(video).find('source').on('error', function () {
            // Source failed — placeholder stays visible
        });
    });

    // ===== Auto-play / pause speaking videos on scroll =====
    if ('IntersectionObserver' in window) {
        var playObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var video = entry.target;
                if (!video.classList.contains('lazy-autoplay')) return;
                if (entry.isIntersecting) {
                    if (video.paused) video.play().catch(function () {});
                } else {
                    if (!video.paused) video.pause();
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('video.lazy-autoplay').forEach(function (video) {
            playObserver.observe(video);
        });
    }

    // ===== Click-to-Play Overlay =====
    $('.video-play-overlay').on('click', function () {
        var overlay = $(this);
        var wrapper = overlay.closest('.video-wrapper');
        var video = wrapper.find('video')[0];

        // Lazy-load if needed
        var src = video.getAttribute('data-src');
        if (src) {
            var source = document.createElement('source');
            source.src = src;
            source.type = 'video/mp4';
            video.appendChild(source);
            video.removeAttribute('data-src');
            video.load();
        }

        // Hide overlay and play
        overlay.addClass('is-hidden');
        wrapper.addClass('video-loaded');
        video.play().catch(function () {});

        // When video ends, show overlay again
        $(video).on('ended', function () {
            overlay.removeClass('is-hidden');
        });
    });

    // Click on video itself to pause/resume (toggle overlay)
    $(document).on('click', '.video-wrapper video', function () {
        var video = this;
        var wrapper = $(video).closest('.video-wrapper');
        var overlay = wrapper.find('.video-play-overlay');

        // Only handle click-to-play videos (those with overlay)
        if (overlay.length === 0) return;

        if (!video.paused) {
            video.pause();
            overlay.removeClass('is-hidden');
        }
    });

    // ===== Play / Pause =====
    $('.control-play').on('click', function () {
        var videoId = $(this).data('video');
        var video = document.getElementById(videoId);
        var icon = $(this).find('i');

        if (video.paused) {
            video.play();
            icon.removeClass('fa-play').addClass('fa-pause');
        } else {
            video.pause();
            icon.removeClass('fa-pause').addClass('fa-play');
        }
    });

    // ===== Progress Bar =====
    $('.progress-bar').on('input', function () {
        var videoId = $(this).data('video');
        var video = document.getElementById(videoId);
        if (video.duration) {
            video.currentTime = (this.value / 100) * video.duration;
        }
    });

    $('video').on('timeupdate', function () {
        var videoId = this.id;
        if (videoId && this.duration) {
            var progress = (this.currentTime / this.duration) * 100;
            $('.progress-bar[data-video="' + videoId + '"]').val(progress);
        }
    });

    // ===== Mute / Unmute =====
    $('.control-mute').on('click', function () {
        var videoId = $(this).data('video');
        var video = document.getElementById(videoId);
        var icon = $(this).find('i');

        video.muted = !video.muted;
        if (video.muted) {
            icon.removeClass('fa-volume-up').addClass('fa-volume-mute');
        } else {
            icon.removeClass('fa-volume-mute').addClass('fa-volume-up');
        }
    });

    // ===== Fullscreen =====
    $('.control-fullscreen').on('click', function () {
        var videoId = $(this).data('video');
        var video = document.getElementById(videoId);

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        }
    });

});
