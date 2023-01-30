if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').then(ev=>{
        console.log('registration succesful, scope is:');
    })
    .catch(err=>{
        console.log('Service Worker registration falied, error:');
    });
}