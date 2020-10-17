const menuInit = (title: string): string => {
  let menuItem = '';
  switch (title) {
    case '/': { menuItem = 'main'; break; }
    case '/data': { menuItem = 'data'; break; }
    case '/map': { menuItem = 'map'; break; }
    case '/about': { menuItem = 'about'; break; }
    default: { menuItem = ''; }
  }
  return menuItem;
};

export default menuInit;
