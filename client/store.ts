import {Session} from 'meteor/session';

export namespace Store {
	export const APP_ID = "app";

	export const unset = (key: string, shouldUnsetPersistentStore: boolean = true) => {
		if (shouldUnsetPersistentStore) {
			localStorage.removeItem(`${Store.APP_ID}_${key}`);
		}
		Session.set(key, undefined);
	}

	export const load = (key: string) => {
		let value = localStorage.getItem(`${Store.APP_ID}_${key}`);
		Session.set(key, value);
		return value;
	}

	export const save = (key: string) => {
		localStorage.setItem(`${Store.APP_ID}_${key}`, Session.get(key));
	}

	export const set = (key: string, value: string, shouldSetPersistentStore: boolean = false) => {
		Session.set(key, value);
		if (shouldSetPersistentStore) {
			Store.save(key);
		}
	}

	export const get = (key: string, shouldGetFromPersistentStore: boolean = false) => {
		if (shouldGetFromPersistentStore) {
			return Store.load(key);
		}

		return Session.get(key);
	}
}