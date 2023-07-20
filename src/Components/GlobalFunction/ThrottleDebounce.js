//Debounce function//
export function Debounce(func, timeout = 500){
    let timer;
    return (...args) => {
      if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer=setTimeout(()=>{
      timer=undefined;
    }, timeout);
    };
}