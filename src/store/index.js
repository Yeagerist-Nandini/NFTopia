import {createGlobalState} from 'react-hooks-global-state'


const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  modal: 'scale-0',
  updateModal: 'scale-0',
  showModal: 'scale-0',
  alert: { show: false, msg: '', color: '' },
  loading: { show: false, msg: '' },
  connectedAccount: '',
  nft: null,
  nfts: [],
  transactions: [],
  contract: null,
})

const setLoading=(msg)=>{
    const loading = getGlobalState('loading');
    setGlobalState('loading',{...loading,msg})
}

const setAlert=(msg,color)=>{
    setGlobalState('loading',false);
    setGlobalState('alert',{show:true,msg,color});
    setTimeout(()=>{
        setGlobalState('alert',{show:false,msg:'',color})
    },6000);
}

// const truncate=(text,start,end,maxLen)=>{
//     if(text.length>maxLen){
//         let s=text.substring(0,start);
//         let e=text.substring(text.length-end,text.length);

//         while(s.length + e.length < maxLen){
//             s=s + '.';
//         }

//         return s+e;
//     }

//     return text;
// }

const truncate = (text, startChars, endChars, maxLength) => {
    if (text.length > maxLength) {
      let start = text.substring(0, startChars);
      let end = text.substring(text.length - endChars, text.length);
      while (start.length + end.length < maxLength) {
        start = start + '.';
      }
      return start + end;
    }
    return text;
  }


export {
    useGlobalState,
    setGlobalState,
    getGlobalState,
    setAlert,
    setLoading,
    truncate,
  }