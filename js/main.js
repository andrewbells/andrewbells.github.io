var $body,
		windowHeight,
		windowWidth,
		$scroll_top,
		$menuTrigger,
		$header,
		$slider,
		$platformSlider,
		$latestSlider,
		$careersSlider,
		sliderTrigger = false,
		s1 = false,
		$paginationFullText,
		$paginationShortText,
		$jobsTrigger,
		$validateForm,
		$topPage,
		slider_pause = 8000,
		mediaPoint1 = 1024,
		mediaPoint2 = 768,
		mediaPoint3 = 480,
		mediaPoint4 = 320;
mediaPoint800 = 800;

$(document).ready(function ($) {
	$body = $('body');
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	$menuTrigger = $('.menuTrigger');
	$menuTriggerMain = $('.menuTriggerMain');
	$header = $('.header_main_row');
	$slider = $('.slider_list');
	$careersSlider = ('.careersSlider');
	$platformSlider = $('.platformSlider');
	$latestSlider = $('.latestSlider');
	$paginationFullText = $('.pagination_text.v1_mod');
	$paginationShortText = $('.pagination_text.post_mod');
	$jobsTrigger = $('#whr_embed_hook .whr-items:first-child');
	$topPage = $('.present');
	$validateForm = $('.validateForm');

	//developer funcitons
	//pageWidget(['index', 'careers', 'contact', 'story', 'blog', 'blog_post']);
	getAllClasses('html', '.elements_list');

	//header
	$menuTriggerMain.on('click', function () {
		if ($body.hasClass('menu_open')) {
			$body.removeClass('menu_open');
			$(this).removeClass('active_mod');
		} else {
			$body.addClass('menu_open');
			$(this).addClass('active_mod');
		}
	});

	$menuTrigger.on('click', function () {
		if ($body.hasClass('menu_open')) {
			$body.removeClass('menu_open');
			$menuTriggerMain.removeClass('active_mod');
			$(this).children('a').attr('id', '');
		} else {
			$body.addClass('menu_open');
			$menuTriggerMain.addClass('active_mod');
			$(this).children('a').attr('id', 'index_nav');
		}
	});
	
	//sliders
	loadSliders();

	//validation
	$validateForm.validate({
		rules: {
			username: {
				minlength: 2,
				required: true
			},
			email: {
				email: true,
				required: true
			},
			message: {
				required: true
			}

		},
		messages: {
			username: {
				minlength: 'Username must consist of at least 2 characters',
				required: 'This field is required'
			},
			email: {
				required: 'This field is required'
			},
			message: {
				required: 'This field is required'
			}
		}
	});
});

$(window).on('load', function () {
	loadFunc();
});

$(window).on('resize', function () {
	resizeFunc();
});

$(window).on('scroll', function () {
	scrollFunc();
	changeHeader();
});

function loadFunc() {
	toggleSlider();
	setTimeout(jobsTitleInit, 3000);

	var home_video = 'i/home/YOUSICIAN-COMPANY-WEBSITE-BANNER';
	var career_video = 'i/careers/YOUSICIAN-CAREERS-WEBSITE-BANNER-v3';
	var $video;
	if (!isMobile.apple.phone) {
		if ($topPage.hasClass('home_mod')) {
			$video = home_video;
		}
		if ($topPage.hasClass('career_mod')) {
			$video = career_video;
		}
		if ($topPage.hasClass('home_mod') || $topPage.hasClass('career_mod')) {
			$topPage.append('<div class="video_bg_wrap"><video poster="" id="bgvid" playsinline="" autoplay="" muted="" loop=""><source src="' + $video + '.webm" type="video/webm"><source src="' + $video + '.mp4" type="video/mp4"></video></div>');
		}
	}
}
function jobsTitleInit() {
	var $jobsTriggerTitle = $('#whr_embed_hook .whr-group.whr-toggle:first-child');
	var $jobsTriggerUl = $('#whr_embed_hook .whr-group.whr-toggle:first-child + .whr-items');

	$jobsTriggerTitle.addClass('whr-active');
	$jobsTriggerUl.attr('style', '');
}

function resizeFunc() {
	updateSizes();
	toggleSlider();

	reloadSliders();
}

function scrollFunc() {
	$scroll_top = $(document).scrollTop();
	updateSizes();
}

function updateSizes() {
	windowWidth = $(window).width();
	windowHeight = $(window).height();

	if (windowWidth < mediaPoint800) {
		sliderTrigger = true;

		$paginationFullText.addClass('hidden');
		$paginationShortText.removeClass('hidden');
	}
	if (windowWidth > mediaPoint800) {
		sliderTrigger = false;

		$paginationFullText.removeClass('hidden');
		$paginationShortText.addClass('hidden');
	}
}

function changeHeader() {
	if ($scroll_top > 0) {
		$header.addClass('scroll_mod');
	} else {
		$header.removeClass('scroll_mod');
	}
}

function loadSliders() {
	if ($slider.length) {
		$slider.bxSlider({
			auto: true,
			pause: slider_pause,
			prevSelector: '.slider_control_prev',
			nextSelector: '.slider_control_next',
			prevText: '<svg class="icon icon-chevron-left slider_mod"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="i/sprite/sprite.svg#chevron-left"></use></svg>',
			nextText: '<svg class="icon icon-chevron-right slider_mod"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="i/sprite/sprite.svg#chevron-right"></use></svg>'
		})
	}
}

function reloadSliders() {
	if ($slider.length) {
		$slider.reloadSlider();
	}
}

function toggleSlider() {
	if (windowWidth < mediaPoint800 && !s1) {
		if ($platformSlider.length) {
			$platformSlider.bxSlider({
				auto: false,
				controls: true,
				pagerSelector: '.platform_pager',
				pause: slider_pause,
				prevSelector: '.platform_control_prev',
				nextSelector: '.platform_control_next',
				prevText: '<svg class="icon icon-chevron-left slider_1_mod"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="i/sprite/sprite.svg#chevron-left"></use></svg>',
				nextText: '<svg class="icon icon-chevron-right slider_1_mod"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="i/sprite/sprite.svg#chevron-right"></use></svg>'
			});
		}
		if ($latestSlider.length) {
			$latestSlider.bxSlider({
				auto: true,
				controls: true,
				pause: slider_pause,
				prevSelector: '.latest_control_prev',
				nextSelector: '.latest_control_next',
				prevText: '<svg class="icon icon-chevron-left slider_mod"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="i/sprite/sprite.svg#chevron-left"></use></svg>',
				nextText: '<svg class="icon icon-chevron-right slider_mod"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="i/sprite/sprite.svg#chevron-right"></use></svg>'
			})
		}
		s1 = true;
	} else if (windowWidth > mediaPoint800 && s1) {
		if ($platformSlider.length) {
			$platformSlider.destroySlider();
		}
		if ($latestSlider.length) {
			$latestSlider.destroySlider();
		}
		s1 = false;
	}
}

if ('objectFit' in document.documentElement.style === false) {
	document.addEventListener('DOMContentLoaded', function () {
		Array.prototype.forEach.call(document.querySelectorAll('img[data-object-fit]'), function (image) {
			(image.runtimeStyle || image.style).background = 'url("' + image.src + '") no-repeat 50%/' + (image.currentStyle ? image.currentStyle['object-fit'] : image.getAttribute('data-object-fit'));

			image.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'' + image.width + '\' height=\'' + image.height + '\'%3E%3C/svg%3E';
		});
	});
}

//Functions for development
function getAllClasses(context, output) {
	var finalArray = [],
			mainArray = [],
			allElements = $(context).find($('*'));//get all elements of our page
	//If element has class push this class to mainArray
	for (var i = 0; i < allElements.length; i++) {
		var someElement = allElements[i],
				elementClass = someElement.className;
		if (elementClass.length > 0) {//if element have not empty class
			//If element have multiple classes - separate them
			var elementClassArray = elementClass.split(' '),
					classesAmount = elementClassArray.length;
			if (classesAmount === 1) {
				mainArray.push('.' + elementClassArray[0] + ' {');
			} else {
				var cascad = '.' + elementClassArray[0] + ' {';
				for (var j = 1; j < elementClassArray.length; j++) {
					cascad += ' &.' + elementClassArray[j] + ' { }';
				}
				mainArray.push(cascad);
			}
		}
	}

	//creating finalArray, that don't have repeating elements
	var noRepeatingArray = unique(mainArray);
	noRepeatingArray.forEach(function (item) {
		var has = false;
		var preWords = item.split('&');
		for (var i = 0; i < finalArray.length; ++i) {
			var newWords = finalArray[i].split('&');
			if (newWords[0] == preWords[0]) {
				has = true;
				for (var j = 0; j < preWords.length; ++j) {
					if (newWords.indexOf(preWords[j]) < 0) {
						newWords.push(preWords[j]);
					}
				}
				finalArray[i] = newWords.join('&');
			}
		}
		if (!has) {
			finalArray.push(item);
		}
	});
	for (var i = 0; i < finalArray.length; i++) {
		$('<div>' + finalArray[i] + ' }</div>').appendTo(output);
	}


	//function that delete repeating elements from arrays, for more information visit http://mathhelpplanet.com/static.php?p=javascript-algoritmy-obrabotki-massivov
	function unique(A) {
		var n = A.length, k = 0, B = [];
		for (var i = 0; i < n; i++) {
			var j = 0;
			while (j < k && B[j] !== A[i]) j++;
			if (j == k) B[k++] = A[i];
		}
		return B;
	}
}

//function pageWidget(pages) {
	//var widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
	//widgetWrap.prependTo("body");
	//for (var i = 0; i < pages.length; i++) {
	//	$('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
	//}
	//var widgetStilization = $('<style>body {position:relative} .widget_wrap{position:fixed;top:200px;left:0;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:#222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;cursor:pointer}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px;}.widget_link:hover{text-decoration:underline} </style>');
	//widgetStilization.prependTo(".widget_wrap");
//}

