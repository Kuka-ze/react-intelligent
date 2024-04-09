import React, { useRef, useEffect } from 'react';  
  
const FullscreenToggle = () => {  
  const elemRef = useRef(null);  
  
  useEffect(() => {  
    const elem = elemRef.current;  
  
    function openFullscreen() {  
      if (elem.requestFullscreen) {  
        elem.requestFullscreen();  
      } else if (elem.mozRequestFullScreen) { // Firefox  
        elem.mozRequestFullScreen();  
      } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera  
        elem.webkitRequestFullscreen();  
      } else if (elem.msRequestFullscreen) { // IE/Edge  
        elem.msRequestFullscreen();  
      }  
    }  
  
    function closeFullscreen() {  
      if (document.exitFullscreen) {  
        document.exitFullscreen();  
      } else if (document.mozCancelFullScreen) { // Firefox  
        document.mozCancelFullScreen();  
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera  
        document.webkitExitFullscreen();  
      } else if (document.msExitFullscreen) { // IE/Edge  
        document.msExitFullscreen();  
      }  
    }  
  
    document.addEventListener('fullscreenchange', () => {  
      // 在这里你可以根据全屏状态更新UI，比如改变按钮文本  
    });  
  
    return () => {  
      document.removeEventListener('fullscreenchange');  
    };  
  }, []);  
  
  const handleFullscreen = () => {  
    const elem = elemRef.current;  
    if (!document.fullscreenElement) {  
      openFullscreen();  
    } else {  
      closeFullscreen();  
    }  
  };  
  
  return (  
    <div>  
      <div ref={elemRef}>  
        {/* 这里放你的内容，它将在全屏时显示 */}  
      </div>  
      <button onClick={handleFullscreen}>  
        {document.fullscreenElement ? '退出全屏' : '进入全屏'}  
      </button>  
    </div>  
  );  
};  
  

export default FullscreenToggle;

//el
// import React from 'react';  
// import ReactDOM from 'react-dom';  
// import FullscreenToggle from './FullscreenToggle';  
  
// ReactDOM.render(  
//   <FullscreenToggle />,  
//   document.getElementById('root')  
// );
