/*
	Multiverse by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Hack: Enable IE workarounds.
		if (browser.name == 'ie')
			$body.addClass('ie');

	// Touch?
		if (browser.mobile)
			$body.addClass('touch');

	// Transitions supported?
		if (browser.canUse('transition')) {

			// Play initial animations on page load.
				$window.on('load', function() {
					window.setTimeout(function() {
						$body.removeClass('is-preload');
					}, 100);
				});

			// Prevent transitions/animations on resize.
				var resizeTimeout;

				$window.on('resize', function() {

					window.clearTimeout(resizeTimeout);

					$body.addClass('is-resizing');

					resizeTimeout = window.setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

				});

		}

	// Scroll back to top.
		$window.scrollTop(0);

	// Panels.
		var $panels = $('.panel');

		$panels.each(function() {

			var $this = $(this),
				$toggles = $('[href="#' + $this.attr('id') + '"]'),
				$closer = $('<div class="closer" />').appendTo($this);

			// Closer.
				$closer
					.on('click', function(event) {
						$this.trigger('---hide');
					});

			// Events.
				$this
					.on('click', function(event) {
						event.stopPropagation();
					})
					.on('---toggle', function() {

						if ($this.hasClass('active'))
							$this.triggerHandler('---hide');
						else
							$this.triggerHandler('---show');

					})
					.on('---show', function() {

						// Hide other content.
							if ($body.hasClass('content-active'))
								$panels.trigger('---hide');

						// Activate content, toggles.
							$this.addClass('active');
							$toggles.addClass('active');

						// Activate body.
							$body.addClass('content-active');

					})
					.on('---hide', function() {

						// Deactivate content, toggles.
							$this.removeClass('active');
							$toggles.removeClass('active');

						// Deactivate body.
							$body.removeClass('content-active');

					});

			// Toggles.
				$toggles
					.removeAttr('href')
					.css('cursor', 'pointer')
					.on('click', function(event) {

						event.preventDefault();
						event.stopPropagation();

						$this.trigger('---toggle');

					});

		});

		// Global events.
			$body
				.on('click', function(event) {

					if ($body.hasClass('content-active')) {

						event.preventDefault();
						event.stopPropagation();

						$panels.trigger('---hide');

					}

				});

			$window
				.on('keyup', function(event) {

					if (event.keyCode == 27
					&&	$body.hasClass('content-active')) {

						event.preventDefault();
						event.stopPropagation();

						$panels.trigger('---hide');

					}

				});

	// Header.
		var $header = $('#header');

		// Links.
			$header.find('a').each(function() {

				var $this = $(this),
					href = $this.attr('href');

				// Internal link? Skip.
					if (!href
					||	href.charAt(0) == '#')
						return;

				// Redirect on click.
					$this
						.removeAttr('href')
						.css('cursor', 'pointer')
						.on('click', function(event) {

							event.preventDefault();
							event.stopPropagation();

							window.location.href = href;

						});

			});

	// Main.
		var $cocos = $('#cocos');
		var $unity = $('#unity');
		var $tool = $('#tool');
		var $cocosMain = $cocos.children('#main');
		var $unityMain = $unity.children('#main');
		var $toolMain = $tool.children('#main');
		var $main = $cocosMain.add($unityMain).add($toolMain);

		// Thumbs.
			$main.children('.thumb').each(function() {

				var	$this = $(this),
					$image = $this.find('.image'), $image_img = $image.children('img'),
					x;

				// No image? Bail.
					if ($image.length == 0)
						return;

				// Image.
				// This sets the background of the "image" <span> to the image pointed to by its child
				// <img> (which is then hidden). Gives us way more flexibility.

					// Set background.
						$image.css('background-image', 'url(' + $image_img.attr('src') + ')');

					// Set background position.
						if (x = $image_img.data('position'))
							$image.css('background-position', x);

					// Hide original img.
						$image_img.hide();

			});

		// Poptrox.
			$main.poptrox({
				baseZIndex: 20000,
				caption: function($a) {

					var s = '';

					$a.nextAll().each(function() {
						s += this.outerHTML;
					});

					return s;

				},
				fadeSpeed: 300,
					onPopupClose: function() { 
						$body.removeClass('modal-active');
						// remove parent nav buttons if present
						$('.poptrox-parent-nav').remove();
					},
					onPopupOpen: function() { 
						$body.addClass('modal-active');
						// Add parent-level nav buttons overlaying the popup so clicks are reliable
						var $popup = $('.poptrox-popup:visible');
						if ($popup.length && $popup.find('.poptrox-parent-nav').length === 0) {
							var $nav = $('<div class="poptrox-parent-nav" style="position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10003"></div>');
							var $prev = $('<button class="poptrox-parent-prev" title="上一個" style="pointer-events:auto;position:absolute;left:8px;top:50%;transform:translateY(-50%);width:56px;height:56px;background:rgba(0,0,0,0.35);color:#fff;border:0;border-radius:4px;font-size:28px;">‹</button>');
							var $next = $('<button class="poptrox-parent-next" title="下一個" style="pointer-events:auto;position:absolute;right:8px;top:50%;transform:translateY(-50%);width:56px;height:56px;background:rgba(0,0,0,0.35);color:#fff;border:0;border-radius:4px;font-size:28px;">›</button>');
							$nav.append($prev).append($next);
							$popup.append($nav);

							$prev.on('click', function(e) { e.stopPropagation(); e.preventDefault(); $popup.trigger('poptrox_previous'); });
							$next.on('click', function(e) { e.stopPropagation(); e.preventDefault(); $popup.trigger('poptrox_next'); });
						}
					},
					overlayOpacity: 0,
					popupCloserText: '',
					// Let iframe content dictate size; start with 0 to allow dynamic resizing
					popupHeight: 0,
					popupLoaderText: '',
					popupSpeed: 150,
					popupWidth: 0,
				selector: '.thumb > a.image',
				usePopupCaption: true,
				usePopupCloser: true,
				usePopupDefaultStyling: false,
				usePopupForceClose: true,
				usePopupLoader: true,
				usePopupNav: true,
				windowMargin: 50
			});

			// Listen for messages from iframe video player
			window.addEventListener('message', function(event) {
				var data = event.data || {};
				// If message is a JSON string, try to parse it
				if (typeof data === 'string') {
					try { data = JSON.parse(data); } catch (e) { /* ignore */ }
				}

				// Resize popup to match video intrinsic size (scaled to fit windowMargin)
				if (data && data.action === 'videoSize' && data.width && data.height) {
					var vidW = parseInt(data.width, 10), vidH = parseInt(data.height, 10);
					var margin = ($main[0] && $main[0]._poptrox && $main[0]._poptrox.windowMargin) ? $main[0]._poptrox.windowMargin : 50;
					var maxW = Math.max(100, $(window).width() - (margin * 2));
					var maxH = Math.max(100, $(window).height() - (margin * 2));
					var ratio = Math.min(maxW / vidW, maxH / vidH, 1);
					var newW = Math.round(vidW * ratio);
					var newH = Math.round(vidH * ratio);

					var $popup = $('.poptrox-popup:visible');
					if ($popup.length) {
						var $iframe = $popup.find('iframe');
						if ($iframe.length) {
							// Set iframe size and animate popup to match
							$iframe.css({ width: newW + 'px', height: newH + 'px' });
							$popup.animate({ width: newW, height: newH }, 150);

							// Compute hasPrev/hasNext and notify iframe so its buttons can be enabled/disabled
									var iframeSrc = $iframe.attr('src') || '';
									// Normalize by extracting the video 'src' parameter when using video-player.html
									function extractVideoParam(url) {
										try {
											var u = new URL(url, window.location.href);
											var p = u.searchParams.get('src');
											return p ? p : u.href;
										} catch (e) {
											return url;
										}
									}

									var iframeVideoSrc = extractVideoParam(iframeSrc);
									var $anchors = $main.find('.thumb > a');
									var hrefs = $anchors.map(function() { return extractVideoParam($(this).attr('href')); }).get();
									var idx = hrefs.indexOf(iframeVideoSrc);
									var hasPrev = idx > 0;
									var hasNext = idx >= 0 && idx < hrefs.length - 1;
									try { $iframe[0].contentWindow.postMessage({ hasPrev: hasPrev, hasNext: hasNext }, '*'); } catch (e) {}
						}
					}
				}

				// Navigation commands from iframe
				if (data && data.action === 'prev') {
					var $p = $('.poptrox-popup:visible');
					if ($p.length) {
						// Trigger Poptrox event and also simulate click on nav button as fallback
						$p.trigger('poptrox_previous');
						var $btn = $p.find('.nav-previous');
						if ($btn.length) $btn.trigger('click');
					}
				}
				if (data && data.action === 'next') {
					var $p = $('.poptrox-popup:visible');
					if ($p.length) {
						$p.trigger('poptrox_next');
						var $btn = $p.find('.nav-next');
						if ($btn.length) $btn.trigger('click');
					}
				}
			});

			// Hack: Set margins to 0 when 'xsmall' activates.
				breakpoints.on('<=xsmall', function() {
					$main[0]._poptrox.windowMargin = 0;
				});

				breakpoints.on('>xsmall', function() {
					$main[0]._poptrox.windowMargin = 50;
				});

})(jQuery);