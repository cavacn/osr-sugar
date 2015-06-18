for(var i = 1; i<= 10; ++i){
    console.log(i);
    if(i === 10){
        console.log('10 - over');
        process.exit();
    }
}