export function checkAccessesForIntents(accessKey, access, intents) {
  return intents?.find(intentGroup => intentGroup.permissions?.some(intent => {
    if (intent[accessKey] === access) {
      return !!intent.write;
    } else {
      return false
    }
  }));
}
export function checkAccessesForActions(permissionList, permissionName, intent) {
  for (const permission of permissionList) {
    if (permission.permissionName === permissionName) {
      for (const p of permission.permissions) {
        if (p.intent === intent) {
          return p.write;
        }
      }
    }
  }
  return null;
}
