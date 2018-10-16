var jQuery = require("jquery");
import "popper.js";
import "bootstrap";
require("./scss/custom.scss");

$(document).ready(function () {
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$('#header-image')
					.attr('src', e.target.result).addClass("rounded-circle")
			};
			reader.readAsDataURL(input.files[0]);
		}
	}
});

