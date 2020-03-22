let initial = {
  baseURL: ''
};
const findInConf = (finder = '', data = {}) => {
  if (data && Array.isArray(data) && typeof finder === 'string') {
    return data.find(
      element =>
        (typeof element === 'string' && element === finder) ||
        (element && element[finder])
    );
  }
};

// aca se tiene que separar lo que esta en config para dejarlo publico
const GetConfigSystem = config => {
  const noAuthConf = {};
  if (config) {
    const systemData = config();
    if (
      systemData?.SYSTEM_DATA?.NO_AUTH &&
      Array.isArray(systemData?.SYSTEM_DATA?.NO_AUTH)
    ) {
      const dataNoAuth = systemData.SYSTEM_DATA.NO_AUTH;
      console.log('data: ', systemData);
      console.log('dataNoAuth: ', dataNoAuth);

      const render = (finder, element, rtnn = {}) => {
        const rtn = rtnn;
        const allowedTypes = ['string', 'number', 'boolean'];
        if (finder && Array.isArray(finder)) {
          finder.forEach(find => {
            const entriesFind = Object.entries(find);
            const [key, value] = entriesFind && entriesFind[0];
            const findKey = key && key === '0' ? find : key;
            const findValue = key && key !== '0' && value;
            console.log(
              'validate: ',
              element[findKey],
              typeof element[findKey]
            );
            if (findKey in element) {
              const typeElement = typeof element[findKey];
              if (allowedTypes.includes(typeElement)) {
                rtn[findKey] = element[findKey];
              } else if (Array.isArray(element[findKey])) {
                // todavia
              } else {
                rtn[findKey] = render(
                  findValue,
                  element[findKey],
                  rtn[findKey]
                );
              }
            }
          });
        }
        return rtn;
      };

      console.log('RENDER-->', render(dataNoAuth, systemData));
    }
    initial = { ...initial, ...noAuthConf };
  }
  return (state = initial, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
};

module.exports = GetConfigSystem;
