// ANTI-DevTools PROTECTION
document.addEventListener('contextmenu',function(e){e.preventDefault();return false;});
document.addEventListener('keydown',function(e){
  if(e.key==='F12'||e.key==='f12'||(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='i'||e.key==='J'||e.key==='j'||e.key==='C'||e.key==='c'))||(e.ctrlKey&&e.key==='u')){e.preventDefault();return false;}
});
