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
      // console.log('data: ', systemData);
      console.log('_____________________________________');

      //              NO_AUTH   CONFIG     RESULT
      const render = (finder, configData, result = {}) => {
        console.log('FINDER: ', finder);
        const rtn = result;
        const allowedTypes = ['string', 'number', 'boolean'];
        if (finder && Array.isArray(finder)) {
          finder.forEach(find => {
            const entriesFind = Object.entries(find);
            const [key, value] = entriesFind && entriesFind[0];
            const findKey = key && key === '0' ? find : key;
            const findValue = key && key !== '0' && value;
            if (findKey in configData && configData[findKey] !== null) {
              const typeElement = typeof configData[findKey];
              if (allowedTypes.includes(typeElement)) {
                rtn[findKey] = configData[findKey];
              } else if (Array.isArray(configData[findKey])) {
                const xxx = configData[findKey].reduce(
                  (accValue, currentValue) => {
                    console.log('CURRENTVALUE: ', currentValue);
                    const validate = render(
                      findValue,
                      currentValue,
                      rtn[findKey]
                    );
                    if (Object.entries(validate).length > 0) {
                      accValue.push(validate);
                    }
                    return accValue;
                  },
                  []
                );

                // console.log('TEST xxx: ', xxx);
                rtn[findKey] = xxx;
              } else {
                rtn[findKey] = render(
                  findValue,
                  configData[findKey],
                  rtn[findKey]
                );
              }
            }
          });
        }
        return rtn;
      };
      const pepe = render(dataNoAuth, systemData);
      console.log('RENDER-->', JSON.stringify(pepe.OPENNEBULA_ZONES, null, 2));
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
