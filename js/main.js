const audio = document.getElementsByTagName("audio"),
	$hamMenu = $("#ham-menu"),
	$media = $("#media"),
	$navWrapper = $("#nav-wrapper"),
	$closeNav = $("#close-nav");

const CLASSES = {
	open: "open",
	closed: "closed",
}

const FADE_SPEEDS = {
	normal: 500,
	quick: 250,
}

function navThing() {
	// Hamburger Menu
	$hamMenu.on("click", function() {
		$(this).fadeOut(FADE_SPEEDS.quick, function() {
			$navWrapper.toggleClass(CLASSES.open);
			$closeNav.delay(FADE_SPEEDS.normal).fadeIn(FADE_SPEEDS.normal);
		});
	});

	// Menu button close
	$closeNav.on("click", function() {
		$(this).fadeOut(FADE_SPEEDS.quick, function() {
			$("#nav-wrapper.open").find("li").addClass(CLASSES.closed);

			setTimeout(function() { 
				$navWrapper.removeClass(CLASSES.open);
				$navWrapper.find("li").removeClass(CLASSES.closed);
				$hamMenu.fadeIn(FADE_SPEEDS.normal)
			}, FADE_SPEEDS.normal);
		});
	});

	$("#main-nav a").each(function() {
		$(this).on('click', function(e) {
			e.preventDefault();

			$closeNav.trigger('click');

			const navHref = $(this).attr('href');

			setTimeout(function() {
				window.location.href = navHref;
			}, 1050);
		})
	})
}

function pauseAudio() {
	$(audio).each(function() {
		this.pause();
	});
}

function soundHoverThing() {
	const windowWidth = $(window).width();
	const tabletLandscape = 1024;

	if (windowWidth > tabletLandscape) {
		$("[data-sound]")
			.on("mouseenter", function() {
				pauseAudio();
				
				const datasound = $(this).attr("data-sound");
				$(`#snd-${datasound}`)[0].play();
			})
			.on("mouseleave", pauseAudio);

		// Two sounds for my Logo
		const logoSounds = ["billyboy", "dude"];
		$("[data-sound='billyboy']")
			.on("mouseenter", function() {
				pauseAudio();

				const sounds = logoSounds[Math.floor(Math.random() * logoSounds.length)];
				$(`#snd-${sounds}`)[0].play();
			});
	}
	
}

function gifHoverThing() {
	$("[data-gif]")
		.on("mouseenter", function() {
			const datagif = $(this).attr("data-gif");
			$media.css("background-image", `url(img/${datagif}.gif)`);
		})
		.on("mouseleave", function() {
			$media.css("background-image", "");
			pauseAudio();
		});
}

$(function() {
	navThing();
	soundHoverThing();
	gifHoverThing();
});

$(window).resize(function() {
	soundHoverThing();
});