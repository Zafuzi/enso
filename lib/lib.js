// return json as object or null if error
j2o = function(j) { try { return JSON.parse(j) } catch(e) { return null } }

// return object as JSON or null if error
o2j = function(o) { try { return JSON.stringify(o) } catch(e) { return null } }
