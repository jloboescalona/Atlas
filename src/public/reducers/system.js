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
  let noAuthConf = {};
  if (config) {
    const systemData = config();
    if (
      systemData?.SYSTEM_DATA?.NO_AUTH &&
      Array.isArray(systemData?.SYSTEM_DATA?.NO_AUTH)
    ) {
      const dataNoAuth = systemData.SYSTEM_DATA.NO_AUTH;
      // console.log('system ', systemData);

      const inObject = (place, findElement) => {
        console.log('JORGE: ', place, findElement);
        let rtn = place;
        if (Array.isArray(place)) {
        } else {
          const reducer = current => place && place[current];
          console.log(findElement.forEach(reducer));
        }
        
        return rtn;
      };

      dataNoAuth.forEach(data => {
        const entriesDataNoAuth = Object.entries(data);
        const [key, value] = entriesDataNoAuth && entriesDataNoAuth[0];
        const finder = key && key === '0' ? data : key;
        const internal = key && key !== '0' && value;

        /* console.log(
          'J-->',
          internal,
          typeof systemData[finder],
          systemData[finder]
        ); */

        if (finder in systemData) {
          noAuthConf = {
            ...noAuthConf,
            [finder]: !internal
              ? systemData[finder]
              : inObject(systemData[finder], internal)
          };
        }
      });
      // console.log('-->', noAuthConf);
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
