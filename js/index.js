/** @format */
import { User } from './userModel.js';
const fileInput = document.getElementById('file');
const contenairFile = document.getElementById('previewImgUser');
let url;

fileInput.addEventListener('change', () => {
	let reader = new FileReader();
	reader.readAsDataURL(fileInput.files[0]);

	reader.addEventListener('load', () => {
		contenairFile.setAttribute('src', reader.result);
		url = reader.result;
	});
});

const form = document.querySelector('form');
const list = document.querySelector('.cards');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const bio = document.getElementById('bio');
const groupe = document.getElementById('groupe');
const imageUrl = document.getElementById('imgUser');
const resetButton = document.getElementById('reinitialiser');

sessionStorage.clear();

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const user = new User(
		firstName.value,
		lastName.value,
		groupe.value,
		bio.value,
		url,
	).info();

	try {
		sessionStorage.setItem(
			`user${sessionStorage.length}`,
			JSON.stringify(user),
		);

		list.innerHTML += `
	                    <div class="card">
								<div class="photo-user">
								<img
									height="100px"
									width="100px"
									src="${url}"
									alt=""
								/>
							</div>
							<div class="info-user">
								<span class="remove">&times</span>
								<span class="names">${user.noms}</span
								><span class="goupe">${user.groupe}</span>
								<p>
									${user.bio}
								</p>
							</div>
						</div>
	`;
	} catch (error) {
		console.log(
			'The value of this image exeeded the quota ! Please , choose an other',
		);
	}
	removeFunction();
});

const removeFunction = () => {
	if (list.children[0]) {
		const removeIcon = document.querySelectorAll('.remove');
		removeIcon.forEach((btn) =>
			btn.addEventListener('click', (e) => {
				e.target.parentElement.parentElement.remove();
			}),
		);
	}
};
removeFunction();

const resetFunction = () => {
	list.innerHTML = '';
	const cards = Object.values(sessionStorage);
	for (let i = 0; i < cards.length; i++) {
		list.innerHTML += `
	                    <div class="card">
								<div class="photo-user">
								<img
									height="100px"
									width="100px"
									src="${JSON.parse(cards[i]).url} "
									alt=""
								/>
							</div>
							<div class="info-user">
								<span class="remove">&times</span>
								<span class="names">${JSON.parse(cards[i]).noms}</span
								><span class="goupe">${JSON.parse(cards[i]).groupe}</span>
								<p>
									${JSON.parse(cards[i]).bio}
								</p>
							</div>
						</div>
	`;
	}

	removeFunction();
};

resetButton.addEventListener('click', () => {
	resetFunction();
});
