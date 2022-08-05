/** @format */

export class User {
	constructor(firstName, lastName, groupe, bio, imgUrl) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.groupe = groupe;
		this.bio = bio;
		this.url = imgUrl;
	}

	info = () => {
		return {
			noms: `${this.firstName} ${this.lastName}`,
			groupe: this.groupe,
			bio: this.bio,
			url: this.url,
		};
	};
}
