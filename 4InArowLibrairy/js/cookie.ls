window.borto.cookies = 
  set : (key, val) -> document.cookie = "#key=#val;"
  get : -> (RegExp("#{it}=([^;]*);?")exec document.cookie)[1];
  getTab : -> eval("[#{@get(it)}]")