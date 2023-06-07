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

	query
		.get()
		.then((querySnapshot) =>
			querySnapshot.forEach((doc) => addCard({ ...doc.data(), id: doc.id }))
		);
});

function showImages(image) {
	$("#detail").html(
		`<div>${image.images
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
    <h5 class="card-title">${image.title}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary"><a href="${image.url}">${
		image.host
	}</a></h6>
    <p class="card-text"><a href="images?id=${image.id}">ver imagenes (${
		image.imagesLength
	})</a></p>
    <p>${image.uu}</p><p title="${dayjs(image.date.toDate()).format(
		"DD/MM/YYYY hh:mm:ss"
	)}">${dayjs(image.date.toDate()).fromNow()}</p>
  </div>
</div>`);
}
