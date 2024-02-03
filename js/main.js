"use strict";

/***********************************side bar***************************************** */
let innerw = $(".sideBar").width() - $(".inner").width();
console.log(innerw);
$(".sideBar").css("left", `-${innerw}px`);
$("#open").on("click", function () {
	if ($(".sideBar").css("left") === `-${innerw}px`) {
		$(".sideBar").animate({left: `0`}, 500);
		$("#open").removeClass("fa-solid fa-bars").addClass("fa-solid fa-x");
	} else {
		$(".sideBar").animate({left: `-${innerw}px`}, 500);
		$("#open").removeClass("fa-solid fa-x").addClass("fa-solid fa-bars");
	}
});
/*********************************get data**************************************** */

$("li").on("click", function (e) {
	$("li").removeClass("active");
	e.target.setAttribute("class", "active");
	$(".displayer").fadeOut(500);
	setTimeout(() => {
		display();
	}, 450);
});
function getData() {
	let data = $(".active").attr("d-name");
	return data;
}
function display() {
	$.ajax({
		type: "GET",
		url: "https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
		dataType: "json",
		success: function (response) {
			$(".displayer").fadeIn(500);
			response.results.forEach(function (value) {
				let {title, overview, vote_average, release_date, backdrop_path} =
					value;

				$(".displayer").append(`
			  <div class="card">
				<div class="layer">
				  <h3>${title}</h3>
				  <p>${overview}</p>
				  <span>Release Date: ${release_date}</span>
				  <div class="vote">${vote_average}</div>
				</div>
				<img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${backdrop_path}" alt="">
			  </div>`);
			});

			$("input").on("keyup", function () {
				let searchTerm = $(this).val().toLowerCase();
				$(".card").each(function () {
					let movieTitle = $(this).find("h3").text().toLowerCase();
					if (movieTitle.includes(searchTerm)) {
						$(this).show();
					} else {
						$(this).hide();
					}
				});
			});

			$(".card").hover(
				function () {
					$(this).find("img").addClass("blur");
					$(this).find(".layer").addClass("active");
					$(this).find("p").addClass("active");
				},
				function () {
					$(this).find("img").removeClass("blur");
					$(this).find(".layer").removeClass("active");
					$(this).find("p").removeClass("active");
				}
			);
		},
	});

	/*************************************hover**************************************** */
}

display();
