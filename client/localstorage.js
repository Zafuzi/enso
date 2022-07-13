import {Session} from "meteor/session";
/**
 * Session.save
 *      Will capture the current session value for key and save to local store
 * @param key
 */
Session.__proto__.save = function (key)
{
	localStorage.setItem(key, Session.get(key));
};

// Session.prototype.load = function (key) { loadPersistentSession(key); };
/**
 * Session.load
 *      Will replace the current session value for key with the local store (only if something has been stored in the store).
 * @param key
 */
Session.__proto__.load = function (key)
{
	let value = localStorage.getItem(key);
	Session.set(key, value); 
	return value;
};

/**
 * Session.unset
 *      Will clear the Session's value for key
 *      Optionally will also clean the local store for key
 * @param key {String}
 * @param shouldUnsetPersistentStore {true | false}
 */
Session.__proto__.unset = function (key, shouldUnsetPersistentStore)
{
	if (shouldUnsetPersistentStore)
	{
		localStorage.removeItem(key);
	}
	Session.set(key, undefined);
};
