$(document).ready(function () {
	keys$
	.orderBy("date","desc")
		.get()
		.then((querySnapshot) =>
			querySnapshot.forEach((doc) => addCard(doc.data()))
		);
});

function addCard(key) {
	$("#keys").append(`
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${key.title}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary"><a href="${key.url}">${key.host}</a></h6>
    <p class="card-text">${key.keys}</p>
    <p>${key.uu}</p><p>${dayjs(key.date.toDate()).fromNow()}</p>
  </div>
</div>`);
}
