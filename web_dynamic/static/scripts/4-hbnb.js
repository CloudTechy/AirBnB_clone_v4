window.addEventListener("load", function () {
  $.ajax("http://127.0.0.1:5001/api/v1/status").done(function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });

  const amenityIds = {};
  $("input[type=checkbox]").click(function () {
    if ($(this).prop("checked")) {
      amenityIds[$(this).attr("data-id")] = $(this).attr("data-name");
    } else if (!$(this).prop("checked")) {
      delete amenityIds[$(this).attr("data-id")];
    }
    if (Object.keys(amenityIds).length === 0) {
      $("div.amenities h4").html("&nbsp;");
    } else {
      $("div.amenities h4").text(Object.values(amenityIds).join(", "));
    }
  });

  fetch_places();

  const btn = document.querySelector("button");
  btn.addEventListener("click", fetch_places);
});

function fetch_places() {
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5001/api/v1/places_search/",
    contentType: "application/json",
    data: JSON.stringify({}),
  }).done(function (data) {
    $("section.places").html("");
    for (const place of data) {
      const template = `
      <article>

        <div class="title_box">

          <h2>${place.name}</h2>

          <div class="price_by_night">

        $${place.price_by_night}

          </div>
        </div>
        <div class="information">
          <div class="max_guest">
        <i class="fa fa-users fa-3x" aria-hidden="true"></i>

        <br />

        ${place.max_guest} Guests

          </div>
          <div class="number_rooms">
        <i class="fa fa-bed fa-3x" aria-hidden="true"></i>

        <br />

        ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
        <i class="fa fa-bath fa-3x" aria-hidden="true"></i>

        <br />

        ${place.number_bathrooms} Bathroom

          </div>
        </div>
        <div class="description">

          ${place.description}

        </div>

      </article>`;
      $("section.places").append(template);
    }
  });
}