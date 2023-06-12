$(document).ready(function () {
	const params = new URLSearchParams(window.location.search);
	const id = params.get("id");
	const uu = params.get("uu");

	console.log(id, uu);
	if (id) {
		images$
			.doc(id)
			.get()
			.then((doc) => showImages(doc.data()));
	}

	let query = images$.orderBy("date", "desc");

	if (uu) query = query.where("uu", "==", uu);

	query = query.limit(200);

	query.get().then((querySnapshot) => {
		querySnapshot.docs.forEach((doc, i) =>
			addCard({ ...doc.data(), id: doc.id, index: i })
		);

		$(".ver-imgs").on("click", function () {
		//	$(".imgs-box").html("");
			const id = $(this).data("id");
			console.log("id1", id);
			showImages(id);
		});
	});
});

function showImages(id) {
	const images = $("#imgs-" + id)
		.data("imgs")
		.split(",");
	$("#imgs-" + id).html(
		`<div>${images
			.map(
				(img, i) =>
					`<img title="${
						i + 1
					}" style="border: 1px solid green" src="${img}" alt="">`
			)
			.join("")}</div>`
	);
}

function addCard(image) {
	$("#images").append(`
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${image.index + 1}). ${image.title}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary"><a href="${image.url}">${
		image.host
	}</a></h6>
    <p class="card-text">
  			<button class="ver-imgs"  data-id="${image.id}">Ver imagenes (${image.imagesLength})</button>
    </p>

    <p>${image.uu}</p><p title="${dayjs(image.date.toDate()).format(
		"DD/MM/YYYY hh:mm:ss"
	)}">${dayjs(image.date.toDate()).fromNow()}</p>
    <span id="imgs-${image.id}" class="imgs-box" data-imgs="${image.images.join(
		","
	)}"></span>
  </div>
</div>`);
}
